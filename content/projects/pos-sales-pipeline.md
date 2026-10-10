---
title: "Retail POS Sales — End-to-End Data Pipeline"
summary: "Built and maintained an end-to-end data pipeline to ingest and transform POS sales data from 62 retail stores, prepare curated datasets for operational reporting, and deliver data to Retail teams through dashboards and CSV exports."
type: work
period: "Nov 2025 – Sep 2026"
role: "Data Engineer"
stack: [MSSQL, Stored Procedures, Airbyte, PySpark, Apache Airflow, SQL, Apache Superset, SharePoint, Huawei Cloud]
order: 1
cover: "/images/projects/pos-sales-pipeline/business-flow.png"
images:
  - src: "/images/projects/pos-sales-pipeline/business-flow.png"
    alt: "Retail POS Sales Business Flow — From Store Transactions to Actionable Insights"
    caption: "Business Flow — From store transactions across 62 stores to operational reports"
  - src: "/images/projects/pos-sales-pipeline/technical-architecture.png"
    alt: "Retail POS Sales Technical Architecture — End-to-End Data Pipeline"
    caption: "Technical Architecture — Detailed Airflow, Airbyte, PySpark, DWS & Superset pipeline"
flowTitle: "Data Pipeline"
flows:
  - ["POS Source Systems", "MSSQL | 106 tables", "Stored Procedures", "Airbyte", "PySpark Transformation", "DWS", "Curated Data", "Apache Superset | Operational reports", "Retail Team"]
  - ["Curated Data", "CSV Export", "SharePoint", "Retail Team"]
---

## Business Context

Retail teams need timely and reliable sales data to monitor daily sales performance across multiple stores. POS data is generated from multiple source tables and needs to be integrated, transformed, and prepared before it can be used for operational reporting and analysis.

## My Role

Worked as a Data Engineer responsible for developing and supporting the POS data pipeline, from source data ingestion and transformation to reporting and data delivery. Collaborated with the Retail team to understand reporting requirements, troubleshoot data issues, and support additional data requirements.

## Key Responsibilities

### Data Ingestion & Transformation

- Ingested data from 106 MSSQL tables into DWS through stored procedures.
- Transformed 10,000+ daily transactions from 62 stores using PySpark.
- Prepared curated datasets for Retail operational reporting.

### Reporting & Data Delivery

- Developed operational reports using Apache Superset and SQL.
- Exported processed data as CSV files to SharePoint for Retail team usage.
- Supported Retail users with data issues, questions, and additional reporting requirements.

### Data Quality & Operations

- Performed source-to-target data validation and investigated data discrepancies.
- Monitored and supported production data pipelines to ensure reliable data delivery.

## Business Value

- Enabled Retail teams to access consolidated sales data for daily operational reporting.
- Supported Retail users with reliable data for monitoring sales performance across 62 stores.
