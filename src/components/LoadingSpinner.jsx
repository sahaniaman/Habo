import React from "react";
import styled, { keyframes } from "styled-components";

// Modern color palette matching your Dashboard
const colors = {
  accent: "#4ade80",
  background: "#121212",
  text: "#F3F4F6",
};

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
`;

// Updated container with position:fixed when fullscreen is true
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  ${props => props.fullscreen ? `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    z-index: 9999;
    background-color: ${colors.background};
  ` : `
    height: 100%;
    width: 100%; 
    min-height: 200px;
  `}
`;

const SpinnerElement = styled.div`
  width: ${props => props.size || "40px"};
  height: ${props => props.size || "40px"};
  border: 3px solid rgba(74, 222, 128, 0.2);
  border-top-color: ${colors.accent};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
  margin-bottom: 1rem;
`;

const Text = styled.div`
  font-size: 1rem;
  color: ${props => props.color || colors.text};
  font-weight: 500;
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

const LoadingSpinner = ({ 
  text = false ? "true" : undefined, 
  fullscreen = false, 
  size = "40px",
  textColor
}) => {
  return (
    <Container fullscreen={fullscreen}>
      <SpinnerElement size={size} />
      {text && <Text color={textColor}>{text}</Text>}
    </Container>
  );
};

export default LoadingSpinner;