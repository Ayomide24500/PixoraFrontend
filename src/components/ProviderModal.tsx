import React, { useState } from "react";
import {
  X,
  Star,
  MapPin,
  Clock,
  ShieldCheck,
  Camera,
  Calendar,
  CheckCircle,
  DollarSign,
  Send,
} from "lucide-react";
import { Provider } from "./ProviderCard"; // Adjust import based on your file path

interface ProviderModalProps {
  provider: Provider | null;
  onClose: () => void;
  onBookSubmit: (bookingData: {
    providerId: string;
    date: string;
    packageType: string;
    notes: string;
  }) => void;
}

const ProviderModal: React.FC<ProviderModalProps> = ({
  provider,
  onClose,
  onBookSubmit,
}) => {
  if (!provider) return null;

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("Standard Package");
  const [projectNotes, setProjectNotes] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onBookSubmit({
      providerId: provider.id,
      date: selectedDate,
      packageType: selectedPackage,
      notes: projectNotes,
    });
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-pixora-card border border-pixora-border rounded-2xl shadow-2xl overflow-y-auto text-white flex flex-col">
        {/* Modal Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between p-4 sm:p-6 bg-pixora-card/95 backdrop-blur-xl border-b border-pixora-border">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-pixora-gold/20 text-pixora-gold text-xs font-bold rounded-full border border-pixora-gold/30">
              {provider.category}
            </span>
            {provider.isVerified && (
              <span className="flex items-center gap-1 text-[10px] bg-pixora-gold text-black font-extrabold px-2 py-0.5 rounded-full">
                <ShieldCheck className="w-3 h-3" /> VERIFIED CREATOR
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-black/40 hover:bg-black text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-8 space-y-8">
          {/* Creator Profile Header */}
          <div className="flex flex-col md:flex-row gap-6 items-start justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                {provider.name}
              </h2>
              <p className="text-sm text-gray-400 flex items-center gap-1.5 mb-4">
                <MapPin className="w-4 h-4 text-pixora-gold" />
                <span>{provider.location}</span>
              </p>
              <p className="text-sm text-gray-300 font-light max-w-xl leading-relaxed">
                {provider.bio}
              </p>
            </div>

            <div className="flex items-center gap-3 bg-black/50 border border-pixora-border p-4 rounded-xl shrink-0">
              <div className="text-center px-3 border-r border-pixora-border">
                <div className="flex items-center justify-center gap-1 text-pixora-gold font-bold text-lg">
                  <Star className="w-4 h-4 fill-pixora-gold" />
                  <span>{provider.rating}</span>
                </div>
                <span className="text-[10px] text-gray-500 uppercase tracking-wider">
                  {provider.reviewsCount} Reviews
                </span>
              </div>
              <div className="text-center px-3">
                <span className="block text-white font-bold text-lg">
                  {provider.priceRange}
                </span>
                <span className="text-[10px] text-gray-500 uppercase tracking-wider">
                  Starting Rate
                </span>
              </div>
            </div>
          </div>

          {/* Full Portfolio Gallery Showcase */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-gray-400 uppercase mb-4">
              Featured Portfolio Work
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {provider.portfolioSamples.map((imgUrl, index) => (
                <div
                  key={index}
                  className="h-48 rounded-xl overflow-hidden border border-pixora-border group relative"
                >
                  <img
                    src={imgUrl}
                    alt={`Portfolio sample ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                </div>
              ))}
            </div>
          </div>

          {/* Booking Section */}
          <div className="border-t border-pixora-border pt-8">
            <h3 className="text-lg font-bold text-white mb-4">
              Request a Booking
            </h3>

            {isSubmitted ? (
              <div className="bg-pixora-gold/10 border border-pixora-gold/30 rounded-2xl p-6 text-center space-y-3">
                <CheckCircle className="w-12 h-12 text-pixora-gold mx-auto" />
                <h4 className="text-lg font-bold text-white">
                  Booking Request Sent!
                </h4>
                <p className="text-xs text-gray-300 max-w-md mx-auto">
                  {provider.name} usually replies in {provider.responseRate}.
                  They have received your project details and will get back to
                  you shortly.
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 px-6 py-2 bg-pixora-gold text-black font-semibold text-xs rounded-xl hover:bg-pixora-goldHover transition-all cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1">
                      Preferred Date & Time
                    </label>
                    <div className="flex items-center bg-black/60 border border-pixora-border rounded-xl px-3 py-2.5">
                      <Calendar className="w-4 h-4 text-pixora-gold mr-2.5 shrink-0" />
                      <input
                        type="date"
                        required
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full bg-transparent text-sm text-white focus:outline-none cursor-pointer"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1">
                      Package Selection
                    </label>
                    <select
                      value={selectedPackage}
                      onChange={(e) => setSelectedPackage(e.target.value)}
                      className="w-full bg-black/60 border border-pixora-border rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none cursor-pointer"
                    >
                      <option
                        value="Standard Package"
                        className="bg-pixora-card text-white"
                      >
                        Standard Package ({provider.priceRange})
                      </option>
                      <option
                        value="Premium Full-Day Coverage"
                        className="bg-pixora-card text-white"
                      >
                        Premium Full-Day Coverage
                      </option>
                      <option
                        value="Custom Enterprise Project"
                        className="bg-pixora-card text-white"
                      >
                        Custom Enterprise Project
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1">
                    Project Scope / Notes
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={projectNotes}
                    onChange={(e) => setProjectNotes(e.target.value)}
                    placeholder="Describe your event, deliverables required, or vision..."
                    className="w-full bg-black/60 border border-pixora-border rounded-xl p-3 text-sm text-white focus:outline-none placeholder:text-gray-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-pixora-gold hover:bg-pixora-goldHover text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-pixora-gold/10 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Submit Booking Request</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderModal;
