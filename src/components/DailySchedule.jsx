// src/components/DailySchedule.jsx
import styled from 'styled-components';
import { useState } from 'react';

const ScheduleContainer = styled.div`
  background-color: white;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

const TimelineContainer = styled.div`
  display: flex;
  position: relative;
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const TimeMarkers = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const TimeMarker = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textLight};
  flex: 1;
  text-align: center;
`;

const Timeline = styled.div`
  position: relative;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.border};
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const TimelineMarker = styled.div`
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${({ theme, active }) => active ? theme.colors.primary : theme.colors.border};
  transform: translate(-50%, -50%);
  top: 50%;
  cursor: pointer;
  z-index: 2;
  
  &::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 2px solid ${({ theme, active }) => active ? theme.colors.primary : 'transparent'};
  }
`;

const ActiveTimeIndicator = styled.div`
  position: absolute;
  width: 3px;
  height: 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  top: -9px;
  left: ${props => props.position}%;
  z-index: 1;
`;

const ActivitiesContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const ActivityItem = styled.div`
  display: flex;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme, isActive }) => isActive ? theme.colors.primary + '20' : theme.colors.background};
`;

const CategoryLabel = styled.div`
  background-color: ${props => props.color};
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  font-size: 12px;
  margin-right: ${({ theme }) => theme.spacing.md};
`;

const ActivityTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
`;

const ActivityParticipants = styled.div`
  display: flex;
  margin-left: auto;
`;

const ParticipantAvatar = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${props => props.color};
  border: 2px solid white;
  margin-left: -8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: white;
  font-weight: bold;
  
  &:first-child {
    margin-left: 0;
  }
`;

const DailySchedule = () => {
  const [activeTime, setActiveTime] = useState(14); // 14:00
  
  const hoursOfDay = Array.from({ length: 13 }, (_, i) => i + 7); // 7:00 to 19:00
  
  const activities = [
    {
      id: '1',
      category: 'Workout',
      title: 'Jogging & Relaxation',
      time: 9, // 9:00
      participants: [
        { id: '1', initials: 'JD', color: '#f97316' },
        { id: '2', initials: 'MK', color: '#3b82f6' },
        { id: '3', initials: 'AR', color: '#10b981' },
      ],
      color: '#3b82f6',
    },
    {
      id: '2',
      category: 'Kitchen',
      title: 'Last Hope Kitchen',
      time: 12, // 12:00
      participants: [
        { id: '1', initials: 'JD', color: '#f97316' },
      ],
      color: '#3b82f6',
    },
    {
      id: '3',
      category: 'Creator',
      title: 'Part 12: Reading Book',
      time: 14, // 14:00
      participants: [
        { id: '1', initials: 'JD', color: '#f97316' },
        { id: '2', initials: 'MK', color: '#3b82f6' },
        { id: '3', initials: 'AR', color: '#10b981' },
      ],
      color: '#f97316',
    },
    {
      id: '4',
      category: 'Kitchen',
      title: 'Cooking Soup',
      time: 16, // 16:00
      participants: [
        { id: '1', initials: 'JD', color: '#f97316' },
      ],
      color: '#8b5cf6',
    },
  ];
  
  const getPositionPercentage = (hour) => {
    const minHour = 7; // 7:00
    const maxHour = 19; // 19:00
    return ((hour - minHour) / (maxHour - minHour)) * 100;
  };
  
  const filteredActivities = activities.filter(
    activity => Math.abs(activity.time - activeTime) <= 2
  );
  
  return (
    <ScheduleContainer>
      <TimeMarkers>
        {hoursOfDay.map(hour => (
          <TimeMarker key={hour}>
            {hour}:00
          </TimeMarker>
        ))}
      </TimeMarkers>
      
      <TimelineContainer>
        <Timeline>
          <ActiveTimeIndicator position={getPositionPercentage(activeTime)} />
          
          {activities.map(activity => (
            <TimelineMarker 
              key={activity.id}
              style={{ left: `${getPositionPercentage(activity.time)}%` }}
              active={activity.time === activeTime}
              onClick={() => setActiveTime(activity.time)}
            />
          ))}
        </Timeline>
      </TimelineContainer>
      
      <ActivitiesContainer>
        {filteredActivities.map(activity => (
          <ActivityItem key={activity.id} isActive={activity.time === activeTime}>
            <CategoryLabel color={activity.color}>{activity.category}</CategoryLabel>
            <ActivityTitle>{activity.title}</ActivityTitle>
            <ActivityParticipants>
              {activity.participants.map(participant => (
                <ParticipantAvatar 
                  key={participant.id} 
                  color={participant.color}
                >
                  {participant.initials}
                </ParticipantAvatar>
              ))}
            </ActivityParticipants>
          </ActivityItem>
        ))}
      </ActivitiesContainer>
    </ScheduleContainer>
  );
};

export default DailySchedule;