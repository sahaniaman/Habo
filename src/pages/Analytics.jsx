import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

// Add missing styled components
const PageContainer = styled.div`
  padding: 2rem;
  color: #F3F4F6;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const PageTitle = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
`;

const TimeFilter = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const TimeButton = styled.button`
  background-color: ${props => props.$active ? 'rgba(56, 189, 248, 0.1)' : 'transparent'};
  color: ${props => props.$active ? '#38bdf8' : '#9CA3AF'};
  border: 1px solid ${props => props.$active ? 'rgba(56, 189, 248, 0.3)' : '#2A2A2A'};
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.$active ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255, 255, 255, 0.05)'};
    color: ${props => props.$active ? '#38bdf8' : '#F3F4F6'};
  }
`;

// Analytics component implementation
const Analytics = ({ habitId }) => {
  const [timeRange, setTimeRange] = useState("month");
  const [completionChartType, setCompletionChartType] = useState("daily");
  const [habitChartType, setHabitChartType] = useState("progress");
  
  // Sample data for charts
  const completionData = [
    { date: '2025-04-13', completed: 5, total: 7 },
    { date: '2025-04-14', completed: 6, total: 7 },
    { date: '2025-04-15', completed: 7, total: 7 },
    { date: '2025-04-16', completed: 4, total: 7 },
    { date: '2025-04-17', completed: 6, total: 7 },
    { date: '2025-04-18', completed: 5, total: 7 },
    { date: '2025-04-19', completed: 6, total: 7 },
  ];
  
  const habitData = [
    { name: 'Morning Meditation', streak: 14, completion: 92 },
    { name: 'Read 30 mins', streak: 8, completion: 75 },
    { name: 'Workout', streak: 5, completion: 60 },
    { name: 'Drink Water', streak: 21, completion: 95 },
    { name: 'Learn Programming', streak: 12, completion: 85 },
  ];

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>
          {habitId ? "Habit Analytics" : "Analytics"}
        </PageTitle>
        <TimeFilter>
          <TimeButton 
            $active={timeRange === "week"} 
            onClick={() => setTimeRange("week")}
          >
            Week
          </TimeButton>
          <TimeButton 
            $active={timeRange === "month"} 
            onClick={() => setTimeRange("month")}
          >
            Month
          </TimeButton>
          <TimeButton 
            $active={timeRange === "year"} 
            onClick={() => setTimeRange("year")}
          >
            Year
          </TimeButton>
        </TimeFilter>
      </PageHeader>
      
      {/* Completion Rate Chart */}
      <ChartSection>
        <ChartHeader>
          <ChartTitle>Completion Rate</ChartTitle>
          <ChartControls>
            <ControlButton 
              $active={completionChartType === "daily"} 
              onClick={() => setCompletionChartType("daily")}
            >
              Daily
            </ControlButton>
            <ControlButton 
              $active={completionChartType === "weekly"} 
              onClick={() => setCompletionChartType("weekly")}
            >
              Weekly
            </ControlButton>
          </ChartControls>
        </ChartHeader>
        <ChartContainer>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={completionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="completionGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
              <XAxis dataKey="date" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip contentStyle={{ backgroundColor: '#1E1E1E', borderColor: '#2A2A2A' }} />
              <Area type="monotone" dataKey="completed" stroke="#38bdf8" fillOpacity={1} fill="url(#completionGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </ChartSection>
      
      {/* Habit Performance Chart */}
      <ChartSection>
        <ChartHeader>
          <ChartTitle>Habit Performance</ChartTitle>
          <ChartControls>
            <ControlButton 
              $active={habitChartType === "progress"} 
              onClick={() => setHabitChartType("progress")}
            >
              Progress
            </ControlButton>
            <ControlButton 
              $active={habitChartType === "streaks"} 
              onClick={() => setHabitChartType("streaks")}
            >
              Streaks
            </ControlButton>
          </ChartControls>
        </ChartHeader>
        <ChartContainer>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={habitData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" horizontal={false} />
              <XAxis type="number" stroke="#9CA3AF" />
              <YAxis dataKey="name" type="category" scale="band" stroke="#9CA3AF" />
              <Tooltip contentStyle={{ backgroundColor: '#1E1E1E', borderColor: '#2A2A2A' }} />
              <Bar 
                dataKey={habitChartType === "progress" ? "completion" : "streak"} 
                fill="#4ade80"
                radius={[0, 4, 4, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </ChartSection>
    </PageContainer>
  );
};

// Add missing styled components for chart sections
const ChartSection = styled.div`
  background-color: #1E1E1E;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid #2A2A2A;
`;

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ChartTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
`;

const ChartControls = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ControlButton = styled.button`
  background-color: ${props => props.$active ? 'rgba(74, 222, 128, 0.1)' : 'transparent'};
  color: ${props => props.$active ? '#4ade80' : '#9CA3AF'};
  border: 1px solid ${props => props.$active ? 'rgba(74, 222, 128, 0.3)' : '#2A2A2A'};
  border-radius: 6px;
  padding: 0.375rem 0.75rem;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
`;

const ChartContainer = styled.div`
  width: 100%;
`;

export default Analytics;