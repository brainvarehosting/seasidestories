import fs from "fs";
import path from "path";
import crypto from "crypto";

const DATA_DIR = path.join(process.cwd(), "data");

function readJSON<T>(filename: string, defaultValue: T): T {
  try {
    const filePath = path.join(DATA_DIR, filename);
    if (!fs.existsSync(filePath)) return defaultValue;
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch {
    return defaultValue;
  }
}

function writeJSON(filename: string, data: unknown): void {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(
    path.join(DATA_DIR, filename),
    JSON.stringify(data, null, 2)
  );
}

export interface Booking {
  id: string;
  checkIn: string;
  checkOut: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  guests: number;
  totalPrice: number;
  nights: number;
  status: "pending" | "confirmed" | "rejected" | "cancelled";
  createdAt: string;
  notes?: string;
  message?: string;
}

export interface PricingPeriod {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  pricePerNight: number;
}

export interface PricingConfig {
  defaultPricePerNight: number;
  minimumNights: number;
  cleaningFee: number;
  securityDeposit: number;
  currency: string;
  periods: PricingPeriod[];
  blockedDates: string[];
}

export interface Settings {
  adminEmail: string;
  adminPasswordHash: string;
  villaName: string;
  contactPhone: string;
  contactEmail: string;
  instagram: string;
  facebook: string;
  whatsapp: string;
  address: string;
  checkInTime: string;
  checkOutTime: string;
  maxGuests: number;
}

export const db = {
  bookings: {
    getAll(): Booking[] {
      return readJSON<Booking[]>("bookings.json", []);
    },
    getById(id: string): Booking | undefined {
      return this.getAll().find((b) => b.id === id);
    },
    create(data: Omit<Booking, "id" | "createdAt" | "status">): Booking {
      const bookings = this.getAll();
      const booking: Booking = {
        ...data,
        id: crypto.randomUUID(),
        status: "pending",
        createdAt: new Date().toISOString(),
      };
      bookings.push(booking);
      writeJSON("bookings.json", bookings);
      return booking;
    },
    update(id: string, updates: Partial<Booking>): Booking | null {
      const bookings = this.getAll();
      const idx = bookings.findIndex((b) => b.id === id);
      if (idx === -1) return null;
      bookings[idx] = { ...bookings[idx], ...updates };
      writeJSON("bookings.json", bookings);
      return bookings[idx];
    },
    delete(id: string): boolean {
      const bookings = this.getAll();
      const filtered = bookings.filter((b) => b.id !== id);
      if (filtered.length === bookings.length) return false;
      writeJSON("bookings.json", filtered);
      return true;
    },
  },

  pricing: {
    get(): PricingConfig {
      return readJSON<PricingConfig>("pricing.json", {
        defaultPricePerNight: 18000,
        minimumNights: 2,
        cleaningFee: 2000,
        securityDeposit: 5000,
        currency: "INR",
        periods: [],
        blockedDates: [],
      });
    },
    update(config: PricingConfig): void {
      writeJSON("pricing.json", config);
    },
    getPriceForDate(date: string): number {
      const config = this.get();
      const d = new Date(date);
      for (const period of config.periods) {
        const start = new Date(period.startDate);
        const end = new Date(period.endDate);
        if (d >= start && d <= end) return period.pricePerNight;
      }
      return config.defaultPricePerNight;
    },
    calculateTotal(checkIn: string, checkOut: string): { nights: number; breakdown: { date: string; price: number }[]; subtotal: number; cleaningFee: number; total: number } {
      const config = this.get();
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const breakdown: { date: string; price: number }[] = [];
      const current = new Date(start);
      while (current < end) {
        const dateStr = current.toISOString().split("T")[0];
        breakdown.push({ date: dateStr, price: this.getPriceForDate(dateStr) });
        current.setDate(current.getDate() + 1);
      }
      const subtotal = breakdown.reduce((sum, d) => sum + d.price, 0);
      return {
        nights: breakdown.length,
        breakdown,
        subtotal,
        cleaningFee: config.cleaningFee,
        total: subtotal + config.cleaningFee,
      };
    },
    isDateAvailable(date: string): boolean {
      const config = this.get();
      if (config.blockedDates.includes(date)) return false;
      const bookings = db.bookings.getAll().filter((b) => b.status === "confirmed");
      return !bookings.some((b) => {
        const d = new Date(date);
        return d >= new Date(b.checkIn) && d < new Date(b.checkOut);
      });
    },
  },

  settings: {
    get(): Settings {
      return readJSON<Settings>("settings.json", {
        adminEmail: "care@brainvare.com",
        adminPasswordHash: "",
        villaName: "Seaside Stories",
        contactPhone: "",
        contactEmail: "",
        instagram: "",
        facebook: "",
        whatsapp: "",
        address: "Kerala, India",
        checkInTime: "14:00",
        checkOutTime: "11:00",
        maxGuests: 10,
      });
    },
    update(settings: Settings): void {
      writeJSON("settings.json", settings);
    },
  },
};
