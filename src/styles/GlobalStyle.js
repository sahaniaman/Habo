// src/styles/GlobalStyle.js
import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: #f5f7fa;
    color: #333;
  }
  
  .app-container {
    display: flex;
    height: 100vh;
  }
  
  .main-content {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: 500;
  cursor: pointer;

  ${({ $primary, theme }) =>
    $primary &&
    `
    background-color: ${theme.colors.primary};
    color: white;
    border: none;

    &:hover {
      opacity: 0.9;
    }
  `}

  ${({ $variant, theme }) =>
    $variant === "secondary" &&
    `
    background-color: white;
    color: ${theme.colors.text};
    border: 1px solid ${theme.colors.border};

    &:hover {
      background-color: ${theme.colors.background};
    }
  `}
`;

export default GlobalStyle;