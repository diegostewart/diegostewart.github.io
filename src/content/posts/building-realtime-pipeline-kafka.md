---
title: Building a Real-Time Data Pipeline with Apache Kafka
date: 2026-03-10
excerpt: A deep dive into designing and deploying a fault-tolerant streaming pipeline that processes 2.1TB of event data daily.
tags: [Kafka, Spark, Python, AWS]
tools: [Apache Kafka, PySpark, S3, Terraform]
status: Production
cover_image: https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80
---

## The Problem

Our analytics team needed real-time access to user interaction events. The existing batch ETL process introduced a 6-hour delay between event generation and availability in the data warehouse.

## Architecture

The solution leverages Apache Kafka as the central nervous system, with PySpark consumers performing windowed aggregations before landing data in S3.

```python
from pyspark.sql import SparkSession
from pyspark.sql.functions import window, count

spark = SparkSession.builder \
    .appName("EventAggregator") \
    .getOrCreate()

events = spark.readStream \
    .format("kafka") \
    .option("subscribe", "user-events") \
    .load()

aggregated = events \
    .groupBy(window("timestamp", "5 minutes"), "event_type") \
    .agg(count("*").alias("event_count"))
```

## Key Decisions

1. **Partitioning strategy**: Hash-based on `user_id` to ensure ordering guarantees per user
2. **Serialization**: Avro with Schema Registry for backward compatibility
3. **Retention**: 7-day retention in Kafka, permanent in S3 with Parquet format

## Results

| Metric | Before | After |
|--------|--------|-------|
| Latency | 6 hours | 45 seconds |
| Throughput | 50K events/hr | 2.1M events/hr |
| Data loss | 0.02% | 0% |

The pipeline has been running in production for 8 months with 99.97% uptime.
