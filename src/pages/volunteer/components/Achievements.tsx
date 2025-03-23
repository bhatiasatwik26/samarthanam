import React from "react";
import { Flame, Sword, Sparkles, Shield, HeartHandshake, Users } from "lucide-react";

interface AchievementBadgesProps {
  user: any;
}

export const AchievementBadges: React.FC<AchievementBadgesProps> = ({ user }) => {
  // Mock streak data - would come from backend in real app
  const currentStreak = 12; // days
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 mb-8 border border-gray-100 dark:border-gray-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">Your Achievements</h3>
        <div className="mt-2 md:mt-0 flex items-center bg-orange-50 dark:bg-orange-900/10 px-4 py-2 rounded-full border border-orange-100 dark:border-orange-900/30">
          <Flame className="h-5 w-5 text-orange-500 mr-2" />
          <span className="text-sm font-semibold text-gray-800 dark:text-white">{currentStreak} Day Streak</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="flex flex-col items-center p-4 bg-purple-50 dark:bg-purple-900/10 rounded-lg border border-purple-100 dark:border-purple-900/30 hover:shadow-md transition-all">
          <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-2">
            <HeartHandshake className="h-8 w-8 text-purple-600 dark:text-purple-500" />
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200 text-center">Guardian Angel</span>
        </div>
        
        <div className="flex flex-col items-center p-4 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-100 dark:border-red-900/30 hover:shadow-md transition-all">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-2">
            <Sword className="h-8 w-8 text-red-600 dark:text-red-500" />
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200 text-center">Compassion Warrior</span>
        </div>
        
        <div className="flex flex-col items-center p-4 bg-yellow-50 dark:bg-yellow-900/10 rounded-lg border border-yellow-100 dark:border-yellow-900/30 hover:shadow-md transition-all">
          <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mb-2">
            <Sparkles className="h-8 w-8 text-yellow-600 dark:text-yellow-500" />
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200 text-center">Hope Bearer</span>
        </div>
        
        <div className="flex flex-col items-center p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-100 dark:border-blue-900/30 hover:shadow-md transition-all">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-2">
            <Shield className="h-8 w-8 text-blue-600 dark:text-blue-500" />
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200 text-center">Kindness Sentinel</span>
        </div>
        
        <div className="flex flex-col items-center p-4 bg-green-50 dark:bg-green-900/10 rounded-lg border border-green-100 dark:border-green-900/30 hover:shadow-md transition-all">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-2">
            <Users className="h-8 w-8 text-green-600 dark:text-green-500" />
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200 text-center">Inclusion Champion</span>
        </div>
      </div>
    </div>
  );
}; 