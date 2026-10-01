# คู่มือแก้ไขเนื้อหา

ข้อมูลทั้งหมดของเว็บอยู่ในโฟลเดอร์ `content/` และไฟล์ภาพหรือ PDF อยู่ใน `public/`
แก้เสร็จแล้ว **commit + push ขึ้น `main`** เว็บจะอัปเดตเองภายใน 1–2 นาที

> ถ้ากรอกข้อมูลผิด Build จะไม่ผ่าน และเว็บเดิมยังออนไลน์อยู่
> ดูสาเหตุได้ที่แท็บ **Actions** บน GitHub ระบบจะบอกชื่อไฟล์และ Field ที่ผิด

## ก่อนเปิดใช้งานจริง: สิ่งที่ต้องแทนที่

ค้นหาคำว่า `TODO` ในโฟลเดอร์ `content/` แล้วแทนด้วยข้อมูลจริงทั้งหมด

| ไฟล์ | สิ่งที่ต้องทำ |
|---|---|
| `content/profile.md` | ชื่อ, ชื่อเล่น, ประโยคสั้น, ข้อความ About |
| `public/images/` | ใส่รูปโปรไฟล์จริง (สี่เหลี่ยมจัตุรัส ≥ 400×400) แล้วแก้ `photo:` ใน profile.md |
| `public/resume.pdf` | แทนด้วย Resume ภาษาอังกฤษตัวจริง (ใช้ชื่อไฟล์เดิม) |
| `content/contact.md` | Email, เบอร์, LINE, LinkedIn, GitHub ⚠️ ข้อมูลนี้เป็น Public |
| `content/skills.md` | Skill จริง |
| `content/experience/*.md` | ตำแหน่ง, ช่วงเวลา, หน้าที่หลัก, Tech Stack |
| `content/education/bachelor.md` | มหาวิทยาลัย, คณะ, สาขา, ปีที่จบ, GPA |
| `content/projects/work-project-1.md` | Case Study งานจากที่ทำงาน |
| `content/projects/academic-project.md` + `public/slides/academic-project.pdf` | Case Study งานตอนเรียน + สไลด์จริง |

## เพิ่มโปรเจกต์ใหม่

1. Copy `content/projects/_TEMPLATE.md` เป็นชื่อใหม่ เช่น `sales-pipeline.md`
   (ชื่อไฟล์จะกลายเป็น URL `/projects/sales-pipeline/`)
2. กรอกข้อมูลส่วนหัว (`title`, `summary`, `type`, `period`, `stack`, `order`)
   - `order` คือลำดับการแสดง และห้ามซ้ำกับโปรเจกต์อื่น
3. เขียนเนื้อหาใต้หัวข้อทั้ง 5 หัวข้อ (ต้องมีครบ):
   `## Business Context`, `## My Role`, `## Approach`, `## Results`, `## Lessons Learned`
4. ใส่ภาพที่ `public/images/projects/<ชื่อโปรเจกต์>/` และอ้างอิงในเนื้อหาด้วย
   `![คำอธิบายภาพ](/images/projects/<ชื่อโปรเจกต์>/ภาพ.png)`

**กติกางานจากที่ทำงาน (ตามที่ตกลงกันไว้):** ห้ามใส่ชื่อบริษัท, Architecture Diagram และตัวเลขผลลัพธ์

## เพิ่ม Certificate

Copy `content/certificates/_example.md` เป็นชื่อใหม่ (ไม่ขึ้นต้นด้วย `_`) แล้วกรอกข้อมูล
ส่วน Certificates และเมนูจะแสดงขึ้นเองอัตโนมัติ

## เชื่อมงานกับ Case Study

ใน `content/experience/*.md` ใส่ชื่อไฟล์โปรเจกต์ (ไม่ต้องมี .md) ใน `relatedProjects`
เช่น `relatedProjects: [work-project-1]`

## รูปแบบข้อมูลที่ใช้บ่อย

| Field | รูปแบบ | ตัวอย่าง |
|---|---|---|
| วันที่ (experience) | `"YYYY-MM"` หรือ `present` | `"2024-06"` |
| รายการ | `[a, b, c]` | `stack: [Python, SQL]` |
| ไฟล์ใน public | ขึ้นต้นด้วย `/` | `/images/profile.jpg` |
| ไอคอน Skill | slug จาก [simpleicons.org](https://simpleicons.org) | `icon: python` |

## ทดสอบบนเครื่องก่อน Push (ไม่บังคับ)

```bash
npm install
npm run dev     # เปิด http://localhost:3000
npm run check   # ตรวจแบบเดียวกับ CI
```
