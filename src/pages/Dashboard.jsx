import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

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
};

// Component styles...
const WelcomeSection = styled.div`
  margin-bottom: 2rem;
`;

const WelcomeTitle = styled.h1`
  font-size: 1.75rem;
  font-weight: 600;
  color: ${colors.text};
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background-color: ${colors.card};
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid ${colors.border};
`;

const StatTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${colors.textMuted};
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const StatIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.accent};
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: ${colors.text};
  margin-bottom: 0.5rem;
`;

const StatChange = styled.div`
  font-size: 0.875rem;
  color: ${colors.accent};
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const StatProgressBar = styled.div`
  height: 0.5rem;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 0.25rem;
  overflow: hidden;
`;

const StatProgress = styled.div`
  height: 100%;
  width: ${props => props.$progress}%;
  background-color: ${colors.accent};
`;

const ChartContainer = styled.div`
  background-color: ${colors.card};
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid ${colors.border};
`;

const ChartTitle = styled.h2`
  font-size: 1.25rem;
  color: ${colors.text};
  margin-bottom: 1rem;
  font-weight: 600;
`;

const ChartVisual = styled.div`
  height: 250px;
  border-radius: 8px;
  background-color: rgba(74, 222, 128, 0.05);
  position: relative;
  overflow: hidden;
`;

const MonthLabel = styled.div`
  color: ${colors.textMuted};
  font-size: 0.75rem;
  margin-top: 0.5rem;
`;

const BarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const Bar = styled.div`
  width: 60%;
  height: ${props => props.$height}%;
  background-color: ${colors.accent};
  border-radius: 4px 4px 0 0;
  transition: height 0.8s ease-out;
`;

// Error container
const ErrorContainer = styled.div`
  background-color: ${colors.card};
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #ef4444;
  color: ${colors.text};
  margin-bottom: 1.5rem;
`;

// Dashboard component
const Dashboard = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [username, setUsername] = useState("User");
  
  // Sample chart data
  const sampleChartData = [
    { month: 'Jan', value: 65 },
    { month: 'Feb', value: 59 },
    { month: 'Mar', value: 80 },
    { month: 'Apr', value: 81 },
    { month: 'May', value: 76 },
    { month: 'Jun', value: 85 },
    { month: 'Jul', value: 90 },
    { month: 'Aug', value: 87 },
    { month: 'Sep', value: 91 },
    { month: 'Oct', value: 75 },
    { month: 'Nov', value: 82 },
    { month: 'Dec', value: 87 }
  ];
  
  // Load data with error handling and a timeout
  useEffect(() => {
    console.log("Dashboard loading effect running");
    
    let isComponentMounted = true;
    
    // Force load after a timeout to prevent infinite loading
    const forceLoadTimeout = setTimeout(() => {
      if (isComponentMounted && loading) {
        console.log("Force loading completion after timeout");
        setLoading(false);
        setChartData(sampleChartData);
      }
    }, 5000); // Force load after 5 seconds max
    
    try {
      // Normal loading process
      setTimeout(() => {
        if (isComponentMounted) {
          console.log("Normal loading completion");
          
          // Get user info
          const name = currentUser?.displayName || 
                      (currentUser?.email ? currentUser.email.split('@')[0] : "User");
          
          setUsername(name.toUpperCase());
          setChartData(sampleChartData);
          setLoading(false);
        }
      }, 1000);
    } catch (err) {
      console.error("Dashboard loading error:", err);
      if (isComponentMounted) {
        setError("Failed to load dashboard data. Please try again.");
        setLoading(false);
      }
    }
    
    // Cleanup function
    return () => {
      console.log("Dashboard component unmounting");
      isComponentMounted = false;
      clearTimeout(forceLoadTimeout);
    };
  }, [currentUser]); // Only depend on currentUser
  
  // Debug output
  console.log("Dashboard render state:", { loading, error, chartDataLength: chartData.length });
  
  // Show a simple loading state
  if (loading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>
      <div style={{ marginBottom: '1rem' }}>
        <div style={{
          border: '3px solid rgba(255, 255, 255, 0.1)',
          borderTop: '3px solid #4ade80',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          animation: 'spin 1s linear infinite',
          margin: '0 auto'
        }} />
      </div>
      <p style={{ color: '#9CA3AF' }}>Loading dashboard data...</p>
    </div>;
  }
  
  // Show any errors
  if (error) {
    return (
      <ErrorContainer>
        <h2 style={{ marginBottom: '1rem', color: '#ef4444' }}>Error</h2>
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()}
          style={{
            backgroundColor: colors.accent,
            color: '#121212',
            border: 'none',
            borderRadius: '0.5rem',
            padding: '0.5rem 1rem',
            marginTop: '1rem',
            cursor: 'pointer'
          }}
        >
          Retry
        </button>
      </ErrorContainer>
    );
  }
  
  // Use 0 as a fallback if no data is available
  const maxValue = chartData.length > 0 ? Math.max(...chartData.map(item => item.value)) : 0;

  return (
    <>
      {/* Welcome section */}
      <WelcomeSection>
        <WelcomeTitle>Welcome back, {username}!</WelcomeTitle>
      </WelcomeSection>

      {/* Stats Cards */}
      <DashboardGrid>
        <StatCard>
          <StatTitle>
            Completion Rate
            <StatIcon>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </StatIcon>
          </StatTitle>
          <StatValue>87%</StatValue>
          <StatChange>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "0.25rem" }}>
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
              <polyline points="17 6 23 6 23 12"></polyline>
            </svg>
            +5% this week
          </StatChange>
          <StatProgressBar>
            <StatProgress $progress={87} />
          </StatProgressBar>
        </StatCard>
        
        <StatCard>
          <StatTitle>
            Current Streak
            <StatIcon>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
              </svg>
            </StatIcon>
          </StatTitle>
          <StatValue>14 days</StatValue>
          <StatChange>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "0.25rem" }}>
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
              <polyline points="17 6 23 6 23 12"></polyline>
            </svg>
            +2 days
          </StatChange>
          <StatProgressBar>
            <StatProgress $progress={70} />
          </StatProgressBar>
        </StatCard>
        
        <StatCard>
          <StatTitle>
            Active Habits
            <StatIcon>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </StatIcon>
          </StatTitle>
          <StatValue>7 habits</StatValue>
          <StatChange>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "0.25rem" }}>
              <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
              <polyline points="17 18 23 18 23 12"></polyline>
            </svg>
            +1 this month
          </StatChange>
          <StatProgressBar>
            <StatProgress $progress={60} />
          </StatProgressBar>
        </StatCard>
      </DashboardGrid>

      {/* Monthly Progress Chart */}
      <ChartContainer>
        <ChartTitle>Monthly Progress</ChartTitle>
        <ChartVisual>
          <div style={{ height: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '10px 0' }}>
            {chartData.length > 0 ? chartData.map((item, index) => (
              <BarContainer key={index}>
                <Bar $height={(item.value / maxValue) * 80} />
                <MonthLabel>{item.month}</MonthLabel>
              </BarContainer>
            )) : (
              <div style={{ width: '100%', textAlign: 'center', color: colors.textMuted, paddingTop: '100px' }}>
                No data available
              </div>
            )}
          </div>
        </ChartVisual>
      </ChartContainer>
    </>
  );
};

export default Dashboard;
