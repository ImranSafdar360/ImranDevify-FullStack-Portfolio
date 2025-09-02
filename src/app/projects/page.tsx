import ProjectCard from '../../components/ProjectCard';

async function getProjects() {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/projects`, {
      cache: 'no-store'
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            My Projects
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A collection of projects I've worked on, showcasing my skills in full-stack development, 
            UI/UX design, and problem-solving.
          </p>
        </div>

        {projects.length > 0 ? (
          <>
            {/* Featured Projects */}
            {projects.some((project: any) => project.featured) && (
              <div className="mb-16">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                  Featured Projects
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects
                    .filter((project: any) => project.featured)
                    .map((project: any) => (
                      <ProjectCard key={project._id} project={project} />
                    ))}
                </div>
              </div>
            )}

            {/* All Projects */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                {projects.some((project: any) => project.featured) ? 'All Projects' : 'Projects'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project: any) => (
                  <ProjectCard key={project._id} project={project} />
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <svg
                className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No projects yet
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Projects will appear here once they are added to the portfolio.
              </p>
            </div>
          </div>
        )}

        {/* Technologies Used */}
        {projects.length > 0 && (
          <div className="mt-16 bg-white dark:bg-gray-800 rounded-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Technologies I Work With
            </h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {Array.from(
                new Set(
                  projects.flatMap((project: any) => project.techStack)
                )
              ).map((tech: any) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

