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
| `content/skills.md` | Skill จริง รวมหมวด **Soft Skills** ท้ายไฟล์ |
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
4. ใส่ภาพที่ `public/images/projects/<ชื่อโปรเจกต์>/` ได้ 3 แบบ:
   - **ภาพปก** `cover:` แสดงบน Card และหัวหน้า Case Study ถ้าไม่ใส่ ระบบจะสร้างภาพปกจาก Tech Stack ให้อัตโนมัติ
   - **Gallery** `images:` ใส่ได้หลายรูป แต่ละรูปต้องมี `alt` (คำอธิบายภาพ) และใส่ `caption` เพิ่มได้ แสดงท้าย Case Study
   - **ภาพในเนื้อหา** `![คำอธิบายภาพ](/images/projects/<ชื่อโปรเจกต์>/ภาพ.png)`
   - แนะนำภาพแนวนอนอัตราส่วน 16:9 (เช่น 1600×900) และบีบอัดให้ไม่เกิน ~300 KB ต่อรูป

**กติกางานจากที่ทำงาน (อัปเดต 2026-10-03):** ใส่ชื่อบริษัทและตัวเลขผลลัพธ์ได้ แต่ยังไม่ใส่ Architecture Diagram ของระบบจริงของบริษัท

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

## ใส่โลโก้ที่ทำงานและมหาวิทยาลัย

1. วางไฟล์โลโก้ไว้ที่ `public/images/logos/` เช่น `siam-piwat.png`, `kmutt.png`
   - แนะนำ PNG พื้นใส หรือ SVG ขนาดประมาณ 200×200 (โลโก้จะแสดงบนพื้นขาวทั้งโหมดสว่างและมืด)
2. เพิ่มบรรทัด `logo:` ในส่วนหัวของไฟล์
   - `content/experience/*.md` → `logo: "/images/logos/siam-piwat.png"` (ใส่ทั้ง 2 ไฟล์ถ้าบริษัทเดียวกัน)
   - `content/education/bachelor.md` → `logo: "/images/logos/kmutt.png"`
3. ถ้ายังไม่ใส่โลโก้ ระบบจะแสดงตัวย่อแทน เช่น **SP**, **KMUTT**
4. ถ้าใส่ path ผิดหรือไม่มีไฟล์ Build จะแจ้ง Error

## ข้อมูลเพิ่มเติมในหน้าแรก (อัปเดต 2026-10-03)

**`content/profile.md`**
- `roles:` รายการคำที่พิมพ์สลับกันใต้ตำแหน่งในส่วน Hero (ไม่ใส่ก็ได้ ระบบจะแสดง `title` แทน)
- `stats:` ตัวเลขในการ์ด About ใส่ได้สูงสุด 3 รายการ เพราะช่องแรกระบบคำนวณ "Years experience" ให้อัตโนมัติจากวันเริ่มงานใน `content/experience/`
  ```yaml
  stats:
    - { value: "62", label: "Retail stores" }
  ```
- `quote:` ประโยคสั้น ๆ ใต้หัวข้อ About Me (ไม่ใส่ก็ได้)

**`content/skills.md`**
- `softSkills:` รายการ Soft Skills แสดงเป็นส่วนแยกใต้ Technical Skills
- ถ้าชื่อมีเครื่องหมาย `,` ต้องใส่เครื่องหมายคำพูดครอบ เช่น `{ name: "Huawei Cloud (ECS, CCE, OBS)" }`

**`content/experience/*.md`**
- 3 ข้อแรกของรายการหน้าที่หลักจะแสดงบนการ์ด ข้อที่เหลือจะอยู่ในปุ่ม "View details"

**รูปสไลด์ในหน้า Case Study**
- รูปใน `images:` ของแต่ละโปรเจกต์จะแสดงเป็นสไลด์เลื่อนได้ทางขวาของหน้า Case Study
- แนะนำให้ Export สไลด์พรีเซนต์เป็น PNG/JPG แนวนอน 16:9 แล้วใส่ตามลำดับ

## Case Study รูปแบบใหม่ (อัปเดต 2026-10-04)

- หัวข้อที่**ต้องมี**: `## Business Context` และ `## My Role` ส่วนหัวข้ออื่นใส่หรือไม่ใส่ก็ได้ เช่น `## Key Responsibilities`, `## Business Value`, `## Lessons Learned`
- ใช้ `### หัวข้อย่อย` แบ่งกลุ่มได้ภายในแต่ละหัวข้อ (เช่น Key Responsibilities ของ POS)
- `role:` บทบาทในโปรเจกต์ (ไม่บังคับ) และ `period:` ไม่ใส่ก็ได้
- **แผนภาพ Data Flow** ใส่ใน `flows:` หนึ่งบรรทัดต่อหนึ่ง flow เขียนแต่ละขั้นเป็นข้อความ ถ้ามีหมายเหตุให้คั่นด้วย `|`
  ```yaml
  flowTitle: "Data Pipeline"
  flows:
    - ["POS Source Systems", "MSSQL | 106 tables", "Airbyte", "DWS"]
    - ["DWS", "CSV Export", "SharePoint"]
  ```
- หน้าแรกจะแยกโปรเจกต์ตาม `type:` อัตโนมัติ: `work` อยู่ใน **Selected Work Projects** (`order` ที่น้อยที่สุดเป็นการ์ด Featured) ส่วน `academic`/`side` อยู่ใน **Academic & Side Projects**
- ชื่อโปรเจกต์ที่มี ` — ` จะแสดงเป็น 2 บรรทัดบนการ์ด เช่น "Retail POS Sales — End-to-End Data Pipeline"
- Experience: แสดงหน้าที่หลักครบ 5 ข้อแรก (ข้อที่ 6 ขึ้นไปอยู่ใน "View details") และถ้ามี `relatedProjects` จะมีลิงก์ "Selected Work Projects →"
