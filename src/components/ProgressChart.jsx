import React from "react";
import styled from "styled-components";

// Modern color palette matching your Dashboard
const colors = {
  accent: "#4ade80",
  accentLight: "rgba(74, 222, 128, 0.1)",
  text: "#F3F4F6",
  textMuted: "#9CA3AF",
  background: "#1E1E1E",
  border: "#2A2A2A",
};

const ChartWrapper = styled.div`
  background-color: ${colors.background};
  border-radius: 12px;
  padding: 1.5rem;
  height: 100%;
  border: 1px solid ${colors.border};
`;

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ChartTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${colors.text};
  margin: 0;
`;

const ChartControls = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ChartButton = styled.button`
  background-color: ${props => props.$active ? colors.accentLight : 'transparent'};
  color: ${props => props.$active ? colors.accent : colors.textMuted};
  border: 1px solid ${props => props.$active ? colors.accent : colors.border};
  border-radius: 4px;
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${colors.accentLight};
    color: ${colors.accent};
  }
`;

const ChartGrid = styled.div`
  height: 200px;
  display: grid;
  grid-template-columns: repeat(30, 1fr);
  column-gap: 4px;
  align-items: end;
`;

const ChartBar = styled.div`
  background-color: ${colors.accentLight};
  border-radius: 2px;
  width: 100%;
  height: ${props => props.$height}%;
  position: relative;
  transition: height 1s ease-out;
  
  &:hover {
    background-color: ${colors.accent};
  }
  
  &:hover::after {
    content: "${props => props.$value}%";
    position: absolute;
    top: -25px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #333;
    color: white;
    padding: 2px 6px;
    border-radius: 3px;
    font-size: 10px;
  }
`;

const ChartXAxis = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.75rem;
  color: ${colors.textMuted};
  font-size: 0.75rem;
`;

// Generate random data for demo purposes
const generateMonthData = () => {
  const days = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
  return Array.from({ length: days }, () => Math.floor(Math.random() * 100));
};

const ProgressChart = ({ title = "Monthly Progress" }) => {
  const [activeView, setActiveView] = React.useState("month");
  const [chartData, setChartData] = React.useState([]);
  
  React.useEffect(() => {
    // Simulate data loading with a delay
    const timer = setTimeout(() => {
      setChartData(generateMonthData());
    }, 800);
    
    return () => clearTimeout(timer);
  }, [activeView]);
  
  return (
    <ChartWrapper>
      <ChartHeader>
        <ChartTitle>{title}</ChartTitle>
        <ChartControls>
          <ChartButton 
            $active={activeView === "week"}
            onClick={() => setActiveView("week")}
          >
            Week
          </ChartButton>
          <ChartButton 
            $active={activeView === "month"}
            onClick={() => setActiveView("month")}
          >
            Month
          </ChartButton>
          <ChartButton 
            $active={activeView === "year"}
            onClick={() => setActiveView("year")}
          >
            Year
          </ChartButton>
        </ChartControls>
      </ChartHeader>
      
      {chartData.length === 0 ? (
        <div style={{ 
          height: "200px", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          color: colors.textMuted
        }}>
          Loading chart data...
        </div>
      ) : (
        <>
          <ChartGrid>
            {chartData.map((value, index) => (
              <ChartBar 
                key={index} 
                $height={value} 
                $value={value}
                style={{ 
                  // Animate bars appearing one after another
                  animation: `fadeIn 0.5s ease-out ${index * 0.02}s forwards`,
                  opacity: 0 
                }} 
              />
            ))}
          </ChartGrid>
          
          <ChartXAxis>
            <span>1</span>
            <span>{Math.floor(chartData.length / 2)}</span>
            <span>{chartData.length}</span>
          </ChartXAxis>
          
          <style jsx>{`
            @keyframes fadeIn {
              from { opacity: 0; height: 0%; }
              to { opacity: 1; }
            }
          `}</style>
        </>
      )}
    </ChartWrapper>
  );
};

export default ProgressChart;