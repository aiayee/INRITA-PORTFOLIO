---
title: "E-Coupon System — Data Ingestion & Reporting"
summary: "Led the data ingestion project for the E-Coupon system, integrating coupon redemption and usage data into DWS for downstream use by Data Science and business teams."
type: work
role: "Lead Data Engineer / Project Owner"
stack: [Airbyte, Apache Airflow, SQL, DWS, Apache Superset]
order: 2
cover: /images/projects/e-coupon/customer-journey.png
images:
  - src: /images/projects/e-coupon/customer-journey.png
    alt: "E-Coupon System Customer Journey"
    caption: "Customer Journey — Coupon redemption and usage flow"
  - src: /images/projects/e-coupon/technical-architecture.png
    alt: "E-Coupon System Technical Architecture"
    caption: "Technical Architecture — Airbyte ingestion to DWS and Superset"
  - src: /images/projects/e-coupon/dashboard-journey.png
    alt: "E-Coupon Dashboard Journey"
    caption: "Dashboard Journey — Reporting and metric tracking workflow"
  - src: /images/projects/e-coupon/dashboard-sample.png
    alt: "E-Coupon Apache Superset Dashboard"
    caption: "Operational Dashboard — Coupon redemption & campaign analytics in Superset"
flows:
  - ["E-Coupon System", "Source Data", "Airbyte", "Airflow", "DWS", "Data Science", "Analysis"]
  - ["DWS", "SQL", "Apache Superset", "Business / Data Owner"]
---

## Business Context

The E-Coupon system captures customer coupon activities, including coupon redemption and usage through LINE OneSiam. The data needs to be integrated into the data warehouse so that it can be used by Data Science and business teams for analysis and reporting.

## My Role

Lead Data Engineer / Project Owner for the E-Coupon data ingestion project. Worked with Application teams to understand data flows and source data requirements, built the Airbyte ingestion pipeline, and supported Data Science teams by providing data context and troubleshooting data-related issues.

## Key Responsibilities

- Led the E-Coupon data ingestion project and built Airbyte pipelines to integrate source data into DWS.
- Worked with Application teams to understand data flows and data requirements.
- Provided data context to Data Science teams to support downstream analysis.
- Developed SQL-based reports in Apache Superset for business users.
- Supported users in troubleshooting data issues and answering data-related questions.
