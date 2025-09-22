export interface InvitationData {
  id: string;
  template: string;
  coupleNames: {
    bride: string;
    groom: string;
  };
  date: string;
  time: string;
  venue: {
    name: string;
    address: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  message: string;
  photos: {
    main: string;
    couple: string;
    venue?: string;
  };
  music?: {
    url: string;
    title: string;
  };
  rsvp: {
    enabled: boolean;
    deadline: string;
    googleFormUrl?: string;
    googleSheetId?: string;
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export interface Template {
  id: string;
  name: string;
  preview: string;
  style: 'classic' | 'modern' | 'vintage' | 'bohemian' | 'minimalist';
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}