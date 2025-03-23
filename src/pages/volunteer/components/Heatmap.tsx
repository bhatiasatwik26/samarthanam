import React from "react";

// Define days for the heatmap
const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

interface HeatmapProps {
  data: any;
}

export const Heatmap: React.FC<HeatmapProps> = ({ data }) => {
  // Function to determine the color intensity based on count
  const getColorIntensity = (count) => {
    if (count === 0) return 'bg-gray-100 dark:bg-gray-800';
    if (count === 1) return 'bg-green-200 dark:bg-green-900/30';
    if (count === 2) return 'bg-green-300 dark:bg-green-700/60';
    if (count === 3) return 'bg-green-400 dark:bg-green-600';
    return 'bg-green-500 dark:bg-green-500';
  };

  // Generate month labels
  const generateMonths = () => {
    const months = [];
    const now = new Date();
    for (let i = 0; i < 12; i++) {
      const date = new Date();
      date.setMonth(now.getMonth() - 11 + i);
      months.push(MONTHS[date.getMonth()]);
    }
    return months;
  };

  // Generate data grid resembling the leetcode style
  const generateDummyData = () => {
    // Generate 52 weeks of data (columns)
    return Array.from({ length: 52 }, () => 
      // Each week has 7 days (rows)
      Array.from({ length: 7 }, () => ({
        count: Math.floor(Math.random() * 5) // Random activity level 0-4
      }))
    );
  };

  const monthLabels = generateMonths();
  const activityData = generateDummyData();
  
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
      <div className="mb-2 flex items-center justify-between">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Your activity (past 52 weeks)</h4>
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
          <span className="mr-2">Less</span>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-gray-100 dark:bg-gray-800 rounded-sm"></div>
            <div className="w-3 h-3 bg-green-200 dark:bg-green-900/30 rounded-sm"></div>
            <div className="w-3 h-3 bg-green-300 dark:bg-green-700/60 rounded-sm"></div>
            <div className="w-3 h-3 bg-green-400 dark:bg-green-600 rounded-sm"></div>
            <div className="w-3 h-3 bg-green-500 dark:bg-green-500 rounded-sm"></div>
          </div>
          <span className="ml-2">More</span>
        </div>
      </div>
      
      <div className="overflow-x-auto pb-2">
        <div style={{ minWidth: "900px" }}>
          {/* Month labels row */}
          <div className="flex pl-14 mb-2">
            {monthLabels.map((month, i) => (
              <div key={i} className="flex-1 text-xs text-gray-600 dark:text-gray-400">{month}</div>
            ))}
          </div>
          
          {/* Activity grid with day labels */}
          <div className="flex">
            {/* Day labels column */}
            <div className="flex flex-col pr-3" style={{ width: "30px" }}>
              {DAYS_OF_WEEK.map((day, i) => (
                <div key={i} className="h-[15px] text-xs text-gray-600 dark:text-gray-400 flex items-center justify-end my-[3px]">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Activity cells */}
            <div className="flex flex-1 space-x-[3px]">
              {activityData.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col space-y-[3px]">
                  {week.map((day, dayIndex) => (
                    <div
                      key={dayIndex}
                      className={`w-[15px] h-[15px] rounded-sm ${getColorIntensity(day.count)}`}
                      title={`${day.count} contributions`}
                    ></div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 