import React, { createContext, useContext, useState, ReactNode } from 'react';
import { InvitationData, Template } from '../types/invitation';

interface InvitationContextType {
  invitationData: InvitationData;
  updateInvitation: (updates: Partial<InvitationData>) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  selectedTemplate: Template | null;
  setSelectedTemplate: (template: Template) => void;
}

const defaultInvitationData: InvitationData = {
  id: '',
  template: '',
  coupleNames: {
    bride: 'Sarah',
    groom: 'Michael'
  },
  date: '2024-06-15',
  time: '16:00',
  venue: {
    name: 'Garden Rose Venue',
    address: '123 Rose Garden Lane, Beverly Hills, CA 90210'
  },
  message: 'Together with our families, we joyfully invite you to celebrate our wedding day.',
  photos: {
    main: 'https://images.unsplash.com/photo-1724812773350-a7d0bf664417?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd2VkZGluZyUyMGNvdXBsZXxlbnwxfHx8fDE3NTc3NjAxMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    couple: 'https://images.unsplash.com/photo-1724812773350-a7d0bf664417?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd2VkZGluZyUyMGNvdXBsZXxlbnwxfHx8fDE3NTc3NjAxMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  rsvp: {
    enabled: true,
    deadline: '2024-05-15'
  },
  colors: {
    primary: '#8B5A3C',
    secondary: '#F4E4C1',
    accent: '#D4AF37'
  }
};

const InvitationContext = createContext<InvitationContextType | undefined>(undefined);

export function InvitationProvider({ children }: { children: ReactNode }) {
  const [invitationData, setInvitationData] = useState<InvitationData>(defaultInvitationData);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const updateInvitation = (updates: Partial<InvitationData>) => {
    setInvitationData(prev => ({ ...prev, ...updates }));
  };

  return (
    <InvitationContext.Provider value={{
      invitationData,
      updateInvitation,
      currentStep,
      setCurrentStep,
      selectedTemplate,
      setSelectedTemplate
    }}>
      {children}
    </InvitationContext.Provider>
  );
}

export function useInvitation() {
  const context = useContext(InvitationContext);
  if (context === undefined) {
    throw new Error('useInvitation must be used within an InvitationProvider');
  }
  return context;
}