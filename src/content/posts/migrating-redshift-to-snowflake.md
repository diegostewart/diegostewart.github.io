---
title: Migrating from Redshift to Snowflake — Lessons Learned
date: 2026-01-15
excerpt: A post-mortem on migrating 12TB of data and 200+ queries from Redshift to Snowflake over 6 weeks.
tags: [Snowflake, Redshift, Migration, SQL]
tools: [Snowflake, AWS Redshift, dbt, Python]
status: Production
---

## Context

After 3 years on Redshift, we hit scaling limits. Concurrency bottlenecks during peak hours meant analysts were waiting 10+ minutes for queries that should take seconds.

## Migration Strategy

We opted for a parallel-run approach rather than a hard cutover:

1. **Week 1-2**: Schema migration and data transfer via S3
2. **Week 3-4**: Query translation and dbt model migration
3. **Week 5**: Parallel execution with result comparison
4. **Week 6**: Cutover and decommission

```sql
-- Redshift-specific syntax that needed translation
-- BEFORE:
SELECT DATEADD(day, -7, GETDATE()) as week_ago;
-- AFTER (Snowflake):
SELECT DATEADD(day, -7, CURRENT_TIMESTAMP()) as week_ago;
```

## What Went Wrong

- **JSON handling differences**: Redshift's `JSON_EXTRACT_PATH_TEXT` vs Snowflake's lateral flatten required rewriting 40+ queries
- **Sort key assumptions**: Our Redshift tables relied heavily on sort keys for performance. Snowflake's micro-partitioning made some of these optimizations irrelevant (in a good way)
- **Cost model surprise**: Snowflake's compute-on-demand meant our initial cost estimates were 30% off

## What Went Right

- **dbt made it possible**: Having our transformations in dbt meant we only needed to change adapter configs for 80% of models
- **Zero data loss**: The parallel-run approach caught every discrepancy before cutover
- **Performance**: Average query time dropped from 8.2s to 1.4s

## Final Numbers

| Metric | Redshift | Snowflake |
|--------|----------|-----------|
| Avg query time | 8.2s | 1.4s |
| Max concurrent queries | 15 | 150+ |
| Monthly cost | $4,200 | $3,800 |
| Maintenance hours/week | 6 | 0.5 |
