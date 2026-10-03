# 📋 แบบฟอร์มเตรียมข้อมูลสำหรับสร้างเว็บไซต์ Portfolio (อัปเดตแล้ว)

> **สถานะ:** นำข้อมูลจากไฟล์ Resume PDF (`Inrita_Warajirawiroj_Data Engineer.pdf`) และรูปโปรไฟล์ (`public/images/profile.png`) เข้าสู่ระบบเรียบร้อยแล้ว ✅

---

## 1. 👤 ข้อมูลส่วนตัวและแนะนำตัว (Profile)
> ไฟล์สื่อ: `content/profile.md`, `public/images/profile.png`, `public/resume.pdf`

- [x] **ชื่อ-นามสกุล (ภาษาอังกฤษ):** `Inrita Warajirawiroj`
- [x] **ชื่อ-นามสกุล (ภาษาไทย):** `อินริตา วราจิรวิโรจน์`
- [x] **ชื่อเล่น:** `Inrita` *(ปรับเปลี่ยนได้ใน content/profile.md)*
- [x] **ตำแหน่งงานหลัก (Job Title):** `Data Engineer`
- [x] **ประโยคสั้นแนะนำตัว (Tagline):** `I build reliable, scalable batch data pipelines and turn raw data into business-ready insights.`
- [x] **รูปถ่ายโปรไฟล์:** จัดเตรียมที่ `public/images/profile.png` เรียบร้อยแล้ว
- [x] **ไฟล์ Resume ภาษาอังกฤษ:** จัดเตรียมที่ `public/resume.pdf` (คัดลอกมาจาก `Inrita_Warajirawiroj_Data Engineer.pdf`) เรียบร้อยแล้ว
- [x] **บทความแนะนำตัวแบบยาว (About Text):** สรุปประสบการณ์ 2 ปีในสาย Data Engineer ใน `content/profile.md`

---

## 2. 📞 ข้อมูลติดต่อ (Contact Details)
> ไฟล์สื่อ: `content/contact.md`

- [x] **Email:** `inrita.2004@gmail.com`
- [x] **เบอร์โทรศัพท์:** `(095) 869-1650`
- [x] **LINE ID:** `inrita.2004` *(สามารถแก้ไขได้ที่ content/contact.md)*
- [x] **เมือง/จังหวัด (Location):** `Bangkok, Thailand`
- [x] **LinkedIn Profile URL:** `https://www.linkedin.com/in/inrita-warajirawiroj` *(หากมี URL เฉพาะสามารถแก้ไขได้)*
- [x] **GitHub Profile URL:** `https://github.com/aiayee`

---

## 3. 🛠️ ทักษะและความสามารถ (Skills)
> ไฟล์สื่อ: `content/skills.md`

- [x] **Data Engineering:** Apache Airflow, Apache Spark (PySpark), Airbyte, ETL/ELT Pipeline Design, Data Ingestion & Integration
- [x] **Programming & Query:** Python, SQL
- [x] **Databases & Warehouses:** Microsoft SQL Server, PostgreSQL, MySQL, MongoDB
- [x] **Data Quality & Privacy:** Source-to-Target Validation, NULL & Duplicate Checks, Data Type Validation, PII Encryption & Hashing (AES-256/SHA-256), Pipeline Monitoring
- [x] **Cloud & DevOps:** Huawei Cloud (ECS, CCE, OBS), Docker, Jenkins, GitLab CI/CD, REST API Integration
- [x] **Data Visualization:** Power BI, Power Query, Apache Superset
- [x] **AI & Productivity:** GitHub Copilot, ChatGPT, Claude, Technical Communication & Problem-solving

---

## 4. 💼 ประวัติการทำงานและการฝึกงาน (Work Experience)
> ไฟล์สื่อ: `content/experience/01-outsourced.md`, `content/experience/02-internship.md`

- [x] **Data Engineer (Outsourced) @ Siam Piwat Co., Ltd.** (Jul 2025 – Present)
- [x] **Data Engineer Intern @ Siam Piwat Co., Ltd.** (Jan 2025 – Jun 2025)

---

## 5. 🚀 โปรเจกต์และผลงานเคสศึกษา (Projects)
> ไฟล์สื่อ: `content/projects/pos-sales-pipeline.md`, `content/projects/jobspark.md`, `content/projects/portfolio-website.md`

- [x] **Work Case Study:** End-to-End Retail POS Sales & Data Ingestion Pipeline (`pos-sales-pipeline.md`)
- [x] **Academic Capstone Project:** JobSpark — Online Job Search Platform for University Students (`jobspark.md`)
- [x] **Side Project:** Portfolio Website (`portfolio-website.md`)

---

## 6. 🎓 ประวัติการศึกษา (Education)
> ไฟล์สื่อ: `content/education/bachelor.md`

- [x] **วุฒิการศึกษา:** Bachelor of Science (Second Class Honours)
- [x] **มหาวิทยาลัย:** King Mongkut's University of Technology Thonburi (KMUTT)
- [x] **คณะ/สาขา:** School of Information Technology / Information Technology
- [x] **ปีที่จบ:** 2025
- [x] **GPAX:** 3.28

---

## ❓ สิ่งที่สามารถเพิ่มเติม/ตรวจสอบเพิ่มเติม (Optional / Additional Info)

1. **LinkedIn Profile URL:** หาก URL LinkedIn จริงไม่ใช่ `https://www.linkedin.com/in/inrita-warajirawiroj` สามารถเข้าไปแก้ไขที่ [content/contact.md](file:///Users/inrita/Dopverlev/INRITA-PORTFOLIO/content/contact.md) ได้เลยครับ
2. **LINE ID:** หากต้องการเปลี่ยน LINE ID สามารถแก้ไขใน [content/contact.md](file:///Users/inrita/Dopverlev/INRITA-PORTFOLIO/content/contact.md) ได้เช่นกัน
3. **รูปภาพโปรเจกต์ / Cover Images:** หากมีรูป Screenshot Architecture Diagram หรือ Dashboard (ที่ไม่ติด NDA) สามารถวางรูป cover ไว้ที่ `public/images/projects/<project-slug>/cover.png` ได้ครับ
4. **Certificates / Badges:** หากมีใบรับรองประกาศนียบัตร (เช่น GCP, AWS, Coursera, Databricks ฯลฯ) สามารถสร้างไฟล์ `.md` เพิ่มใน `content/certificates/` เพื่อให้ระบบแสดงผลการ์ด Certificate บนเว็บไซต์ได้โดยอัตโนมัติ
