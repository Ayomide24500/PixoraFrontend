import { Star } from "lucide-react";

const REVIEWS = [
  {
    quote:
      "Pixora changed how I source cinematographers for high-profile events in Lagos. No more endless Instagram DM scrolling—verified portfolios and direct booking make everything effortless.",
    author: "Tola Adesina",
    role: "Creative Director, Apex Media",
    location: "Victoria Island",
  },
  {
    quote:
      "As a professional videographer, getting my work in front of serious corporate clients used to be tough. Pixora's dashboard and secure booking flow give me total peace of mind.",
    author: "Kelechi Okafor",
    role: "Lead Cinematographer",
    location: "Lekki Phase 1",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-pixora-dark border-t border-pixora-border/40">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-pixora-gold mb-3 block">
            Trusted by Creators & Clients
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Loved Across the Creative Industry
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {REVIEWS.map((review, idx) => (
            <div
              key={idx}
              className="bg-pixora-card border border-pixora-border p-8 rounded-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 text-pixora-gold mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-pixora-gold" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed italic mb-6">
                  "{review.quote}"
                </p>
              </div>
              <div className="border-t border-pixora-border/60 pt-4 flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-white text-sm">
                    {review.author}
                  </h4>
                  <p className="text-xs text-gray-400">{review.role}</p>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-black/40 border border-pixora-border text-gray-400">
                  {review.location}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
