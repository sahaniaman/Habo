import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import LeftSideContent from "../components/auth/LeftSideContent";

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0% { background-position: -468px 0 }
  100% { background-position: 468px 0 }
`;

// Styled components
const Container = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100vw;
`;

const RightSection = styled.div`
  flex: 1;
  background-color: #1A1A1A;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 2rem;
  width: 100%;
`;


const BackgroundGradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at top right, rgba(78, 204, 163, 0.15), transparent 70%),
              radial-gradient(circle at bottom left, rgba(78, 204, 163, 0.1), transparent 60%);
  pointer-events: none;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 440px;
  animation: ${fadeIn} 0.8s ease forwards;
`;

const FormHeader = styled.div`
  margin-bottom: 2.5rem;
`;

const FormHeading = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #eeeeee;
  margin-bottom: 0.75rem;
`;

const FormSubheading = styled.p`
  font-size: 1rem;
  color: #9e9e9e;
  line-height: 1.5;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const InputGroup = styled.div`
  position: relative;
`;

const InputLabel = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #9e9e9e;
  margin-bottom: 0.5rem;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const InputIcon = styled.div`
  position: absolute;
  left: 1rem;
  color: #9e9e9e;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  background-color: #2A2A2A;
  border: 1px solid #333333;
  border-radius: 8px;
  color: #eeeeee;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #4ECCA3;
    box-shadow: 0 0 0 3px rgba(78, 204, 163, 0.2);
  }
  
  &::placeholder {
    color: #666666;
  }
`;

const PasswordVisibilityToggle = styled.button`
  position: absolute;
  right: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #9e9e9e;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
  
  &:hover {
    color: #4ECCA3;
  }
  
  &:focus {
    outline: none;
  }
`;

const PasswordRequirements = styled.div`
  margin-top: 1rem;
`;

const RequirementItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  color: ${props => props.$met ? '#4ECCA3' : '#9e9e9e'};
  transition: color 0.3s;
`;

const RequirementIcon = styled.div`
  margin-right: 0.75rem;
  display: flex;
  align-items: center;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1.25rem;
  background-color: #4ECCA3;
  color: #121212;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  
  &:hover {
    background-color: #3db890;
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    background-color: #333333;
    color: #666666;
    cursor: not-allowed;
    transform: none;
  }
  
  &:disabled::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.1), transparent);
    animation: ${shimmer} 1.5s infinite;
  }
`;

const ButtonIcon = styled.span`
  margin-left: 0.5rem;
  display: flex;
  align-items: center;
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 2.5rem 0;
  
  &::before, &::after {
    content: "";
    flex: 1;
    height: 1px;
    background-color: #333333;
  }
  
  span {
    margin: 0 1rem;
    color: #9e9e9e;
    font-size: 0.9rem;
  }
`;

const SocialButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
`;

const SocialButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background-color: #2A2A2A;
  border: 1px solid #333333;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: ${props => props.$color || '#eeeeee'};
  
  &:hover {
    transform: translateY(-2px);
    background-color: #333333;
    border-color: #444444;
  }
`;

const ErrorMessage = styled.div`
  background-color: rgba(255, 87, 87, 0.1);
  border-left: 3px solid #ff5757;
  color: #ff8080;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
`;

const SuccessMessage = styled.div`
  background-color: rgba(78, 204, 163, 0.1);
  border-left: 3px solid #4ECCA3;
  color: #4ECCA3;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
`;

const SignUp = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Password validation
  const hasEightChars = password.length >= 8;
  const hasNumber = /\d/.test(password) || /[^a-zA-Z0-9]/.test(password);
  const hasMixedCase = /[a-z]/.test(password) && /[A-Z]/.test(password);
  const passwordsMatch = password === confirmPassword && password !== "";
  
  // Reset error on form change
  useEffect(() => {
    if (error) {
      setError("");
    }
  }, [name, email, password, confirmPassword]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!hasEightChars || !hasNumber || !hasMixedCase) {
      return setError("Please meet all password requirements");
    }
    
    if (!passwordsMatch) {
      return setError("Passwords do not match");
    }
    
    try {
      setLoading(true);
      await signup(email, password, name);
      setSuccess("Account created successfully! Redirecting...");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError(`Failed to create an account: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <LeftSideContent isLoginPage={false} />
      
      <RightSection>
        <BackgroundGradient />
        
        <FormContainer>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}
          
          <FormHeader>
            <FormHeading>Create Account</FormHeading>
            <FormSubheading>Build better habits and achieve your goals with Habo</FormSubheading>
          </FormHeader>
          
          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <InputLabel htmlFor="fullName">Full Name</InputLabel>
              <InputWrapper>
                <InputIcon>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </InputIcon>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </InputWrapper>
            </InputGroup>
            
            <InputGroup>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <InputWrapper>
                <InputIcon>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </InputIcon>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </InputWrapper>
            </InputGroup>
            
            <InputGroup>
              <InputLabel htmlFor="password">Password</InputLabel>
              <InputWrapper>
                <InputIcon>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 11V7C7 5.93913 7.42143 4.92172 8.17157 4.17157C8.92172 3.42143 9.93913 3 11 3H13C14.0609 3 15.0783 3.42143 15.8284 4.17157C16.5786 4.92172 17 5.93913 17 7V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </InputIcon>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <PasswordVisibilityToggle
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.9 4.24002C10.5883 4.0789 11.2931 3.99836 12 4.00002C19 4.00002 23 12 23 12C22.393 13.1356 21.6691 14.2048 20.84 15.19M14.12 14.12C13.8454 14.4148 13.5141 14.6512 13.1462 14.8151C12.7782 14.9791 12.3809 15.0673 11.9781 15.0744C11.5753 15.0815 11.1752 15.0074 10.8016 14.8565C10.4281 14.7056 10.0887 14.4811 9.80385 14.1962C9.51897 13.9113 9.29439 13.572 9.14351 13.1984C8.99262 12.8249 8.91853 12.4247 8.92563 12.0219C8.93274 11.6191 9.02091 11.2219 9.18488 10.8539C9.34884 10.4859 9.58525 10.1547 9.88 9.88002M17.94 17.94C16.2306 19.243 14.1491 19.9649 12 20C5 20 1 12 1 12C2.24389 9.68192 3.96914 7.65663 6.06 6.06002L17.94 17.94Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M1 1L23 23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </PasswordVisibilityToggle>
              </InputWrapper>
              
              <PasswordRequirements>
                <RequirementItem $met={hasEightChars}>
                  <RequirementIcon>
                    {hasEightChars ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    )}
                  </RequirementIcon>
                  At least 8 characters
                </RequirementItem>
                
                <RequirementItem $met={hasNumber}>
                  <RequirementIcon>
                    {hasNumber ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    )}
                  </RequirementIcon>
                  At least one number or symbol
                </RequirementItem>
                
                <RequirementItem $met={hasMixedCase}>
                  <RequirementIcon>
                    {hasMixedCase ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    )}
                  </RequirementIcon>
                  Mix of uppercase and lowercase
                </RequirementItem>
              </PasswordRequirements>
            </InputGroup>
            
            <InputGroup>
              <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
              <InputWrapper>
                <InputIcon>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 11V7C7 5.93913 7.42143 4.92172 8.17157 4.17157C8.92172 3.42143 9.93913 3 11 3H13C14.0609 3 15.0783 3.42143 15.8284 4.17157C16.5786 4.92172 17 5.93913 17 7V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </InputIcon>
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </InputWrapper>
              
              {confirmPassword && (
                <RequirementItem $met={passwordsMatch} style={{ marginTop: '0.5rem' }}>
                  <RequirementIcon>
                    {passwordsMatch ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </RequirementIcon>
                  Passwords match
                </RequirementItem>
              )}
            </InputGroup>
            
            <SubmitButton 
              type="submit" 
              disabled={loading || !hasEightChars || !hasNumber || !hasMixedCase || !passwordsMatch}
            >
              {loading ? "Creating Account..." : "Create Account"}
              {!loading && (
                <ButtonIcon>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </ButtonIcon>
              )}
            </SubmitButton>
          </Form>
          
          <Divider>
            <span>or continue with</span>
          </Divider>
          
          <SocialButtonsContainer>
            <SocialButton $color="#1877F2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12.073c0-5.97-4.85-10.82-10.82-10.82S2.36 6.103 2.36 12.073c0 5.395 3.935 9.88 9.1 10.68v-7.56H8.38v-3.12h3.08v-2.38c0-3.04 1.815-4.72 4.585-4.72 1.33 0 2.72.235 2.72.235v2.99h-1.53c-1.505 0-1.975.935-1.975 1.895v2.28h3.36l-.535 3.12h-2.825v7.56c5.165-.8 9.1-5.285 9.1-10.68z" />
              </svg>
            </SocialButton>
            <SocialButton $color="#DB4437">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.48 10.92v3.28h4.92c-.2 1.28-1.5 3.72-4.92 3.72-2.96 0-5.36-2.44-5.36-5.48s2.4-5.48 5.36-5.48c1.68 0 2.8.72 3.44 1.32l2.36-2.24c-1.52-1.44-3.48-2.32-5.8-2.32-4.8 0-8.68 3.88-8.68 8.72s3.88 8.72 8.68 8.72c5 0 8.32-3.48 8.32-8.4 0-.56-.08-1-.16-1.44h-8.16z" />
              </svg>
            </SocialButton>
            <SocialButton $color="#000000">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.05 20.28c-.98.95-2.05 1.26-3.18 1.26-1.25 0-2.37-.48-3.35-1.42-2.12-2-2.12-4.68-1.68-6.82.47-2.27 2.12-4.14 4.25-4.14 1.39 0 2.6.71 3.32 1.42.72.71 1.25 1.7 1.35 2.83h-5.86c0 1.14.24 2.27.76 3.17.5.83 1.25 1.37 2.37 1.37.95 0 1.59-.26 2.28-.95zm-3.18-9.42c-1.54 0-2.37 1.06-2.37 2.34h4.74c0-1.28-.83-2.34-2.37-2.34zM12 2C6.46 2 2 6.46 2 12s4.46 10 10 10 10-4.46 10-10S17.54 2 12 2z" />
              </svg>
            </SocialButton>
          </SocialButtonsContainer>
        </FormContainer>
      </RightSection>
    </Container>
  );
};

export default SignUp;