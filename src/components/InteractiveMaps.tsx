import React, { useState, useRef, useEffect } from 'react';
import { MapPin, RotateCcw, Search } from 'lucide-react';
import { Input } from './common/input';
import { Button } from './common/button';
import { Card, CardContent } from './common/cards';

interface InteractiveMapProps {
    coordinates?: { lat: number; lng: number };
    venueAddress: string;
    onCoordinatesChange: (coords: { lat: number; lng: number }) => void;
}

export function InteractiveMap({
    coordinates,
    venueAddress,
    onCoordinatesChange,
}: InteractiveMapProps) {
    const mapRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [markerPosition, setMarkerPosition] = useState(
        coordinates || { lat: 34.0522, lng: -118.2437 }
    );
    const [searchQuery, setSearchQuery] = useState('');
    const [showResults, setShowResults] = useState(false);

    const mapBounds = {
        width: 600,
        height: 400,
        centerLat: markerPosition.lat,
        centerLng: markerPosition.lng,
        zoom: 14,
    };

    // Lat/Lng to Pixel converters (unchanged)
    const latToPixel = (lat: number) => {
        const latRange = 0.02;
        const minLat = mapBounds.centerLat - latRange / 2;
        const maxLat = mapBounds.centerLat + latRange / 2;
        return ((maxLat - lat) / (maxLat - minLat)) * mapBounds.height;
    };

    const lngToPixel = (lng: number) => {
        const lngRange = 0.02;
        const minLng = mapBounds.centerLng - lngRange / 2;
        const maxLng = mapBounds.centerLng + lngRange / 2;
        return ((lng - minLng) / (maxLng - minLng)) * mapBounds.width;
    };

    const pixelToLat = React.useCallback((pixelY: number) => {
        const latRange = 0.02;
        const minLat = mapBounds.centerLat - latRange / 2;
        const maxLat = mapBounds.centerLat + latRange / 2;
        return maxLat - (pixelY / mapBounds.height) * (maxLat - minLat);

    }, [mapBounds.centerLat, mapBounds.height]);

    const pixelToLng = React.useCallback((pixelX: number) => {
        const lngRange = 0.02;
        const minLng = mapBounds.centerLng - lngRange / 2;
        const maxLng = mapBounds.centerLng + lngRange / 2;
        return minLng + (pixelX / mapBounds.width) * (maxLng - minLng);
    }, [mapBounds.centerLng, mapBounds.width]);

    const updateMarkerPosition = React.useCallback(
        (clientX: number, clientY: number) => {
            if (!mapRef.current) return;
            const rect = mapRef.current.getBoundingClientRect();
            const x = clientX - rect.left;
            const y = clientY - rect.top;

            const constrainedX = Math.max(0, Math.min(x, rect.width));
            const constrainedY = Math.max(0, Math.min(y, rect.height));

            const newLat = pixelToLat(constrainedY);
            const newLng = pixelToLng(constrainedX);

            const newPosition = { lat: newLat, lng: newLng };
            setMarkerPosition(newPosition);
            onCoordinatesChange(newPosition);
        },
        [mapRef, pixelToLat, pixelToLng, setMarkerPosition, onCoordinatesChange]
    );


    const resetToCenter = () => {
        const centerPosition = { lat: mapBounds.centerLat, lng: mapBounds.centerLng };
        setMarkerPosition(centerPosition);
        onCoordinatesChange(centerPosition);
    };

    // Mock search places
    const mockResults = [
        { name: 'Beverly Hills Hotel', lat: 34.0901, lng: -118.4065 },
        { name: 'Griffith Observatory', lat: 34.1184, lng: -118.3004 },
        { name: 'Santa Monica Pier', lat: 34.0094, lng: -118.4977 },
        { name: 'Chateau Marmont', lat: 34.0969, lng: -118.3869 },
        { name: 'The Getty Center', lat: 34.0781, lng: -118.4741 },
    ];

    const searchLocation = (place?: { lat: number; lng: number }) => {
        const result =
            place ||
            mockResults.find((p) =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase())
            ) ||
            mockResults[0];
        setMarkerPosition(result);
        onCoordinatesChange(result);
        setShowResults(false);
    };

    useEffect(() => {
        const handleMove = (e: MouseEvent | TouchEvent) => {
            if (!isDragging) return;
            if ('touches' in e) {
                updateMarkerPosition(e.touches[0].clientX, e.touches[0].clientY);
            } else {
                updateMarkerPosition(e.clientX, e.clientY);
            }
        };
        const stopDrag = () => setIsDragging(false);

        if (isDragging) {
            document.addEventListener('mousemove', handleMove);
            document.addEventListener('mouseup', stopDrag);
            document.addEventListener('touchmove', handleMove, { passive: false });
            document.addEventListener('touchend', stopDrag);
        }
        return () => {
            document.removeEventListener('mousemove', handleMove);
            document.removeEventListener('mouseup', stopDrag);
            document.removeEventListener('touchmove', handleMove);
            document.removeEventListener('touchend', stopDrag);
        };
    }, [isDragging, updateMarkerPosition]);

    return (
        <div className="space-y-4">
            {/* Search */}
            <div className="relative flex gap-2">
                <Input
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setShowResults(true);
                    }}
                    placeholder="Search for a location..."
                    onKeyPress={(e) => e.key === 'Enter' && searchLocation()}
                />
                <Button onClick={() => searchLocation()} size="sm">
                    <Search className="w-4 h-4" />
                </Button>

                {/* Mock search dropdown */}
                {showResults && searchQuery && (
                    <div className="absolute top-10 left-0 w-full bg-white border rounded-md shadow-md z-10">
                        {mockResults
                            .filter((p) =>
                                p.name.toLowerCase().includes(searchQuery.toLowerCase())
                            )
                            .map((p) => (
                                <div
                                    key={p.name}
                                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                                    onClick={() => searchLocation(p)}
                                >
                                    {p.name}
                                </div>
                            ))}
                    </div>
                )}
            </div>

            {/* Map */}
            <Card className="overflow-hidden shadow-lg border">
                <CardContent className="p-0">
                    <div
                        ref={mapRef}
                        className="relative cursor-crosshair select-none w-full max-w-[600px] mx-auto bg-gradient-to-br from-green-50 via-blue-50 to-purple-50"
                        style={{ height: mapBounds.height, aspectRatio: '3/2' }}
                    >
                        {/* Decorative grid */}
                        <svg className="absolute inset-0 pointer-events-none opacity-20">
                            <defs>
                                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#555" strokeWidth="0.5" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#grid)" />
                        </svg>

                        {/* Streets */}
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div
                                key={`street-h-${i}`}
                                className="absolute bg-gray-400 opacity-30"
                                style={{
                                    top: `${(i + 1) * 20}%`,
                                    left: '5%',
                                    right: '5%',
                                    height: '2px',
                                }}
                            />
                        ))}
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div
                                key={`street-v-${i}`}
                                className="absolute bg-gray-400 opacity-30"
                                style={{
                                    left: `${(i + 1) * 25}%`,
                                    top: '5%',
                                    bottom: '5%',
                                    width: '2px',
                                }}
                            />
                        ))}

                        {/* Marker */}
                        <div
                            className={`absolute transform -translate-x-1/2 -translate-y-full cursor-move transition-transform ${isDragging ? 'scale-110 animate-bounce' : 'hover:scale-105'
                                }`}
                            style={{
                                left: `${lngToPixel(markerPosition.lng)}px`,
                                top: `${latToPixel(markerPosition.lat)}px`,
                            }}
                            onMouseDown={() => setIsDragging(true)}
                            onTouchStart={() => setIsDragging(true)}
                        >
                            <MapPin className="w-8 h-8 text-red-500 drop-shadow-md" fill="currentColor" />
                            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-red-500 rounded-full opacity-40 animate-ping" />
                        </div>

                        {/* Label */}
                        <div
                            className="absolute bg-white/90 px-2 py-1 rounded shadow text-xs pointer-events-none"
                            style={{
                                left: `${lngToPixel(markerPosition.lng) + 20}px`,
                                top: `${latToPixel(markerPosition.lat) - 10}px`,
                            }}
                        >
                            {venueAddress.split(',')[0] || 'Wedding Venue'}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Controls */}
            <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                    <p>
                        Coordinates: {markerPosition.lat.toFixed(6)}, {markerPosition.lng.toFixed(6)}
                    </p>
                    <p className="text-xs">Drag the red marker to set your venue location</p>
                </div>
                <Button onClick={resetToCenter} variant="outline" size="sm">
                    <RotateCcw className="w-4 h-4 mr-1" />
                    Reset
                </Button>
            </div>
        </div>
    );
}
