import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

// Modern color palette to match Dashboard
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

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${colors.text};
  margin-bottom: 1rem;
`;

const Card = styled.div`
  background-color: ${colors.card};
  border-radius: 12px;
  border: 1px solid ${colors.border};
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: ${colors.textMuted};
  font-size: 0.875rem;
`;

const Input = styled.input`
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid ${colors.border};
  border-radius: 0.5rem;
  padding: 0.75rem;
  color: ${colors.text};
  font-size: 1rem;
  width: 100%;
  outline: none;
  transition: border-color 0.2s;
  
  &:focus {
    border-color: ${colors.accent};
  }
`;

const Button = styled.button`
  background-color: ${props => props.$variant === "danger" ? colors.danger : 
                              props.$variant === "outlined" ? "transparent" : colors.accent};
  color: ${props => props.$variant === "outlined" ? colors.text : "#121212"};
  border: 1px solid ${props => props.$variant === "danger" ? colors.danger : 
                              props.$variant === "outlined" ? colors.border : colors.accent};
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  max-width: ${props => props.$fullWidth ? "100%" : "fit-content"};
  
  &:hover {
    background-color: ${props => props.$variant === "danger" ? "#f87171" : 
                                props.$variant === "outlined" ? "rgba(255, 255, 255, 0.05)" : colors.accentDark};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SwitchContainer = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
`;

const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  
  &:checked + span {
    background-color: ${colors.accent};
  }
  
  &:checked + span:before {
    transform: translateX(26px);
  }
`;

const SwitchSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #333;
  transition: 0.4s;
  border-radius: 34px;
  
  &:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

const SettingRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid ${colors.border};
  
  &:last-child {
    border-bottom: none;
  }
`;

const SettingLabel = styled.div`
  display: flex;
  flex-direction: column;
`;

const SettingTitle = styled.div`
  color: ${colors.text};
  font-weight: 500;
  margin-bottom: 0.25rem;
`;

const SettingDescription = styled.div`
  color: ${colors.textMuted};
  font-size: 0.875rem;
`;

const ErrorMessage = styled.div`
  background-color: rgba(239, 68, 68, 0.1);
  color: ${colors.danger};
  padding: 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

const SuccessMessage = styled.div`
  background-color: rgba(16, 185, 129, 0.1);
  color: ${colors.success};
  padding: 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

const SelectContainer = styled.div`
  position: relative;
`;

const Select = styled.select`
  appearance: none;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid ${colors.border};
  border-radius: 0.5rem;
  padding: 0.75rem;
  color: ${colors.text};
  font-size: 1rem;
  width: 100%;
  outline: none;
  cursor: pointer;
  
  &:focus {
    border-color: ${colors.accent};
  }
`;

const SelectArrow = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: ${colors.textMuted};
`;

const Settings = () => {
  const { currentUser, updateEmail, updatePassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [userSettings, setUserSettings] = useState({
    email: currentUser?.email || "",
    password: "",
    confirmPassword: "",
    name: "", // This would come from your user profile data
    notifications: true,
    darkMode: true,
    weekStartDay: "monday",
    reminderTime: "21:00"
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  if (pageLoading) {
    return <LoadingSpinner text="Loading settings..." />;
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserSettings({
      ...userSettings,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (userSettings.email !== currentUser.email) {
        await updateEmail(userSettings.email);
      }
      
      setSuccess("Profile updated successfully!");
    } catch (error) {
      setError("Failed to update profile: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Validate password
    if (userSettings.password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }
    
    if (userSettings.password !== userSettings.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      await updatePassword(userSettings.password);
      setSuccess("Password updated successfully!");
      setUserSettings({
        ...userSettings,
        password: "",
        confirmPassword: ""
      });
    } catch (error) {
      setError("Failed to update password: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <SectionTitle>Account Settings</SectionTitle>
      
      <Card>
        <Form onSubmit={handleProfileUpdate}>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}
          
          <FormGroup>
            <Label htmlFor="name">Display Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={userSettings.name}
              onChange={handleChange}
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="email">Email Address</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={userSettings.email}
              onChange={handleChange}
            />
          </FormGroup>
          
          <Button type="submit" disabled={loading}>
            Update Profile
          </Button>
        </Form>
      </Card>

      <SectionTitle>Change Password</SectionTitle>
      
      <Card>
        <Form onSubmit={handlePasswordUpdate}>
          <FormGroup>
            <Label htmlFor="password">New Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={userSettings.password}
              onChange={handleChange}
              placeholder="Leave blank to keep the same"
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={userSettings.confirmPassword}
              onChange={handleChange}
              placeholder="Leave blank to keep the same"
            />
          </FormGroup>
          
          <Button 
            type="submit" 
            disabled={loading || !userSettings.password || !userSettings.confirmPassword}
          >
            Update Password
          </Button>
        </Form>
      </Card>

      <SectionTitle>Application Settings</SectionTitle>
      
      <Card>
        <SettingRow>
          <SettingLabel>
            <SettingTitle>Dark Mode</SettingTitle>
            <SettingDescription>Enable or disable dark mode</SettingDescription>
          </SettingLabel>
          <SwitchContainer>
            <SwitchInput 
              type="checkbox" 
              name="darkMode"
              checked={userSettings.darkMode}
              onChange={handleChange}
            />
            <SwitchSlider />
          </SwitchContainer>
        </SettingRow>
        
        <SettingRow>
          <SettingLabel>
            <SettingTitle>Notifications</SettingTitle>
            <SettingDescription>Enable or disable habit reminders</SettingDescription>
          </SettingLabel>
          <SwitchContainer>
            <SwitchInput 
              type="checkbox"
              name="notifications"
              checked={userSettings.notifications}
              onChange={handleChange}
            />
            <SwitchSlider />
          </SwitchContainer>
        </SettingRow>
        
        <SettingRow>
          <SettingLabel>
            <SettingTitle>Week Start Day</SettingTitle>
            <SettingDescription>Choose your preferred first day of the week</SettingDescription>
          </SettingLabel>
          <SelectContainer>
            <Select 
              name="weekStartDay" 
              value={userSettings.weekStartDay}
              onChange={handleChange}
            >
              <option value="sunday">Sunday</option>
              <option value="monday">Monday</option>
            </Select>
            <SelectArrow>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </SelectArrow>
          </SelectContainer>
        </SettingRow>
        
        <SettingRow>
          <SettingLabel>
            <SettingTitle>Reminder Time</SettingTitle>
            <SettingDescription>Set your daily reminder time</SettingDescription>
          </SettingLabel>
          <Input
            type="time"
            name="reminderTime"
            value={userSettings.reminderTime}
            onChange={handleChange}
            style={{ width: "120px" }}
          />
        </SettingRow>
      </Card>
      
      <SectionTitle>Danger Zone</SectionTitle>
      
      <Card>
        <SettingRow>
          <SettingLabel>
            <SettingTitle>Delete Account</SettingTitle>
            <SettingDescription>Permanently delete your account and all data</SettingDescription>
          </SettingLabel>
          <Button $variant="danger">Delete Account</Button>
        </SettingRow>
      </Card>
    </Container>
  );
};

export default Settings;