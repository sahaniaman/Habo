import React from "react";
import styled from "styled-components";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// Color palette
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

const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: ${colors.background};
  overflow: hidden;
`;

const Sidebar = styled.aside`
  width: 260px;
  min-width: 260px;
  height: 100%;
  background-color: ${colors.card};
  border-right: 1px solid ${colors.border};
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  margin-bottom: 2rem;
  color: ${colors.accent};
`;

const LogoIcon = styled.div`
  width: 32px;
  height: 32px;
  background-color: ${colors.accent};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.75rem;
  color: ${colors.background};
`;

const LogoText = styled.h1`
  font-size: 1.25rem;
  font-weight: bold;
`;

const NavMenu = styled.nav`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const NavHeader = styled.h2`
  font-size: 0.75rem;
  color: ${colors.textMuted};
  margin: 1rem 0 0.5rem 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem;
  margin: 0.25rem 0;
  border-radius: 0.5rem;
  cursor: pointer;
  color: ${props => props.$active ? colors.accent : colors.textMuted};
  background-color: ${props => props.$active ? colors.accentLight : "transparent"};

  &:hover {
    background-color: ${props => props.$active ? colors.accentLight : "rgba(255, 255, 255, 0.05)"};
    color: ${props => props.$active ? colors.accent : colors.text};
  }
`;

const NavIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.75rem;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  height: 100%;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const HeaderTitle = styled.h1`
  font-size: 1.75rem;
  font-weight: bold;
  color: ${colors.text};
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${colors.accentLight};
  color: ${colors.accent};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

const Layout = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const getPageTitle = () => {
    const lastSegment = location.pathname.split("/").filter(Boolean).pop() || "dashboard";
    return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
  };

  const userName = currentUser?.displayName ?? "";
  const userEmail = currentUser?.email ?? "";  
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <DashboardContainer>
      <Sidebar>
        <Logo>
          <LogoIcon>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </LogoIcon>
          <LogoText>HABO</LogoText>
        </Logo>

        <NavMenu>
          <NavHeader>Menu</NavHeader>
          <NavItem $active={isActive("/")} onClick={() => navigate("/")}>
            <NavIcon>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </NavIcon>
            Dashboard
          </NavItem>
          <NavItem $active={isActive("/habits")} onClick={() => navigate("/habits")}>
            <NavIcon>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <line x1="10" y1="9" x2="8" y2="9" />
              </svg>
            </NavIcon>
            Habits
          </NavItem>
          <NavItem $active={isActive("/analytics")} onClick={() => navigate("/analytics")}>
            <NavIcon>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 20V10M12 20V4M6 20v-6" />
              </svg>
            </NavIcon>
            Analytics
          </NavItem>

          <NavHeader>General</NavHeader>
          <NavItem $active={isActive("/settings")} onClick={() => navigate("/settings")}>
            <NavIcon>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33H15a1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51H9a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06A2 2 0 0 1 7.04 4.3l.06.06a1.65 1.65 0 0 0 1.82.33H9c.55 0 1-.45 1-1V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.18a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c0 .55.45 1 1 1h.09a2 2 0 1 1 0 4H21a1.65 1.65 0 0 0-1.6 1z" />
              </svg>
            </NavIcon>
            Settings
          </NavItem>

          <NavItem $active={isActive("/help")} onClick={() => navigate("/help")}>
            <NavIcon>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </NavIcon>
            Help & Support
          </NavItem>
        </NavMenu>

        <div style={{ marginTop: 'auto', borderTop: `1px solid ${colors.border}`, paddingTop: '1rem' }}>
          <NavItem onClick={handleLogout}>
            <NavIcon>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </NavIcon>
            Logout
          </NavItem>
          <div style={{ display: 'flex', alignItems: 'center', padding: '0.75rem', color: colors.textMuted }}>
            <UserAvatar>{userInitial}</UserAvatar>
            <div style={{ marginLeft: '0.75rem' }}>
              <div style={{ color: colors.text, fontWeight: 500 }}>{userName}</div>
              <div style={{ fontSize: '0.75rem' }}>{userEmail}</div>
            </div>
          </div>
        </div>
      </Sidebar>

      <MainContent>
        <Header>
          <HeaderTitle>{getPageTitle()}</HeaderTitle>
        </Header>
        <Outlet />
      </MainContent>
    </DashboardContainer>
  );
};

export default Layout;
