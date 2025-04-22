import React, { useState, useEffect, Suspense } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import LoadingSpinner from "./components/LoadingSpinner";
import FullscreenLoader from "./components/FullscreenLoader";
import Layout from "./components/Layout";
import Dashboard from "./pages/DashboardNew";
import Habits from "./pages/Habits";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import Login from "./pages/Login";
import { useAuth } from "./contexts/AuthContext";

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Suspense fallback={<FullscreenLoader text="Loading application..." />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Each route with Layout wrapper */}
        <Route 
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/habits"
          element={
            <ProtectedRoute>
              <Layout>
                <Habits />
              </Layout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/analytics"
          element={
            <ProtectedRoute>
              <Layout>
                <Analytics />
              </Layout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/settings"
          element={
            <ProtectedRoute>
              <Layout>
                <Settings />
              </Layout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/help"
          element={
            <ProtectedRoute>
              <Layout>
                <Help />
              </Layout>
            </ProtectedRoute>
          } 
        />
        
        {/* 404 page */}
        <Route 
          path="*" 
          element={
            <Layout>
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                height: '70vh',
                color: '#F3F4F6'
              }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>404 - Page Not Found</h1>
                <p>The page you are looking for doesn't exist.</p>
                <button 
                  onClick={() => window.history.back()}
                  style={{
                    backgroundColor: '#4ade80',
                    color: '#121212',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    marginTop: '1rem',
                    cursor: 'pointer'
                  }}
                >
                  Go Back
                </button>
              </div>
            </Layout>
          } 
        />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;