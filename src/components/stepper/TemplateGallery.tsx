import React from 'react';
import { useInvitation } from '../../contexts/InvitationContext';
import { ImageWithFallback } from '../ImageWithFallback';
import { Template } from '../../types/invitation';
import { Button } from '../common/button';
import { Card, CardContent } from '../common/cards';

const templates: Template[] = [
  {
    id: 'classic-elegance',
    name: 'Classic Elegance',
    preview: 'https://images.unsplash.com/photo-1724812773350-a7d0bf664417?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd2VkZGluZyUyMGNvdXBsZXxlbnwxfHx8fDE3NTc3NjAxMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    style: 'classic',
    colors: {
      primary: '#8B5A3C',
      secondary: '#F4E4C1',
      accent: '#D4AF37'
    }
  },
  {
    id: 'garden-romance',
    name: 'Garden Romance',
    preview: 'https://images.unsplash.com/photo-1743968421393-ad7fa013df0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxyb21hbnRpYyUyMGdhcmRlbiUyMHdlZGRpbmd8ZW58MXx8fHwxNzU3NzYwMTA1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    style: 'bohemian',
    colors: {
      primary: '#4A6741',
      secondary: '#E8F5E8',
      accent: '#FF6B9D'
    }
  },
  {
    id: 'vintage-charm',
    name: 'Vintage Charm',
    preview: 'https://images.unsplash.com/photo-1550522233-57798719b886?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwd2VkZGluZyUyMGRlY29yYXRpb25zfGVufDF8fHx8MTc1Nzc2MDEwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    style: 'vintage',
    colors: {
      primary: '#8B4513',
      secondary: '#F5DEB3',
      accent: '#CD853F'
    }
  },
  {
    id: 'modern-minimal',
    name: 'Modern Minimal',
    preview: 'https://images.unsplash.com/photo-1692897507174-18888393e47f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBtaW5pbWFsaXN0JTIwd2VkZGluZ3xlbnwxfHx8fDE3NTc3NjAxMTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    style: 'minimalist',
    colors: {
      primary: '#2C3E50',
      secondary: '#ECF0F1',
      accent: '#E74C3C'
    }
  },
  {
    id: 'beach-sunset',
    name: 'Beach Sunset',
    preview: 'https://images.unsplash.com/photo-1629942878547-cfd0c89b54d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHdlZGRpbmclMjBzdW5zZXR8ZW58MXx8fHwxNzU3NzYwMTE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    style: 'modern',
    colors: {
      primary: '#FF6B35',
      secondary: '#F7F3E9',
      accent: '#4ECDC4'
    }
  },
  {
    id: 'royal-luxury',
    name: 'Royal Luxury',
    preview: 'https://images.unsplash.com/photo-1724812773350-a7d0bf664417?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd2VkZGluZyUyMGNvdXBsZXxlbnwxfHx8fDE3NTc3NjAxMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    style: 'classic',
    colors: {
      primary: '#4B0082',
      secondary: '#F8F8FF',
      accent: '#FFD700'
    }
  }
];

export function TemplateGallery() {
  const { setSelectedTemplate, setCurrentStep } = useInvitation();

  const handleSelectTemplate = (template: Template) => {
    setSelectedTemplate(template);
    setCurrentStep(1);
  };

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="mb-4">Choose Your Wedding Invitation Design</h2>
          <p className="text-muted-foreground">Select from our beautiful collection of wedding invitation templates</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <Card key={template.id} className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="relative aspect-[3/4]">
                  <ImageWithFallback
                    src={template.preview}
                    alt={template.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                      onClick={() => handleSelectTemplate(template)}
                      className="bg-white text-black hover:bg-gray-100 p-2 rounded-md"
                    >
                      <span className='font-semibold'>Select Template</span>
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="mb-2">{template.name}</h3>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: template.colors.primary }}
                    />
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: template.colors.secondary }}
                    />
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: template.colors.accent }}
                    />
                    <span className="text-sm text-muted-foreground capitalize ml-2">
                      {template.style}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}