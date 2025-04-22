import React from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

// Animation keyframes
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled components
const LeftSection = styled.div`
  flex: 1;
  background-color: #121212;
  display: flex;
  flex-direction: column;
  padding: 3rem;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const NavContainer = styled.div`
  position: absolute;
  top: 2rem;
  right: 2rem;
  z-index: 10;
  animation: ${fadeIn} 0.8s ease forwards;
`;

const AuthLink = styled(Link)`
  color: #eeeeee;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  background-color: rgba(78, 204, 163, 0.1);
  transition: all 0.3s ease;
  border: 1px solid rgba(78, 204, 163, 0.3);
  
  &:hover {
    background-color: rgba(78, 204, 163, 0.2);
    transform: translateY(-2px);
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  z-index: 2;
  animation: ${fadeIn} 1s ease forwards;
`;

const BrandLogo = styled.div`
  margin-bottom: 2.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const LogoIcon = styled.div`
  background-color: #4ECCA3;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
  color: #121212;
  box-shadow: 0 8px 20px rgba(78, 204, 163, 0.3);
`;

const LogoText = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #eeeeee;
  letter-spacing: 0.5px;
`;

const QuoteCard = styled.div`
  width: 100%;
  max-width: 480px;
  background: #1E1E1E;
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(78, 204, 163, 0.2);
`;

const QuoteText = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #eeeeee;
  line-height: 1.4;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
  
  &::before {
    content: """;
    position: absolute;
    top: -20px;
    left: -10px;
    font-size: 6rem;
    color: rgba(78, 204, 163, 0.1);
    z-index: -1;
  }
`;

const QuoteAuthor = styled.p`
  font-size: 1rem;
  color: #9e9e9e;
  display: flex;
  align-items: center;
  margin-top: 2rem;
  
  &::before {
    content: "";
    width: 30px;
    height: 2px;
    background-color: #4ECCA3;
    margin-right: 1rem;
  }
`;

const IllustrationContainer = styled.div`
  position: absolute;
  bottom: -1rem;
  right: -1rem;
  width: 180px;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 0;
`;

const GlowingOrb = styled.div`
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(78, 204, 163, 0.4) 0%, rgba(78, 204, 163, 0) 70%);
  border-radius: 50%;
  position: absolute;
  opacity: 0.6;
  animation: ${pulse} 4s ease-in-out infinite;
`;

const CircleDecoration = styled.div`
  position: absolute;
  border-radius: 50%;
  background: rgba(78, 204, 163, 0.1);
  
  &:nth-child(1) {
    width: 300px;
    height: 300px;
    top: -150px;
    left: -150px;
    animation: ${pulse} 15s ease-in-out infinite;
  }
  
  &:nth-child(2) {
    width: 200px;
    height: 200px;
    bottom: -50px;
    right: 30%;
    animation: ${pulse} 10s ease-in-out infinite;
    animation-delay: 2s;
  }
`;

const FeatureCards = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 3rem;
  width: 100%;
  max-width: 480px;
`;

const FeatureCard = styled.div`
  flex: 1;
  background: #1E1E1E;
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid rgba(78, 204, 163, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    border-color: rgba(78, 204, 163, 0.4);
  }
`;

const FeatureIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: rgba(78, 204, 163, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  color: #4ECCA3;
`;

const FeatureTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #eeeeee;
  margin-bottom: 0.5rem;
`;

const FeatureText = styled.p`
  font-size: 0.85rem;
  color: #9e9e9e;
  line-height: 1.5;
`;

// Component
const LeftSideContent = ({ isLoginPage = false }) => {
  return (
    <LeftSection>
      <CircleDecoration />
      <CircleDecoration />
      
      <NavContainer>
        {isLoginPage ? (
          <AuthLink to="/signup">Create Account</AuthLink>
        ) : (
          <AuthLink to="/login">Log In</AuthLink>
        )}
      </NavContainer>
      
      <ContentContainer>
        <BrandLogo>
          <LogoIcon>H</LogoIcon>
          <LogoText>Habo</LogoText>
        </BrandLogo>
        
        <QuoteCard>
          <QuoteText>
            We first make our habits, and then our habits make us.
          </QuoteText>
          <QuoteAuthor>Anonymous</QuoteAuthor>
          
          <IllustrationContainer>
            <GlowingOrb />
          </IllustrationContainer>
        </QuoteCard>
        
        <FeatureCards>
          <FeatureCard>
            <FeatureIcon>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </FeatureIcon>
            <FeatureTitle>Track Daily</FeatureTitle>
            <FeatureText>Monitor your progress with intuitive tracking tools</FeatureText>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 14L11 16L15 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </FeatureIcon>
            <FeatureTitle>Build Consistency</FeatureTitle>
            <FeatureText>Develop lasting habits through proven methods</FeatureText>
          </FeatureCard>
        </FeatureCards>
      </ContentContainer>
    </LeftSection>
  );
};

export default LeftSideContent;