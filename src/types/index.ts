export type Role = "customer" | "provider" | "admin";

export interface Provider {
  id: string;
  name: string;
  category: "Photography" | "Videography" | "Cinematography" | "Drone & Aerial";
  location: string;
  rating: number;
  reviewsCount: number;
  priceRange: string;
  responseRate: string;
  isVerified: boolean;
  avatar: string;
  bio: string;
  portfolioSamples: string[];
  equipmentList?: string[];
  hourlyRate?: number;
}

export interface BookingRequest {
  id: string;
  providerId: string;
  providerName: string;
  providerAvatar: string;
  category: string;
  customerName: string;
  customerEmail: string;
  date: string;
  packageType: string;
  notes: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  totalAmount: string;
  escrowStatus: "held" | "released" | "refunded";
  createdAt: string;
}

export interface CustomerProfile {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  preferredCategories: string[];
  budgetPreference: string;
}

export interface ProviderProfile {
  businessName: string;
  email: string;
  phone: string;
  location: string;
  primaryCategory: string;
  hourlyRate: number;
  bio: string;
  equipment: string[];
  idType: string;
  idDocumentUrl?: string;
  isVerified: boolean;
  providerTermsAccepted?: boolean;
  providerTermsVersion?: string;
  providerTermsAcceptedAt?: string;
}
