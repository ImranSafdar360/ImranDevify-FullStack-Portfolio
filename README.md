# 🚀 Imran Safdar - Portfolio

A **full-stack developer portfolio** built with **Next.js (App Router)**, **MongoDB**, and **NextAuth**. This portfolio is not just static pages — it is a **CMS-style app** where you can dynamically manage your **projects, skills, about, testimonials, blog, and contact messages** from a secure admin dashboard.

![Next.js](https://img.shields.io/badge/Next.js-15.4.6-black)
![React](https://img.shields.io/badge/React-19.1.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-blue)

## ✨ Features

- **🎨 Dynamic Frontend**: All content (projects, skills, about, testimonials, contact) comes from MongoDB
- **🔐 Admin Dashboard**: CRUD operations for all sections with secure authentication
- **🛡️ Authentication**: NextAuth with credentials provider and protected admin routes
- **📧 Contact System**: Messages stored in DB with admin management
- **📱 Responsive UI**: Built with TailwindCSS for modern, mobile-first design
- **⚡ Performance**: Optimized with Next.js App Router and server components
- **🌙 Dark Mode**: Automatic dark/light mode support
- **📊 Analytics Ready**: Built-in structure for analytics integration

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, TailwindCSS
- **Backend**: Next.js API Routes, MongoDB, Mongoose
- **Authentication**: NextAuth.js with credentials provider
- **Validation**: Zod for schema validation
- **Forms**: React Hook Form for form handling
- **Deployment**: Vercel-ready with MongoDB Atlas

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- MongoDB database (local or MongoDB Atlas)
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/imran-safdar/portfolio.git
cd portfolio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://your-username:your-password@cluster0.mongodb.net/portfolio?retryWrites=true&w=majority

# NextAuth Configuration
NEXTAUTH_SECRET=your-super-long-random-secret-key-here-minimum-32-characters
NEXTAUTH_URL=http://localhost:3000

# Admin Credentials (for initial setup)
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your-secure-password-here
```

### 4. Database Setup

Run the setup script to initialize your database with sample data:

```bash
node scripts/setup.js
```

This will create:
- ✅ Admin user account
- ✅ Sample projects
- ✅ Sample skills
- ✅ Sample about information
- ✅ Sample testimonials

### 5. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your portfolio!

### 6. Access Admin Dashboard

1. Go to [http://localhost:3000/login](http://localhost:3000/login)
2. Login with your admin credentials (from `.env.local`)
3. Access the admin dashboard at [http://localhost:3000/admin](http://localhost:3000/admin)

## 📂 Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (public)/          # Public pages
│   │   │   ├── page.tsx       # Home page
│   │   │   ├── about/         # About page
│   │   │   ├── projects/      # Projects listing
│   │   │   ├── skills/        # Skills page
│   │   │   ├── testimonials/  # Testimonials page
│   │   │   └── contact/       # Contact form
│   │   ├── admin/             # 🔒 Admin dashboard
│   │   │   ├── page.tsx       # Dashboard home
│   │   │   ├── projects/      # Manage projects
│   │   │   ├── skills/        # Manage skills
│   │   │   ├── testimonials/  # Manage testimonials
│   │   │   ├── about/         # Manage about
│   │   │   └── contact/       # View messages
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # NextAuth
│   │   │   ├── projects/      # Projects CRUD
│   │   │   ├── skills/        # Skills CRUD
│   │   │   ├── testimonials/  # Testimonials CRUD
│   │   │   ├── about/         # About CRUD
│   │   │   └── contact/       # Contact CRUD
│   │   ├── login/             # Login page
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global styles
│   ├── components/            # Reusable components
│   │   ├── Navbar.tsx         # Navigation
│   │   ├── Footer.tsx         # Footer
│   │   ├── ProjectCard.tsx    # Project card
│   │   ├── SkillCard.tsx      # Skill card
│   │   ├── TestimonialCard.tsx # Testimonial card
│   │   └── FormInput.tsx      # Form components
│   ├── lib/                   # Utilities
│   │   ├── db.ts              # MongoDB connection
│   │   ├── auth.ts            # NextAuth config
│   │   └── validators.ts      # Zod schemas
│   ├── models/                # Mongoose models
│   │   ├── User.ts            # User model
│   │   ├── Project.ts         # Project model
│   │   ├── Skill.ts           # Skill model
│   │   ├── About.ts           # About model
│   │   ├── Testimonial.ts     # Testimonial model
│   │   └── Contact.ts         # Contact model
│   └── middleware.ts          # Route protection
├── scripts/
│   └── setup.js               # Database setup script
├── public/                    # Static assets
└── package.json               # Dependencies
```

## 🔧 Configuration

### MongoDB Setup

1. **Local MongoDB**: Install MongoDB locally or use Docker
2. **MongoDB Atlas**: Create a free cluster at [mongodb.com](https://www.mongodb.com/cloud/atlas)
3. Update `MONGODB_URI` in `.env.local`

### NextAuth Setup

1. Generate a secure secret: `openssl rand -base64 32`
2. Update `NEXTAUTH_SECRET` in `.env.local`
3. For production, update `NEXTAUTH_URL` to your domain

### Admin User

The setup script creates an admin user with the credentials from your `.env.local` file. You can also create additional admin users through the database or by modifying the setup script.

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your GitHub repo to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

```env
MONGODB_URI=your-production-mongodb-uri
NEXTAUTH_SECRET=your-production-secret
NEXTAUTH_URL=https://your-domain.com
ADMIN_EMAIL=your-admin-email
ADMIN_PASSWORD=your-admin-password
```

## 📡 API Endpoints

### Public Endpoints
- `GET /api/projects` - Get all projects
- `GET /api/skills` - Get all skills  
- `GET /api/testimonials` - Get all testimonials
- `GET /api/about` - Get about information
- `POST /api/contact` - Send contact message

### Protected Endpoints (Admin Only)
- `POST /api/projects` - Create project
- `PUT /api/projects/[id]` - Update project
- `DELETE /api/projects/[id]` - Delete project
- *(Similar CRUD operations for skills, testimonials, about)*
- `GET /api/contact` - Get all messages
- `PUT /api/contact/[id]` - Mark message as read

## 🎨 Customization

### Styling
- Edit `src/app/globals.css` for global styles
- Modify TailwindCSS classes in components
- Update color scheme in CSS variables

### Content
- Use the admin dashboard to manage content
- Or directly modify the database through scripts

### Features
- Add new models in `src/models/`
- Create corresponding API routes
- Build admin pages for management

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Vercel](https://vercel.com/) for seamless deployment
- [MongoDB](https://www.mongodb.com/) for the database
- [TailwindCSS](https://tailwindcss.com/) for the styling system

## 📞 Support

If you have any questions or need help setting up the project, feel free to:

- Open an issue on GitHub
- Contact me at [your-email@example.com]
- Connect with me on [LinkedIn](https://linkedin.com/in/imran-safdar)

---

**⭐ If you found this project helpful, please give it a star!**
