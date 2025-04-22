import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoadingSpinner from "../components/LoadingSpinner";
import AddHabitForm from "../components/AddHabitForm"; // Import AddHabitForm

// Modern color palette
const colors = {
  background: "#121212",
  card: "#1E1E1E",
  cardHover: "#252525",
  accent: "#4ade80",
  accentDark: "#22c55e",
  accentLight: "rgba(74, 222, 128, 0.1)",
  text: "#F3F4F6",
  textMuted: "#9CA3AF",
  border: "#2A2A2A",
  danger: "#ef4444",
  warning: "#f59e0b",
  success: "#10b981"
};

// Styled components for the Habits page
const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${colors.text};
`;

const AddHabitButton = styled.button`
  background-color: ${colors.accent};
  color: #121212;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  
  &:hover {
    background-color: ${colors.accentDark};
  }
`;

const HabitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.25rem;
`;

const HabitCard = styled.div`
  background-color: ${colors.card};
  border-radius: 12px;
  border: 1px solid ${colors.border};
  padding: 1.5rem;
`;

const HabitTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 500;
  color: ${colors.text};
  margin-bottom: 0.5rem;
`;

const HabitDescription = styled.p`
  color: ${colors.textMuted};
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
`;

const ProgressBar = styled.div`
  height: 0.5rem;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 0.25rem;
  overflow: hidden;
  margin-bottom: 0.5rem;
`;

const Progress = styled.div`
  height: 100%;
  width: ${props => props.$progress}%;
  background-color: ${colors.accent};
`;

const ProgressInfo = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
`;

const ProgressPercentage = styled.span`
  color: ${colors.accent};
`;

const ProgressLabel = styled.span`
  color: ${colors.textMuted};
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: ${colors.card};
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
`;

const Habits = () => {
  const [loading, setLoading] = useState(true);
  const [habits, setHabits] = useState([]);
  const [showAddHabitForm, setShowAddHabitForm] = useState(false); // State to control form visibility

  useEffect(() => {
    // Simulate loading habits data
    const timer = setTimeout(() => {
      setHabits([
        {
          id: 1,
          title: "Morning Meditation",
          description: "15 minutes every morning",
          progress: 75
        },
        {
          id: 2,
          title: "Read for 30 minutes",
          description: "Every evening before bed",
          progress: 60
        },
        {
          id: 3,
          title: "Exercise",
          description: "30 minutes, 3 times a week",
          progress: 85
        },
        {
          id: 4,
          title: "Drink Water",
          description: "8 glasses daily",
          progress: 45
        }
      ]);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingSpinner text="Loading habits..." />;
  }

  return (
    <>
      <PageHeader>
        <Title>My Habits</Title>
        <AddHabitButton onClick={() => setShowAddHabitForm(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add Habit
        </AddHabitButton>
      </PageHeader>

      <HabitsGrid>
        {habits.map(habit => (
          <HabitCard key={habit.id}>
            <HabitTitle>{habit.title}</HabitTitle>
            <HabitDescription>{habit.description}</HabitDescription>
            <ProgressBar>
              <Progress $progress={habit.progress} />
            </ProgressBar>
            <ProgressInfo>
              <ProgressLabel>Progress</ProgressLabel>
              <ProgressPercentage>{habit.progress}%</ProgressPercentage>
            </ProgressInfo>
          </HabitCard>
        ))}
      </HabitsGrid>

      {showAddHabitForm && (
        <ModalOverlay>
          <ModalContent>
            <AddHabitForm onClose={() => setShowAddHabitForm(false)} />
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default Habits;