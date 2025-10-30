
# 📖 Portfolio (Next.js + MongoDB + NextAuth)

A **full-stack developer portfolio** built with **Next.js (App Router)**, **MongoDB**, and **NextAuth**.  
This portfolio is not just static pages — it is a **CMS-style app** where you can dynamically manage your **projects, skills, about, testimonials, blog, and contact messages** from a secure admin dashboard.

---

## 🚀 Features
- **Dynamic Frontend**: All content (projects, skills, about, testimonials, blog, contact) comes from MongoDB.  
- **Admin Dashboard**: CRUD operations for all sections.  
- **Authentication**: NextAuth (credentials provider) with protected admin routes.  
- **Contact System**: Messages stored in DB + email notifications (optional).  
- **Responsive UI**: Built with TailwindCSS + shadcn/ui.  
- **Scalable**: Deployed on Vercel + MongoDB Atlas.

---

## 📂 Folder Structure

```
 ┣ app/
 ┃ ┣ (public)/
 ┃ ┃ ┣ page.tsx                # Landing (Home)
 ┃ ┃ ┣ about/page.tsx          # About page
 ┃ ┃ ┣ projects/page.tsx       # Projects listing
 ┃ ┃ ┣ skills/page.tsx         # Skills page
 ┃ ┃ ┣ testimonials/page.tsx   # Testimonials page
 ┃ ┃ ┗ contact/page.tsx        # Contact form
 ┃ ┣ admin/                    # 🔒 Admin dashboard
 ┃ ┃ ┣ layout.tsx
 ┃ ┃ ┣ page.tsx                # Dashboard Home
 ┃ ┃ ┣ projects/page.tsx       # Manage Projects
 ┃ ┃ ┣ skills/page.tsx         # Manage Skills
 ┃ ┃ ┣ testimonials/page.tsx   # Manage Testimonials
 ┃ ┃ ┣ about/page.tsx          # Manage About section
 ┃ ┃ ┗ contact/page.tsx        # View Contact Messages
 ┃ ┣ api/
 ┃ ┃ ┣ auth/[...nextauth]/route.ts   # NextAuth routes
 ┃ ┃ ┣ projects/route.ts             # GET/POST projects
 ┃ ┃ ┣ skills/route.ts               # GET/POST skills
 ┃ ┃ ┣ testimonials/route.ts         # GET/POST testimonials
 ┃ ┃ ┣ about/route.ts                # GET/POST about
 ┃ ┃ ┗ contact/route.ts              # GET/POST contact
 ┃ ┣ layout.tsx
 ┃ ┗ globals.css
 ┣ components/                 # UI components
 ┃ ┣ Navbar.tsx
 ┃ ┣ Footer.tsx
 ┃ ┣ ProjectCard.tsx
 ┃ ┣ SkillCard.tsx
 ┃ ┣ TestimonialCard.tsx
 ┃ ┗ FormInput.tsx
 ┣ lib/
 ┃ ┣ db.ts                     # MongoDB connection
 ┃ ┣ auth.ts                   # NextAuth config
 ┃ ┗ validators.ts             # Zod validation schemas
 ┣ models/
 ┃ ┣ User.ts
 ┃ ┣ Project.ts
 ┃ ┣ Skill.ts
 ┃ ┣ About.ts
 ┃ ┣ Testimonial.ts
 ┃ ┗ Contact.ts
 ┣ middleware.ts               # Protect /admin routes
 ┣ package.json
 ┣ tsconfig.json
 ┣ tailwind.config.ts
 ┗ .env.local         → Protect admin routes
```

---

## 🔑 Environment Variables
Create `.env.local`:
```env
MONGODB_URI=mongodb+srv://...
NEXTAUTH_SECRET=long_random_string
NEXTAUTH_URL=http://localhost:3000
```

---

## 🗄️ Models Overview

1. **User** → Admin login (email, password, role).  
2. **Project** → title, description, techStack, github, liveUrl, image.  
3. **Skill** → name, level, category.  
4. **About** → bio, experience, cv link.  
5. **Testimonial** → client name, role, message, image.  
6. **Contact** → name, email, message, createdAt.  

---

## 🔒 Authentication (NextAuth + Middleware)
- `/login` page → admin login form.  
- Middleware (`/middleware.ts`) protects all `/admin/*` routes.  
- Only authenticated users with role = `"admin"` can access dashboard.  

---

## 📡 API Endpoints

- `GET /api/projects` → fetch all projects  
- `POST /api/projects` → add project  
- `PUT /api/projects/:id` → update project  
- `DELETE /api/projects/:id` → delete project  

(Same pattern for skills, testimonials, about, contact)  

---

## 📌 Daily Development Workflow

### **Day 1–2: Setup**
- [ ] Init Next.js + Tailwind  
- [ ] Setup MongoDB connection (`lib/db.ts`)  
- [ ] Create models (User, Project, Skill, About, Testimonial, Contact)  
- [ ] Configure NextAuth (credentials login)  
- [ ] Deploy skeleton app on Vercel  

### **Day 3–4: Public Pages**
- [ ] Build Home (intro + featured projects + skills preview)  
- [ ] About page (static dummy content → later dynamic)  
- [ ] Projects page (list from API)  
- [ ] Skills page (grid of skills)  
- [ ] Contact page (form → POST API + save in DB)  

### **Day 5–6: Admin Dashboard**
- [ ] Protect `/admin` routes with middleware  
- [ ] Admin sidebar (Projects, Skills, Testimonials, About, Contact)  
- [ ] CRUD UI for Projects (list + form)  
- [ ] CRUD UI for Skills, Testimonials, About  
- [ ] Messages list (read-only for contact)  

### **Day 7–10: Polish**
- [ ] Add Testimonials carousel on public page  
- [ ] Add image upload (Cloudinary) for projects/testimonials  
- [ ] Add rich text editor (TipTap/EditorJS) for About + Blog  
- [ ] Add blog section (CMS-style posts)  
- [ ] SEO meta (Next.js Metadata API + OG images)  
- [ ] Framer Motion animations for smooth UX  

### **Day 11–14: Finishing**
- [ ] Add analytics (Plausible / Google Analytics)  
- [ ] Add dark/light mode toggle  
- [ ] Add case studies (explain projects in depth)  
- [ ] Custom domain + Vercel deployment  
- [ ] Share portfolio on LinkedIn & GitHub 🚀  

---

## 🌟 Final Functionality Concept

- Visitors can:  
  ✅ View your about, projects, skills, testimonials.  
  ✅ Send you messages from contact form.  
  ✅ Read blog/case studies.  

- You (Admin) can:  
  ✅ Log in securely with email + password.  
  ✅ Manage all content dynamically (no hardcoding).  
  ✅ View contact inquiries in dashboard.  
  ✅ Publish new blogs/case studies.  

---

## 🧠 Extra Tips
- Keep committing daily → show consistency on GitHub.  
- Blog at least 2 case studies → attracts real clients.  
- Showcase **both design (UI)** + **system architecture** in projects → looks pro.  
- Once portfolio is stable, reuse this setup for **client websites** (turn it into a mini-CMS).  



This is a production-ready base for your portfolio as a full‑stack Next.js app with MongoDB. It includes:

Next.js (App Router, TypeScript, ESLint)

TailwindCSS

MongoDB via Mongoose with hot‑reload safe connection helper

API Route Handlers (CRUD example)

Auth via NextAuth (Auth.js v5) — Credentials-ready; easy to add OAuth

Input validation with Zod

Env validation with @t3-oss/env-nextjs

Logging with pino

app + MongoDB

GitHub Actions CI (typecheck, lint, build)

Secure headers + middleware