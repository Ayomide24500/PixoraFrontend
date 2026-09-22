import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  HelpCircle,
  ChevronDown,
  ShieldCheck,
  MessageSquare,
} from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "How does the Pixora escrow payment protection work?",
    answer:
      "When a client submits a booking request, payment is held securely in Pixora Escrow. Funds are only released to the creative provider after the shoot is completed and deliverables are confirmed by the client.",
  },
  {
    question: "How do creators become Verified on Pixora?",
    answer:
      "Creators submit government-issued identification, proof of past portfolio work, and equipment ownership details. Our verification team audits submissions within 24 hours.",
  },
  {
    question: "What happens if a shoot gets cancelled or rescheduled?",
    answer:
      "Cancellations made 48 hours prior to the scheduled shoot receive a 100% full escrow refund. Rescheduling is free of charge upon mutual agreement between client and creator.",
  },
];

export const ContactPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0D0E11] text-white p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="px-3 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] rounded-full text-xs font-bold uppercase tracking-wider">
          24/7 Creator Support
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
          How Can We Help You?
        </h1>
        <p className="text-sm text-gray-400">
          Have questions about booking escrow, account verification, or
          enterprise shoot requests? Reach out to our Lagos-based support team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="bg-[#16181E] border border-[#282C37] p-6 sm:p-8 rounded-3xl space-y-6">
          <h2 className="text-xl font-bold">Send Us a Direct Message</h2>

          {formSubmitted ? (
            <div className="p-6 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-2xl text-center space-y-2">
              <ShieldCheck className="w-10 h-10 text-[#D4AF37] mx-auto" />
              <h3 className="font-bold text-lg">Message Received</h3>
              <p className="text-xs text-gray-300">
                Our support team will respond to your email address within 2
                business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ayo Adisa"
                    className="w-full bg-black/60 border border-[#282C37] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    className="w-full bg-black/60 border border-[#282C37] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Inquiry Topic
                </label>
                <select className="w-full bg-black/60 border border-[#282C37] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]">
                  <option>Booking & Escrow Payment Query</option>
                  <option>Provider Verification Request</option>
                  <option>Enterprise Production Partnership</option>
                  <option>Technical Platform Feedback</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Message Details
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us what you need assistance with..."
                  className="w-full bg-black/60 border border-[#282C37] rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#D4AF37] hover:bg-[#C5A028] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#D4AF37]/10"
              >
                <span>Submit Inquiry</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

        {/* FAQs Accordion Column */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#D4AF37]" /> Frequently Asked
            Questions
          </h2>

          <div className="space-y-3">
            {FAQS.map((faq, index) => (
              <div
                key={index}
                className="bg-[#16181E] border border-[#282C37] rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-4 text-left font-bold text-sm flex items-center justify-between text-white cursor-pointer hover:text-[#D4AF37]"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      openFaq === index
                        ? "rotate-180 text-[#D4AF37]"
                        : "text-gray-500"
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-4 pb-4 text-xs text-gray-400 font-light leading-relaxed border-t border-[#282C37]/50 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Direct Channels */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="p-4 bg-[#16181E] border border-[#282C37] rounded-2xl flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#D4AF37]" />
              <div>
                <span className="text-[10px] text-gray-500 block font-bold uppercase">
                  Email Support
                </span>
                <span className="text-xs font-semibold text-white">
                  support@pixora.ng
                </span>
              </div>
            </div>

            <div className="p-4 bg-[#16181E] border border-[#282C37] rounded-2xl flex items-center gap-3">
              <MapPin className="w-5 h-5 text-[#D4AF37]" />
              <div>
                <span className="text-[10px] text-gray-500 block font-bold uppercase">
                  Headquarters
                </span>
                <span className="text-xs font-semibold text-white">
                  Victoria Island, Lagos
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
