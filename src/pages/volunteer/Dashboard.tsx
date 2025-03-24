import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import { updateUserActivity } from "@/services/activityApi";
import { updateLoginStreak } from "@/services/streakService";

// Importing the hook and subcomponents
import { useVolunteerData } from "@/hooks/useVolunteerData";

import {
  WelcomeSection,
  AchievementBadges,
  TaskSummary,
  EventCard,
  RegisteredEventsSection,
  Leaderboard,
  StreakDisplay,
} from "@/pages/volunteer/components";
import Heatmap from "./components/Heatmap";
const VolunteerDashboard = () => {
  const { user, subscribedEvents, isUserLoading, isUserError } =
    useVolunteerData();

  if (isUserLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-700 dark:text-gray-300">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  // ✅ Error state
  if (isUserError || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center p-8 max-w-md">
          <div className="text-red-600 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <p className="text-xl text-red-600 mb-4">
            Failed to load data. Please try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-red-700 transition-all duration-300"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // ✅ Main UI
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-red-50 to-gray-50 dark:from-gray-900 dark:via-red-900/10 dark:to-gray-900 background-animate">
      <Header user={user} />

      <div className="container mx-auto px-4 py-8 pt-32 md:pt-36 relative z-10">
        <WelcomeSection user={user} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <AchievementBadges user={user} />
            <TaskSummary events={subscribedEvents} />

            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-md p-6 mb-8 border border-red-100/40 dark:border-red-900/20">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                Activity Calendar
              </h3>
              <Heatmap data={user.heatmapActivity} />
            </div>

            <RegisteredEventsSection
              events={subscribedEvents}
              userID={user.id}
            />
          </div>

          <div>
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-md p-6 mb-8 border border-red-100/40 dark:border-red-900/20">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                Stats Highlights
              </h3>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Current Rank
                  </span>
                  <span className="font-bold text-gray-800 dark:text-white capitalize">
                    {user.rank}
                  </span>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-600 dark:text-gray-400">
                      Progress to {user.nextRank}
                    </span>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {user.pointsForNextRank} points needed
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Volunteer Hours
                  </span>
                  <span className="font-bold text-gray-800 dark:text-white">
                    {user.volunteerHour}
                  </span>
                </div>
              </div>
            </div>

            <Leaderboard currentUserId={user?.id} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default VolunteerDashboard;
