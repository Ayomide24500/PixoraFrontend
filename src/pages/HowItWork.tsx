import { Search, CalendarCheck, Sparkles } from "lucide-react";

const STEPS = [
  {
    step: "01",
    title: "Search & Discover",
    description:
      "Filter verified photographers, videographers, and cinematographers by specific creative styles and Lagos locations.",
    icon: Search,
  },
  {
    step: "02",
    title: "Review & Book",
    description:
      "Inspect detailed portfolio rates, check real-time availability, and submit direct booking or quote requests securely.",
    icon: CalendarCheck,
  },
  {
    step: "03",
    title: "Create & Deliver",
    description:
      "Collaborate seamlessly with protected milestone payments and receive your high-resolution media deliverables on time.",
    icon: Sparkles,
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/40 border-t border-pixora-border/40">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-pixora-gold mb-3 block">
            Seamless Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How Pixora Works for You
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-3">
            Whether you are booking elite visual talent or managing your
            production business, we simplify every step.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-pixora-card border border-pixora-border p-8 rounded-2xl relative group hover:border-pixora-gold/50 transition-all duration-300"
              >
                <div className="absolute top-6 right-6 text-3xl font-black text-white/5 group-hover:text-pixora-gold/15 transition-colors">
                  {item.step}
                </div>
                <div className="w-12 h-12 rounded-xl bg-pixora-gold/10 border border-pixora-gold/30 flex items-center justify-center text-pixora-gold mb-6">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default HowItWorks;
