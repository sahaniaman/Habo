import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import LoadingSpinner from "./LoadingSpinner";

const PageWrapper = styled.div`
  opacity: ${props => props.$visible ? 1 : 0};
  transition: opacity 0.3s ease-in-out;
`;

const PageTransition = ({ children }) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransistionStage] = useState("fadeIn");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (location !== displayLocation) {
      setTransistionStage("fadeOut");
      setIsLoading(true);
    }
  }, [location, displayLocation]);

  const handleAnimationEnd = () => {
    if (transitionStage === "fadeOut") {
      setTransistionStage("fadeIn");
      setDisplayLocation(location);
      
      // Simulate page loading time
      setTimeout(() => {
        setIsLoading(false);
      }, 800);
    }
  };

  useEffect(() => {
    // Simulate initial page load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <PageWrapper
      $visible={transitionStage === "fadeIn"}
      onAnimationEnd={handleAnimationEnd}
    >
      {isLoading ? <LoadingSpinner fullscreen text={`Loading ${location.pathname.split('/').pop() || 'dashboard'}...`} /> : children}
    </PageWrapper>
  );
};

export default PageTransition;