export type ContentCategory = 'history' | 'culture' | 'nature' | 'cuisine' | 'places' | '';

export type ContentStatus = 'draft' | 'pending' | 'verified';

export interface VerificationSource {
  id: string;
  name: string;
  organization: string;
  url: string;
  publishDate?: string;
  verifiedDate: string;
  supportedFacts: string[];
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  category: ContentCategory;
  categoryName: string;
  summary: string;
  content: string[];
  coverImage: string;
  imageCaption: string;
  imageCredit: string;
  author: string;
  locationId?: string;
  sources: VerificationSource[];
  tags: string[];
  status: ContentStatus;
  updatedAt: string;
  featured?: boolean;
  highlights?: string[];
  gallery?: { url: string; caption: string; credit: string }[];
}

export interface LocationPoint {
  id: string;
  name: string;
  category: ContentCategory;
  categoryName: string;
  shortDescription: string;
  fullDescription: string;
  lat: number;
  lng: number;
  address: string;
  coverImage: string;
  openingHours?: string;
  ticketPrice?: string;
  sources: VerificationSource[];
  verifiedDate: string;
  status: ContentStatus;
  articleSlug?: string;
}

export interface MediaItem {
  id: string;
  title: string;
  url: string;
  type: 'image' | 'video';
  category: string;
  caption: string;
  source: string;
  credit: string;
  verifiedDate: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  tasks: string[];
  img: string
}

export interface AIChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  sources?: string[];
  relatedLocation?: {
    name: string;
    id: string;
  };
  isDeclined?: boolean;
}

export interface ProjectEvaluation {
  id: string;
  evaluatorName: string;
  role: 'Giáo viên' | 'Học sinh' | 'Khách tham quan';
  scores: {
    content: number;
    design: number;
    features: number;
    presentation: number;
  };
  comment: string;
  createdAt: string;
}

export interface HistoricalEvent {
  year: string;
  title: string;
  description: string;
  source: string;
}

export interface AdministrativeUnit34 {
  id: string;
  code: string;
  name: string;
  shortName: string;
  type: 'city' | 'province';
  typeName: string;
  region: 'Bắc Bộ' | 'Trung Bộ' | 'Tây Nguyên' | 'Nam Bộ';
  subRegion: string;
  isMerged: boolean;
  mergedFrom: string[];
  mergerSummary: string;
  capital: string;
  areaKm2: number;
  population: number;
  lat: number;
  lng: number;
  bounds?: [[number, number], [number, number]];
  description: string;
  referenceUrl: string;
  adjacentUnits?: string[];
}
