---
role: "Data Engineer (Outsourced)"
companyDescriptor: "Siam Piwat Co., Ltd."
type: contract
start: "2025-07"
end: "present"
stack: [Python, PySpark, Apache Airflow, Airbyte, MSSQL, Huawei Cloud, Docker, Kubernetes, Jenkins, GitLab CI/CD, Power BI, Apache Superset]
relatedProjects: [pos-sales-pipeline]
---
- Built an end-to-end POS sales pipeline, ingesting data from 106 MSSQL tables into DWS via stored procedures and transforming 10,000+ transactions/day from 62 stores with PySpark into curated datasets for daily Retail reporting.
- Led data ingestion projects for E-Coupon and Event Registration systems, building Airbyte pipelines and working with Application teams to understand data flows and requirements; provided data context and validated data quality to support Data Science teams.
- Developed daily and weekly Airflow DAGs and monitored 25+ DAGs in production, resolving about 2 incidents/month to keep data delivery within SLA.
- Implemented SQL-based data quality checks, including source-to-target record counts, NULL/duplicate checks, data type validation, and column-level/API-to-database comparisons.
- Protected PII by applying AES-256 encryption and SHA-256 hashing to sensitive customer fields before loading into the warehouse.
- Validated 10+ pipelines for the DWS 9.0 to 9.1.0 upgrade in QA before production deployment, ensuring zero impact on downstream reporting.
- Migrated 7 pipelines from ECS-based environments to CCE (Kubernetes), implementing and validating pipelines in QA before production cutover with zero data discrepancies.
- Managed version-controlled pipeline deployments from QA to production using GitLab CI/CD and Jenkins.
- Delivered processed data through CSV exports to SharePoint and developed Apache Superset operational reports and Power BI dashboards for business teams.
