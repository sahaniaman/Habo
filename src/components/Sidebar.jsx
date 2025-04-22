// src/components/Sidebar.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext";

// Modern color palette
const colors = {
  background: "#121212",
  sidebarBg: "#181818", 
  active: "#4ade80",
  activeBackground: "rgba(74, 222, 128, 0.1)",
  text: "#F3F4F6",
  textMuted: "#9CA3AF",
  border: "#2A2A2A",
  hover: "rgba(255, 255, 255, 0.05)"
};

const SidebarContainer = styled.aside`
  width: 280px;
  height: 100vh;
  background-color: ${colors.sidebarBg};
  color: ${colors.text};
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${colors.border};
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 1.5rem;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

const LogoText = styled.h1`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${colors.text};
`;

const SidebarSection = styled.nav`
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0 1.5rem 0;
`;

const SectionHeader = styled.h2`
  padding: 0.75rem 1.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: ${colors.textMuted};
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  a {
    display: block;
    padding: 0.875rem 1.5rem;
    color: ${props => props.$active ? colors.active : colors.textMuted};
    text-decoration: none;
    transition: all 0.2s ease;
    background-color: ${props => props.$active ? colors.activeBackground : 'transparent'};
    border-left: 2px solid ${props => props.$active ? colors.active : 'transparent'};
    
    &:hover {
      background-color: ${props => props.$active ? colors.activeBackground : colors.hover};
      color: ${props => props.$active ? colors.active : colors.text};
    }
  }
`;

const LogoutButton = styled.button`
  margin: 1rem 1.5rem;
  padding: 0.875rem 1.5rem;
  background-color: ${colors.active};
  color: ${colors.background};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${colors.activeBackground};
    color: ${colors.active};
  }
`;

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/" || location.pathname === "/dashboard";
    }
    return location.pathname === path;
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <SidebarContainer>
      <LogoContainer>
        <LogoText>HABO</LogoText>
      </LogoContainer>

      <SidebarSection>
        <SectionHeader>MENU</SectionHeader>
        <NavList>
          <NavItem $active={isActive("/")}>
            <a href="#" onClick={(e) => { e.preventDefault(); navigate("/"); }}>Dashboard</a>
          </NavItem>
          <NavItem $active={isActive("/habits")}>
            <a href="#" onClick={(e) => { e.preventDefault(); navigate("/habits"); }}>Habits</a>
          </NavItem>
          <NavItem $active={isActive("/analytics")}>
            <a href="#" onClick={(e) => { e.preventDefault(); navigate("/analytics"); }}>Analytics</a>
          </NavItem>
        </NavList>
      </SidebarSection>

      <SidebarSection>
        <SectionHeader>GENERAL</SectionHeader>
        <NavList>
          <NavItem $active={isActive("/settings")}>
            <a href="#" onClick={(e) => { e.preventDefault(); navigate("/settings"); }}>Settings</a>
          </NavItem>
          <NavItem $active={isActive("/help")}>
            <a href="#" onClick={(e) => { e.preventDefault(); navigate("/help"); }}>Help & Support</a>
          </NavItem>
        </NavList>
      </SidebarSection>

      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
    </SidebarContainer>
  );
};

export default Sidebar;