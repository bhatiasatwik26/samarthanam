import React from "react";
import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";

interface WelcomeSectionProps {
  user: {
    name: string;
  };
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({ user }) => {
  const now = new Date();
  const hours = now.getHours();
  
  let greeting;
  if (hours < 12) greeting = "Good Morning";
  else if (hours < 18) greeting = "Good Afternoon";
  else greeting = "Good Evening";
  
  return (
    <div className="bg-gradient-to-r from-red-50 to-white dark:from-red-900/10 dark:to-gray-800 rounded-2xl shadow-md p-8 mb-8 border border-red-100 dark:border-red-900/20">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{greeting}, {user.name}!</h2>
          <p className="text-gray-600 dark:text-gray-300">Welcome to your volunteer dashboard. Here's an overview of your activities and upcoming tasks.</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link 
            to="/events"
            className="bg-red-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-red-700 transition-all duration-300 flex items-center"
          >
            <Calendar className="h-5 w-5 mr-2" />
            Explore Events
          </Link>
        </div>
      </div>
    </div>
  );
}; 