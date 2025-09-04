import bcrypt from 'bcrypt';
import connectDB from './db';
import User from '../models/User';
import Project from '../models/Project';
import Skill from '../models/Skill';
import About from '../models/About';
import Testimonial from '../models/Testimonial';

export async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');

    await connectDB();
    console.log('✅ Connected to MongoDB');

    // Create admin user
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword: string | undefined = process.env.ADMIN_PASSWORD;
    if (!adminEmail || !adminPassword) {
      throw new Error('Admin email or password is not set');
    }

    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(adminPassword!, 12);
      await User.create({
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
      });
      console.log(`✅ Admin user created: ${adminEmail}`);
    } else {
      console.log('⚠️  Admin user already exists');
    }

    // Seed About information
    const existingAbout = await About.findOne();
    if (!existingAbout) {
      await About.create({
        bio: "I'm a passionate full-stack developer with expertise in modern web technologies. I love creating innovative solutions and building exceptional digital experiences that make a difference in people's lives.",
        experience: "Over 5 years of experience in web development, specializing in React, Next.js, Node.js, and MongoDB. I've worked with startups and established companies to build scalable web applications, deliver high-quality software solutions, and mentor junior developers.",
        cvUrl: "https://example.com/cv.pdf",
        profileImageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
        socialLinks: {
          github: "https://github.com/imran-safdar",
          linkedin: "https://linkedin.com/in/imran-safdar",
          twitter: "https://twitter.com/imran_safdar",
          website: "https://imran-safdar.com",
        },
      });
      console.log('✅ About information seeded');
    }

    // Seed Skills
    const existingSkills = await Skill.countDocuments();
    if (existingSkills === 0) {
      const skills = [
        // Frontend
        { name: 'React', level: 'Expert', category: 'Frontend', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
        { name: 'Next.js', level: 'Expert', category: 'Frontend', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
        { name: 'TypeScript', level: 'Advanced', category: 'Frontend', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
        { name: 'JavaScript', level: 'Expert', category: 'Frontend', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
        { name: 'HTML5', level: 'Expert', category: 'Frontend', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
        { name: 'CSS3', level: 'Advanced', category: 'Frontend', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
        { name: 'TailwindCSS', level: 'Expert', category: 'Frontend', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg' },
        { name: 'Vue.js', level: 'Intermediate', category: 'Frontend', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },

        // Backend
        { name: 'Node.js', level: 'Advanced', category: 'Backend', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
        { name: 'Express.js', level: 'Advanced', category: 'Backend', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
        { name: 'Python', level: 'Intermediate', category: 'Backend', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
        { name: 'PHP', level: 'Intermediate', category: 'Backend', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },

        // Database
        { name: 'MongoDB', level: 'Advanced', category: 'Database', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
        { name: 'PostgreSQL', level: 'Intermediate', category: 'Database', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
        { name: 'MySQL', level: 'Intermediate', category: 'Database', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
        { name: 'Redis', level: 'Beginner', category: 'Database', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },

        // DevOps
        { name: 'Docker', level: 'Intermediate', category: 'DevOps', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
        { name: 'AWS', level: 'Intermediate', category: 'DevOps', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg' },
        { name: 'Vercel', level: 'Advanced', category: 'DevOps' },
        { name: 'Nginx', level: 'Beginner', category: 'DevOps', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg' },

        // Tools
        { name: 'Git', level: 'Advanced', category: 'Tools', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
        { name: 'VS Code', level: 'Expert', category: 'Tools', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
        { name: 'Figma', level: 'Intermediate', category: 'Tools', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
        { name: 'Postman', level: 'Advanced', category: 'Tools' },
      ];

      await Skill.insertMany(skills);
      console.log(`✅ ${skills.length} skills seeded`);
    }

    // Seed Projects
    const existingProjects = await Project.countDocuments();
    if (existingProjects === 0) {
      const projects = [
        {
          title: 'E-Commerce Platform',
          description: 'A comprehensive full-stack e-commerce platform built with Next.js and MongoDB. Features include user authentication, product management, shopping cart functionality, payment integration with Stripe, order tracking, and an admin dashboard for inventory management.',
          techStack: ['Next.js', 'React', 'MongoDB', 'Node.js', 'Stripe', 'TailwindCSS', 'NextAuth'],
          githubUrl: 'https://github.com/imran-safdar/ecommerce-platform',
          liveUrl: 'https://ecommerce-platform-demo.vercel.app',
          imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
          featured: true,
        },
        {
          title: 'Task Management System',
          description: 'A collaborative project management application with real-time updates, team collaboration features, task tracking, deadline management, and progress visualization. Built with modern web technologies and WebSocket for live updates.',
          techStack: ['React', 'Node.js', 'Socket.io', 'PostgreSQL', 'Express.js', 'Material-UI'],
          githubUrl: 'https://github.com/imran-safdar/task-manager',
          liveUrl: 'https://task-manager-demo.herokuapp.com',
          imageUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
          featured: true,
        },
        {
          title: 'Weather Dashboard',
          description: 'A responsive weather dashboard that displays current weather conditions, 7-day forecasts, and historical weather data for multiple cities. Features beautiful data visualizations, location-based weather, and weather alerts.',
          techStack: ['React', 'Chart.js', 'OpenWeather API', 'CSS3', 'Local Storage'],
          githubUrl: 'https://github.com/imran-safdar/weather-dashboard',
          liveUrl: 'https://weather-dashboard-demo.netlify.app',
          imageUrl: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=600&fit=crop',
          featured: true,
        },
        {
          title: 'Social Media Analytics',
          description: 'A comprehensive analytics dashboard for social media managers to track engagement, follower growth, and content performance across multiple platforms. Includes automated reporting and insights generation.',
          techStack: ['Vue.js', 'Python', 'Django', 'PostgreSQL', 'Chart.js', 'Social Media APIs'],
          githubUrl: 'https://github.com/imran-safdar/social-analytics',
          liveUrl: 'https://social-analytics-demo.vercel.app',
          imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
          featured: false,
        },
        {
          title: 'Recipe Sharing Platform',
          description: 'A community-driven platform where users can share, discover, and rate recipes. Features include recipe search, ingredient-based filtering, meal planning, and social features like comments and favorites.',
          techStack: ['Next.js', 'MongoDB', 'Cloudinary', 'NextAuth', 'TailwindCSS'],
          githubUrl: 'https://github.com/imran-safdar/recipe-platform',
          liveUrl: 'https://recipe-platform-demo.vercel.app',
          imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop',
          featured: false,
        },
        {
          title: 'Fitness Tracker App',
          description: 'A mobile-responsive fitness tracking application that helps users monitor their workouts, track progress, set goals, and maintain healthy habits. Includes workout plans and nutrition tracking.',
          techStack: ['React Native', 'Firebase', 'Chart.js', 'AsyncStorage'],
          githubUrl: 'https://github.com/imran-safdar/fitness-tracker',
          liveUrl: 'https://fitness-tracker-demo.netlify.app',
          imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
          featured: false,
        },
      ];

      await Project.insertMany(projects);
      console.log(`✅ ${projects.length} projects seeded`);
    }

    // Seed Testimonials
    const existingTestimonials = await Testimonial.countDocuments();
    if (existingTestimonials === 0) {
      const testimonials = [
        {
          clientName: 'Sarah Johnson',
          clientRole: 'Product Manager',
          clientCompany: 'TechCorp Inc.',
          message: 'Imran delivered exceptional work on our e-commerce platform. His attention to detail, technical expertise, and ability to understand our business requirements made the project a huge success. The platform exceeded our expectations and has significantly improved our online sales.',
          rating: 5,
          imageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
          featured: true,
        },
        {
          clientName: 'Michael Chen',
          clientRole: 'Startup Founder',
          clientCompany: 'InnovateLab',
          message: 'Working with Imran was a game-changer for our startup. He built our MVP quickly and efficiently, helping us launch ahead of schedule. His technical skills and problem-solving abilities are outstanding. I highly recommend him for any web development project.',
          rating: 5,
          imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
          featured: true,
        },
        {
          clientName: 'Emily Rodriguez',
          clientRole: 'Marketing Director',
          clientCompany: 'Digital Solutions',
          message: 'Imran created a beautiful and functional website for our digital marketing agency. The design is modern, the performance is outstanding, and the admin panel makes it easy for us to manage content. Great communication throughout the project.',
          rating: 4,
          imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
          featured: false,
        },
        {
          clientName: 'David Kim',
          clientRole: 'CTO',
          clientCompany: 'FinanceFlow',
          message: 'Imran helped us build a complex financial dashboard with real-time data visualization. His expertise in React and data handling was crucial to the project\'s success. The application is fast, secure, and user-friendly.',
          rating: 5,
          imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
          featured: false,
        },
        {
          clientName: 'Lisa Thompson',
          clientRole: 'Operations Manager',
          clientCompany: 'HealthTech Solutions',
          message: 'The task management system Imran built for our team has transformed how we work. The real-time collaboration features and intuitive interface have significantly improved our productivity. Excellent work and great support.',
          rating: 5,
          imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
          featured: true,
        },
      ];

      await Testimonial.insertMany(testimonials);
      console.log(`✅ ${testimonials.length} testimonials seeded`);
    }

    console.log('🎉 Database seeding completed successfully!');
    console.log(`📧 Admin login: ${adminEmail}`);
    console.log(`🔑 Admin password: ${adminPassword}`);
    
    return {
      success: true,
      adminEmail,
      adminPassword,
    };
    
  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    throw error;
  }
}

export default seedDatabase;
