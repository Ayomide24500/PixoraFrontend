import HeroPage from "@/pages/HeroPage";
import Navbar from "@/components/Navbar";
import { Provider, ProviderGrid } from "@/components/ProviderCard";
import ProviderModal from "@/components/ProviderModal";
import React, { useState } from "react";
import HowItWorks from "./HowItWork";
import Testimonials from "./Testimonial";
import Footer from "./Footer";
import AuthModal from "./Auth/AuthModal";
import MarketplaceWorkspace from "./MarketplaceWorkspace";

const Homepage = () => {
  const [activeRole, setActiveRole] = useState<
    "customer" | "provider" | "admin"
  >("customer");
  const [searchCategory, setSearchCategory] = useState<string>("");
  const [searchLocation, setSearchLocation] = useState<string>("");
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(
    null,
  );

  const handleSearchSubmit = (params: {
    category: string;
    location: string;
  }) => {
    setSearchCategory(params.category);
    setSearchLocation(params.location);

    // Smooth scroll down to the explore section when search is submitted
    setTimeout(() => {
      const exploreSection = document.getElementById("explore");
      if (exploreSection) {
        exploreSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 50);
  };

  const handleSelectProvider = (provider: Provider) => {
    if (activeRole === "customer") {
      // 2. Open the full profile & booking modal instead of an alert
      setSelectedProvider(provider);
    } else {
      alert(`Viewing details as ${activeRole}.`);
    }
  };

  return (
    <div className=" bg-pixora-dark text-white font-sans selection:bg-pixora-gold selection:text-black">
      {/* 1. Professional Navigation Header */}
      <Navbar
        activeRole={activeRole}
        onRoleChange={setActiveRole}
        onOpenAuth={() => setAuthModalOpen(true)}
      />

      {/* Main View Router based on role (For MVP demonstration) */}
      {activeRole === "provider" ? (
        <MarketplaceWorkspace initialRole="provider" />
      ) : activeRole === "admin" ? (
        <MarketplaceWorkspace initialRole="admin" />
      ) : (
        <>
          {/* 2. Cinematic Hero Section */}
          <HeroPage onSearchSubmit={handleSearchSubmit} />

          {/* 3. Verified Provider Discovery Grid */}
          <div id="explore">
            <ProviderGrid
              categoryFilter={searchCategory}
              locationFilter={searchLocation}
              onSelectProvider={handleSelectProvider}
            />
          </div>

          {/* 4. Complete Landing Page Sections */}
          <HowItWorks />
          <Testimonials />
        </>
      )}

      <Footer />

      {/* 4. Interactive Provider Profile & Booking Modal */}
      <ProviderModal
        provider={selectedProvider}
        onClose={() => setSelectedProvider(null)}
        onBookSubmit={(bookingData) => {
          console.log("Booking requested:", bookingData);
          alert("Booking request successfully submitted to creator!");
          setSelectedProvider(null);
        }}
      />

      {/* Simple Auth Modal Placeholder */}
      {authModalOpen && (
        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          initialView="login"
        />
      )}
    </div>
  );
};
export default Homepage;
