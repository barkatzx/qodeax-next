import {
  CalendarDays,
  FlaskConical,
  Share2,
  Stethoscope,
  UsersRound,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import type { PreviewKey } from "@/components/products/qdms/previews/registry";

export interface QdmsCapability {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const qdmsCapabilities: QdmsCapability[] = [
  {
    title: "Patient Management",
    description:
      "Register patients with configurable IDs, catch duplicates, and keep contact details, referrals, visits, invoices, and orders on one profile.",
    icon: UsersRound,
  },
  {
    title: "Doctor Management",
    description:
      "Maintain doctor profiles, specialties, departments, chambers, weekly schedules, compensation agreements, earnings, and settlements.",
    icon: Stethoscope,
  },
  {
    title: "Appointment & Serial Management",
    description:
      "Book against doctor chamber schedules, assign daily serials, print patient tokens, and track consultation fees and status.",
    icon: CalendarDays,
  },
  {
    title: "Diagnostic Test Management",
    description:
      "Organize test categories and a priced catalog, create multi-test orders, set delivery dates, apply approved discounts, and issue invoices.",
    icon: FlaskConical,
  },
  {
    title: "Referral Management",
    description:
      "Attribute patients to doctors, hospitals, clinics, pharmacies, or individuals, then calculate commissions and track settlements.",
    icon: Share2,
  },
  {
    title: "Financial Operations",
    description:
      "Separate invoiced revenue from collected cash, and track patient dues, doctor payables, referral payables, discounts, and payment methods.",
    icon: Wallet,
  },
];

export interface QdmsDeepDive {
  id: string;
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
  preview: PreviewKey;
  previewAlt: string;
}

export const qdmsDeepDives: QdmsDeepDive[] = [
  {
    id: "patient-management",
    number: "01",
    eyebrow: "Patient Management",
    title: "Every patient record, organized in one place.",
    description:
      "Register patients with a configurable unique ID, catch possible duplicates, and keep contact details, referral attribution, visits, invoices, and diagnostic orders together.",
    points: [
      "Configurable patient ID prefix",
      "Name and phone search",
      "Duplicate detection",
      "Referral source attribution",
      "Complete patient history",
    ],
    preview: "patients",
    previewAlt:
      "QDMS patient directory showing configurable patient IDs, contact details, referral sources, duplicate detection, and a patient profile with visit history.",
  },
  {
    id: "appointment-management",
    number: "02",
    eyebrow: "Appointments & Serials",
    title: "Keep doctor appointments and serials organized.",
    description:
      "Book appointments against doctor chamber schedules, assign a daily serial for each doctor, print patient tokens, and track consultation fees and appointment status.",
    points: [
      "Doctor and chamber schedules",
      "Daily serial per doctor",
      "Printable appointment tokens",
      "Consultation fee snapshots",
      "Daily, weekly, monthly and yearly reports",
    ],
    preview: "appointments",
    previewAlt:
      "QDMS appointment screen showing today's queue, doctor-wise serial numbers, consultation fees, and a printable patient token.",
  },
  {
    id: "doctor-management",
    number: "03",
    eyebrow: "Doctor Management",
    title: "Manage doctors, chambers, and compensation.",
    description:
      "Maintain doctor profiles, specialties, departments, and chambers, then connect weekly schedules and compensation agreements to daily earnings and settlements.",
    points: [
      "Doctor directory and licenses",
      "Specialties and departments",
      "Multiple chambers and schedules",
      "Leave and schedule exceptions",
      "Compensation agreements",
      "Earnings and settlements",
    ],
    preview: "doctors",
    previewAlt:
      "QDMS doctor management screen showing doctor profiles, specialties, departments, chamber schedules, compensation earnings, and settlement totals.",
  },
  {
    id: "diagnostic-management",
    number: "04",
    eyebrow: "Diagnostics & Billing",
    title: "Run diagnostic orders from catalog to receipt.",
    description:
      "Organize test categories and a priced test catalog, create multi-test orders, apply approved discounts, issue invoices, and record payments with receipts.",
    points: [
      "Test categories and catalog",
      "Multi-test diagnostic orders",
      "Report delivery dates",
      "Discount request and approval",
      "Invoices and payment receipts",
      "Payment reversals",
    ],
    preview: "tests",
    previewAlt:
      "QDMS diagnostic billing screen showing a test catalog with codes and prices, a multi-test diagnostic order, invoice totals, and payment status.",
  },
  {
    id: "referral-management",
    number: "05",
    eyebrow: "Referral Management",
    title: "Track referral sources, agreements, and commissions.",
    description:
      "Attribute patients and orders to doctors, hospitals, clinics, pharmacies, or individuals, then calculate and settle commission using the agreement that applies.",
    points: [
      "Seven referral source types",
      "Percentage or fixed commissions",
      "Invoice or collected-revenue basis",
      "Commission ledger and adjustments",
      "Referral settlements",
      "Source performance statistics",
    ],
    preview: "referrals",
    previewAlt:
      "QDMS referral screen showing referral sources, agreement terms, referred patients, commission ledger, and outstanding settlements.",
  },
  {
    id: "financial-management",
    number: "06",
    eyebrow: "Financial Management",
    title: "See invoiced, collected, and outstanding clearly.",
    description:
      "Separate billed revenue from collected cash, then track patient dues, doctor payables, referral payables, discounts, and payment methods in one financial view.",
    points: [
      "Invoiced vs collected revenue",
      "Outstanding patient dues",
      "Doctor payable and settlements",
      "Referral payable and settlements",
      "Discount reporting",
      "Payment method breakdown",
    ],
    preview: "finance",
    previewAlt:
      "QDMS financial screen showing invoiced and collected revenue, outstanding dues, doctor and referral payables, payment methods, and recent payments.",
  },
];

export const qdmsSecurity = [
  {
    title: "Dedicated single-tenant deployment",
    description:
      "Each customer runs in its own environment with its own frontend, backend, database, and storage.",
  },
  {
    title: "Role-based access",
    description:
      "Admin and receptionist permissions are enforced by backend guards, not only by hidden navigation.",
  },
  {
    title: "Short-lived sessions",
    description:
      "Access tokens expire in 15 minutes by default, with rotating HTTP-only refresh tokens and server-side revocation.",
  },
  {
    title: "Audit trail",
    description:
      "Important operational and financial actions are recorded with the acting user, entity, and timestamp.",
  },
];
