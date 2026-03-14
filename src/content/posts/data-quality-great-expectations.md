---
title: Data Quality at Scale with Great Expectations
date: 2026-02-22
excerpt: How we implemented automated data validation across 340+ tables using Great Expectations and dbt.
tags: [Data Quality, dbt, Python, Great Expectations]
tools: [Great Expectations, dbt, Snowflake, Airflow]
status: Production
---

## Why Data Quality Matters

Bad data is expensive. A single corrupted dimension table cascaded into 14 downstream dashboards before anyone noticed. We needed automated guardrails.

## The Framework

Great Expectations provides a declarative way to define data contracts. Combined with dbt tests, we built a two-layer validation system:

```yaml
# great_expectations/expectations/orders_suite.json
expectations:
  - expectation_type: expect_column_values_to_not_be_null
    kwargs:
      column: order_id
  - expectation_type: expect_column_values_to_be_between
    kwargs:
      column: order_total
      min_value: 0
      max_value: 100000
  - expectation_type: expect_column_distinct_values_to_be_in_set
    kwargs:
      column: status
      value_set: [pending, processing, shipped, delivered, cancelled]
```

## Integration with Airflow

Each DAG run triggers validation before any transformation step. Failed expectations halt the pipeline and alert via PagerDuty.

## Metrics

- **340+ tables** under automated validation
- **2,400+ expectations** defined
- **99.8% catch rate** on data anomalies before they reach production dashboards
- **3x reduction** in data incident response time
