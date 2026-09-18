import React from "react";
import {
  Star,
  MapPin,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Camera,
} from "lucide-react";

export interface Provider {
  id: string;
  name: string;
  category: string;
  location: string;
  rating: number;
  reviewsCount: number;
  priceRange: string;
  responseRate: string;
  isVerified: boolean;
  avatar: string;
  bio: string;
  portfolioSamples: string[];
}

interface ProviderCardProps {
  provider: Provider;
  onSelect: (provider: Provider) => void;
}

const ProviderCard: React.FC<ProviderCardProps> = ({ provider, onSelect }) => {
  return (
    <div className="bg-pixora-card border border-pixora-border rounded-2xl overflow-hidden hover:border-pixora-gold/50 transition-all duration-300 flex flex-col group shadow-lg">
      {/* Portfolio Preview Grid Header */}
      <div className="relative h-48 sm:h-56 bg-black/40 overflow-hidden">
        {/* Main large portfolio shot */}
        <div className="absolute inset-0 grid grid-cols-3 gap-1 p-1">
          <div className="col-span-2 h-full overflow-hidden rounded-l-xl">
            <img
              src={
                provider.portfolioSamples[0] ||
                "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80"
              }
              alt={provider.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="col-span-1 flex flex-col gap-1 h-full">
            <div className="h-1/2 overflow-hidden rounded-tr-xl">
              <img
                src={
                  provider.portfolioSamples[1] ||
                  "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=300&q=80"
                }
                alt="Portfolio 2"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="h-1/2 overflow-hidden rounded-br-xl relative">
              <img
                src={
                  provider.portfolioSamples[2] ||
                  "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=300&q=80"
                }
                alt="Portfolio 3"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-xs font-semibold text-white backdrop-blur-[2px]">
                + View Work
              </div>
            </div>
          </div>
        </div>

        {/* Category Badge Over Top */}
        <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md border border-pixora-border px-3 py-1 rounded-full text-[11px] font-medium text-pixora-gold flex items-center gap-1.5">
          <Camera className="w-3 h-3" />
          <span>{provider.category}</span>
        </div>

        {provider.isVerified && (
          <div className="absolute top-3 right-3 bg-pixora-gold text-black px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide flex items-center gap-1 shadow">
            <ShieldCheck className="w-3 h-3" />
            <span>VERIFIED</span>
          </div>
        )}
      </div>

      {/* Body Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Creator Name & Rating */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-pixora-gold transition-colors flex items-center gap-1.5">
                {provider.name}
              </h3>
              <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-pixora-gold" />
                <span>{provider.location}</span>
              </p>
            </div>

            <div className="flex items-center gap-1 bg-black/60 border border-pixora-border px-2 py-1 rounded-lg shrink-0">
              <Star className="w-3.5 h-3.5 fill-pixora-gold text-pixora-gold" />
              <span className="text-xs font-bold text-white">
                {provider.rating}
              </span>
              <span className="text-[10px] text-gray-500">
                ({provider.reviewsCount})
              </span>
            </div>
          </div>

          <p className="text-xs text-gray-400 line-clamp-2 mb-4 font-light">
            {provider.bio}
          </p>
        </div>

        <div>
          {/* Quick Stats (Response Time & Price) */}
          <div className="grid grid-cols-2 gap-2 py-3 border-t border-pixora-border/60 text-xs mb-4">
            <div className="flex items-center gap-1.5 text-gray-400">
              <Clock className="w-3.5 h-3.5 text-pixora-gold shrink-0" />
              <span>Replies in {provider.responseRate}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase text-gray-500 block">
                Starting at
              </span>
              <span className="text-sm font-bold text-white">
                {provider.priceRange}
              </span>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={() => onSelect(provider)}
            className="w-full py-2.5 bg-black/60 hover:bg-pixora-gold hover:text-black border border-pixora-border hover:border-pixora-gold text-white text-xs font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 group/btn"
          >
            <span>View Full Profile & Book</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

interface ProviderGridProps {
  categoryFilter?: string;
  locationFilter?: string;
  onSelectProvider: (provider: Provider) => void;
}

// Sample mock data matching the MVP criteria for testing out-of-the-box
const MOCK_PROVIDERS: Provider[] = [
  {
    id: "1",
    name: "John Visuals & Co.",
    category: "Videography",
    location: "Lekki Phase 1, Lagos",
    rating: 4.9,
    reviewsCount: 38,
    priceRange: "₦80k – ₦250k",
    responseRate: "15 mins",
    isVerified: true,
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    bio: "Professional cinematic videographer specializing in weddings, corporate brand films, and high-end commercial music videos.",
    portfolioSamples: [
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=300&q=80",
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=300&q=80",
    ],
  },
  {
    id: "2",
    name: "Aura Lens Studios",
    category: "Photography",
    location: "Ikeja GRA, Lagos",
    rating: 4.8,
    reviewsCount: 52,
    priceRange: "₦50k – ₦180k",
    responseRate: "5 mins",
    isVerified: true,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    bio: "Portrait, fashion, and lifestyle photography studio dedicated to capturing pristine visual stories with dramatic lighting.",
    portfolioSamples: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=300&q=80",
      "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&w=300&q=80",
    ],
  },
  {
    id: "3",
    name: "Frames & Motion HQ",
    category: "Cinematography",
    location: "Victoria Island, Lagos",
    rating: 5.0,
    reviewsCount: 19,
    priceRange: "₦150k – ₦500k",
    responseRate: "30 mins",
    isVerified: true,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    bio: "Top-tier cinema production crew equipped with RED cameras, drones, and professional gimbal rigs for luxury events.",
    portfolioSamples: [
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=300&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=300&q=80",
    ],
  },
];

export const ProviderGrid: React.FC<ProviderGridProps> = ({
  categoryFilter,
  locationFilter,
  onSelectProvider,
}) => {
  console.log("la", categoryFilter);
  // Filter providers based on search criteria if desired, or show all
  const filtered = MOCK_PROVIDERS.filter((p) => {
    const matchesCat =
      !categoryFilter ||
      p.category.toLowerCase().includes(categoryFilter.toLowerCase());
    return matchesCat;
  });

  return (
    <section
      id="explore"
      className="py-16 bg-pixora-dark px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
        <div>
          <span className="text-pixora-gold text-xs font-bold tracking-widest uppercase block mb-2">
            Curated Talent Discovery
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Verified Visual Creators
          </h2>
        </div>
        <p className="text-gray-400 text-sm mt-2 md:mt-0 max-w-md font-light">
          Showing verified professionals matching your search parameters. Click
          any profile to inspect portfolios and request bookings.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((provider) => (
          <ProviderCard
            key={provider.id}
            provider={provider}
            onSelect={onSelectProvider}
          />
        ))}
      </div>
    </section>
  );
};

export default ProviderCard;
