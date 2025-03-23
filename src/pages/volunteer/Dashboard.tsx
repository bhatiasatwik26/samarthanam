import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { events as allEvents } from "@/data/events";
import { User, Event } from "@/Types";

import {
  WelcomeSection,
  AchievementBadges,
  TaskSummary,
  EventCard,
  Heatmap,
} from "@/pages/volunteer/components";
import { useVolunteerData } from "@/hooks/useVolunteerData";

const VolunteerDashboard = () => {
  const {
    user,
    subscribedEvents,
    leaderboard,
    isUserLoading,
    isLeaderboardLoading,
    isUserError,
    isLeaderboardError,
  } = useVolunteerData();
  const queryClient = useQueryClient();
  const handleRetry = () => {
    queryClient.refetchQueries({ queryKey: ["userData"] });
    queryClient.refetchQueries({ queryKey: ["leaderboardData"] });
  };

  if (isUserLoading || isLeaderboardLoading) {
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

  if (isLeaderboardError || isUserError) {
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
          <p className="text-xl text-red-600 mb-4">"some Error occured"</p>
          <button
            onClick={handleRetry}
            className="bg-red-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-red-700 transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <div className="container mx-auto px-4 py-8 pt-32 md:pt-36">
        <WelcomeSection user={user?.name || "Guest"} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <AchievementBadges user={user} />
            <TaskSummary events={subscribedEvents} />

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 mb-8 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  Your Events
                </h3>
                <Link
                  to="/events"
                  className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 text-sm font-medium flex items-center"
                >
                  View All Events
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {subscribedEvents.map((event) => (
                  <EventCard key={event.eventId} event={event} />
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 mb-8 border border-gray-100 dark:border-gray-700">
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
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                    <div
                      className="h-2 bg-red-600 rounded-full"
                      style={{ width: "60%" }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Events Participated
                  </span>
                  <span className="font-bold text-gray-800 dark:text-white">
                    {user.eventsVolunteered}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Volunteer Hours
                  </span>
                  <span className="font-bold text-gray-800 dark:text-white">
                    {user.volunteerHour}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Active Events
                  </span>
                  <span className="font-bold text-gray-800 dark:text-white">
                    {subscribedEvents.length}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 mb-8 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  Leaderboard
                </h3>
                <span className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                  Top Volunteers
                </span>
              </div>

              <div className="space-y-4">
                {leaderboard.slice(0, 5).map((person, index) => (
                  <div
                    key={index}
                    className={`flex items-center p-3 rounded-lg transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 
                    ${
                      person.name === user.name
                        ? "bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30"
                        : "border border-transparent"
                    }`}
                  >
                    <div
                      className={`
                      flex items-center justify-center w-10 h-10 rounded-full mr-3 
                      ${
                        index === 0
                          ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-500 border-2 border-yellow-400"
                          : index === 1
                          ? "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 border-2 border-gray-400"
                          : index === 2
                          ? "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-500 border-2 border-amber-400"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
                      } 
                      font-bold text-sm`}
                    >
                      {index + 1}
                    </div>
                    <div className="flex-grow">
                      <p
                        className={`font-medium ${
                          person.name === user.name
                            ? "text-red-600 dark:text-red-400"
                            : "text-gray-800 dark:text-white"
                        }`}
                      >
                        {person.name}
                      </p>
                      <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full mt-1">
                        <div
                          className={`h-1.5 rounded-full ${
                            index === 0
                              ? "bg-yellow-500"
                              : index === 1
                              ? "bg-gray-500"
                              : index === 2
                              ? "bg-amber-500"
                              : "bg-blue-500"
                          }`}
                          style={{
                            width: `${
                              (person.pointsForNextRank /
                                leaderboard[0].pointsForNextRank) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 font-medium flex flex-col items-end">
                      <span className="text-lg">
                        {person.pointsForNextRank}
                      </span>
                      <span className="text-xs text-gray-500">points</span>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-6 text-red-600 dark:text-red-400 text-sm font-medium border border-red-200 dark:border-red-900/30 rounded-lg py-2 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
                View Full Leaderboard
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 mb-8 border border-gray-100 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
            Activity Calendar
          </h3>
          <Heatmap data={null} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default VolunteerDashboard;
