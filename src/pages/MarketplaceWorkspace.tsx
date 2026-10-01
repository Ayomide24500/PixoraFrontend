import { useMemo, useState } from "react";
import {
  ArrowDownLeft,
  ArrowRight,
  BadgeCheck,
  Bell,
  CalendarDays,
  Camera,
  Check,
  CheckCheck,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  Compass,
  CreditCard,
  FileText,
  Filter,
  LayoutDashboard,
  MapPin,
  Menu,
  MessageCircle,
  Plus,
  Search,
  ShieldCheck,
  Star,
  Wallet,
  X,
} from "lucide-react";
import pic from "../assets/logo.png";

type Role = "customer" | "provider" | "admin";
type BookingStatus =
  | "PENDING"
  | "ACCEPTED"
  | "REJECTED"
  | "CANCELLED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "DISPUTED";
type PaymentStatus = "UNPAID" | "PAID" | "HELD" | "RELEASED";
type Page =
  | "Overview"
  | "Discover"
  | "My bookings"
  | "Requests"
  | "Services"
  | "Earnings & payouts"
  | "Transactions"
  | "Notifications"
  | "Terms & agreements";

interface Booking {
  id: string;
  reference: string;
  provider: string;
  service: string;
  date: string;
  time: string;
  duration: number;
  location: string;
  notes: string;
  serviceAmount: number;
  customerFee: number;
  customerTotal: number;
  providerFee: number;
  providerNet: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  payoutRequested: boolean;
  reviewed: boolean;
  termsAccepted: boolean;
}

interface Notice {
  id: number;
  role: Role;
  title: string;
  message: string;
  reference: string;
  read: boolean;
  time: string;
}

interface Creator {
  name: string;
  service: string;
  location: string;
  rating: number;
  price: number;
  image: string;
  verified: boolean;
}

const FEE_RATE = 0.1;
const money = (amount: number) =>
  `₦${amount.toLocaleString("en-NG", { maximumFractionDigits: 0 })}`;
const feeBreakdown = (amount: number) => ({
  customerFee: Math.round(amount * FEE_RATE),
  customerTotal: amount + Math.round(amount * FEE_RATE),
  providerFee: Math.round(amount * FEE_RATE),
  providerNet: amount - Math.round(amount * FEE_RATE),
});

const initialBookings: Booking[] = [
  {
    id: "booking-10245",
    reference: "PX-10245",
    provider: "John Visuals",
    service: "Photography",
    date: "2026-10-03",
    time: "15:00",
    duration: 3,
    location: "Lekki, Lagos",
    notes: "Brand portraits and a few behind-the-scenes shots.",
    serviceAmount: 100000,
    ...feeBreakdown(100000),
    status: "PENDING",
    paymentStatus: "UNPAID",
    payoutRequested: false,
    reviewed: false,
    termsAccepted: true,
  },
  {
    id: "booking-10198",
    reference: "PX-10198",
    provider: "John Visuals",
    service: "Event photography",
    date: "2026-09-12",
    time: "10:00",
    duration: 4,
    location: "Victoria Island, Lagos",
    notes: "Completed event coverage.",
    serviceAmount: 80000,
    ...feeBreakdown(80000),
    status: "COMPLETED",
    paymentStatus: "RELEASED",
    payoutRequested: false,
    reviewed: false,
    termsAccepted: true,
  },
];

const creators: Creator[] = [
  {
    name: "John Visuals",
    service: "Photography",
    location: "Lekki, Lagos",
    rating: 4.9,
    price: 100000,
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=85",
    verified: true,
  },
  {
    name: "Aura Lens Studio",
    service: "Portrait photography",
    location: "Victoria Island, Lagos",
    rating: 4.8,
    price: 75000,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=85",
    verified: true,
  },
  {
    name: "Northlight Films",
    service: "Videography",
    location: "Ikeja, Lagos",
    rating: 5.0,
    price: 150000,
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=85",
    verified: true,
  },
];

const navItems: Record<Role, { page: Page; icon: typeof LayoutDashboard }[]> = {
  customer: [
    { page: "Overview", icon: LayoutDashboard },
    { page: "Discover", icon: Compass },
    { page: "My bookings", icon: CalendarDays },
    { page: "Notifications", icon: Bell },
    { page: "Terms & agreements", icon: FileText },
  ],
  provider: [
    { page: "Overview", icon: LayoutDashboard },
    { page: "Requests", icon: CalendarDays },
    { page: "Services", icon: Camera },
    { page: "Earnings & payouts", icon: Wallet },
    { page: "Notifications", icon: Bell },
    { page: "Terms & agreements", icon: FileText },
  ],
  admin: [
    { page: "Overview", icon: LayoutDashboard },
    { page: "My bookings", icon: CalendarDays },
    { page: "Transactions", icon: CreditCard },
    { page: "Earnings & payouts", icon: Wallet },
    { page: "Notifications", icon: Bell },
  ],
};

const statusStyles: Record<BookingStatus, string> = {
  PENDING: "border-amber-400/25 bg-amber-400/10 text-amber-300",
  ACCEPTED: "border-sky-400/25 bg-sky-400/10 text-sky-300",
  REJECTED: "border-rose-400/25 bg-rose-400/10 text-rose-300",
  CANCELLED: "border-white/10 bg-white/5 text-gray-400",
  IN_PROGRESS: "border-sky-400/25 bg-sky-400/10 text-sky-300",
  COMPLETED: "border-emerald-400/25 bg-emerald-400/10 text-emerald-300",
  DISPUTED: "border-rose-400/25 bg-rose-400/10 text-rose-300",
};

function formatDate(value: string) {
  return new Date(`${value}T12:00:00`).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function Panel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-2xl border border-white/[0.08] bg-[#11120F] ${className}`}
    >
      {children}
    </section>
  );
}

function StatusPill({ status }: { status: BookingStatus }) {
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-bold tracking-wide ${statusStyles[status]}`}
    >
      {status.replace("_", " ")}
    </span>
  );
}

function FeeRows({
  amount,
  mode,
}: {
  amount: number;
  mode: "customer" | "provider";
}) {
  const fees = feeBreakdown(amount);
  return (
    <div className="space-y-3 text-sm">
      <div className="flex justify-between gap-4 text-gray-400">
        <span>Service price</span>
        <span className="text-white">{money(amount)}</span>
      </div>
      <div className="flex justify-between gap-4 text-gray-400">
        <span>Pixora {mode === "customer" ? "fee" : "commission"} (10%)</span>
        <span className={mode === "customer" ? "text-white" : "text-rose-300"}>
          {mode === "customer" ? "+" : "−"}
          {money(fees.customerFee)}
        </span>
      </div>
      <div className="border-t border-white/[0.08] pt-3 flex justify-between gap-4 font-bold">
        <span>
          {mode === "customer" ? "Customer total" : "Expected payout"}
        </span>
        <span className="text-[#E2BE58]">
          {money(mode === "customer" ? fees.customerTotal : fees.providerNet)}
        </span>
      </div>
    </div>
  );
}

function WorkspaceModal({
  children,
  onClose,
  title,
}: {
  children: React.ReactNode;
  onClose: () => void;
  title: string;
}) {
  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="my-auto max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-white/10 bg-[#141510] p-5 shadow-2xl sm:p-7">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#E2BE58]">
              Pixora marketplace
            </p>
            <h2 className="text-xl font-bold text-white">{title}</h2>
          </div>
          <button
            aria-label="Close dialog"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default function MarketplaceWorkspace({
  initialRole = "customer",
}: {
  initialRole?: Role;
}) {
  const [role, setRole] = useState<Role>(initialRole);
  const [page, setPage] = useState<Page>("Overview");
  const [bookings, setBookings] = useState(initialBookings);
  const [notices, setNotices] = useState<Notice[]>([
    {
      id: 1,
      role: "customer",
      title: "Booking request sent",
      message: "Your booking request has been sent to John Visuals.",
      reference: "PX-10245",
      read: false,
      time: "2 min ago",
    },
    {
      id: 2,
      role: "provider",
      title: "New booking request",
      message: "Ayomide requested Photography on Oct 3 at 3:00 PM.",
      reference: "PX-10245",
      read: false,
      time: "2 min ago",
    },
    {
      id: 3,
      role: "admin",
      title: "New marketplace booking",
      message: "A new photography booking needs provider response.",
      reference: "PX-10245",
      read: false,
      time: "2 min ago",
    },
  ]);
  const [modalCreator, setModalCreator] = useState<Creator | null>(null);
  const [showTerms, setShowTerms] = useState(false);
  const [providerAgreementAccepted, setProviderAgreementAccepted] =
    useState(false);
  const [servicePublished, setServicePublished] = useState(false);
  const [reviewingBooking, setReviewingBooking] = useState<string | null>(null);
  const [isRoleOpen, setIsRoleOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [checkout, setCheckout] = useState({
    date: "2026-10-03",
    time: "15:00",
    duration: 3,
    location: "Lekki, Lagos",
    notes: "",
    acceptedTerms: false,
  });
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All services");
  const [toast, setToast] = useState("");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const unreadCount = notices.filter(
    (notice) => notice.role === role && !notice.read,
  ).length;
  const roleBookings = useMemo(
    () =>
      role === "provider"
        ? bookings.filter((booking) => booking.provider === "John Visuals")
        : bookings,
    [bookings, role],
  );
  const filteredCreators = creators.filter((creator) => {
    const matchesSearch =
      `${creator.name} ${creator.service} ${creator.location}`
        .toLowerCase()
        .includes(search.toLowerCase());
    return (
      matchesSearch &&
      (category === "All services" || creator.service.includes(category))
    );
  });
  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 3200);
  };
  const addNotice = (
    recipientRole: Role,
    title: string,
    message: string,
    ref: string,
  ) => {
    setNotices((previous) => [
      {
        id: Date.now() + Math.random(),
        role: recipientRole,
        title,
        message,
        reference: ref,
        read: false,
        time: "Just now",
      },
      ...previous,
    ]);
  };
  const setBookingStatus = (bookingId: string, status: BookingStatus) => {
    const booking = bookings.find((item) => item.id === bookingId);
    if (!booking) return;
    setBookings((previous) =>
      previous.map((item) =>
        item.id === bookingId
          ? {
              ...item,
              status,
              paymentStatus:
                status === "COMPLETED" ? "RELEASED" : item.paymentStatus,
            }
          : item,
      ),
    );
    const response = status === "ACCEPTED" ? "accepted" : "declined";
    addNotice(
      "customer",
      status === "ACCEPTED" ? "Booking accepted" : "Booking request declined",
      `${booking.provider} has ${response} your ${booking.service.toLowerCase()} request.`,
      booking.reference,
    );
    addNotice(
      "admin",
      `Booking ${status.toLowerCase()}`,
      `${booking.reference} was ${status.toLowerCase()} by ${booking.provider}.`,
      booking.reference,
    );
    showToast(
      `Demo booking ${status.toLowerCase()}. No provider was contacted.`,
    );
  };

  const createBooking = () => {
    if (!modalCreator || !checkout.acceptedTerms) return;
    const refNumber =
      Math.max(
        ...bookings.map((booking) => Number(booking.reference.slice(3))),
      ) + 1;
    const reference = `PX-${refNumber}`;
    const amount = modalCreator.price;
    const fees = feeBreakdown(amount);
    const newBooking: Booking = {
      id: `booking-${refNumber}`,
      reference,
      provider: modalCreator.name,
      service: modalCreator.service,
      date: checkout.date,
      time: checkout.time,
      duration: checkout.duration,
      location: checkout.location,
      notes: checkout.notes,
      serviceAmount: amount,
      ...fees,
      status: "PENDING",
      paymentStatus: "UNPAID",
      payoutRequested: false,
      reviewed: false,
      termsAccepted: true,
    };
    setBookings((previous) => [newBooking, ...previous]);
    addNotice(
      "customer",
      "Booking request sent",
      `Your request was sent to ${modalCreator.name}.`,
      reference,
    );
    addNotice(
      "provider",
      "New booking request",
      `A customer requested ${modalCreator.service} on ${formatDate(checkout.date)}.`,
      reference,
    );
    addNotice(
      "admin",
      "New marketplace booking",
      `${reference}: ${modalCreator.name} · ${money(amount)} service price · ${money(fees.customerTotal)} total.`,
      reference,
    );
    setModalCreator(null);
    setCheckout({
      date: "2026-10-03",
      time: "15:00",
      duration: 3,
      location: "Lekki, Lagos",
      notes: "",
      acceptedTerms: false,
    });
    setPage("My bookings");
    showToast("Demo booking created. No payment was processed.");
  };

  const requestPayout = (bookingId: string) => {
    const booking = bookings.find((item) => item.id === bookingId);
    if (!booking || booking.status !== "COMPLETED" || booking.payoutRequested) {
      showToast("This booking is not eligible for another payout request.");
      return;
    }
    setBookings((previous) =>
      previous.map((item) =>
        item.id === bookingId ? { ...item, payoutRequested: true } : item,
      ),
    );
    addNotice(
      "provider",
      "Payout request submitted",
      `${booking.reference} · ${money(booking.providerNet)} net payout.`,
      booking.reference,
    );
    addNotice(
      "admin",
      "Payout request received",
      `${booking.reference} · ${money(booking.providerNet)} requested by John Visuals.`,
      booking.reference,
    );
    showToast("Demo payout request recorded in this preview.");
  };

  const changeRole = (nextRole: Role) => {
    setRole(nextRole);
    setPage("Overview");
    setMobileNavOpen(false);
  };
  const changePage = (nextPage: Page) => {
    setPage(nextPage);
    setMobileNavOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0B0C09] text-white">
      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col border-r border-white/[0.07] bg-[#10110E] transition-transform lg:translate-x-0 ${
          mobileNavOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-[76px] items-center gap-3 border-b border-white/[0.07] px-6">
          <div className="flex items-center gap-3">
            <img
              src={pic}
              alt="Pixora Logo"
              className="h-10 w-auto invert mix-blend-screen object-contain"
            />
            <div>
              <div className="text-lg font-black tracking-[0.17em] text-white">
                PIXORA
              </div>
              <div className="text-[9px] uppercase tracking-[0.16em] text-[#E2BE58]">
                Visuals, made possible
              </div>
            </div>
          </div>
          <button
            className="ml-auto rounded-md p-2 text-gray-400 lg:hidden"
            onClick={() => setMobileNavOpen(false)}
            aria-label="Close navigation"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-4 pt-6">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-gray-500">
            {role === "admin" ? "Platform" : `${role} space`}
          </p>
          <nav className="space-y-1">
            {navItems[role].map(({ page: itemPage, icon: Icon }) => (
              <button
                key={itemPage}
                onClick={() => changePage(itemPage)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition ${
                  page === itemPage
                    ? "bg-[#E2BE58] text-black"
                    : "text-gray-400 hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                <Icon size={17} />
                {itemPage}
                {itemPage === "Notifications" && unreadCount > 0 && (
                  <span className="ml-auto rounded-full bg-rose-500 px-2 py-0.5 text-[10px] font-bold text-white">
                    {unreadCount}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto border-t border-white/[0.07] p-4">
          <div className="mb-3 flex items-center gap-3 rounded-xl bg-white/[0.035] p-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E2BE58]/15 text-sm font-bold text-[#E2BE58]">
              {role === "customer" ? "A" : role === "provider" ? "J" : "P"}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">
                {role === "customer"
                  ? "Ayomide Adisa"
                  : role === "provider"
                    ? "John Visuals"
                    : "Pixora Admin"}
              </p>
              <p className="text-xs capitalize text-gray-500">{role} preview</p>
            </div>
          </div>
          <a
            href="/"
            className="block rounded-lg px-3 py-2 text-xs text-gray-500 hover:bg-white/[0.04] hover:text-white"
          >
            ← Back to Pixora home
          </a>
        </div>
      </aside>

      {/* Mobile Navigation Overlay */}
      {mobileNavOpen && (
        <button
          aria-label="Close menu overlay"
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setMobileNavOpen(false)}
        />
      )}

      {/* Main Application Area */}
      <main className="min-h-screen lg:pl-[260px]">
        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-white/[0.07] bg-[#0B0C09]/90 px-4 backdrop-blur-xl sm:px-8">
          <div className="flex items-center gap-3">
            <button
              aria-label="Open navigation"
              onClick={() => setMobileNavOpen(true)}
              className="rounded-lg border border-white/10 p-2 text-gray-300 lg:hidden"
            >
              <Menu size={18} />
            </button>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Animated Custom Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsRoleOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#151611] px-3.5 py-2 text-xs font-medium text-gray-200 shadow-sm transition-all duration-200 hover:border-[#E2BE58]/40 hover:bg-[#1c1d17] focus:outline-none focus:ring-1 focus:ring-[#E2BE58]/50 sm:text-sm"
              >
                <span className="capitalize">{role} preview</span>
                <ChevronDown
                  size={14}
                  className={`text-gray-400 transition-transform duration-300 ease-in-out ${
                    isRoleOpen ? "rotate-180 text-[#E2BE58]" : ""
                  }`}
                />
              </button>

              {/* Backdrop click outside to dismiss */}
              {isRoleOpen && (
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsRoleOpen(false)}
                />
              )}

              {/* Popover Menu */}
              <div
                className={`absolute right-0 top-full z-50 mt-2 w-48 origin-top-right rounded-xl border border-white/10 bg-[#151611]/95 p-1.5 shadow-2xl backdrop-blur-xl transition-all duration-200 ease-out ${
                  isRoleOpen
                    ? "visible translate-y-0 scale-100 opacity-100"
                    : "invisible -translate-y-2 scale-95 opacity-0 pointer-events-none"
                }`}
              >
                {[
                  { value: "customer", label: "Customer preview" },
                  { value: "provider", label: "Provider preview" },
                  { value: "admin", label: "Admin preview" },
                ].map((option) => {
                  const isActive = role === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        changeRole(option.value as Role);
                        setIsRoleOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-medium transition-all duration-150 sm:text-sm ${
                        isActive
                          ? "bg-[#E2BE58]/15 text-[#E2BE58]"
                          : "text-gray-300 hover:bg-white/[0.06] hover:text-white"
                      }`}
                    >
                      <span>{option.label}</span>
                      {isActive && (
                        <Check size={14} className="text-[#E2BE58]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              aria-label={`${unreadCount} unread notifications`}
              onClick={() => changePage("Notifications")}
              className="relative rounded-xl border border-white/10 bg-[#151611] p-2.5 text-gray-300 transition-colors hover:text-[#E2BE58]"
            >
              <Bell size={17} />
              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 h-4 min-w-4 rounded-full bg-rose-500 px-1 text-[9px] font-bold leading-4 text-white">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        </header>

        {/* Main Views Container */}
        <div className="mx-auto max-w-[1500px] space-y-6 p-4 sm:p-8">
          <div className="flex items-start gap-3 rounded-xl border border-amber-300/15 bg-amber-200/[0.04] px-4 py-3 text-xs leading-5 text-amber-100/75">
            <ShieldCheck size={16} className="mt-0.5 shrink-0 text-[#E2BE58]" />
            <p>
              <span className="font-semibold text-[#E2BE58]">
                Interactive UI preview.
              </span>{" "}
              Sample data only; no payment, backend, real-time notification, or
              legal agreement is connected.
            </p>
          </div>

          {page === "Overview" && (
            <Overview
              role={role}
              bookings={roleBookings}
              changePage={changePage}
              onStatus={setBookingStatus}
            />
          )}
          {page === "Discover" && (
            <Discover
              creators={filteredCreators}
              search={search}
              setSearch={setSearch}
              category={category}
              setCategory={setCategory}
              onBook={(creator) => setModalCreator(creator)}
            />
          )}
          {(page === "My bookings" || page === "Requests") && (
            <Bookings
              role={role}
              bookings={roleBookings}
              onStatus={setBookingStatus}
              onReview={(id) => {
                setReviewingBooking(id);
                setReviewRating(5);
                setReviewText("");
              }}
              onPayout={requestPayout}
              onDiscover={() => changePage("Discover")}
            />
          )}
          {page === "Services" && (
            <Services
              agreementAccepted={providerAgreementAccepted}
              onAccept={() => {
                setProviderAgreementAccepted(true);
                showToast("Provider agreement accepted in this UI preview.");
              }}
              published={servicePublished}
              onPublish={() => {
                if (!providerAgreementAccepted) {
                  showToast("Accept the provider agreement before publishing.");
                  return;
                }
                setServicePublished((current) => !current);
                showToast(
                  servicePublished
                    ? "Service unpublished."
                    : "Service published in preview.",
                );
              }}
              onTerms={() => setShowTerms(true)}
            />
          )}
          {page === "Earnings & payouts" && (
            <Earnings
              bookings={roleBookings}
              role={role}
              onPayout={requestPayout}
            />
          )}
          {page === "Transactions" && <Transactions bookings={bookings} />}
          {page === "Notifications" && (
            <Notifications
              items={notices.filter((notice) => notice.role === role)}
              onRead={(id) =>
                setNotices((previous) =>
                  previous.map((notice) =>
                    notice.id === id ? { ...notice, read: true } : notice,
                  ),
                )
              }
              onReadAll={() =>
                setNotices((previous) =>
                  previous.map((notice) =>
                    notice.role === role ? { ...notice, read: true } : notice,
                  ),
                )
              }
            />
          )}
          {page === "Terms & agreements" && (
            <TermsPage role={role} onTerms={() => setShowTerms(true)} />
          )}
        </div>
      </main>

      {/* Booking Modal */}
      {modalCreator && (
        <WorkspaceModal
          title="Review and confirm your booking"
          onClose={() => setModalCreator(null)}
        >
          <div className="mb-5 flex items-center gap-3 rounded-xl border border-white/[0.08] bg-black/20 p-3">
            <img
              src={modalCreator.image}
              alt=""
              className="h-14 w-14 rounded-lg object-cover"
            />
            <div>
              <p className="font-semibold">{modalCreator.name}</p>
              <p className="text-xs text-gray-400">
                {modalCreator.service} · {modalCreator.location}
              </p>
            </div>
            {modalCreator.verified && (
              <BadgeCheck className="ml-auto text-[#E2BE58]" size={19} />
            )}
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Date">
              <input
                required
                type="date"
                value={checkout.date}
                onChange={(event) =>
                  setCheckout({ ...checkout, date: event.target.value })
                }
                className="form-control"
              />
            </Field>
            <Field label="Start time">
              <input
                required
                type="time"
                value={checkout.time}
                onChange={(event) =>
                  setCheckout({ ...checkout, time: event.target.value })
                }
                className="form-control"
              />
            </Field>
            <Field label="Duration">
              <select
                value={checkout.duration}
                onChange={(event) =>
                  setCheckout({
                    ...checkout,
                    duration: Number(event.target.value),
                  })
                }
                className="form-control"
              >
                {[1, 2, 3, 4, 6, 8].map((hours) => (
                  <option key={hours} value={hours}>
                    {hours} {hours === 1 ? "hour" : "hours"}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Location">
              <input
                required
                value={checkout.location}
                onChange={(event) =>
                  setCheckout({ ...checkout, location: event.target.value })
                }
                className="form-control"
              />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Notes for your provider">
                <textarea
                  rows={2}
                  value={checkout.notes}
                  onChange={(event) =>
                    setCheckout({ ...checkout, notes: event.target.value })
                  }
                  placeholder="Share helpful details about your shoot..."
                  className="form-control resize-none"
                />
              </Field>
            </div>
          </div>
          <div className="my-5 rounded-xl border border-white/[0.08] bg-black/20 p-4">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-300">
              Transparent booking total
            </h3>
            <FeeRows amount={modalCreator.price} mode="customer" />
          </div>
          <label className="flex cursor-pointer items-start gap-3 text-xs leading-5 text-gray-300">
            <input
              type="checkbox"
              checked={checkout.acceptedTerms}
              onChange={(event) =>
                setCheckout({
                  ...checkout,
                  acceptedTerms: event.target.checked,
                })
              }
              className="mt-1 h-4 w-4 accent-[#E2BE58]"
            />
            <span>
              I have read and agree to Pixora&apos;s{" "}
              <button
                type="button"
                onClick={() => setShowTerms(true)}
                className="font-semibold text-[#E2BE58] underline underline-offset-2"
              >
                Booking &amp; Payment Terms
              </button>
              . Opening the terms does not accept them.
            </span>
          </label>
          <button
            disabled={!checkout.acceptedTerms}
            onClick={createBooking}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#E2BE58] px-4 py-3.5 text-sm font-bold text-black transition hover:bg-[#efd276] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Confirm &amp; Pay{" "}
            {money(feeBreakdown(modalCreator.price).customerTotal)}
            <ArrowRight size={16} />
          </button>
          <p className="mt-3 text-center text-[10px] leading-4 text-gray-500">
            Preview only. No payment will be initiated or processed.
          </p>
        </WorkspaceModal>
      )}

      {/* Terms Modal */}
      {showTerms && (
        <WorkspaceModal
          title={
            role === "provider"
              ? "Provider platform terms"
              : "Booking & payment terms"
          }
          onClose={() => setShowTerms(false)}
        >
          <TermsContent provider={role === "provider"} />
          <div className="mt-5 rounded-lg border border-amber-300/15 bg-amber-200/[0.04] p-3 text-xs leading-5 text-amber-100/70">
            Draft preview v1.0 — legal wording is illustrative and must be
            reviewed and configured before launch.
          </div>
          <button
            onClick={() => setShowTerms(false)}
            className="mt-5 w-full rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-gray-200 hover:bg-white/5"
          >
            Close terms
          </button>
        </WorkspaceModal>
      )}

      {/* Review Modal */}
      {reviewingBooking && (
        <WorkspaceModal
          title="Leave a review"
          onClose={() => setReviewingBooking(null)}
        >
          <p className="mb-4 text-sm text-gray-400">
            Share your experience with John Visuals after this completed
            booking.
          </p>
          <div className="mb-5 flex gap-1">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                aria-label={`${rating} star${rating === 1 ? "" : "s"}`}
                onClick={() => setReviewRating(rating)}
              >
                <Star
                  size={24}
                  className={
                    rating <= reviewRating
                      ? "fill-[#E2BE58] text-[#E2BE58]"
                      : "text-gray-600"
                  }
                />
              </button>
            ))}
          </div>
          <textarea
            rows={4}
            value={reviewText}
            onChange={(event) => setReviewText(event.target.value)}
            placeholder="What went well?"
            className="form-control resize-none"
          />
          <button
            disabled={!reviewText.trim()}
            onClick={() => {
              setBookings((previous) =>
                previous.map((booking) =>
                  booking.id === reviewingBooking
                    ? { ...booking, reviewed: true }
                    : booking,
                ),
              );
              setReviewingBooking(null);
              showToast("Review submitted in this UI preview.");
            }}
            className="mt-4 w-full rounded-xl bg-[#E2BE58] px-4 py-3 text-sm font-bold text-black disabled:cursor-not-allowed disabled:opacity-40"
          >
            Submit {reviewRating}-star review
          </button>
        </WorkspaceModal>
      )}

      {/* Toast Notification */}
      {toast && (
        <div
          role="status"
          className="fixed bottom-5 left-1/2 z-[90] -translate-x-1/2 rounded-xl border border-white/10 bg-[#22231D] px-4 py-3 text-center text-xs font-medium text-white shadow-2xl"
        >
          {toast}
        </div>
      )}
    </div>
  );
}

function Overview({
  role,
  bookings,
  changePage,
  onStatus,
}: {
  role: Role;
  bookings: Booking[];
  changePage: (page: Page) => void;
  onStatus: (id: string, status: BookingStatus) => void;
}) {
  const pending = bookings.filter((booking) => booking.status === "PENDING");
  const completed = bookings.filter(
    (booking) => booking.status === "COMPLETED",
  );
  const eligible = completed.filter((booking) => !booking.payoutRequested);
  const active = bookings.filter(
    (booking) =>
      booking.status === "PENDING" ||
      booking.status === "ACCEPTED" ||
      booking.status === "IN_PROGRESS",
  );
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-5 rounded-2xl border border-[#E2BE58]/15 bg-gradient-to-br from-[#211F14] via-[#14150F] to-[#10110E] p-6 sm:flex-row sm:items-center sm:p-8">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#E2BE58]/20 bg-[#E2BE58]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#E2BE58]">
            <ShieldCheck size={13} />
            {role === "admin"
              ? "Marketplace overview"
              : "Your Pixora workspace"}
          </div>
          <h2 className="text-2xl font-bold sm:text-3xl">
            {role === "customer"
              ? "Good afternoon, Ayomide"
              : role === "provider"
                ? "Welcome back, John"
                : "Good afternoon, Admin"}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400">
            {role === "customer"
              ? "Discover visual talent, book through Pixora, and keep every detail of your shoot in one place."
              : role === "provider"
                ? "Manage Pixora booking requests, services and commission-transparent payouts."
                : "Monitor bookings, platform fees, provider commissions and payout activity."}
          </p>
        </div>
        <button
          onClick={() =>
            changePage(
              role === "customer"
                ? "Discover"
                : role === "provider"
                  ? "Requests"
                  : "My bookings",
            )
          }
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#E2BE58] px-5 py-3 text-sm font-bold text-black hover:bg-[#efd276]"
        >
          {role === "customer"
            ? "Find a creator"
            : role === "provider"
              ? "View requests"
              : "Review bookings"}
          <ArrowRight size={16} />
        </button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Metric
          label={role === "admin" ? "Total bookings" : "Active bookings"}
          value={
            role === "admin"
              ? bookings.length.toString()
              : active.length.toString()
          }
          detail="Across Pixora"
          icon={CalendarDays}
        />
        <Metric
          label={role === "provider" ? "Pending requests" : "Awaiting response"}
          value={pending.length.toString()}
          detail={pending[0]?.reference ?? "No pending requests"}
          icon={Clock3}
        />
        <Metric
          label={role === "admin" ? "Customer fees" : "Completed bookings"}
          value={
            role === "admin"
              ? money(
                  bookings.reduce(
                    (sum, booking) => sum + booking.customerFee,
                    0,
                  ),
                )
              : completed.length.toString()
          }
          detail={
            role === "admin" ? "10% customer fee snapshot" : "Reviews unlocked"
          }
          icon={role === "admin" ? CircleDollarSign : CheckCheck}
        />
        <Metric
          label={role === "provider" ? "Payout eligible" : "Notifications"}
          value={
            role === "provider"
              ? money(
                  eligible.reduce(
                    (sum, booking) => sum + booking.providerNet,
                    0,
                  ),
                )
              : "03"
          }
          detail={
            role === "provider"
              ? "After commission"
              : "Updates across your bookings"
          }
          icon={role === "provider" ? Wallet : Bell}
        />
      </div>
      <div className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <Panel className="p-5 sm:p-6">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <h3 className="font-semibold">Recent bookings</h3>
              <p className="mt-1 text-xs text-gray-500">
                Track the booking lifecycle by Pixora reference.
              </p>
            </div>
            <button
              onClick={() =>
                changePage(role === "provider" ? "Requests" : "My bookings")
              }
              className="text-xs font-semibold text-[#E2BE58] hover:text-white"
            >
              View all →
            </button>
          </div>
          <div className="space-y-3">
            {bookings.slice(0, 3).map((booking) => (
              <BookingRow
                key={booking.id}
                booking={booking}
                role={role}
                onStatus={onStatus}
              />
            ))}
          </div>
        </Panel>
        <Panel className="p-5 sm:p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-xl bg-[#E2BE58]/10 p-2.5 text-[#E2BE58]">
              <ShieldCheck size={19} />
            </div>
            <div>
              <h3 className="font-semibold">Pixora transaction protection</h3>
              <p className="text-xs text-gray-500">
                Clear pricing at every step
              </p>
            </div>
          </div>
          <div className="space-y-3 text-sm leading-5 text-gray-400">
            <p>
              Customer platform fee and provider commission are calculated
              separately from the service price.
            </p>
            <p className="rounded-xl border border-white/[0.07] bg-black/20 p-3 text-xs">
              Customer pays <b className="text-white">service + 10% fee</b>.
              Provider payout is{" "}
              <b className="text-white">service − 10% commission</b>.
            </p>
            <button
              onClick={() => changePage("Terms & agreements")}
              className="text-xs font-semibold text-[#E2BE58] hover:text-white"
            >
              Review Pixora terms →
            </button>
          </div>
        </Panel>
      </div>
      {role === "provider" && pending[0] && (
        <Panel className="flex flex-col items-start justify-between gap-4 border-[#E2BE58]/20 bg-[#E2BE58]/[0.04] p-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-semibold text-[#E2BE58]">
              Your next response keeps the booking moving
            </p>
            <p className="mt-1 text-sm text-gray-300">
              Request {pending[0].reference} · {pending[0].service} ·{" "}
              {formatDate(pending[0].date)}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onStatus(pending[0].id, "REJECTED")}
              className="rounded-lg border border-white/10 px-3 py-2 text-xs text-gray-300 hover:border-rose-400/30 hover:text-rose-300"
            >
              Decline
            </button>
            <button
              onClick={() => onStatus(pending[0].id, "ACCEPTED")}
              className="rounded-lg bg-[#E2BE58] px-4 py-2 text-xs font-bold text-black hover:bg-[#efd276]"
            >
              Accept request
            </button>
          </div>
        </Panel>
      )}
    </div>
  );
}

function Metric({
  label,
  value,
  detail,
  icon: Icon,
}: {
  label: string;
  value: string;
  detail: string;
  icon: typeof CalendarDays;
}) {
  return (
    <Panel className="p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs text-gray-400">{label}</span>
        <span className="rounded-lg bg-[#E2BE58]/10 p-2 text-[#E2BE58]">
          <Icon size={17} />
        </span>
      </div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="mt-1 truncate text-[11px] text-gray-500">{detail}</p>
    </Panel>
  );
}

function BookingRow({
  booking,
  role,
  onStatus,
}: {
  booking: Booking;
  role: Role;
  onStatus: (id: string, status: BookingStatus) => void;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-white/[0.07] bg-black/15 p-4 sm:flex-row sm:items-center">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E2BE58]/10 text-[#E2BE58]">
          <Camera size={18} />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{booking.service}</p>
          <p className="mt-1 truncate text-[11px] text-gray-500">
            {booking.reference} ·{" "}
            {role === "provider" ? "Ayomide Adisa" : booking.provider} ·{" "}
            {formatDate(booking.date)}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 sm:justify-end">
        <StatusPill status={booking.status} />
        {role === "provider" && booking.status === "PENDING" && (
          <button
            onClick={() => onStatus(booking.id, "ACCEPTED")}
            className="rounded-lg bg-[#E2BE58] px-3 py-2 text-[11px] font-bold text-black"
          >
            Accept
          </button>
        )}
      </div>
    </div>
  );
}

function Discover({
  creators: visibleCreators,
  search,
  setSearch,
  category,
  setCategory,
  onBook,
}: {
  creators: Creator[];
  search: string;
  setSearch: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  onBook: (creator: Creator) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Find your next visual creator</h2>
        <p className="mt-1 text-sm text-gray-400">
          Explore trusted local talent and keep every booking on Pixora.
        </p>
      </div>

      <Panel className="grid gap-3 p-3 sm:grid-cols-[1fr_220px_auto]">
        <label className="relative">
          <Search
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search creators, services or location"
            className="form-control !pl-10"
          />
        </label>

        <label className="relative">
          <Filter
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          />
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="form-control !pl-9"
          >
            {["All services", "Photography", "Videography", "Portrait"].map(
              (option) => (
                <option key={option}>{option}</option>
              ),
            )}
          </select>
        </label>

        <button
          onClick={() => {
            setSearch("");
            setCategory("All services");
          }}
          className="rounded-xl border border-white/10 px-4 py-2 text-sm text-gray-300 hover:bg-white/5"
        >
          Clear filters
        </button>
      </Panel>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visibleCreators.map((creator) => (
          <Panel key={creator.name} className="overflow-hidden">
            <div className="relative h-48 overflow-hidden">
              <img
                src={creator.image}
                alt={creator.name}
                className="h-full w-full object-cover transition duration-500 hover:scale-105"
              />
              {creator.verified && (
                <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-[#E2BE58] px-2.5 py-1 text-[10px] font-bold text-black">
                  <BadgeCheck size={13} /> PIXORA VERIFIED
                </span>
              )}
              <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/70 px-2.5 py-1 text-xs">
                <Star size={12} className="fill-[#E2BE58] text-[#E2BE58]" />
                {creator.rating.toFixed(1)}
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-semibold">{creator.name}</h3>
              <p className="mt-1 text-xs text-gray-400">
                {creator.service} · <MapPin size={11} className="inline" />{" "}
                {creator.location}
              </p>
              <div className="mt-4 flex items-end justify-between border-t border-white/[0.07] pt-4">
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-gray-500">
                    Service price from
                  </p>
                  <p className="mt-1 font-bold">{money(creator.price)}</p>
                </div>
                <button
                  onClick={() => onBook(creator)}
                  className="rounded-lg bg-[#E2BE58] px-3 py-2 text-xs font-bold text-black hover:bg-[#efd276]"
                >
                  Book on Pixora
                </button>
              </div>
              <p className="mt-3 text-[10px] text-gray-500">
                10% Pixora customer fee shown at checkout.
              </p>
            </div>
          </Panel>
        ))}
        {visibleCreators.length === 0 && (
          <Panel className="col-span-full p-10 text-center text-sm text-gray-400">
            No creators match these filters. Try a different search.
          </Panel>
        )}
      </div>
    </div>
  );
}

function Bookings({
  role,
  bookings,
  onStatus,
  onReview,
  onPayout,
  onDiscover,
}: {
  role: Role;
  bookings: Booking[];
  onStatus: (id: string, status: BookingStatus) => void;
  onReview: (id: string) => void;
  onPayout: (id: string) => void;
  onDiscover: () => void;
}) {
  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-2xl font-bold">
            {role === "provider"
              ? "Incoming booking requests"
              : role === "admin"
                ? "Marketplace bookings"
                : "Your bookings"}
          </h2>
          <p className="mt-1 text-sm text-gray-400">
            Each booking, financial snapshot and status shares its Pixora
            reference.
          </p>
        </div>
        {role === "customer" && (
          <button
            onClick={onDiscover}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#E2BE58] px-4 py-2.5 text-xs font-bold text-black"
          >
            <Plus size={15} /> New booking
          </button>
        )}
      </div>
      {bookings.length === 0 ? (
        <Panel className="p-12 text-center">
          <CalendarDays className="mx-auto mb-3 text-gray-500" />
          <p className="font-semibold">No bookings yet</p>
          <p className="mt-1 text-xs text-gray-500">
            New Pixora booking requests will appear here.
          </p>
        </Panel>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <Panel key={booking.id} className="p-4 sm:p-5">
              <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-[#E2BE58]/10 p-3 text-[#E2BE58]">
                    <Camera size={19} />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold">{booking.service}</h3>
                      <StatusPill status={booking.status} />
                    </div>
                    <p className="mt-1 text-xs text-gray-400">
                      {booking.reference} ·{" "}
                      {role === "provider" ? "Ayomide Adisa" : booking.provider}
                    </p>
                    <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                      <span>
                        <CalendarDays size={12} className="mr-1 inline" />
                        {formatDate(booking.date)}
                      </span>
                      <span>
                        <Clock3 size={12} className="mr-1 inline" />
                        {booking.time} · {booking.duration} hrs
                      </span>
                      <span>
                        <MapPin size={12} className="mr-1 inline" />
                        {booking.location}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {role === "provider" && booking.status === "PENDING" && (
                    <>
                      <button
                        onClick={() => onStatus(booking.id, "REJECTED")}
                        className="rounded-lg border border-white/10 px-3 py-2 text-xs text-gray-300 hover:border-rose-400/30 hover:text-rose-300"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => onStatus(booking.id, "ACCEPTED")}
                        className="rounded-lg bg-[#E2BE58] px-3 py-2 text-xs font-bold text-black"
                      >
                        Accept booking
                      </button>
                    </>
                  )}
                  {role === "provider" && booking.status === "ACCEPTED" && (
                    <button
                      onClick={() => onStatus(booking.id, "COMPLETED")}
                      className="rounded-lg bg-emerald-400 px-3 py-2 text-xs font-bold text-black"
                    >
                      Mark completed
                    </button>
                  )}
                  {role === "provider" && booking.status === "COMPLETED" && (
                    <button
                      disabled={booking.payoutRequested}
                      onClick={() => onPayout(booking.id)}
                      className="rounded-lg bg-[#E2BE58] px-3 py-2 text-xs font-bold text-black disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {booking.payoutRequested
                        ? "Payout requested"
                        : "Request payout"}
                    </button>
                  )}
                  {role === "customer" && booking.status === "COMPLETED" && (
                    <button
                      disabled={booking.reviewed}
                      onClick={() => onReview(booking.id)}
                      className="rounded-lg border border-[#E2BE58]/30 px-3 py-2 text-xs font-semibold text-[#E2BE58] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {booking.reviewed ? "Review submitted" : "Leave a review"}
                    </button>
                  )}
                </div>
              </div>
              <div className="mt-4 grid gap-4 rounded-xl border border-white/[0.06] bg-black/15 p-3 sm:grid-cols-2">
                <div>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    Customer checkout · {booking.paymentStatus}
                  </p>
                  <FeeRows amount={booking.serviceAmount} mode="customer" />
                </div>
                <div>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    Provider payout breakdown
                  </p>
                  <FeeRows amount={booking.serviceAmount} mode="provider" />
                </div>
              </div>
              <p className="mt-3 text-[10px] text-gray-500">
                Fee snapshot for this booking: customer fee 10% · provider
                commission 10% · terms{" "}
                {booking.termsAccepted ? "accepted (preview)" : "not accepted"}.
              </p>
            </Panel>
          ))}
        </div>
      )}
    </div>
  );
}

function Services({
  agreementAccepted,
  onAccept,
  published,
  onPublish,
  onTerms,
}: {
  agreementAccepted: boolean;
  onAccept: () => void;
  published: boolean;
  onPublish: () => void;
  onTerms: () => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold">Services &amp; listing status</h2>
        <p className="mt-1 text-sm text-gray-400">
          Your service price is separate from Pixora&apos;s customer fee and
          provider commission.
        </p>
      </div>
      {!agreementAccepted && (
        <Panel className="border-[#E2BE58]/25 bg-[#E2BE58]/[0.04] p-5">
          <div className="flex items-start gap-3">
            <FileText className="mt-0.5 shrink-0 text-[#E2BE58]" size={20} />
            <div className="flex-1">
              <h3 className="font-semibold">Provider agreement required</h3>
              <p className="mt-1 text-xs leading-5 text-gray-400">
                Review the platform and commission terms before activating or
                publishing a service.
              </p>
              <button
                onClick={onTerms}
                className="mt-2 text-xs font-semibold text-[#E2BE58] underline"
              >
                Read Provider Agreement
              </button>
            </div>
          </div>
          <label className="mt-4 flex cursor-pointer items-start gap-3 border-t border-white/[0.08] pt-4 text-xs leading-5 text-gray-300">
            <input
              type="checkbox"
              onChange={(event) => {
                if (event.target.checked) onAccept();
              }}
              className="mt-1 h-4 w-4 accent-[#E2BE58]"
            />
            <span>
              I have read and agree to Pixora&apos;s Provider Agreement and 10%
              commission terms.
            </span>
          </label>
        </Panel>
      )}
      <Panel className="overflow-hidden">
        <div className="flex flex-col justify-between gap-4 border-b border-white/[0.07] p-5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#E2BE58]/10 p-3 text-[#E2BE58]">
              <Camera size={19} />
            </div>
            <div>
              <h3 className="font-semibold">Photography · Event coverage</h3>
              <p className="mt-1 text-xs text-gray-500">
                3-hour booking · Lekki, Lagos
              </p>
            </div>
          </div>
          <span className="w-fit rounded-full border border-white/10 px-3 py-1 text-[10px] font-semibold text-gray-400">
            {published ? "PUBLISHED (PREVIEW)" : "DRAFT"}
          </span>
        </div>
        <div className="grid gap-5 p-5 sm:grid-cols-2">
          <div>
            <p className="text-xs text-gray-500">Your service price</p>
            <p className="mt-1 text-xl font-bold">{money(100000)}</p>
            <p className="mt-1 text-[10px] text-gray-500">
              Set by you. Pixora&apos;s fees are calculated separately.
            </p>
          </div>
          <FeeRows amount={100000} mode="provider" />
        </div>
        <div className="flex flex-col justify-between gap-3 border-t border-white/[0.07] bg-black/10 p-4 sm:flex-row sm:items-center">
          <p className="text-[11px] text-gray-500">
            {agreementAccepted
              ? "Provider agreement accepted in this preview."
              : "Accept the provider agreement to enable publishing."}
          </p>
          <button
            disabled={!agreementAccepted}
            onClick={onPublish}
            className="rounded-xl bg-[#E2BE58] px-4 py-2.5 text-xs font-bold text-black disabled:cursor-not-allowed disabled:opacity-40"
          >
            {published ? "Unpublish service" : "Publish service"}
          </button>
        </div>
      </Panel>
    </div>
  );
}

function Earnings({
  bookings,
  role,
  onPayout,
}: {
  bookings: Booking[];
  role: Role;
  onPayout: (id: string) => void;
}) {
  const completed = bookings.filter(
    (booking) => booking.status === "COMPLETED",
  );
  const eligible = completed.filter((booking) => !booking.payoutRequested);
  const gross = completed.reduce(
    (sum, booking) => sum + booking.serviceAmount,
    0,
  );
  const commission = completed.reduce(
    (sum, booking) => sum + booking.providerFee,
    0,
  );
  const net = completed.reduce((sum, booking) => sum + booking.providerNet, 0);
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold">
          {role === "admin" ? "Payout oversight" : "Earnings & payouts"}
        </h2>
        <p className="mt-1 text-sm text-gray-400">
          Commission is calculated from the provider&apos;s service amount,
          never the customer total.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <Metric
          label="Completed service value"
          value={money(gross)}
          detail="Gross booking value"
          icon={CircleDollarSign}
        />
        <Metric
          label="Pixora commission"
          value={`−${money(commission)}`}
          detail="10% of service value"
          icon={ArrowDownLeft}
        />
        <Metric
          label="Net provider payout"
          value={money(net)}
          detail="Before payout processing"
          icon={Wallet}
        />
      </div>
      <Panel className="p-5">
        <div className="mb-4">
          <h3 className="font-semibold">Eligible completed bookings</h3>
          <p className="mt-1 text-xs text-gray-500">
            One payout request per completed booking in this UI preview.
          </p>
        </div>
        {completed.length === 0 ? (
          <p className="py-6 text-center text-sm text-gray-500">
            Completed bookings will appear here when they become
            payout-eligible.
          </p>
        ) : (
          <div className="space-y-3">
            {completed.map((booking) => (
              <div
                key={booking.id}
                className="flex flex-col justify-between gap-4 rounded-xl border border-white/[0.07] p-4 sm:flex-row sm:items-center"
              >
                <div>
                  <p className="text-sm font-semibold">
                    {booking.reference} · {booking.service}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Gross {money(booking.serviceAmount)} · 10% commission −
                    {money(booking.providerFee)} · Net{" "}
                    {money(booking.providerNet)}
                  </p>
                </div>
                {role === "provider" && (
                  <button
                    disabled={booking.payoutRequested}
                    onClick={() => onPayout(booking.id)}
                    className="rounded-lg bg-[#E2BE58] px-3 py-2 text-xs font-bold text-black disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {booking.payoutRequested
                      ? "Payout requested"
                      : "Request payout"}
                  </button>
                )}
                {role === "admin" && (
                  <span className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] text-gray-400">
                    {booking.payoutRequested ? "PENDING" : "ELIGIBLE"}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
        {eligible.length > 0 && role === "provider" && (
          <p className="mt-4 text-xs text-gray-500">
            Eligible net payout:{" "}
            <span className="font-semibold text-[#E2BE58]">
              {money(
                eligible.reduce((sum, booking) => sum + booking.providerNet, 0),
              )}
            </span>
          </p>
        )}
      </Panel>
    </div>
  );
}

function Transactions({ bookings }: { bookings: Booking[] }) {
  const rows = bookings.flatMap((booking) => [
    {
      ref: booking.reference,
      type: "Service amount",
      amount: booking.serviceAmount,
      direction: "Booking value",
      status: booking.paymentStatus,
    },
    {
      ref: booking.reference,
      type: "Customer platform fee",
      amount: booking.customerFee,
      direction: "Platform fee",
      status: booking.paymentStatus,
    },
    {
      ref: booking.reference,
      type: "Provider commission",
      amount: booking.providerFee,
      direction: "10% of service",
      status: booking.status === "COMPLETED" ? "CALCULATED" : "PENDING",
    },
  ]);
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold">Transaction ledger preview</h2>
        <p className="mt-1 text-sm text-gray-400">
          Service value, customer fee and provider commission are separate
          records.
        </p>
      </div>
      <Panel className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-xs">
            <thead className="border-b border-white/[0.07] bg-white/[0.025] text-[10px] uppercase tracking-wider text-gray-500">
              <tr>
                <th className="px-5 py-4">Booking reference</th>
                <th className="px-5 py-4">Ledger item</th>
                <th className="px-5 py-4">Amount</th>
                <th className="px-5 py-4">Classification</th>
                <th className="px-5 py-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={`${row.ref}-${row.type}`}
                  className="border-b border-white/[0.05] last:border-0"
                >
                  <td className="px-5 py-4 font-semibold text-[#E2BE58]">
                    {row.ref}
                  </td>
                  <td className="px-5 py-4 text-gray-300">{row.type}</td>
                  <td className="px-5 py-4 font-semibold">
                    {money(row.amount)}
                  </td>
                  <td className="px-5 py-4 text-gray-400">{row.direction}</td>
                  <td className="px-5 py-4">
                    <span className="rounded-full border border-white/10 px-2 py-1 text-[9px] text-gray-400">
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-10 text-center text-gray-500"
                  >
                    No transaction entries.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Panel>
      <p className="text-[10px] text-gray-500">
        These figures are illustrative UI data, not a payment ledger or Pixora
        revenue report.
      </p>
    </div>
  );
}

function Notifications({
  items,
  onRead,
  onReadAll,
}: {
  items: Notice[];
  onRead: (id: number) => void;
  onReadAll: () => void;
}) {
  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold">Notifications</h2>
          <p className="mt-1 text-sm text-gray-400">
            Booking and payout activity for this preview role.
          </p>
        </div>
        <button
          disabled={!items.some((item) => !item.read)}
          onClick={onReadAll}
          className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold text-gray-300 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <CheckCheck size={14} /> Mark all read
        </button>
      </div>
      <Panel className="divide-y divide-white/[0.06]">
        {items.length === 0 ? (
          <p className="p-10 text-center text-sm text-gray-500">
            You&apos;re all caught up. New Pixora updates will appear here.
          </p>
        ) : (
          items.map((notice) => (
            <button
              key={notice.id}
              onClick={() => onRead(notice.id)}
              className={`flex w-full items-start gap-3 p-4 text-left transition hover:bg-white/[0.025] sm:p-5 ${
                notice.read ? "opacity-60" : ""
              }`}
            >
              <span
                className={`mt-0.5 rounded-xl p-2.5 ${
                  notice.read
                    ? "bg-white/5 text-gray-500"
                    : "bg-[#E2BE58]/10 text-[#E2BE58]"
                }`}
              >
                {notice.read ? <Check size={17} /> : <Bell size={17} />}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold">{notice.title}</span>
                  {!notice.read && (
                    <span className="h-1.5 w-1.5 rounded-full bg-[#E2BE58]" />
                  )}
                  <span className="ml-auto text-[10px] text-gray-500">
                    {notice.time}
                  </span>
                </span>
                <span className="mt-1 block text-xs leading-5 text-gray-400">
                  {notice.message}
                </span>
                <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold text-[#E2BE58]">
                  Booking {notice.reference} <ArrowRight size={11} />
                </span>
              </span>
            </button>
          ))
        )}
      </Panel>
      <p className="flex items-center gap-2 text-[10px] text-gray-500">
        <MessageCircle size={13} /> Notifications are in-memory preview data;
        live delivery and persistence require the planned backend.
      </p>
    </div>
  );
}

function TermsContent({ provider }: { provider: boolean }) {
  const sections = provider
    ? [
        [
          "The marketplace",
          "Pixora connects customers with independent visual-service providers. Bookings and payment records are managed through the Pixora marketplace workflow.",
        ],
        [
          "Provider pricing & commission",
          "Providers set their service prices. Pixora deducts a 10% provider commission from the original service amount. Customers separately pay a 10% Pixora platform fee.",
        ],
        [
          "Fulfilment & availability",
          "Providers are responsible for fulfilling accepted Pixora bookings and maintaining accurate service details and availability.",
        ],
        [
          "Platform conduct",
          "Providers must not intentionally move Pixora-generated bookings off-platform to avoid applicable fees. Cancellation, dispute, and payout rules apply.",
        ],
        [
          "Review & enforcement",
          "Pixora may review suspicious booking or payment activity and may restrict an account for violations, subject to the final platform terms.",
        ],
      ]
    : [
        [
          "Transparent price",
          "The provider's service price is separate from Pixora's fee. Pixora adds a 10% customer service/platform fee, and the complete amount is shown before confirmation.",
        ],
        [
          "Booking through Pixora",
          "Bookings are created and tracked through Pixora. Provider acceptance may be required before the booking is confirmed.",
        ],
        [
          "Payment & cancellation",
          "Payment follows Pixora's configured payment process. Cancellation and refund rules apply and will be presented before launch.",
        ],
        [
          "Accurate information",
          "Customers must provide accurate event, timing, and location details and follow Pixora's platform rules.",
        ],
        [
          "Marketplace conduct",
          "Customers should not intentionally bypass Pixora's booking and payment process after being connected with a provider through Pixora.",
        ],
      ];
  return (
    <div className="space-y-4">
      {sections.map(([title, description], index) => (
        <div key={title} className="flex gap-3">
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#E2BE58]/10 text-[10px] font-bold text-[#E2BE58]">
            {index + 1}
          </span>
          <div>
            <h3 className="text-sm font-semibold">{title}</h3>
            <p className="mt-1 text-xs leading-5 text-gray-400">
              {description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function TermsPage({ role, onTerms }: { role: Role; onTerms: () => void }) {
  const agreementCards =
    role === "provider"
      ? [
          {
            title: "Provider Platform Terms",
            version: "v1.0 · Draft",
            description:
              "Marketplace conduct, service fulfilment, availability, and dispute rules.",
          },
          {
            title: "Fee & Commission Policy",
            version: "v1.0 · Draft",
            description:
              "10% provider commission from the original service amount; 10% customer fee is separate.",
          },
        ]
      : [
          {
            title: "Customer Booking & Payment Terms",
            version: "v1.0 · Draft",
            description:
              "Transparent fees, booking acceptance, payments, cancellations, and marketplace rules.",
          },
          {
            title: "Pixora Fee & Commission Policy",
            version: "v1.0 · Draft",
            description:
              "Customers pay service amount + 10%; provider commission is 10% of service amount.",
          },
        ];
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold">Agreements &amp; fee policy</h2>
        <p className="mt-1 text-sm text-gray-400">
          Draft terms are versioned for review. This UI preview is not a legal
          acceptance record.
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {agreementCards.map((agreement) => (
          <Panel key={agreement.title} className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold">{agreement.title}</h3>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-[#E2BE58]">
                  {agreement.version}
                </p>
              </div>
              <FileText className="shrink-0 text-[#E2BE58]" size={19} />
            </div>
            <p className="mt-4 text-xs leading-5 text-gray-400">
              {agreement.description}
            </p>
            <button
              onClick={onTerms}
              className="mt-5 text-xs font-semibold text-[#E2BE58] hover:text-white"
            >
              Read draft terms →
            </button>
          </Panel>
        ))}
      </div>
      <Panel className="p-5">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 text-[#E2BE58]" size={20} />
          <div>
            <h3 className="font-semibold">Legal review before launch</h3>
            <p className="mt-1 text-xs leading-5 text-gray-400">
              Final legal wording, version publication, acceptance timestamps,
              and consent records must be configured and recorded by the backend
              before production use.
            </p>
          </div>
        </div>
      </Panel>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-xs font-medium text-gray-400">
      {label}
      <span className="mt-1.5 block">{children}</span>
    </label>
  );
}
