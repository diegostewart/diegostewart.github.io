---
title: Orchestrating ML Feature Pipelines with Dagster
date: 2025-12-08
excerpt: Replacing our Airflow-based feature engineering with Dagster's asset-centric approach for better observability and testing.
tags: [Dagster, ML, Feature Engineering, Python]
tools: [Dagster, Pandas, Snowflake, MLflow]
status: Production
---

## The Problem with Airflow for Feature Engineering

Airflow thinks in tasks. Feature engineering thinks in datasets. This impedance mismatch led to DAGs that were hard to test, hard to debug, and impossible to run partially.

## Why Dagster

Dagster's software-defined assets align perfectly with how data engineers think about feature pipelines. Each feature is a declared asset with explicit dependencies.

```python
from dagster import asset, AssetIn

@asset
def raw_user_events():
    """Load raw events from Snowflake."""
    return snowflake.query("SELECT * FROM raw.user_events WHERE date >= DATEADD(day, -30, CURRENT_DATE())")

@asset(ins={"events": AssetIn("raw_user_events")})
def user_session_features(events):
    """Compute session-level features."""
    return events.groupby("session_id").agg(
        event_count=("event_id", "count"),
        session_duration=("timestamp", lambda x: (x.max() - x.min()).total_seconds()),
        unique_pages=("page_url", "nunique"),
    )

@asset(ins={"sessions": AssetIn("user_session_features")})  
def user_engagement_score(sessions):
    """Derive engagement score from session features."""
    sessions["engagement_score"] = (
        sessions["event_count"].clip(upper=100) / 100 * 0.4 +
        sessions["session_duration"].clip(upper=1800) / 1800 * 0.4 +
        sessions["unique_pages"].clip(upper=20) / 20 * 0.2
    )
    return sessions
```

## Results

- **Test coverage**: From 12% to 89% on feature logic
- **Debug time**: 70% reduction in time-to-root-cause
- **Feature freshness**: From 24-hour to 2-hour refresh cycles
