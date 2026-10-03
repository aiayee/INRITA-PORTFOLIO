# Requirement Document — Data Engineer Portfolio

> เวอร์ชัน: 1.0 (Draft รอการอนุมัติ) · วันที่: 2026-10-01
> สถานะ: ✅ Confirmed = ผู้ใช้ยืนยันแล้ว · 🟡 Pending = ยังไม่ได้ตัดสินใจ · 💡 Suggested = AI เสนอ (ยังไม่ใช่ Requirement จนกว่าจะยืนยัน)

---

## 1. Project Overview

| Requirement | สถานะ |
|---|---|
| เว็บ Portfolio สำหรับใช้สมัครงาน | ✅ |
| เจ้าของ Portfolio: แฟนของผู้ใช้ ตำแหน่ง **Data Engineer** | ✅ |
| ปัญหาที่แก้: รวมผลงานไว้ที่เดียว และส่งให้คนดูตอนสมัครงานได้ง่าย (ลิงก์เดียว) | ✅ |
| ประเภท: Portfolio แบบ **Static Website** (ไม่มี Backend / Database / Login) | ✅ |
| โครงสร้าง: **Single Page + หน้ารายละเอียดโปรเจกต์ (Case Study)** | ✅ |
| การเข้าถึง: Public (ใครมีลิงก์ก็เข้าได้) แต่ **ห้าม Search Engine ค้นเจอ** | ✅ |

**เกณฑ์ความสำเร็จ** ✅
1. HR ดูแล้วเข้าใจภายใน 30 วินาทีว่าเป็นใคร ทำอะไรได้
2. Tech Lead เห็นทักษะเชิงเทคนิคและอยากเรียกสัมภาษณ์
3. ดูเป็นมืออาชีพและโดดเด่นกว่าผู้สมัครคนอื่น

---

## 2. Target Users

| กลุ่ม | ความต้องการ | สถานะ |
|---|---|---|
| HR / Recruiter | เห็นภาพรวมเร็ว, หา Keyword, ดาวน์โหลด Resume | ✅ |
| Tech Lead / Hiring Manager สาย Data | รายละเอียดเชิงเทคนิค, Tech Stack, วิธีคิด | ✅ |

- อุปกรณ์: PC / Mobile / Tablet ให้ความสำคัญเท่ากัน ✅
- เนื้อหา 2 ระดับ: ภาพรวมในหน้าแรก (HR) → กดลึกเข้า Case Study (Tech Lead) ✅

---

## 3. User Roles

| Role | ดู | เพิ่ม / แก้ไข / ลบ | อนุมัติ | วิธีเข้าถึง | สถานะ |
|---|---|---|---|---|---|
| **Visitor** (HR, Tech Lead, ผู้มีลิงก์) | ทุกหน้า | ❌ | ❌ | เปิดลิงก์ | ✅ |
| **Owner** (แฟน) | ทุกหน้า | ✅ แก้ไฟล์ Markdown แล้ว Push ขึ้น Git | ไม่มีขั้นตอน | GitHub Repository | ✅ |

- ไม่มีข้อมูลที่ซ่อนไว้สำหรับคนเฉพาะกลุ่ม ✅
- ไม่มีหน้า Admin ✅

---

## 4. Core Features (MVP)

### 4.1 Hero ✅
- รูปโปรไฟล์, ชื่อ-นามสกุล (EN / TH), ชื่อเล่น, ตำแหน่ง "Data Engineer" ✅
- ประโยคสั้น 1 บรรทัดใต้ตำแหน่ง (เช่น "I build reliable data pipelines…") ✅
- ปุ่ม CTA: **Download Resume** และ **Contact** (เลื่อนไปส่วน Contact) ✅
- ไม่แสดง: สถานะ Open to work และตำแหน่งที่มองหา ✅

### 4.2 About ✅
- ข้อความแนะนำตัวแบบยาว (เรื่องราว, ความสนใจ) อยู่ถัดจาก Hero ✅

### 4.3 Experience ✅
- 1 บริษัท แบ่ง 2 ช่วง: **Intern 6 เดือน → Contract 1.5 ปี** ✅
- แสดง: ตำแหน่ง, ช่วงเวลา (เดือน/ปี), หน้าที่หลัก 3–5 ข้อ, Tech Stack, ลิงก์ไป Case Study ✅
- ~~ไม่แสดงชื่อบริษัท~~ → **แสดงชื่อบริษัทและโลโก้ได้** ✅ (เปลี่ยนเมื่อ 2026-10-03)
- แสดงเป็น Timeline ที่เห็นการเติบโต Intern → Contract 💡
- ใช้คำอธิบายประเภทบริษัทแทนชื่อ (เช่น "บริษัทด้าน Retail ขนาดใหญ่") 🟡

### 4.4 Projects + Case Study ✅
- จำนวน 3–4 ชิ้น ไม่มี Filter / Search ✅
- Case Study เขียน**ภาษาอังกฤษอย่างเดียว** ✅

| โปรเจกต์ | จำนวน | สิ่งที่แสดง | สิ่งที่ไม่แสดง | สถานะ |
|---|---|---|---|---|
| งานจาก Work Experience | 1–2 | Business Context, แนวทางแก้, Tech Stack, ผลลัพธ์ **รวมตัวเลข**, ชื่อบริษัท | Architecture Diagram ของระบบจริง | ✅ (อัปเดต 2026-10-03) |
| โปรเจกต์ตอนเรียน | 1 | ภาพที่ดึงจากสไลด์ + เนื้อหาใหม่ + ปุ่ม **"ดูสไลด์ฉบับเต็ม"** (เปิด/ดาวน์โหลด PDF) | – (เผยแพร่ได้) | ✅ |
| Side Project (เว็บนี้) | 1 | ลิงก์ GitHub (Repo Public) | – | ✅ |

- ภาพ Flow แบบทั่วไป (Source → Ingestion → Transform → Warehouse → BI) สำหรับงานจากที่ทำงาน 🟡 รอแฟนพิจารณา

### 4.5 Skills ✅
- จัดกลุ่มตามหมวด (เช่น Languages, Data Processing, Orchestration, Cloud, Database/Warehouse) แสดงเป็นไอคอน/Tag ✅
- ไม่มีระดับความถนัด และไม่มีแถบเปอร์เซ็นต์ ✅

### 4.6 Education ✅
- ป.ตรี ระดับเดียว: ชื่อมหาวิทยาลัย, คณะ/สาขา, ปีที่จบ, GPA ✅

### 4.7 Contact ✅
- แสดง: Email, เบอร์โทร, LINE ID, LinkedIn, GitHub, เมือง ✅
- **ไม่มีฟอร์มติดต่อ** ✅
- ปุ่มคัดลอก Email / เบอร์ / LINE 💡

### 4.8 Download Resume PDF ✅
- ภาษาอังกฤษอย่างเดียว ✅
- แฟนเตรียมไฟล์เอง (เว็บแค่ลิงก์ไปที่ไฟล์) ✅
- ไฟล์พร้อมแล้วหรือยัง 🟡
- ~~Resume PDF จะใส่ชื่อบริษัทหรือไม่~~ → ไม่เป็นประเด็นแล้ว เพราะเปิดเผยชื่อบริษัทได้ ✅

### 4.9 Dark / Light Mode ✅
- ค่าเริ่มต้นตามการตั้งค่าของอุปกรณ์ + ปุ่มสลับ ✅
- จำค่าที่ผู้ใช้เลือก 💡

---

## 5. Secondary Features (V2)

| Feature | รายละเอียด | สถานะ |
|---|---|---|
| สลับภาษา TH/EN | ค่าเริ่มต้น EN · แปลเฉพาะเมนู, About, Skills, Experience, Education, Contact · Case Study เป็น EN อย่างเดียว | ✅ (V2) |
| จำภาษาที่เลือก | เก็บใน localStorage | 💡 |
| Certificates | ตอนนี้ยังไม่มีข้อมูล → ซ่อนอัตโนมัติ · แต่ละใบมีลิงก์ Verify | ✅ ซ่อนอัตโนมัติ · 💡 ลิงก์ Verify |
| ซ่อนเบอร์โทร/LINE จนกว่าจะกด "แสดง" | ป้องกันบอทเก็บข้อมูล | 💡 (วางไว้ใน V2) |

---

## 6. User Flow 🟡 (รอยืนยัน)

**Flow A — HR**
```
เปิดลิงก์จากใบสมัคร/LinkedIn
→ Hero (ชื่อ, ตำแหน่ง, ประโยคสั้น)  ← เข้าใจภายใน 30 วินาที
→ เลื่อนดู Experience / Skills / Education
→ กด "Download Resume" หรือดู Contact
```

**Flow B — Tech Lead**
```
เปิดลิงก์
→ Hero → กดเมนู "Projects" (เลื่อนไปส่วน Projects)
→ เลือกโปรเจกต์ → หน้า Case Study
→ อ่าน Business Context / My Role / Approach / Results / Lessons Learned
→ "Next Project" หรือ "Back to Projects"
→ ดู GitHub หรือ Contact
```

**Flow C — Owner (อัปเดตเนื้อหา)** 💡
```
แก้/เพิ่มไฟล์ Markdown ใน content/
→ git commit + push ขึ้น main
→ GitHub Actions: ตรวจข้อมูล → Build → Deploy
   ├─ ผ่าน → เว็บอัปเดตอัตโนมัติ
   └─ ไม่ผ่าน → Action แจ้ง Error (ไฟล์/Field ที่ผิด) และเว็บเดิมยังออนไลน์
```

---

## 7. Sitemap ✅

```
/                          Home (Single Page)
 ├─ #hero
 ├─ #about
 ├─ #experience
 ├─ #projects
 ├─ #skills
 ├─ #education
 ├─ #certificates          (ซ่อนเมื่อไม่มีข้อมูล)
 └─ #contact
/projects/<slug>           Case Study (ต่อโปรเจกต์)
/404                       Not Found
```
ลำดับส่วนในหน้าแรก: **Hero → About → Experience → Projects → Skills → Education → Certificates → Contact** ✅

---

## 8. Page Specification

### 8.1 Home (`/`) ✅
| หัวข้อ | รายละเอียด |
|---|---|
| วัตถุประสงค์ | แสดงภาพรวมทั้งหมดในหน้าเดียว |
| ผู้เข้าถึง | ทุกคน |
| ข้อมูล | ทุกส่วนตามลำดับใน Sitemap |
| ปุ่ม / Action | เมนู (เลื่อนไปยังส่วนนั้น), Download Resume, Contact, สลับธีม, Card โปรเจกต์ → Case Study, ลิงก์ภายนอก (GitHub, LinkedIn, Email) |
| เชื่อมกับ | Case Study, Resume PDF |
| Empty State | ส่วนที่ไม่มีข้อมูลจะซ่อนทั้งส่วนและลิงก์ในเมนู |
| Loading State | ภาพ Lazy Load และแสดงพื้นหลังจางระหว่างรอ |
| Error State | ภาพโหลดไม่ได้จะแสดงข้อความแทนภาพ และ Layout ไม่พัง |

### 8.2 Case Study (`/projects/<slug>`) ✅
```
[← Back to Projects]
ชื่อโปรเจกต์ + ประเภท (Work / Academic / Side Project) + ช่วงเวลา
Tech Stack (Tag)
──────────────
1. Business Context
2. My Role
3. Approach
4. Results
5. Lessons Learned
──────────────
[ภาพประกอบ — ถ้ามี] [ดูสไลด์ฉบับเต็ม — ถ้ามี] [GitHub — ถ้ามี]
[← Previous Project] [Next Project →]
```
- ปุ่มที่ไม่มีข้อมูลจะไม่แสดง · โปรเจกต์แรกไม่มีปุ่ม Previous และโปรเจกต์สุดท้ายไม่มีปุ่ม Next ✅
- PDF โหลดไม่ได้จะแสดงข้อความแจ้ง ✅

### 8.3 404 ✅
- ข้อความแจ้งว่าไม่พบหน้า + ปุ่มกลับหน้าแรก

---

## 9. UI/UX Specification

| หัวข้อ | Requirement | สถานะ |
|---|---|---|
| Design Direction | **Clean Professional + กลิ่นอาย Tech** (โครงเรียบ, พื้นที่ว่างมาก, Monospace เฉพาะจุด เช่น Tag Tech Stack) | ✅ |
| สีหลัก | **ม่วง** ใช้เป็นสีเน้น (ปุ่ม, ลิงก์, Tag) | ✅ |
| Palette | ม่วง Violet ~`#7C3AED` (Light) / `#A78BFA` (Dark) + พื้นเทาเป็นกลาง | 💡 |
| Font | Inter (EN) + IBM Plex Sans Thai (TH) + JetBrains Mono (Tag/Code) | 🟡 |
| Theme | Dark/Light ตามอุปกรณ์ + ปุ่มสลับ · ตั้งธีมก่อนแสดงผลเพื่อไม่ให้หน้ากระพริบ | ✅ |
| Navigation (Desktop) | **Navbar ด้านบนแบบ Sticky**: เมนู, สลับธีม, ปุ่ม Resume (+ สลับภาษาใน V2) | ✅ |
| Navigation (Mobile) | **Hamburger** → เมนูเต็มจอ | ✅ |
| ไฮไลต์เมนูตามส่วนที่ดูอยู่ | Scroll Spy | 💡 |
| Animation | Hover บนปุ่ม/Card + Smooth Scroll + Fade-in เบา ๆ **เฉพาะ Hero ตอนเปิดครั้งแรก** · ไม่มี Animation ตอนเลื่อน | ✅ |
| Reduce Motion | ปิด Animation ทั้งหมดเมื่ออุปกรณ์ตั้งค่าไว้ | 💡 |
| Cards | Card โปรเจกต์: ชื่อ, ประเภท, สรุป 1–2 บรรทัด, Tag Tech Stack | 💡 |
| Forms / Tables / Modal | ไม่มี | ✅ |

---

## 10. Database Schema (Content Model)

ไม่มี Database ✅ · ข้อมูลทั้งหมดเป็น **ไฟล์ Markdown + Frontmatter** ✅ · ตรวจด้วย Schema ตอน Build 💡

```
content/
├─ profile.md            Frontmatter + Body = About
├─ contact.md            Frontmatter อย่างเดียว
├─ skills.md             Frontmatter อย่างเดียว
├─ experience/*.md       1 ไฟล์ต่อ 1 ช่วงงาน, Body = หน้าที่หลัก
├─ education/*.md
├─ projects/*.md         1 ไฟล์ต่อ 1 โปรเจกต์, Body = เนื้อหา Case Study
└─ certificates/*.md     ว่างได้
public/
├─ resume.pdf
├─ images/...
└─ slides/...
```

| ไฟล์ | Field | Type | Required |
|---|---|---|---|
| **profile** | nameEn, nameTh, nickname, title, tagline | string | ✅ |
| | photo, resume | path | ✅ |
| | body (About) | markdown | ✅ |
| **contact** | email | email | ✅ |
| | phone, lineId, city | string | ✅ |
| | linkedin, github | url | ✅ |
| **skills** | categories[]: { name, items[]: { name, icon? } } | array | ✅ |
| **experience** | role | string | ✅ |
| | companyDescriptor | string | 🟡 optional |
| | type | `internship` \| `contract` \| `full-time` | ✅ |
| | start | `YYYY-MM` | ✅ |
| | end | `YYYY-MM` \| `present` | ✅ |
| | stack | string[] | ✅ |
| | relatedProjects | slug[] | optional |
| | order | number | ✅ |
| | body (หน้าที่หลัก 3–5 ข้อ) | markdown | ✅ |
| **education** | university, faculty, major | string | ✅ |
| | graduationYear | number | ✅ |
| | gpa | number (0–4) | ✅ |
| **projects** | slug (มาจากชื่อไฟล์), title, summary | string | ✅ |
| | type | `work` \| `academic` \| `side` | ✅ |
| | period | string | ✅ |
| | stack | string[] | ✅ |
| | cover, images[] | path | optional |
| | slidesPdf, github | path / url | optional |
| | order | number | ✅ |
| | body: หัวข้อ Business Context / My Role / Approach / Results / Lessons Learned | markdown | ✅ |
| **certificates** | name, issuer, date | string | ✅ (ถ้ามีไฟล์) |
| | verifyUrl | url | optional |

**Relation:** experience.relatedProjects → projects.slug (ตรวจตอน Build ว่า slug มีอยู่จริง) 💡
**สิทธิ์:** ทุกคนอ่านได้ (Public) · Owner แก้ได้ผ่าน Git · ประวัติการแก้ไขเก็บใน Git History ✅

---

## 11. API Specification

**ไม่มี API / Backend** ✅ ทุกหน้าสร้างเป็นไฟล์ Static ตอน Build

---

## 12. Authentication

**ไม่มี** (ไม่มี Login, Register หรือ Session) ✅

## 13. Authorization

- Visitor: อ่านอย่างเดียว ✅
- Owner: สิทธิ์ Write บน GitHub Repo (จัดการผ่าน GitHub) ✅
- 💡 เปิด Branch Protection บน `main` (ต้องให้ Build ผ่านก่อน Merge) — ไม่บังคับ

---

## 14. Security

| Requirement | สถานะ |
|---|---|
| `<meta name="robots" content="noindex, nofollow">` ทุกหน้า + `robots.txt` Disallow ทั้งหมด | ✅ |
| HTTPS (GitHub Pages บังคับให้) | 💡 |
| ไม่มี Secret / API Key ใน Repo Public | 💡 |
| CSP ผ่าน `<meta>` เท่าที่ GitHub Pages รองรับ (ตั้ง Header เองไม่ได้) | 🟡 ทำเท่าที่ได้ |
| ลิงก์ภายนอกใช้ `rel="noopener noreferrer"` | 💡 |
| ⚠️ ยอมรับว่าเบอร์โทร/LINE เป็น Public ทั้งบนเว็บและใน Repo | ✅ (ผู้ใช้รับทราบความเสี่ยง) |
| ไม่มี Analytics และไม่เก็บข้อมูลคนดู จึงไม่ต้องมี Cookie Banner | ✅ |
| ตรวจไฟล์ PDF/ภาพก่อนเผยแพร่ (ลบ Metadata และข้อมูลภายในบริษัท) | 💡 |

---

## 15. Integrations

| บริการ | การใช้งาน | สถานะ |
|---|---|---|
| GitHub (Repo + Pages + Actions) | เก็บโค้ด, Hosting, CI/CD | ✅ |
| Analytics | ไม่ใช้ | ✅ |
| Contact Form Service | ไม่ใช้ | ✅ |
| อื่น ๆ | ไม่มี | ✅ |

---

## 16. Responsive Requirements ✅

| Breakpoint | Layout |
|---|---|
| Mobile ≥ 320px | 1 คอลัมน์, Hamburger, ไม่มี Scroll แนวนอน, ปุ่มกดง่าย (≥ 44px) |
| Tablet ≥ 768px | 2 คอลัมน์สำหรับ Card โปรเจกต์/Skills |
| Desktop ≥ 1024px | Navbar เต็ม, ความกว้างเนื้อหาสูงสุด ~1100px |

- ชื่อยาว, Tag และ URL ต้องตัดบรรทัดได้ ✅
- รองรับข้อความ TH/EN ที่ยาวไม่เท่ากัน ✅

---

## 17. Error & Edge Cases ✅

| # | กรณี | วิธีจัดการ |
|---|---|---|
| 1 | Frontmatter ผิดหรือขาด Field | Build ไม่ผ่าน + Error บอกไฟล์/Field · เว็บเดิมยังออนไลน์ |
| 2 | ไม่มีข้อมูลในบางส่วน | ซ่อนส่วนนั้นและลิงก์ในเมนู |
| 3 | URL ผิด / โปรเจกต์ถูกลบ | หน้า 404 |
| 4 | ภาพหรือ PDF โหลดไม่ได้ | แสดงข้อความแทน และ Layout ไม่พัง |
| 5 | เน็ตช้าบนมือถือ | บีบอัดภาพ, Lazy Load, กำหนดขนาดภาพล่วงหน้า |
| 6 | จอเล็ก 320px | ไม่มี Scroll แนวนอน และข้อความตัดบรรทัดได้ |
| 7 | ข้อความ TH/EN ยาวไม่เท่ากัน | Layout ยืดหยุ่น |
| 8 | โปรเจกต์แรก/สุดท้าย | ซ่อนปุ่ม Previous/Next |
| 9 | ปิด JavaScript | เนื้อหายังอ่านได้ แต่สลับธีม/ภาษาไม่ได้ |
| 10 | Reduce Motion | ปิด Animation |
| 11 | Dark Mode กระพริบตอนโหลด | ตั้งธีมก่อนแสดงผลหน้า |

---

## 18. MVP Scope ✅

- Home: Hero, About, Experience, Projects, Skills, Education, Contact
- Case Study 3–4 ชิ้น + หน้า 404
- Download Resume PDF
- Responsive ทุกอุปกรณ์
- Dark/Light Mode
- เนื้อหาจาก Markdown + ตรวจข้อมูลตอน Build
- noindex + Deploy อัตโนมัติขึ้น GitHub Pages
- README สำหรับ Owner (วิธีเพิ่มหรือแก้เนื้อหา)

## 19. Future Scope ✅

**V2**
- สลับภาษา TH/EN
- ส่วน Certificates (เมื่อมีข้อมูล)
- ซ่อนเบอร์โทร/LINE จนกว่าจะกด "แสดง"

**V3**
- จุดเชิง Data ของ Side Project (เช่น Pipeline ดึงข้อมูล GitHub มาแสดง) 💡
- Custom Domain (มีค่าใช้จ่ายรายปี) 💡

---

## 20. Technology Stack

| ส่วน | เทคโนโลยี | สถานะ |
|---|---|---|
| Framework | **Next.js (Static Export, `output: 'export'`)** | ✅ |
| Hosting | **GitHub Pages** (ฟรี) | ✅ |
| Repo | **บัญชี GitHub ของแฟน**, ชื่อ Repo เช่น `portfolio` → `https://<username>.github.io/portfolio` | ✅ (username และชื่อ Repo จริง 🟡) |
| CI/CD | GitHub Actions (ตรวจข้อมูล → Build → Deploy) | 💡 |
| Language | TypeScript | 💡 |
| Styling | Tailwind CSS | 💡 |
| Markdown | `gray-matter` + `remark` / `rehype` | 💡 |
| ตรวจข้อมูล | `zod` | 💡 |
| ธีม | `next-themes` หรือสคริปต์ตั้งธีมก่อนแสดงผล | 💡 |
| i18n (V2) | สลับภาษาฝั่ง Client + localStorage (Static Export ใช้ i18n Routing ไม่ได้) | 💡 |
| `basePath` | ตั้งค่าเดียวให้ตรงกับชื่อ Repo (เปลี่ยนภายหลังได้) | 💡 |
| ภาพ | `next/image` แบบ `unoptimized` (Static Export) + บีบอัดภาพก่อนใส่ | 💡 |
| งบประมาณ | 0 บาท | ✅ |

---

## 21. Development Roadmap 💡

| Phase | งาน |
|---|---|
| 1. Setup | สร้างโปรเจกต์ Next.js + TypeScript + Tailwind, ตั้งค่า Static Export / basePath / noindex |
| 2. Content Layer | โครงสร้าง `content/`, Schema (zod), ตัวอ่าน Markdown, ข้อมูลตัวอย่าง |
| 3. Design System | สี, ฟอนต์, ธีม Dark/Light, Component พื้นฐาน (Button, Tag, Card, Section) |
| 4. Home | Navbar + Hamburger, Hero, About, Experience Timeline, Projects, Skills, Education, Contact |
| 5. Case Study + 404 | หน้าโปรเจกต์, Previous/Next, ปุ่มสไลด์/GitHub |
| 6. CI/CD | GitHub Actions: ตรวจข้อมูล → Build → Deploy ขึ้น Pages |
| 7. QA | Responsive (320 → Desktop), Edge Cases, Lighthouse (Performance / Accessibility), ตรวจ noindex |
| 8. Handover | README สำหรับ Owner: วิธีเพิ่มโปรเจกต์ แก้ข้อมูล และ Run บนเครื่อง |
| V2 | TH/EN, Certificates, ซ่อนเบอร์/LINE |

---

## 🟡 รายการที่ยังรอตัดสินใจ

| # | เรื่อง | กระทบ MVP? |
|---|---|---|
| 1 | User Flow A / B / C | ไม่กระทบโครงสร้าง |
| 2 | ใช้คำอธิบายประเภทบริษัทแทนชื่อบริษัทหรือไม่ | ไม่กระทบ (Field optional) |
| 3 | ภาพ Flow แบบทั่วไปสำหรับงานจากที่ทำงาน | ไม่กระทบ (Field optional) |
| 4 | Resume PDF ใส่ชื่อบริษัทหรือไม่ / ไฟล์พร้อมหรือยัง | ต้องมีไฟล์ก่อนเปิดใช้เว็บ |
| 5 | ฟอนต์ | ไม่กระทบโครงสร้าง |
| 6 | GitHub username ของแฟน และชื่อ Repo จริง | กระทบ `basePath` (แก้ค่าเดียว) |
| 7 | รายการ 💡 Suggested ทั้งหมด | ต้องยืนยันก่อนเริ่มพัฒนา |

---

## Change Log

### 2026-10-01 — Change Request #1
| # | Requirement | สถานะ |
|---|---|---|
| 1 | ตัดตัวเลขหน้าหัวข้อแต่ละส่วน (01., 02., …) | ✅ Confirmed · ทำแล้ว |
| 2 | Soft Skills แสดงเป็น Tag ในส่วน Skills (หมวด "Soft Skills") | ✅ Confirmed · ทำแล้ว |
| 3 | แต่ละโปรเจกต์มีรูปได้หลายรูป (Gallery: `images` พร้อม `alt` / `caption`) | ✅ Confirmed · ทำแล้ว |
| 4 | ภาพปกอัตโนมัติจาก Tech Stack เมื่อโปรเจกต์ไม่มีรูป (ไม่มีข้อมูลจริง จึงไม่ละเมิดข้อห้ามเรื่องความลับ) | 💡 Suggested · ทำแล้ว |
| 5 | ใช้รูปโปรไฟล์เดิม + รูปเพิ่มเติมเพื่อบอกตัวตน | 🟡 Pending (รอเลือกตำแหน่ง) |
| 6 | ร่าง Content จากข้อมูลจริง | 🟡 รอข้อมูลจากผู้ใช้ |

### 2026-10-03 — Change Request #2
| # | Requirement | สถานะ |
|---|---|---|
| 1 | หน้าแรกกระชับขึ้น (แทนข้อเดิม "แสดงทุกส่วนเต็ม"): About ย่อพร้อม "Read more" · Experience เป็นการ์ดย่อที่กดขยายหน้าที่หลัก · Skills เป็นแถวเดียวต่อหมวด · Education + Contact อยู่แถวเดียวกัน | ✅ Confirmed · ทำแล้ว |
| 2 | Animation ระดับปานกลาง (แทนข้อเดิม "น้อย"): Fade ขึ้นเมื่อเลื่อนถึง, การ์ดโผล่ทีละใบ, Hero เข้ามาทีละบรรทัด, Glow ลอยช้า ๆ, จุดข้อมูลวิ่งบน Pipeline ของภาพปก, Hover ลื่นขึ้น · รองรับ Reduce Motion และแสดงครบเมื่อไม่มี JavaScript | ✅ Confirmed · ทำแล้ว |
| 3 | Certificates (เมื่อมีข้อมูล) ย้ายไปอยู่ก่อนแถว Education + Contact | 💡 Suggested · ผลจากข้อ 1 |
| 4 | เนื้อหาจริงที่ใส่เข้ามามีชื่อบริษัทและตัวเลขผลลัพธ์ | ✅ Resolved ใน Change Request #4 |

### 2026-10-03 — Change Request #3
| # | Requirement | สถานะ |
|---|---|---|
| 1 | About Me แสดงข้อความเต็ม ไม่ย่อ (ยกเลิก "Read more") | ✅ Confirmed · ทำแล้ว |
| 2 | โลโก้ที่ทำงาน (Experience) และมหาวิทยาลัย (Education) ผ่าน Field `logo` · ไม่มีไฟล์ → แสดงตัวย่อ | ✅ Confirmed · ทำแล้ว |
| 3 | เปิดเผยชื่อบริษัทได้ (ยกเลิกข้อห้ามเดิมเรื่องชื่อบริษัท) | ✅ Confirmed (จากคำขอใส่โลโก้ที่ทำงาน) |
| 4 | ตัวเลขผลลัพธ์ในงานจากที่ทำงาน | ✅ Resolved ใน Change Request #4 |

### 2026-10-03 — Change Request #4
| # | Requirement | สถานะ |
|---|---|---|
| 1 | เปิดเผยตัวเลขผลลัพธ์ในงานจากที่ทำงานได้ (ยกเลิกข้อห้ามเดิม) | ✅ Confirmed |
| 2 | ไอคอนช่องทางติดต่อใช้โทนม่วงชุดเดียวกันทั้งหมด (แทนสีประจำแบรนด์) | ✅ Confirmed · ทำแล้ว |
| 3 | Architecture Diagram ของระบบจริงของบริษัท ยังคงไม่แสดง (ไม่ได้ถูกยกเลิก) | ✅ คงเดิม |

### 2026-10-03 — Change Request #5 (Redesign ตามภาพอ้างอิง)
| # | Requirement | สถานะ |
|---|---|---|
| 1 | Hero: พื้นมืดมีแสงสีที่มุม, "Hello, I'm" + ชื่อ 2 บรรทัด, ตำแหน่ง + คำที่พิมพ์สลับ (`roles`), ไอคอนโซเชียล, ปุ่ม View Projects / Contact Me, การ์ดรูปโปรไฟล์ | ✅ ทำแล้ว |
| 2 | About: การ์ดมีกรอบ, รูปแบบป้ายห้อยคอแกว่งเบา ๆ, ตัวเลขสำคัญ (Years experience คำนวณอัตโนมัติ + `stats`), Education, ปุ่ม Download CV | ✅ ทำแล้ว |
| 3 | Experience: Timeline + โลโก้, 3 ข้อแรกแสดงตลอด, ข้อที่เหลืออยู่ใน Dropdown "View details" | ✅ ทำแล้ว |
| 4 | หน้า Case Study: ซ้ายเป็นชื่อ คำอธิบาย ตัวเลข ปุ่ม และ Technologies ขวาเป็นสไลด์เลื่อนได้ ล่างเป็นการ์ด Business / My Role / Approach / Results / Lessons Learned | ✅ ทำแล้ว |
| 5 | Skills แยก 5.1 Technical (การ์ดหลายขนาด) และ 5.2 Soft Skills | ✅ ทำแล้ว · รายการ Soft Skills เป็น 💡 รอแฟนตรวจ |
| 6 | Contact: การ์ด "Let's talk data." + ช่องทางพร้อมไอคอน | ✅ ทำแล้ว |
| 7 | Education ย้ายไปอยู่ในการ์ด About (ไม่มีส่วนแยกแล้ว) | ✅ ทำแล้ว |
| 8 | ธีมมืดเป็นค่าเริ่มต้น (แทน "ตามการตั้งค่าอุปกรณ์") ยังสลับเป็นสว่างได้และจำค่าไว้ | ✅ ทำแล้ว |
| 9 | ฟอนต์ Plus Jakarta Sans (แทน Inter) | 💡 ทำแล้ว |
