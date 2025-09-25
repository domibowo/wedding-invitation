import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './common/cards';
import { ImageWithFallback } from './ImageWithFallback';
import { Upload, X } from 'lucide-react';
import { Label } from 'reactstrap';
import { Input } from './common/input';

const PhotoUploadCard = ({
    title,
    currentPhoto,
    onUpdate,
    description
}: {
    title: string;
    currentPhoto: string;
    onUpdate: (url: string) => void;
    description: string;
}) => {
    const [dragActive, setDragActive] = React.useState(false);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                onUpdate(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleBrowseClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onUpdate(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <p className="text-sm text-muted-foreground">{description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="aspect-[4/3] border-2 border-dashed border-border rounded-lg overflow-hidden relative">
                    {currentPhoto ? (
                        <div className="relative h-full">
                            <ImageWithFallback
                                src={currentPhoto}
                                alt={title}
                                className="w-full h-full object-cover"
                            />
                            <button
                                onClick={() => onUpdate("")}
                                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <div
                            className={`h-full flex flex-col items-center justify-center cursor-pointer ${dragActive ? "bg-muted" : "bg-background"
                                }`}
                            onClick={handleBrowseClick}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                        >
                            <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                            <p className="text-sm text-muted-foreground text-center">
                                Drop your photo here or click to browse
                            </p>
                        </div>
                    )}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleFileChange}
                    />
                </div>

                <div>
                    <Label htmlFor={`${title.toLowerCase()}-url`}>Photo URL</Label>
                    <Input
                        id={`${title.toLowerCase()}-url`}
                        value={currentPhoto}
                        onChange={(e) => onUpdate(e.target.value)}
                        placeholder="Enter photo URL or upload file"
                    />
                </div>
            </CardContent>
        </Card>
    );
};

export default PhotoUploadCard;