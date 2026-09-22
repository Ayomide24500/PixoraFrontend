import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 border-t border-pixora-border py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        <div className="space-y-4 md:col-span-1">
          <h3 className="text-xl font-extrabold text-white tracking-wider">
            PIX<span className="text-pixora-gold">ORA</span>
          </h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            The premier platform connecting elite visual creators,
            cinematographers, and production gear with clients across Nigeria.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
            Explore Talent
          </h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <a
                href="#explore"
                className="hover:text-pixora-gold transition-colors"
              >
                Photographers
              </a>
            </li>
            <li>
              <a
                href="#explore"
                className="hover:text-pixora-gold transition-colors"
              >
                Videographers
              </a>
            </li>
            <li>
              <a
                href="#explore"
                className="hover:text-pixora-gold transition-colors"
              >
                Cinematographers
              </a>
            </li>
            <li>
              <a
                href="#explore"
                className="hover:text-pixora-gold transition-colors"
              >
                Event Coverage
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
            Platform
          </h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <span className="cursor-pointer hover:text-pixora-gold transition-colors">
                About Us
              </span>
            </li>
            <li>
              <span className="cursor-pointer hover:text-pixora-gold transition-colors">
                Provider Verification
              </span>
            </li>
            <li>
              <span className="cursor-pointer hover:text-pixora-gold transition-colors">
                Secure Payments
              </span>
            </li>
            <li>
              <span className="cursor-pointer hover:text-pixora-gold transition-colors">
                Support Center
              </span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
            Stay Updated
          </h4>
          <p className="text-xs text-gray-500 mb-3">
            Get top creator highlights and platform updates.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
            <input
              type="email"
              placeholder="Enter email"
              className="bg-pixora-card border border-pixora-border rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-pixora-gold w-full"
            />
            <button
              type="submit"
              className="bg-pixora-gold text-black font-semibold px-4 py-2 rounded-xl text-xs hover:bg-pixora-goldHover transition-colors shrink-0"
            >
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-pixora-border/40 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-600 gap-4">
        <p>
          &copy; {new Date().getFullYear()} Pixora Technologies. All rights
          reserved.
        </p>
        <div className="flex gap-6">
          <span className="cursor-pointer hover:text-gray-400">
            Privacy Policy
          </span>
          <span className="cursor-pointer hover:text-gray-400">
            Terms of Service
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
