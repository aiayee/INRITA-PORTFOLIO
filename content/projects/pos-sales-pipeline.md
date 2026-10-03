---
title: "End-to-End Retail POS Sales & Data Ingestion Pipeline"
summary: "Ingested 106 MSSQL tables and 10,000+ daily transactions across 62 retail stores using PySpark and Airflow on Huawei Cloud."
type: work
period: "Jul 2025 – Present"
stack: [Python, PySpark, Apache Airflow, Airbyte, MSSQL, Huawei Cloud, Docker, Kubernetes, Power BI, Apache Superset]
order: 1
---

## Business Context

Retail, Data Science, and business teams required automated, daily delivery of consolidated POS sales transactions, E-Coupon usage, and Event Registrations across 62 retail stores. Manually retrieving and validating sales data from multiple source databases was prone to delay and inconsistencies.

## My Role

Lead Data Engineer for POS pipeline development and data ingestion projects. Owned end-to-end stored procedure ingestion, PySpark transformation workflows, Airbyte connector setups, PII data encryption, data quality validation, and cloud migration to Kubernetes (CCE).

## Approach

- **Data Ingestion & Transformation**: Built pipelines ingesting 106 MSSQL tables into DWS via stored procedures and transformed 10,000+ daily transactions with PySpark into curated datasets.
- **Airbyte Ingestion**: Set up Airbyte pipelines for E-Coupon and Event Registration data ingestion.
- **Orchestration & Quality**: Managed 25+ daily/weekly production Airflow DAGs. Implemented SQL-based data quality checks (source-to-target counts, NULL/duplicate checks, type validations).
- **Security & Cloud Migration**: Applied AES-256 encryption and SHA-256 hashing to protect sensitive customer PII. Successfully migrated 7 pipelines from ECS to CCE (Kubernetes) and validated DWS 9.0 to 9.1.0 upgrades in QA with zero discrepancies.
- **BI & Delivery**: Built Apache Superset operational reports and Power BI dashboards, and automated CSV data exports to SharePoint.

## Results

- Delivered zero-discrepancy daily sales data across 62 retail stores to business and data science teams within SLA.
- Resolved production incidents (avg. ~2/month) quickly to maintain high data reliability and pipeline uptime.
- Seamlessly completed cloud infrastructure upgrades (CCE migration & DWS upgrades) without downstream reporting impact.

## Lessons Learned

- Rigorous QA validation (source-to-target record verification) is crucial when executing cloud platform migrations or data warehouse upgrades.
- Automated PII protection at the ingestion layer ensures privacy compliance across downstream reporting environments.
