import type { ComponentType } from "react";
import { AnalyticsPreview } from "@/components/products/qdms/previews/AnalyticsPreview";
import { AppointmentManagementPreview } from "@/components/products/qdms/previews/AppointmentManagementPreview";
import { DashboardOverviewPreview } from "@/components/products/qdms/previews/DashboardOverviewPreview";
import { DiagnosticBillingPreview } from "@/components/products/qdms/previews/DiagnosticBillingPreview";
import { DoctorManagementPreview } from "@/components/products/qdms/previews/DoctorManagementPreview";
import { FinancialAnalyticsPreview } from "@/components/products/qdms/previews/FinancialAnalyticsPreview";
import { PatientManagementPreview } from "@/components/products/qdms/previews/PatientManagementPreview";
import { ReferralManagementPreview } from "@/components/products/qdms/previews/ReferralManagementPreview";

export type PreviewKey =
  | "patients"
  | "appointments"
  | "doctors"
  | "tests"
  | "referrals"
  | "finance"
  | "analytics"
  | "dashboard";

export const qdmsPreviews: Record<PreviewKey, ComponentType> = {
  patients: PatientManagementPreview,
  appointments: AppointmentManagementPreview,
  doctors: DoctorManagementPreview,
  tests: DiagnosticBillingPreview,
  referrals: ReferralManagementPreview,
  finance: FinancialAnalyticsPreview,
  analytics: AnalyticsPreview,
  dashboard: DashboardOverviewPreview,
};
