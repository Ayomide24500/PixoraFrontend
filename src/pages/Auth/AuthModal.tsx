// import React, { useState } from "react";
// import {
//   X,
//   Mail,
//   Lock,
//   User,
//   Shield,
//   ArrowRight,
//   CheckCircle2,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// interface AuthModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   initialView?: "login" | "register";
// }

// const AuthModal = ({
//   isOpen,
//   onClose,
//   initialView = "login",
// }: AuthModalProps) => {
//   const [view, setView] = useState<"login" | "register" | "verify">(
//     initialView,
//   );
//   const [role, setRole] = useState<"customer" | "provider">("customer");

//   // Form states
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [fullName, setFullName] = useState("");
//   const [otpCode, setOtpCode] = useState(["", "", "", "", "", ""]);

//   const navigate = useNavigate();

//   if (!isOpen) return null;

//   const handleAuthSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (view === "register") {
//       // Move to verification step after successful registration request
//       setView("verify");
//     } else if (view === "login") {
//       alert("Successfully signed in to Pixora!");
//       onClose();
//     }
//   };

//   const handleVerifySubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     alert("Account verified successfully! Welcome to Pixora.");
//     onClose();

//     // 3. Navigate directly to onboarding instead of going to login
//     navigate("/onboarding");
//   };

//   return (
//     <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
//       <div className="bg-pixora-card border border-pixora-border p-6 sm:p-8 rounded-2xl max-w-md w-full relative shadow-2xl shadow-pixora-gold/5">
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-1"
//         >
//           <X className="w-5 h-5" />
//         </button>

//         {/* Header Branding */}
//         <div className="text-center mb-6">
//           <h3 className="text-2xl font-black text-white tracking-wide">
//             PIX<span className="text-pixora-gold">ORA</span>
//           </h3>
//           <p className="text-xs text-gray-400 mt-1">
//             {view === "login" &&
//               "Sign in to access your dashboard and bookings."}
//             {view === "register" &&
//               "Create your verified creator or client account."}
//             {view === "verify" &&
//               "Enter the 6-digit confirmation code sent to your email."}
//           </p>
//         </div>

//         {/* VIEW 1: SIGN IN */}
//         {view === "login" && (
//           <form onSubmit={handleAuthSubmit} className="space-y-4">
//             <div>
//               <label className="block text-xs text-gray-400 mb-1 font-medium">
//                 Email Address
//               </label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
//                 <input
//                   type="email"
//                   required
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="name@example.com"
//                   className="w-full bg-black/60 border border-pixora-border rounded-xl pl-10 pr-3 py-2.5 text-sm text-white focus:outline-none focus:border-pixora-gold transition-colors"
//                 />
//               </div>
//             </div>

//             <div>
//               <div className="flex justify-between items-center mb-1">
//                 <label className="block text-xs text-gray-400 font-medium">
//                   Password
//                 </label>
//                 <span className="text-[11px] text-pixora-gold hover:underline cursor-pointer">
//                   Forgot?
//                 </span>
//               </div>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
//                 <input
//                   type="password"
//                   required
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="••••••••"
//                   className="w-full bg-black/60 border border-pixora-border rounded-xl pl-10 pr-3 py-2.5 text-sm text-white focus:outline-none focus:border-pixora-gold transition-colors"
//                 />
//               </div>
//             </div>

//             <button
//               type="submit"
//               className="w-full py-3 bg-pixora-gold text-black font-semibold rounded-xl text-sm transition-all hover:bg-pixora-goldHover shadow-lg shadow-pixora-gold/10 cursor-pointer"
//             >
//               Sign In to Pixora
//             </button>

//             <p className="text-center text-xs text-gray-400 pt-2">
//               Don't have an account?{" "}
//               <button
//                 type="button"
//                 onClick={() => setView("register")}
//                 className="text-pixora-gold font-semibold hover:underline"
//               >
//                 Sign up
//               </button>
//             </p>
//           </form>
//         )}

//         {/* VIEW 2: REGISTER / SIGN UP */}
//         {view === "register" && (
//           <form onSubmit={handleAuthSubmit} className="space-y-4">
//             {/* Role Switcher */}
//             <div>
//               <label className="block text-xs text-gray-400 mb-1.5 font-medium">
//                 I want to join as a:
//               </label>

//               {/* Role options separated by a vertical line instead of an outer box */}
//               <div className="flex items-center gap-2 py-1">
//                 <button
//                   type="button"
//                   onClick={() => setRole("customer")}
//                   className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
//                     role === "customer"
//                       ? "bg-pixora-gold text-black shadow-md shadow-pixora-gold/10"
//                       : "text-gray-400 hover:text-white"
//                   }`}
//                 >
//                   Client / Customer
//                 </button>

//                 {/* Vertical Divider Line */}
//                 <div className="w-px h-6 bg-gradient-to-b from-transparent via-pixora-gold to-transparent shrink-0 opacity-80" />

//                 <button
//                   type="button"
//                   onClick={() => setRole("provider")}
//                   className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
//                     role === "provider"
//                       ? "bg-pixora-gold text-black shadow-md shadow-pixora-gold/10"
//                       : "text-gray-400 hover:text-white"
//                   }`}
//                 >
//                   Visual Creator
//                 </button>
//               </div>
//             </div>

//             <div>
//               <label className="block text-xs text-gray-400 mb-1 font-medium">
//                 Full Name / Business Name
//               </label>
//               <div className="relative">
//                 <User className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
//                 <input
//                   type="text"
//                   required
//                   value={fullName}
//                   onChange={(e) => setFullName(e.target.value)}
//                   placeholder="Abolore Studios"
//                   className="w-full bg-black/60 border border-pixora-border rounded-xl pl-10 pr-3 py-2.5 text-sm text-white focus:outline-none focus:border-pixora-gold transition-colors"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-xs text-gray-400 mb-1 font-medium">
//                 Email Address
//               </label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
//                 <input
//                   type="email"
//                   required
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="name@example.com"
//                   className="w-full bg-black/60 border border-pixora-border rounded-xl pl-10 pr-3 py-2.5 text-sm text-white focus:outline-none focus:border-pixora-gold transition-colors"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-xs text-gray-400 mb-1 font-medium">
//                 Password
//               </label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
//                 <input
//                   type="password"
//                   required
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="At least 8 characters"
//                   className="w-full bg-black/60 border border-pixora-border rounded-xl pl-10 pr-3 py-2.5 text-sm text-white focus:outline-none focus:border-pixora-gold transition-colors"
//                 />
//               </div>
//             </div>

//             <button
//               type="submit"
//               className="w-full py-3 bg-pixora-gold text-black font-semibold rounded-xl text-sm transition-all hover:bg-pixora-goldHover shadow-lg shadow-pixora-gold/10 flex items-center justify-center gap-2 cursor-pointer"
//             >
//               <span>Continue & Verify</span>
//               <ArrowRight className="w-4 h-4" />
//             </button>

//             <p className="text-center text-xs text-gray-400 pt-2">
//               Already have an account?{" "}
//               <button
//                 type="button"
//                 onClick={() => setView("login")}
//                 className="text-pixora-gold font-semibold hover:underline"
//               >
//                 Sign in
//               </button>
//             </p>
//           </form>
//         )}

//         {/* VIEW 3: OTP VERIFICATION */}
//         {view === "verify" && (
//           <form onSubmit={handleVerifySubmit} className="space-y-6">
//             <div className="text-center">
//               <div className="w-12 h-12 bg-pixora-gold/10 border border-pixora-gold/30 rounded-full flex items-center justify-center mx-auto mb-3 text-pixora-gold">
//                 <Shield className="w-6 h-6" />
//               </div>
//               <p className="text-xs text-gray-300">
//                 We sent a verification code to{" "}
//                 <span className="text-pixora-gold font-medium">
//                   {email || "your email"}
//                 </span>
//               </p>
//             </div>

//             {/* OTP Input Boxes */}
//             <div className="flex justify-center gap-2">
//               {[...Array(6)].map((_, idx) => (
//                 <input
//                   key={idx}
//                   type="text"
//                   maxLength={1}
//                   className="w-11 h-12 text-center bg-black/60 border border-pixora-border rounded-xl text-lg font-bold text-white focus:outline-none focus:border-pixora-gold"
//                   onChange={(e) => {
//                     const val = e.target.value;
//                     const updated = [...otpCode];
//                     updated[idx] = val;
//                     setOtpCode(updated);
//                     // auto-focus next if possible
//                   }}
//                 />
//               ))}
//             </div>

//             <button
//               type="submit"
//               className="w-full py-3 bg-pixora-gold text-black font-semibold rounded-xl text-sm transition-all hover:bg-pixora-goldHover shadow-lg shadow-pixora-gold/10 cursor-pointer flex items-center justify-center gap-2"
//             >
//               <CheckCircle2 className="w-4 h-4" />
//               <span>Verify & Complete</span>
//             </button>

//             <div className="text-center">
//               <button
//                 type="button"
//                 onClick={() => alert("New code dispatched!")}
//                 className="text-xs text-gray-400 hover:text-pixora-gold transition-colors"
//               >
//                 Didn't receive code? <span className="underline">Resend</span>
//               </button>
//             </div>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AuthModal;

import React, { useState, useRef } from "react";
import {
  X,
  Mail,
  Lock,
  User,
  Shield,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: "login" | "register";
}

const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialView = "login",
}) => {
  const [view, setView] = useState<"login" | "register" | "verify">(
    initialView,
  );
  const [role, setRole] = useState<"customer" | "provider">("customer");

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [otpCode, setOtpCode] = useState(["", "", "", "", "", ""]);

  // OTP Ref for auto-focusing next input
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (view === "register") {
      setView("verify");
    } else if (view === "login") {
      alert("Successfully signed in to Pixora!");
      onClose();
    }
  };

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Account verified successfully! Welcome to Pixora.");
    onClose();
    navigate("/onboarding");
  };

  // Auto-focus logic for OTP inputs
  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // limit to 1 char
    const newOtp = [...otpCode];
    newOtp[index] = value;
    setOtpCode(newOtp);

    // Jump to next input if filled
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    // Jump back on Backspace if current box is empty
    if (e.key === "Backspace" && !otpCode[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fade-in">
      <div className="bg-pixora-card border border-pixora-border/80 p-5 sm:p-7 md:p-8 rounded-2xl max-w-[95%] sm:max-w-md w-full relative shadow-2xl shadow-pixora-gold/10 max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 text-gray-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Branding */}
        <div className="text-center mb-5 sm:mb-6">
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-wider">
            PIX<span className="text-pixora-gold">ORA</span>
          </h3>
          <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-xs mx-auto leading-relaxed">
            {view === "login" &&
              "Sign in to access your dashboard and bookings."}
            {view === "register" &&
              "Create your verified creator or client account."}
            {view === "verify" &&
              "Enter the 6-digit confirmation code sent to your email."}
          </p>
        </div>

        {/* VIEW 1: SIGN IN */}
        {view === "login" && (
          <form onSubmit={handleAuthSubmit} className="space-y-4">
            <div>
              <label className="block text-xs sm:text-sm text-gray-300 mb-1.5 font-medium">
                Email Address
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-black/60 border border-pixora-border rounded-xl pl-10 pr-3 py-2.5 sm:py-3 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-pixora-gold focus:ring-1 focus:ring-pixora-gold/50 transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs sm:text-sm text-gray-300 font-medium">
                  Password
                </label>
                <button
                  type="button"
                  className="text-[11px] sm:text-xs text-pixora-gold hover:underline"
                >
                  Forgot?
                </button>
              </div>
              <div className="relative flex items-center">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-black/60 border border-pixora-border rounded-xl pl-10 pr-3 py-2.5 sm:py-3 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-pixora-gold focus:ring-1 focus:ring-pixora-gold/50 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-pixora-gold text-black font-semibold rounded-xl text-xs sm:text-sm transition-all hover:bg-pixora-goldHover active:scale-[0.99] shadow-lg shadow-pixora-gold/15 cursor-pointer mt-2"
            >
              Sign In to Pixora
            </button>

            <p className="text-center text-xs sm:text-sm text-gray-400 pt-2">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => setView("register")}
                className="text-pixora-gold font-semibold hover:underline"
              >
                Sign up
              </button>
            </p>
          </form>
        )}

        {/* VIEW 2: REGISTER / SIGN UP */}
        {view === "register" && (
          <form onSubmit={handleAuthSubmit} className="space-y-4">
            {/* Role Switcher */}
            <div>
              <label className="block text-xs sm:text-sm text-gray-300 mb-1.5 font-medium">
                I want to join as a:
              </label>

              {/* Glass container with vertical gradient divider */}
              <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 bg-black/50 border border-pixora-border/60 rounded-xl">
                <button
                  type="button"
                  onClick={() => setRole("customer")}
                  className={`flex-1 py-2 sm:py-2.5 px-2 text-[11px] sm:text-xs font-semibold rounded-lg transition-all text-center truncate ${
                    role === "customer"
                      ? "bg-pixora-gold text-black shadow-md shadow-pixora-gold/20"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Client / Customer
                </button>

                {/* Vibrant Gradient Divider Line */}
                <div className="w-px h-6 bg-gradient-to-b from-transparent via-pixora-gold to-transparent shrink-0 opacity-80" />

                <button
                  type="button"
                  onClick={() => setRole("provider")}
                  className={`flex-1 py-2 sm:py-2.5 px-2 text-[11px] sm:text-xs font-semibold rounded-lg transition-all text-center truncate ${
                    role === "provider"
                      ? "bg-pixora-gold text-black shadow-md shadow-pixora-gold/20"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Visual Creator
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs sm:text-sm text-gray-300 mb-1.5 font-medium">
                Full Name / Business Name
              </label>
              <div className="relative flex items-center">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Abolore Studios"
                  className="w-full bg-black/60 border border-pixora-border rounded-xl pl-10 pr-3 py-2.5 sm:py-3 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-pixora-gold focus:ring-1 focus:ring-pixora-gold/50 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs sm:text-sm text-gray-300 mb-1.5 font-medium">
                Email Address
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-black/60 border border-pixora-border rounded-xl pl-10 pr-3 py-2.5 sm:py-3 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-pixora-gold focus:ring-1 focus:ring-pixora-gold/50 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs sm:text-sm text-gray-300 mb-1.5 font-medium">
                Password
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  className="w-full bg-black/60 border border-pixora-border rounded-xl pl-10 pr-3 py-2.5 sm:py-3 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-pixora-gold focus:ring-1 focus:ring-pixora-gold/50 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-pixora-gold text-black font-semibold rounded-xl text-xs sm:text-sm transition-all hover:bg-pixora-goldHover active:scale-[0.99] shadow-lg shadow-pixora-gold/15 flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <span>Continue & Verify</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-center text-xs sm:text-sm text-gray-400 pt-2">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setView("login")}
                className="text-pixora-gold font-semibold hover:underline"
              >
                Sign in
              </button>
            </p>
          </form>
        )}

        {/* VIEW 3: OTP VERIFICATION */}
        {view === "verify" && (
          <form
            onSubmit={handleVerifySubmit}
            className="space-y-5 sm:space-y-6"
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-pixora-gold/10 border border-pixora-gold/30 rounded-full flex items-center justify-center mx-auto mb-3 text-pixora-gold shadow-md shadow-pixora-gold/10">
                <Shield className="w-6 h-6" />
              </div>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                We sent a verification code to{" "}
                <span className="text-pixora-gold font-semibold block sm:inline mt-0.5 sm:mt-0">
                  {email || "your email"}
                </span>
              </p>
            </div>

            {/* Responsive OTP Input Boxes */}
            {/* Responsive OTP Input Boxes */}
            <div className="flex justify-center gap-1.5 sm:gap-2.5 my-2">
              {otpCode.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => {
                    otpRefs.current[idx] = el;
                  }}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                  className="w-9 h-11 sm:w-11 sm:h-12 text-center bg-black/60 border border-pixora-border rounded-xl text-base sm:text-lg font-bold text-white focus:outline-none focus:border-pixora-gold focus:ring-1 focus:ring-pixora-gold/50 transition-all"
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-pixora-gold text-black font-semibold rounded-xl text-xs sm:text-sm transition-all hover:bg-pixora-goldHover active:scale-[0.99] shadow-lg shadow-pixora-gold/15 cursor-pointer flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Verify & Complete</span>
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => alert("New code dispatched!")}
                className="text-xs text-gray-400 hover:text-pixora-gold transition-colors"
              >
                Didn't receive code?{" "}
                <span className="underline font-medium">Resend</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
