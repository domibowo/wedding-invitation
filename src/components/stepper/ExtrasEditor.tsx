import React, { useState } from 'react';
import { useInvitation } from '../../contexts/InvitationContext';
import { Card, CardContent, CardHeader, CardTitle } from '../common/cards';
import { Calendar, ExternalLink, MapPin, Music } from 'lucide-react';
import { Switch } from '@radix-ui/themes';
import { Label } from 'reactstrap';
import { Input } from '../common/input';
import { Button } from '../common/button';
import { InteractiveMap } from '../InteractiveMaps';

export function ExtrasEditor() {
  const { invitationData, updateInvitation, setCurrentStep } = useInvitation();
  const [musicEnabled, setMusicEnabled] = useState(!!invitationData.music);

  const handleMusicToggle = (enabled: boolean) => {
    setMusicEnabled(enabled);
    if (!enabled) {
      updateInvitation({ music: undefined });
    } else {
      updateInvitation({
        music: {
          url: '',
          title: 'Wedding Song'
        }
      });
    }
  };

  const handleMusicUpdate = (field: 'url' | 'title', value: string) => {
    updateInvitation({
      music: {
        ...invitationData.music,
        [field]: value
      } as any
    });
  };

  const handleRSVPUpdate = (field: keyof typeof invitationData.rsvp, value: any) => {
    updateInvitation({
      rsvp: {
        ...invitationData.rsvp,
        [field]: value
      }
    });
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="mb-4">Music, Maps & RSVP Setup</h2>
          <p className="text-muted-foreground">Add special touches to make your invitation memorable</p>
        </div>

        <div className="space-y-6">
          {/* Background Music */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Music className="w-5 h-5" />
                Background Music
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="music-enabled"
                  checked={musicEnabled}
                  onCheckedChange={handleMusicToggle}
                  color='gray'
                />
                <Label htmlFor="music-enabled">Add background music to your invitation</Label>
              </div>
              
              {musicEnabled && (
                <div className="space-y-4 pl-6 border-l-2 border-primary">
                  <div>
                    <Label htmlFor="music-title">Song Title</Label>
                    <Input
                      id="music-title"
                      value={invitationData.music?.title || ''}
                      onChange={(e) => handleMusicUpdate('title', e.target.value)}
                      placeholder="e.g., 'Our Song' by Artist Name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="music-url">Music File URL</Label>
                    <Input
                      id="music-url"
                      value={invitationData.music?.url || ''}
                      onChange={(e) => handleMusicUpdate('url', e.target.value)}
                      placeholder="https://example.com/your-song.mp3"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Upload your music file to a hosting service and paste the URL here
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Location & Maps */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Interactive Location Picker
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Drag the marker on the map to set your venue location precisely
              </p>
            </CardHeader>
            <CardContent>
              <InteractiveMap
                coordinates={invitationData.venue.coordinates}
                venueAddress={invitationData.venue.address}
                onCoordinatesChange={(coords) => updateInvitation({
                  venue: {
                    ...invitationData.venue,
                    coordinates: coords
                  }
                })}
              />
            </CardContent>
          </Card>

          {/* RSVP Integration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                RSVP Integration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="rsvp-enabled"
                  checked={invitationData.rsvp.enabled}
                  onCheckedChange={(enabled) => handleRSVPUpdate('enabled', enabled)}
                  color='gray'
                />
                <Label htmlFor="rsvp-enabled">Enable RSVP functionality</Label>
              </div>

              {invitationData.rsvp.enabled && (
                <div className="space-y-4 pl-6 border-l-2 border-primary">
                  <div>
                    <Label htmlFor="google-form-url">Google Form URL</Label>
                    <Input
                      id="google-form-url"
                      value={invitationData.rsvp.googleFormUrl || ''}
                      onChange={(e) => handleRSVPUpdate('googleFormUrl', e.target.value)}
                      placeholder="https://forms.gle/..."
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="google-sheet-id">Google Sheet ID (Optional)</Label>
                    <Input
                      id="google-sheet-id"
                      value={invitationData.rsvp.googleSheetId || ''}
                      onChange={(e) => handleRSVPUpdate('googleSheetId', e.target.value)}
                      placeholder="Sheet ID for response tracking"
                    />
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      Quick Setup Guide
                    </h4>
                    <ol className="text-sm space-y-1 text-muted-foreground">
                      <li>1. Create a Google Form for RSVP responses</li>
                      <li>2. Include fields like: Name, Email, Attendance, Dietary Requirements</li>
                      <li>3. Link form responses to a Google Sheet</li>
                      <li>4. Copy the form URL and paste it above</li>
                      <li>5. (Optional) Copy the Sheet ID for response management</li>
                    </ol>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(2)}
              className="flex-1"
            >
              Back to Photos
            </Button>
            <Button
              onClick={() => setCurrentStep(4)}
              className="flex-1 bg-primary text-white"
            >
              Preview Invitation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}