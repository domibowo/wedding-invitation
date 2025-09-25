import { useInvitation } from '../../contexts/InvitationContext';
import { Card, CardContent, CardHeader, CardTitle } from '../common/cards';
import { Button } from '../common/button';
import PhotoUploadCard from '../PhotoUploadCard';

export function PhotoEditor() {
    const { invitationData, updateInvitation, setCurrentStep } = useInvitation();

    const handlePhotoUpdate = (key: 'main' | 'couple' | 'venue', url: string) => {
        updateInvitation({
            photos: {
                ...invitationData.photos,
                [key]: url
            }
        });
    };

    return (
        <div className="p-6">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                    <h2 className="mb-4">Add Your Beautiful Photos</h2>
                    <p className="text-muted-foreground">Upload photos that tell your love story</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <PhotoUploadCard
                        title="Main Photo"
                        currentPhoto={invitationData.photos.main}
                        onUpdate={(url) => handlePhotoUpdate('main', url)}
                        description="The hero image for your invitation"
                    />

                    <PhotoUploadCard
                        title="Couple Photo"
                        currentPhoto={invitationData.photos.couple}
                        onUpdate={(url) => handlePhotoUpdate('couple', url)}
                        description="A beautiful photo of you together"
                    />

                    <PhotoUploadCard
                        title="Venue Photo"
                        currentPhoto={invitationData.photos.venue || ''}
                        onUpdate={(url) => handlePhotoUpdate('venue', url)}
                        description="Optional: Show your wedding venue"
                    />
                </div>

                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Photo Tips</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>• Use high-resolution images (at least 1080px wide) for best quality</li>
                            <li>• Photos should be in landscape orientation for better display</li>
                            <li>• Consider the lighting and background to match your chosen template style</li>
                            <li>• You can always change or update photos later in the editor</li>
                        </ul>
                    </CardContent>
                </Card>

                <div className="flex gap-4">
                    <Button
                        variant="outline"
                        onClick={() => setCurrentStep(1)}
                        className="flex-1"
                    >
                        Back to Text
                    </Button>
                    <Button
                        onClick={() => setCurrentStep(3)}
                        className="flex-1 text-white bg-primary"
                    >
                        Next: Music & Extras
                    </Button>
                </div>
            </div>
        </div>
    );
}