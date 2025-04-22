// src/components/HabitCard.jsx
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Card = styled(Link)`
  background-color: white;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const CardImage = styled.div`
  height: 120px;
  background-color: ${props => props.color};
  padding: ${({ theme }) => theme.spacing.md};
  position: relative;
  color: white;
`;

const Category = styled.div`
  font-weight: 600;
  font-size: 20px;
  margin-bottom: 8px;
`;

const Title = styled.div`
  font-size: 16px;
`;

const ProgressContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;

const ProgressLabel = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 4px;
`;

const ProgressText = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textLight};
`;

const HabitCard = ({ habit }) => {
  return (
    <Card to={`/activity/${habit.id}`}>
      <CardImage color={habit.color}>
        <Category>{habit.category}</Category>
        <Title>{habit.title}</Title>
      </CardImage>
      <ProgressContainer>
        <ProgressLabel>{habit.progress}%</ProgressLabel>
        <ProgressText>Completed Activity</ProgressText>
      </ProgressContainer>
    </Card>
  );
};

export default HabitCard;  // This line was missing