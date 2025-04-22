// src/components/AddHabitForm.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { createHabit } from "../firebase/habitService";
import { useAuth } from "../contexts/AuthContext";

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(2px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${({ theme }) => theme.zIndex.modal};
  padding: 16px;
`;

const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.xl};
  padding: 24px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  color: ${({ theme }) => theme.colors.text};
`;

const Title = styled.h2`
  margin-bottom: 24px;
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.form.input.padding};
  background-color: ${({ theme }) => theme.form.input.background};
  border: 1px solid ${({ theme }) => theme.form.input.borderColor};
  border-radius: ${({ theme }) => theme.form.input.borderRadius};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.form.input.fontSize};
  
  &::placeholder {
    color: ${({ theme }) => theme.form.input.placeholderColor};
  }
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.form.input.focusShadow};
  }
`;

const Select = styled.select`
  padding: ${({ theme }) => theme.form.input.padding};
  background-color: ${({ theme }) => theme.form.input.background};
  border: 1px solid ${({ theme }) => theme.form.input.borderColor};
  border-radius: ${({ theme }) => theme.form.input.borderRadius};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.form.input.fontSize};
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%239E9E9E' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 40px;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.form.input.focusShadow};
  }
  
  & option {
    background-color: ${({ theme }) => theme.colors.backgroundAlt};
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Textarea = styled.textarea`
  padding: ${({ theme }) => theme.form.input.padding};
  min-height: 100px;
  resize: vertical;
  background-color: ${({ theme }) => theme.form.input.background};
  border: 1px solid ${({ theme }) => theme.form.input.borderColor};
  border-radius: ${({ theme }) => theme.form.input.borderRadius};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.form.input.fontSize};
  
  &::placeholder {
    color: ${({ theme }) => theme.form.input.placeholderColor};
  }
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.form.input.focusShadow};
  }
`;

const ColorOptions = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 8px;
`;

const ColorOption = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${props => props.$color};
  cursor: pointer;
  border: 2px solid ${props => props.$selected 
    ? props.theme.colors.text 
    : 'transparent'};
  box-shadow: ${props => props.$selected 
    ? '0 0 0 2px rgba(255, 255, 255, 0.1)' 
    : 'none'};
  transition: all ${({ theme }) => theme.transitions.default};
  
  &:hover {
    transform: scale(1.1);
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
`;

const CheckboxInput = styled.input`
  width: ${({ theme }) => theme.form.checkbox.size};
  height: ${({ theme }) => theme.form.checkbox.size};
  appearance: none;
  background-color: ${({ theme }) => theme.form.checkbox.background};
  border: 1px solid ${({ theme }) => theme.form.checkbox.borderColor};
  border-radius: ${({ theme }) => theme.form.checkbox.borderRadius};
  cursor: pointer;
  position: relative;
  
  &:checked {
    background-color: ${({ theme }) => theme.form.checkbox.checkedBackground};
    border-color: ${({ theme }) => theme.form.checkbox.checkedBorderColor};
  }
  
  &:checked::after {
    content: "✓";
    color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 12px;
  }
  
  &:focus {
    outline: none;
    box-shadow: ${({ theme }) => theme.form.checkbox.focusShadow};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 16px;
`;

const Button = styled.button`
  padding: ${({ theme, $size }) => 
    $size === 'sm' ? theme.button.padding.sm : 
    $size === 'lg' ? theme.button.padding.lg : 
    theme.button.padding.md};
  height: ${({ theme, $size }) => 
    $size === 'sm' ? theme.button.height.sm : 
    $size === 'lg' ? theme.button.height.lg : 
    theme.button.height.md};
  border-radius: ${({ theme }) => theme.button.borderRadius};
  font-weight: ${({ theme }) => theme.button.fontWeight};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.default};
  
  background-color: ${({ theme, $variant }) => 
    $variant === 'primary' ? theme.button.primary.background :
    $variant === 'danger' ? theme.button.danger.background :
    theme.button.secondary.background};
    
  color: ${({ theme, $variant }) => 
    $variant === 'primary' ? theme.button.primary.color :
    $variant === 'danger' ? theme.button.danger.color :
    theme.button.secondary.color};
    
  border: none;
  
  &:hover {
    background-color: ${({ theme, $variant }) => 
      $variant === 'primary' ? theme.button.primary.hoverBackground :
      $variant === 'danger' ? theme.button.danger.hoverBackground :
      theme.button.secondary.hoverBackground};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Error = styled.div`
  color: ${({ theme }) => theme.colors.error};
  background-color: ${({ theme }) => theme.colors.errorLight};
  padding: 12px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: 16px;
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
`;

const AddHabitForm = ({ onClose, onHabitAdded }) => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    title: "",
    category: "Health",
    description: "",
    color: "#4ade80",
    frequency: "daily",
    reminder: false,
    reminderTime: "08:00"
  });
  
  // Define color options
  const colorOptions = [
    "#4ade80", // Green
    "#3b82f6", // Blue
    "#f97316", // Orange
    "#8b5cf6", // Purple
    "#ef4444", // Red
    "#f59e0b", // Amber
    "#06b6d4", // Cyan
    "#ec4899"  // Pink
  ];
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };
  
  // Handle color selection
  const handleColorSelect = (color) => {
    setFormData(prev => ({
      ...prev,
      color
    }));
  };
  
  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title.trim()) {
      setError("Habit name is required");
      return;
    }
    
    try {
      setLoading(true);
      setError("");
      
      console.log("Current user:", currentUser);
      if (!currentUser || !currentUser.uid) {
        throw new Error("You must be logged in to add a habit");
      }
      
      // Prepare habit data
      const habitData = {
        title: formData.title.trim(),
        category: formData.category,
        description: formData.description.trim(),
        color: formData.color,
        frequency: formData.frequency,
        reminder: {
          enabled: formData.reminder,
          time: formData.reminder ? formData.reminderTime : null
        }
      };
      
      console.log("Submitting habit:", habitData);
      console.log("User ID:", currentUser.uid);
      
      // Create the habit in Firebase
      const newHabit = await createHabit(habitData, currentUser.uid);
      
      console.log("Habit created:", newHabit);
      
      // Notify parent component
      if (onHabitAdded) {
        onHabitAdded(newHabit);
      }
      
      // Close the modal
      onClose();
      
    } catch (err) {
      console.error("Error adding habit:", err);
      setError(err.message || "Failed to create habit. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Modal onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <Title>Add New Habit</Title>
        
        {error && <Error>{error}</Error>}
        
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="title">Habit Name *</Label>
            <Input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Morning Meditation"
              required
              autoFocus
              disabled={loading}
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="category">Category</Label>
            <Select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="Health">Health</option>
              <option value="Fitness">Fitness</option>
              <option value="Productivity">Productivity</option>
              <option value="Learning">Learning</option>
              <option value="Mindfulness">Mindfulness</option>
            </Select>
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="frequency">Frequency</Label>
            <Select
              id="frequency"
              name="frequency"
              value={formData.frequency}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </Select>
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Why is this habit important to you?"
              disabled={loading}
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Color</Label>
            <ColorOptions>
              {colorOptions.map(color => (
                <ColorOption 
                  key={color}
                  $color={color}
                  $selected={formData.color === color}
                  onClick={() => !loading && handleColorSelect(color)}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </ColorOptions>
          </FormGroup>
          
          <FormGroup>
            <CheckboxContainer>
              <CheckboxInput
                type="checkbox"
                id="reminder"
                name="reminder"
                checked={formData.reminder}
                onChange={handleChange}
                disabled={loading}
              />
              <Label htmlFor="reminder">Set Reminder</Label>
            </CheckboxContainer>
            
            {formData.reminder && (
              <Input
                type="time"
                name="reminderTime"
                value={formData.reminderTime}
                onChange={handleChange}
                disabled={loading}
                style={{ marginTop: '8px' }}
                required
              />
            )}
          </FormGroup>
          
          <ButtonGroup>
            <Button 
              type="button" 
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              $variant="primary"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Habit"}
            </Button>
          </ButtonGroup>
        </Form>
      </ModalContent>
    </Modal>
  );
};

export default AddHabitForm;