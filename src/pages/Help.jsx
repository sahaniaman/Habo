import React, { useState, useEffect } from "react";
import styled from "styled-components";
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

const SearchBar = styled.div`
  margin-bottom: 2rem;
  position: relative;
`;

const SearchInput = styled.input`
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid ${colors.border};
  border-radius: 0.5rem;
  padding: 0.75rem 0.75rem 0.75rem 2.5rem;
  color: ${colors.text};
  font-size: 1rem;
  width: 100%;
  outline: none;
  transition: border-color 0.2s;
  
  &:focus {
    border-color: ${colors.accent};
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${colors.textMuted};
`;

const FAQItem = styled.div`
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const FAQQuestion = styled.button`
  background-color: transparent;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  text-align: left;
  padding: 0.75rem 0;
  color: ${colors.text};
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
`;

const FAQAnswer = styled.div`
  color: ${colors.textMuted};
  padding: 0.5rem 0 1rem;
  line-height: 1.6;
  border-bottom: 1px solid ${colors.border};
`;

const ContactForm = styled.form`
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

const TextArea = styled.textarea`
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid ${colors.border};
  border-radius: 0.5rem;
  padding: 0.75rem;
  color: ${colors.text};
  font-size: 1rem;
  width: 100%;
  min-height: 120px;
  resize: vertical;
  outline: none;
  transition: border-color 0.2s;
  
  &:focus {
    border-color: ${colors.accent};
  }
`;

const Button = styled.button`
  background-color: ${colors.accent};
  color: #121212;
  border: none;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  width: fit-content;
  
  &:hover {
    background-color: ${colors.accentDark};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled.div`
  background-color: rgba(16, 185, 129, 0.1);
  color: ${colors.success};
  padding: 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

const IconBox = styled.div`
  background-color: ${colors.accentLight};
  color: ${colors.accent};
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.75rem;
`;

const SupportOption = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const SupportOptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

const SupportTitle = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: ${colors.text};
`;

const SupportDescription = styled.p`
  font-size: 0.875rem;
  color: ${colors.textMuted};
`;

const IconButton = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${colors.accent};
  text-decoration: none;
  margin-top: 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Help = () => {
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  if (pageLoading) {
    return <LoadingSpinner text="Loading help resources..." />;
  }

  const faqs = [
    {
      id: 1,
      question: "How do I create a new habit?",
      answer: "To create a new habit, navigate to the Habits page and click the '+ New Habit' button. Fill out the habit details including name, description, frequency, and reminders. Click 'Create Habit' to save your new habit."
    },
    {
      id: 2,
      question: "How do I track my progress?",
      answer: "You can track your progress in two ways: on the main Dashboard, which shows your overall statistics, and on the Analytics page, which provides detailed charts and insights about your habit performance over time."
    },
    {
      id: 3,
      question: "Can I set reminders for my habits?",
      answer: "Yes, when creating or editing a habit, you can set reminders for specific times. You can also manage all your notification preferences in the Settings page under 'Application Settings'."
    },
    {
      id: 4,
      question: "How do I edit or delete a habit?",
      answer: "On the Habits page, click on the three dots menu next to the habit you want to modify. Select 'Edit' to change habit details or 'Delete' to remove the habit completely."
    },
    {
      id: 5,
      question: "Can I customize the appearance of the app?",
      answer: "Yes, you can toggle between light and dark mode in the Settings page under 'Application Settings'."
    },
    {
      id: 6,
      question: "How do streaks work?",
      answer: "A streak is counted when you complete a habit consistently according to its frequency. For daily habits, you need to complete them every day. For weekly habits, you need to meet your weekly goal. Streaks are reset when you miss a scheduled completion."
    }
  ];

  const toggleFAQ = (id) => {
    if (expandedFAQ === id) {
      setExpandedFAQ(null);
    } else {
      setExpandedFAQ(id);
    }
  };

  const filteredFAQs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm({
      ...contactForm,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    console.log("Form submitted:", contactForm);
    setSubmitted(true);
    setContactForm({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <Container>
      <SectionTitle>Help & Support</SectionTitle>
      
      <SearchBar>
        <SearchIcon>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </SearchIcon>
        <SearchInput 
          type="text" 
          placeholder="Search for help..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SearchBar>
      
      <Card>
        <SectionTitle>Support Options</SectionTitle>
        <SupportOptionsGrid>
          <SupportOption>
            <IconBox>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
            </IconBox>
            <SupportTitle>Live Chat</SupportTitle>
            <SupportDescription>Chat with our support team in real-time during business hours.</SupportDescription>
            <IconButton href="#">
              Start Chat
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </IconButton>
          </SupportOption>
          
          <SupportOption>
            <IconBox>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </IconBox>
            <SupportTitle>Email Support</SupportTitle>
            <SupportDescription>Send us an email and we'll get back to you within 24 hours.</SupportDescription>
            <IconButton href="mailto:support@habitbuilder.com">
              support@habitbuilder.com
            </IconButton>
          </SupportOption>
          
          <SupportOption>
            <IconBox>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 2H3v16h5v4l4-4h9V2z"></path>
                <path d="M9 9h6"></path>
                <path d="M9 13h6"></path>
              </svg>
            </IconBox>
            <SupportTitle>Knowledge Base</SupportTitle>
            <SupportDescription>Browse our comprehensive guides and tutorials.</SupportDescription>
            <IconButton href="#">
              Visit Knowledge Base
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </IconButton>
          </SupportOption>
          
          <SupportOption>
            <IconBox>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </IconBox>
            <SupportTitle>Community</SupportTitle>
            <SupportDescription>Join our community forum to connect with other users.</SupportDescription>
            <IconButton href="#">
              Join Community
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </IconButton>
          </SupportOption>
        </SupportOptionsGrid>
      </Card>

      <SectionTitle>Frequently Asked Questions</SectionTitle>
      
      <Card>
        {filteredFAQs.length > 0 ? (
          filteredFAQs.map(faq => (
            <FAQItem key={faq.id}>
              <FAQQuestion onClick={() => toggleFAQ(faq.id)}>
                {faq.question}
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  style={{ 
                    transform: expandedFAQ === faq.id ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform 0.2s'
                  }}
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </FAQQuestion>
              {expandedFAQ === faq.id && (
                <FAQAnswer>{faq.answer}</FAQAnswer>
              )}
            </FAQItem>
          ))
        ) : (
          <div style={{ color: colors.textMuted }}>No results found for "{searchQuery}"</div>
        )}
      </Card>
      
      <SectionTitle>Contact Us</SectionTitle>
      
      <Card>
        <ContactForm onSubmit={handleSubmit}>
          {submitted && (
            <SuccessMessage>
              Thank you for your message! We'll get back to you soon.
            </SuccessMessage>
          )}
          
          <FormGroup>
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={contactForm.name}
              onChange={handleContactChange}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={contactForm.email}
              onChange={handleContactChange}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="subject">Subject</Label>
            <Input
              type="text"
              id="subject"
              name="subject"
              value={contactForm.subject}
              onChange={handleContactChange}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="message">Message</Label>
            <TextArea
              id="message"
              name="message"
              value={contactForm.message}
              onChange={handleContactChange}
              required
            />
          </FormGroup>
          
          <Button type="submit">Send Message</Button>
        </ContactForm>
      </Card>
    </Container>
  );
};

export default Help;