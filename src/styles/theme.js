// src/styles/theme.js
const theme = {
  colors: {
    primary: '#4ade80',
    primaryDark: '#22c55e',
    primaryLight: 'rgba(74, 222, 128, 0.15)',
    background: '#121212',
    backgroundAlt: '#1E1E1E',
    backgroundInput: '#2A2A2A',
    card: '#1E1E1E',
    text: '#F3F4F6',
    textSecondary: '#9E9E9E',
    textMuted: '#6B7280',
    border: '#3A3A3A',
    divider: 'rgba(255, 255, 255, 0.08)',
    error: '#ef4444',
    errorLight: 'rgba(239, 68, 68, 0.15)',
    warning: '#f59e0b',
    warningLight: 'rgba(245, 158, 11, 0.15)', 
    success: '#10b981',
    successLight: 'rgba(16, 185, 129, 0.15)',
    info: '#0ea5e9',
    infoLight: 'rgba(14, 165, 233, 0.15)',
    focus: 'rgba(74, 222, 128, 0.5)'
  },
  
  borderRadius: {
    xs: '2px',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px'
  },
  
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.06)'
  },
  
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontSizes: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      md: '1rem',       // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.75rem', // 28px
      '4xl': '2rem',    // 32px
      '5xl': '2.5rem'   // 40px
    },
    fontWeights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    },
    lineHeights: {
      none: 1,
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2
    }
  },
  
  transitions: {
    default: '0.2s ease',
    fast: '0.1s ease',
    slow: '0.3s ease'
  },
  
  zIndex: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    toast: 1600,
    tooltip: 1700
  },
  
  form: {
    input: {
      background: '#2A2A2A',
      borderColor: '#3A3A3A',
      borderRadius: '8px',
      padding: '12px 16px',
      fontSize: '0.9375rem',
      height: '48px',
      focusBorderColor: '#4ade80',
      focusShadow: '0 0 0 2px rgba(74, 222, 128, 0.25)',
      placeholderColor: '#6B7280',
      transition: '0.2s ease',
      error: {
        borderColor: '#ef4444',
        shadow: '0 0 0 2px rgba(239, 68, 68, 0.25)'
      }
    },
    label: {
      color: '#9E9E9E',
      fontSize: '0.875rem',
      fontWeight: 500,
      marginBottom: '6px'
    },
    select: {
      background: '#2A2A2A',
      iconColor: '#9E9E9E'
    },
    checkbox: {
      size: '18px',
      borderRadius: '4px',
      background: 'transparent',
      borderColor: '#3A3A3A',
      checkedBackground: '#4ade80',
      checkedBorderColor: '#4ade80',
      focusShadow: '0 0 0 2px rgba(74, 222, 128, 0.25)'
    }
  },
  
  button: {
    borderRadius: '8px',
    fontWeight: 600,
    transition: '0.2s ease',
    height: {
      sm: '32px',
      md: '40px',
      lg: '48px'
    },
    padding: {
      sm: '0 12px',
      md: '0 16px', 
      lg: '0 20px'
    },
    primary: {
      background: '#4ade80',
      color: '#121212',
      hoverBackground: '#22c55e',
      activeBackground: '#16a34a'
    },
    secondary: {
      background: 'rgba(255, 255, 255, 0.1)',
      color: '#F3F4F6',
      hoverBackground: 'rgba(255, 255, 255, 0.15)',
      activeBackground: 'rgba(255, 255, 255, 0.2)'
    },
    danger: {
      background: '#ef4444',
      color: '#ffffff',
      hoverBackground: '#dc2626',
      activeBackground: '#b91c1c'
    },
    ghost: {
      background: 'transparent',
      color: '#F3F4F6',
      hoverBackground: 'rgba(255, 255, 255, 0.1)',
      activeBackground: 'rgba(255, 255, 255, 0.15)'
    }
  },
  
  card: {
    background: '#1E1E1E',
    borderRadius: '12px',
    padding: '20px',
    shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)',
    border: '1px solid #2A2A2A',
    hoverBorder: '1px solid #3A3A3A',
    headerPadding: '16px 20px',
    bodyPadding: '20px',
    footerPadding: '16px 20px'
  }
};

export default theme;