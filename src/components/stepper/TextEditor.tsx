import React from 'react';
import { useInvitation } from '../../contexts/InvitationContext';
import { Card, CardContent, CardHeader, CardTitle } from '../common/cards';
import { Label } from 'reactstrap';
import { Button } from '../common/button';
import { Input } from '../common/input';
import { Textarea } from '../common/textarea';


export function TextEditor() {
  const { invitationData, updateInvitation, setCurrentStep } = useInvitation();

  const handleCoupleNamesChange = (field: 'bride' | 'groom', value: string) => {
    updateInvitation({
      coupleNames: {
        ...invitationData.coupleNames,
        [field]: value
      }
    });
  };

  const handleVenueChange = (field: 'name' | 'address', value: string) => {
    updateInvitation({
      venue: {
        ...invitationData.venue,
        [field]: value
      }
    });
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="mb-4">Customize Your Invitation Text</h2>
          <p className="text-muted-foreground">Personalize the details of your special day</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Couple Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="bride-name">Bride's Name</Label>
                  <Input
                    id="bride-name"
                    value={invitationData.coupleNames.bride}
                    onChange={(e) => handleCoupleNamesChange('bride', e.target.value)}
                    placeholder="Enter bride's name"
                  />
                </div>
                <div>
                  <Label htmlFor="groom-name">Groom's Name</Label>
                  <Input
                    id="groom-name"
                    value={invitationData.coupleNames.groom}
                    onChange={(e) => handleCoupleNamesChange('groom', e.target.value)}
                    placeholder="Enter groom's name"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Wedding Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="wedding-date">Wedding Date</Label>
                  <Input
                    id="wedding-date"
                    type="date"
                    value={invitationData.date}
                    onChange={(e) => updateInvitation({ date: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="wedding-time">Wedding Time</Label>
                  <Input
                    id="wedding-time"
                    type="time"
                    value={invitationData.time}
                    onChange={(e) => updateInvitation({ time: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Venue Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="venue-name">Venue Name</Label>
                  <Input
                    id="venue-name"
                    value={invitationData.venue.name}
                    onChange={(e) => handleVenueChange('name', e.target.value)}
                    placeholder="Enter venue name"
                  />
                </div>
                <div>
                  <Label htmlFor="venue-address">Venue Address</Label>
                  <Textarea
                    id="venue-address"
                    value={invitationData.venue.address}
                    onChange={(e) => handleVenueChange('address', e.target.value)}
                    placeholder="Enter full venue address"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Message</CardTitle>
              </CardHeader>
              <CardContent>
                <textarea
                  value={invitationData.message}
                  onChange={(e) => updateInvitation({ message: e.target.value })}
                  placeholder="Write a personal message for your guests..."
                  rows={6}
                  className="resize-none"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>RSVP Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="rsvp-deadline">RSVP Deadline</Label>
                  <Input
                    id="rsvp-deadline"
                    type="date"
                    value={invitationData.rsvp.deadline}
                    onChange={(e) => updateInvitation({
                      rsvp: {
                        ...invitationData.rsvp,
                        deadline: e.target.value
                      }
                    })}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(0)}
                className="flex-1"
              >
                Back to Templates
              </Button>
              <Button
                onClick={() => setCurrentStep(2)}
                className="flex-1"
              >
                Next: Photos
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}