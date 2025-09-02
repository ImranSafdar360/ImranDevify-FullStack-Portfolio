import Link from 'next/link';

async function getAboutInfo() {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/about`, {
      cache: 'no-store'
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error('Error fetching about info:', error);
    return null;
  }
}

async function getSkills() {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/skills`, {
      cache: 'no-store'
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching skills:', error);
    return [];
  }
}

export default async function AboutPage() {
  const [aboutInfo, skills] = await Promise.all([
    getAboutInfo(),
    getSkills()
  ]);

  const topSkills = skills.filter((skill: any) => 
    skill.level === 'Expert' || skill.level === 'Advanced'
  ).slice(0, 8);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                About Me
              </h1>
              {aboutInfo ? (
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                    {aboutInfo.bio}
                  </p>
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      Experience
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {aboutInfo.experience}
                    </p>
                  </div>
                  {aboutInfo.cvUrl && (
                    <div className="flex gap-4">
                      <a
                        href={aboutInfo.cvUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download CV
                      </a>
                      <Link
                        href="/contact"
                        className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-lg font-medium transition-colors"
                      >
                        Get In Touch
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-gray-600 dark:text-gray-300">
                  <p className="text-lg mb-6">
                    I'm a passionate full-stack developer with expertise in modern web technologies. 
                    I love creating innovative solutions and building exceptional digital experiences.
                  </p>
                  <p className="mb-8">
                    With years of experience in web development, I specialize in React, Next.js, 
                    Node.js, and MongoDB. I'm always learning and staying up-to-date with the latest 
                    technologies and best practices.
                  </p>
                  <div className="flex gap-4">
                    <Link
                      href="/contact"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      Get In Touch
                    </Link>
                    <Link
                      href="/projects"
                      className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      View My Work
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            <div className="text-center">
              {aboutInfo?.profileImageUrl ? (
                <img
                  src={aboutInfo.profileImageUrl}
                  alt="Imran Safdar"
                  className="w-64 h-64 rounded-full object-cover mx-auto shadow-xl"
                />
              ) : (
                <div className="w-64 h-64 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 mx-auto shadow-xl flex items-center justify-center">
                  <span className="text-4xl font-bold text-white">IS</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Top Skills */}
      {topSkills.length > 0 && (
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Core Expertise
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Technologies I'm most proficient with
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {topSkills.map((skill: any) => (
                <div key={skill._id} className="bg-white dark:bg-gray-900 rounded-lg p-6 text-center hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {skill.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    {skill.category}
                  </p>
                  <span className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full">
                    {skill.level}
                  </span>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/skills"
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
              >
                View All Skills
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Social Links */}
      {aboutInfo?.socialLinks && (
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Let's Connect
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Find me on these platforms
            </p>
            <div className="flex justify-center space-x-6">
              {aboutInfo.socialLinks.github && (
                <a
                  href={aboutInfo.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                >
                  <span className="sr-only">GitHub</span>
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              )}
              {aboutInfo.socialLinks.linkedin && (
                <a
                  href={aboutInfo.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                >
                  <span className="sr-only">LinkedIn</span>
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              )}
              {aboutInfo.socialLinks.twitter && (
                <a
                  href={aboutInfo.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                >
                  <span className="sr-only">Twitter</span>
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              )}
              {aboutInfo.socialLinks.website && (
                <a
                  href={aboutInfo.socialLinks.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                >
                  <span className="sr-only">Website</span>
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-blue-600 dark:bg-blue-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Interested in working together?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            I'm always open to discussing new opportunities and interesting projects.
          </p>
          <Link
            href="/contact"
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-medium transition-colors inline-block"
          >
            Contact Me
          </Link>
        </div>
      </section>
    </div>
  );
}

