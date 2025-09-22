import React, { useEffect, useRef } from 'react';
import { CheckCircle, Circle } from 'lucide-react';
import { useInvitation } from '../contexts/InvitationContext';

const steps = [
  { id: 0, title: 'Choose Design' },
  { id: 1, title: 'Add Details' },
  { id: 2, title: 'Upload Photos' },
  { id: 3, title: 'Extras' },
  { id: 4, title: 'Preview' }
];

export function StepIndicator() {
  const { currentStep } = useInvitation();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const currentStepRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to current step on mobile
  useEffect(() => {
    if (scrollContainerRef.current && currentStepRef.current) {
      const container = scrollContainerRef.current;
      const currentElement = currentStepRef.current;
      
      const containerWidth = container.clientWidth;
      const currentElementLeft = currentElement.offsetLeft;
      const currentElementWidth = currentElement.clientWidth;
      
      // Calculate scroll position to center the current step
      const scrollPosition = currentElementLeft - (containerWidth / 2) + (currentElementWidth / 2);
      
      container.scrollTo({
        left: Math.max(0, scrollPosition),
        behavior: 'smooth'
      });
    }
  }, [currentStep]);

  return (
    <div className="w-full py-4 bg-white border-b">
      <div className="max-w-4xl mx-auto px-6">
        {/* Desktop Layout - Hidden on mobile */}
        <div className="hidden md:flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className="flex items-center">
                  {currentStep > step.id ? (
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  ) : currentStep === step.id ? (
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                      {step.id + 1}
                    </div>
                  ) : (
                    <Circle className="w-8 h-8 text-gray-300" />
                  )}
                </div>
                <div className="text-center mt-2 h-12 flex flex-col justify-start">
                  <p className={`text-sm font-medium leading-tight ${
                    currentStep >= step.id ? 'text-primary' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </p>
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-4 ${
                  currentStep > step.id ? 'bg-green-500' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Mobile Layout - Scrollable horizontal */}
        <div className="md:hidden relative">
          {/* Scroll hint - fade effect on right edge */}
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          
          <div 
            ref={scrollContainerRef}
            className="overflow-x-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 scroll-smooth"
          >
            <div className="flex items-center gap-4 min-w-max px-2 pb-2">
              {steps.map((step, index) => (
                <div 
                  key={step.id} 
                  ref={currentStep === step.id ? currentStepRef : null}
                  className="flex items-center flex-shrink-0"
                >
                  <div className="flex flex-col items-center min-w-[70px] max-w-[90px]">
                    <div className="flex items-center">
                      {currentStep > step.id ? (
                        <CheckCircle className="w-7 h-7 text-green-500" />
                      ) : currentStep === step.id ? (
                        <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-sm">
                          {step.id + 1}
                        </div>
                      ) : (
                        <Circle className="w-7 h-7 text-gray-300" />
                      )}
                    </div>
                    <div className="text-center mt-1.5 px-1 h-10 flex flex-col justify-start">
                      <p className={`text-xs font-medium leading-tight ${
                        currentStep >= step.id ? 'text-primary' : 'text-gray-400'
                      }`}>
                        {step.title}
                      </p>
                    </div>
                  </div>
                  
                  {index < steps.length - 1 && (
                    <div className={`w-6 h-0.5 mx-1.5 flex-shrink-0 ${
                      currentStep > step.id ? 'bg-green-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Progress indicator for mobile */}
          <div className="flex justify-center mt-3">
            <div className="flex items-center gap-2">
              <div className="text-xs text-muted-foreground">
                Step {currentStep + 1} of {steps.length}
              </div>
              {/* Scroll dots indicator */}
              <div className="flex gap-1">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-1.5 h-1.5 rounded-full ${
                      index === currentStep ? 'bg-primary' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}