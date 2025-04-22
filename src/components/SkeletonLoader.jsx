import React from "react";
import styled, { keyframes } from "styled-components";

const pulse = keyframes`
  0%, 100% {
    opacity: 0.1;
  }
  50% {
    opacity: 0.2;
  }
`;

const SkeletonItem = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: ${props => props.radius || "0.5rem"};
  height: ${props => props.height || "1.5rem"};
  width: ${props => props.width || "100%"};
  animation: ${pulse} 1.5s ease-in-out infinite;
  margin-bottom: ${props => props.marginBottom || "0.5rem"};
`;

const CardSkeletonWrapper = styled.div`
  padding: 1.5rem;
  border-radius: 12px; 
  background: rgba(30, 30, 30, 0.6);
  border: 1px solid #2A2A2A;
`;

// Component for skeleton card
export const CardSkeleton = () => (
  <CardSkeletonWrapper>
    <SkeletonItem height="1rem" width="40%" marginBottom="1rem" />
    <SkeletonItem height="2.5rem" marginBottom="1rem" />
    <SkeletonItem height="0.875rem" width="60%" marginBottom="1.5rem" />
    <SkeletonItem height="0.5rem" radius="0.25rem" />
  </CardSkeletonWrapper>
);