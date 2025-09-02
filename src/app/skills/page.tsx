import SkillCard from '../../components/SkillCard';

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

export default async function SkillsPage() {
  const skills = await getSkills();

  // Group skills by category
  const skillsByCategory = skills.reduce((acc: any, skill: any) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  const categories = Object.keys(skillsByCategory).sort();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Skills & Technologies
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A comprehensive overview of the technologies, frameworks, and tools I work with 
            to build modern web applications and solve complex problems.
          </p>
        </div>

        {skills.length > 0 ? (
          <div className="space-y-12">
            {categories.map((category) => (
              <div key={category}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {category}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {skillsByCategory[category].map((skill: any) => (
                    <SkillCard key={skill._id} skill={skill} />
                  ))}
                </div>
              </div>
            ))}

            {/* Skills Summary */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 mt-16">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                Skills Overview
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {skills.length}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">
                    Total Skills
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                    {skills.filter((skill: any) => skill.level === 'Expert' || skill.level === 'Advanced').length}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">
                    Advanced+ Skills
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                    {categories.length}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">
                    Categories
                  </div>
                </div>
              </div>
            </div>
          </div>
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
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No skills listed yet
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Skills and technologies will appear here once they are added.
              </p>
            </div>
          </div>
        )}

        {/* Learning Philosophy */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-lg p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Continuous Learning
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Technology evolves rapidly, and I believe in staying current with the latest trends 
              and best practices. I'm always exploring new technologies and improving my existing skills 
              to deliver the best solutions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

