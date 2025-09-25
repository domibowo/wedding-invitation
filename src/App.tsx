import { Theme } from '@radix-ui/themes';
import './App.css';
import { StepIndicator } from './components/StepIndicator';
import { TemplateGallery } from './components/stepper/TemplateGallery';
import { TextEditor } from './components/stepper/TextEditor';
import { InvitationProvider, useInvitation } from './contexts/InvitationContext';
import { PhotoEditor } from './components/stepper/PhotoEditor';
import { ExtrasEditor } from './components/stepper/ExtrasEditor';

function AppContent() {
    const { currentStep } = useInvitation();

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <TemplateGallery />;
      case 1:
        return <TextEditor />;
      case 2:
        return <PhotoEditor />;
      case 3:
        return <ExtrasEditor />;
      // case 4:
      //   return <InvitationPreview />;
      default:
        return <TemplateGallery />;
    }
  };

  return (
    <Theme>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <h1 className="text-2xl font-serif text-center text-primary">
              Wedding Invitation Builder
            </h1>
            <p className="text-center text-muted-foreground mt-1">
              Create beautiful digital wedding invitations in minutes
            </p>
          </div>
        </header>
        <StepIndicator />
        <main className="pb-8">
          {renderCurrentStep()}
        </main>

        <footer className="bg-white border-t py-6">
          <div className="max-w-6xl mx-auto px-6 text-center text-sm text-muted-foreground">
            <p>© 2024 Wedding Invitation Builder. Create memories that last forever.</p>
          </div>
        </footer>
      </div>
    </Theme>
  );
}

export default function App() {
  return (
    <InvitationProvider>
      <AppContent />
    </InvitationProvider>
  )
}
