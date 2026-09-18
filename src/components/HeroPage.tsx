import React, { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  Camera,
  Video,
  Film,
  Sparkles,
  ArrowRight,
} from "lucide-react";

interface HeroProps {
  onSearchSubmit: (searchParams: {
    category: string;
    location: string;
  }) => void;
}

const CATEGORIES = [
  { name: "Photography", icon: Camera },
  { name: "Videography", icon: Video },
  { name: "Cinematography", icon: Film },
  { name: "Event Coverage", icon: Sparkles },
];

const TYPING_WORDS = [
  "elite visual creators",
  "expert videographers",
  "skilled photographers",
  "master cinematographers",
];

const HeroPage = ({ onSearchSubmit }: HeroProps) => {
  const [selectedCategory, setSelectedCategory] = useState("Videography");
  const [location, setLocation] = useState("Lagos, Nigeria");

  // Typewriter & Transition States
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(110);
  const [isFading, setIsFading] = useState(false);
  const [phase, setPhase] = useState("typing");

  useEffect(() => {
    const fullText = TYPING_WORDS[currentWordIndex];
    let timer;

    if (phase === "typing") {
      if (currentText.length < fullText.length) {
        // Slower, steadier typing pace
        timer = setTimeout(() => {
          setCurrentText(fullText.slice(0, currentText.length + 1));
        }, 150);
      } else {
        setPhase("holding");
      }
    } else if (phase === "holding") {
      // Sit on the finished word for a proper beat before moving on
      timer = setTimeout(() => {
        setIsFading(true);
        setPhase("fading");
      }, 2800);
    } else if (phase === "fading") {
      // Let the CSS opacity transition actually finish before swapping words
      timer = setTimeout(() => {
        setCurrentText("");
        setCurrentWordIndex((prev) => (prev + 1) % TYPING_WORDS.length);
        setIsFading(false);
        setPhase("typing");
      }, 700);
    }

    return () => clearTimeout(timer);
  }, [currentText, phase, currentWordIndex]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit({ category: selectedCategory, location });

    setTimeout(() => {
      const exploreSection = document.getElementById("explore");
      if (exploreSection) {
        exploreSection.scrollIntoView({ behavior: "smooth" });
      } else {
        console.warn("Element with id 'explore' not found in the DOM yet.");
      }
    }, 50);
  };

  return (
    <div className="relative min-h-[90vh] bg-pixora-dark text-white flex flex-col justify-center overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8">
      {/* Animated Cinematic Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] h-[250px] sm:h-[400px] bg-pixora-gold/15 blur-[120px] sm:blur-[160px] rounded-full pointer-events-none animate-pulse" />

      <div className="max-w-7xl mx-auto w-full relative z-10 text-center">
        {/* Top Badge with entry transition */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pixora-card border border-pixora-border mb-6 animate-fade-in-up opacity-0 [animation-delay:100ms]">
          <span className="flex h-2 w-2 rounded-full bg-pixora-gold animate-ping" />
          <span className="text-[11px] sm:text-xs font-semibold tracking-wider text-gray-300 uppercase">
            Where Vision Becomes Visual
          </span>
        </div>

        {/* Main Headline with Smooth Typewriter & Opacity Transition */}
        <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight max-w-4xl mx-auto leading-[1.12] mb-6 animate-fade-in-up opacity-0 [animation-delay:200ms]">
          Connect with{" "}
          <span
            className={`inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-pixora-gold transition-opacity duration-700 ease-in-out ${
              isFading ? "opacity-0" : "opacity-100"
            }`}
          >
            {currentText}
          </span>
          <span className="animate-pulse text-pixora-gold font-normal">|</span>{" "}
          & equipment.
        </h1>

        <p className="text-gray-400 text-sm sm:text-lg lg:text-xl max-w-2xl mx-auto mb-8 sm:mb-10 font-light px-2 animate-fade-in-up opacity-0 [animation-delay:300ms]">
          Stop scrolling endlessly through social media. Discover verified
          photographers, videographers, editors, and production gear matched
          precisely to your budget and style.
        </p>

        {/* Interactive Search / Discovery Widget */}
        <div className="max-w-3xl mx-auto bg-pixora-card/95 backdrop-blur-xl border border-pixora-border p-3 sm:p-4 rounded-2xl shadow-2xl animate-fade-in-up opacity-0 [animation-delay:400ms] transition-all duration-300 hover:border-pixora-gold/40">
          <form
            onSubmit={handleSearch}
            className="flex flex-col md:flex-row gap-3 items-center"
          >
            {/* Category Selector Dropdown */}
            <div className="w-full md:w-1/3 flex items-center bg-black/60 border border-pixora-border rounded-xl px-3 py-2.5 text-left transition-colors hover:border-gray-500">
              <Camera className="w-5 h-5 text-pixora-gold mr-3 shrink-0" />
              <div className="w-full">
                <label className="block text-[10px] uppercase tracking-wider text-gray-500 font-semibold">
                  Service
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-transparent text-sm text-white focus:outline-none cursor-pointer"
                >
                  {CATEGORIES.map((cat) => (
                    <option
                      key={cat.name}
                      value={cat.name}
                      className="bg-pixora-card text-white"
                    >
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Location Input */}
            <div className="w-full md:w-1/3 flex items-center bg-black/60 border border-pixora-border rounded-xl px-3 py-2.5 transition-colors hover:border-gray-500">
              <MapPin className="w-5 h-5 text-pixora-gold mr-3 shrink-0" />
              <div className="w-full text-left">
                <label className="block text-[10px] uppercase tracking-wider text-gray-500 font-semibold">
                  Location / Area
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Lekki, Lagos"
                  className="w-full bg-transparent text-sm text-white focus:outline-none placeholder:text-gray-600"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full md:w-auto px-6 py-4 bg-pixora-gold hover:bg-pixora-goldHover text-black font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 group shrink-0 shadow-lg shadow-pixora-gold/10 cursor-pointer"
            >
              <span>Explore Talent</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>
          </form>

          {/* Quick Category Pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-4 pt-3 border-t border-pixora-border/60">
            <span className="text-xs text-gray-500 mr-1">Popular:</span>
            {["Photography", "Videography", "Cinematography", "Editing"].map(
              (tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedCategory(tag)}
                  className={`text-xs px-3 py-1 rounded-full transition-all duration-200 cursor-pointer ${
                    selectedCategory === tag
                      ? "bg-pixora-gold/20 text-pixora-gold border border-pixora-gold/40 scale-105"
                      : "bg-black/40 text-gray-400 hover:text-white hover:bg-black/80 border border-transparent"
                  }`}
                >
                  {tag}
                </button>
              ),
            )}
          </div>
        </div>

        {/* Trust metrics bar */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto border-t border-pixora-border/40 pt-6 sm:pt-8 animate-fade-in-up opacity-0 [animation-delay:500ms]">
          <div className="transform transition-transform hover:-translate-y-1">
            <p className="text-xl sm:text-3xl font-bold text-white">100%</p>
            <p className="text-xs sm:text-sm text-gray-500">
              Verified Portfolios
            </p>
          </div>
          <div className="transform transition-transform hover:-translate-y-1">
            <p className="text-xl sm:text-3xl font-bold text-white">₦ Secure</p>
            <p className="text-xs sm:text-sm text-gray-500">
              Protected Payments
            </p>
          </div>
          <div className="transform transition-transform hover:-translate-y-1">
            <p className="text-xl sm:text-3xl font-bold text-white">Direct</p>
            <p className="text-xs sm:text-sm text-gray-500">Creator Booking</p>
          </div>
          <div className="transform transition-transform hover:-translate-y-1">
            <p className="text-xl sm:text-3xl font-bold text-white">4.9/5</p>
            <p className="text-xs sm:text-sm text-gray-500">Platform Rating</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroPage;
