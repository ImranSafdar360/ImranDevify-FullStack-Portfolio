import { ISkill } from '../models/Skill';

interface SkillCardProps {
  skill: ISkill;
}

const levelColors = {
  Beginner: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  Intermediate: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  Advanced: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  Expert: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

const categoryColors = {
  Frontend: 'bg-pink-50 border-pink-200 dark:bg-pink-900/20 dark:border-pink-800',
  Backend: 'bg-indigo-50 border-indigo-200 dark:bg-indigo-900/20 dark:border-indigo-800',
  Database: 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800',
  DevOps: 'bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-800',
  Tools: 'bg-gray-50 border-gray-200 dark:bg-gray-900/20 dark:border-gray-800',
  Other: 'bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800',
};

export default function SkillCard({ skill }: SkillCardProps) {
  return (
    <div className={`p-4 rounded-lg border-2 transition-all duration-300 hover:shadow-md hover:scale-105 ${categoryColors[skill.category]}`}>
      <div className="flex items-center gap-3 mb-3">
        {skill.iconUrl && (
          <img
            src={skill.iconUrl}
            alt={skill.name}
            className="w-8 h-8 object-contain"
          />
        )}
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {skill.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {skill.category}
          </p>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${levelColors[skill.level]}`}>
          {skill.level}
        </span>
        
        <div className="flex items-center gap-1">
          {[...Array(4)].map((_, index) => {
            const levels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
            const currentLevelIndex = levels.indexOf(skill.level);
            const isActive = index <= currentLevelIndex;
            
            return (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  isActive 
                    ? 'bg-blue-500 dark:bg-blue-400' 
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

