async function getDashboardStats() {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  
  try {
    const [projectsRes, skillsRes, testimonialsRes, contactsRes] = await Promise.all([
      fetch(`${baseUrl}/api/projects`, { cache: 'no-store' }),
      fetch(`${baseUrl}/api/skills`, { cache: 'no-store' }),
      fetch(`${baseUrl}/api/testimonials`, { cache: 'no-store' }),
      fetch(`${baseUrl}/api/contact`, { cache: 'no-store' }),
    ]);

    const [projects, skills, testimonials, contacts] = await Promise.all([
      projectsRes.ok ? projectsRes.json() : { success: false, data: [] },
      skillsRes.ok ? skillsRes.json() : { success: false, data: [] },
      testimonialsRes.ok ? testimonialsRes.json() : { success: false, data: [] },
      contactsRes.ok ? contactsRes.json() : { success: false, data: [] },
    ]);

    return {
      projects: projects.success ? projects.data : [],
      skills: skills.success ? skills.data : [],
      testimonials: testimonials.success ? testimonials.data : [],
      contacts: contacts.success ? contacts.data : [],
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return {
      projects: [],
      skills: [],
      testimonials: [],
      contacts: [],
    };
  }
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  const cards = [
    {
      title: 'Projects',
      count: stats.projects.length,
      featured: stats.projects.filter((p: any) => p.featured).length,
      icon: '💼',
      href: '/admin/projects',
      color: 'bg-blue-500',
    },
    {
      title: 'Skills',
      count: stats.skills.length,
      featured: stats.skills.filter((s: any) => s.level === 'Expert' || s.level === 'Advanced').length,
      icon: '🛠️',
      href: '/admin/skills',
      color: 'bg-green-500',
    },
    {
      title: 'Testimonials',
      count: stats.testimonials.length,
      featured: stats.testimonials.filter((t: any) => t.featured).length,
      icon: '💬',
      href: '/admin/testimonials',
      color: 'bg-purple-500',
    },
    {
      title: 'Messages',
      count: stats.contacts.length,
      featured: stats.contacts.filter((c: any) => !c.isRead).length,
      icon: '📧',
      href: '/admin/contact',
      color: 'bg-orange-500',
    },
  ];

  return (
    <div style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text)' }}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold" style={{ color: 'var(--color-text)' }}>
          Dashboard
        </h1>
        <p className="mt-2" style={{ color: 'var(--color-subtext)' }}>
          Welcome to your portfolio admin panel. Here's an overview of your content.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card) => (
          <a
            key={card.title}
            href={card.href}
            className="rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border"
            style={{ backgroundColor: 'var(--color-background)', borderColor: 'var(--color-subtext)' }}
          >
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${card.color}`}>
                <span className="text-2xl">{card.icon}</span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold" style={{ color: 'var(--color-text)' }}>
                  {card.title}
                </h3>
                <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-subtext)' }}>
                  <span>Total: {card.count}</span>
                  {card.title === 'Messages' ? (
                    <span className="text-orange-600">
                      • Unread: {card.featured}
                    </span>
                  ) : card.title === 'Skills' ? (
                    <span className="text-green-600">
                      • Advanced+: {card.featured}
                    </span>
                  ) : (
                    <span style={{ color: '#00C3FF' }}>
                      • Featured: {card.featured}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Projects */}
        <div className="rounded-lg shadow-md p-6 border" style={{ backgroundColor: 'var(--color-background)', borderColor: 'var(--color-subtext)' }}>
          <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text)' }}>
            Recent Projects
          </h2>
          {stats.projects.length > 0 ? (
            <div className="space-y-3">
              {stats.projects.slice(0, 5).map((project: any) => (
                <div key={project._id} className="flex items-center justify-between py-2 border-b last:border-b-0" style={{ borderColor: 'var(--color-subtext)' }}>
                  <div>
                    <h3 className="font-medium" style={{ color: 'var(--color-text)' }}>
                      {project.title}
                    </h3>
                    <p className="text-sm" style={{ color: 'var(--color-subtext)' }}>
                      {project.techStack.slice(0, 2).join(', ')}
                      {project.techStack.length > 2 && ` +${project.techStack.length - 2} more`}
                    </p>
                  </div>
                  {project.featured && (
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                      Featured
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--color-subtext)' }}>No projects yet</p>
          )}
        </div>

        {/* Recent Messages */}
        <div className="rounded-lg shadow-md p-6 border" style={{ backgroundColor: 'var(--color-background)', borderColor: 'var(--color-subtext)' }}>
          <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text)' }}>
            Recent Messages
          </h2>
          {stats.contacts.length > 0 ? (
            <div className="space-y-3">
              {stats.contacts.slice(0, 5).map((contact: any) => (
                <div key={contact._id} className="flex items-start justify-between py-2 border-b last:border-b-0" style={{ borderColor: 'var(--color-subtext)' }}>
                  <div className="flex-1">
                    <h3 className="font-medium" style={{ color: 'var(--color-text)' }}>
                      {contact.name}
                    </h3>
                    <p className="text-sm mb-1" style={{ color: 'var(--color-subtext)' }}>
                      {contact.subject}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--color-subtext)' }}>
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  {!contact.isRead && (
                    <span className="px-2 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(0,195,255,0.1)', color: '#00C3FF' }}>
                      New
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--color-subtext)' }}>No messages yet</p>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 rounded-lg p-6" style={{ backgroundColor: 'rgba(0,0,0,0.05)' }}>
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text)' }}>
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            href="/admin/projects"
            className="rounded-lg p-4 text-center hover:shadow-md transition-shadow border"
            style={{ backgroundColor: 'var(--color-background)', borderColor: 'var(--color-subtext)' }}
          >
            <div className="text-2xl mb-2">➕</div>
            <div className="font-medium" style={{ color: 'var(--color-text)' }}>Add Project</div>
          </a>
          <a
            href="/admin/skills"
            className="rounded-lg p-4 text-center hover:shadow-md transition-shadow border"
            style={{ backgroundColor: 'var(--color-background)', borderColor: 'var(--color-subtext)' }}
          >
            <div className="text-2xl mb-2">🔧</div>
            <div className="font-medium" style={{ color: 'var(--color-text)' }}>Add Skill</div>
          </a>
          <a
            href="/admin/about"
            className="rounded-lg p-4 text-center hover:shadow-md transition-shadow border"
            style={{ backgroundColor: 'var(--color-background)', borderColor: 'var(--color-subtext)' }}
          >
            <div className="text-2xl mb-2">✏️</div>
            <div className="font-medium" style={{ color: 'var(--color-text)' }}>Edit About</div>
          </a>
          <a
            href="/admin/contact"
            className="rounded-lg p-4 text-center hover:shadow-md transition-shadow border"
            style={{ backgroundColor: 'var(--color-background)', borderColor: 'var(--color-subtext)' }}
          >
            <div className="text-2xl mb-2">📬</div>
            <div className="font-medium" style={{ color: 'var(--color-text)' }}>View Messages</div>
          </a>
        </div>
      </div>
    </div>
  );
}

