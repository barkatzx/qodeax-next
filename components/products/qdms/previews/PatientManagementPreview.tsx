import { Filter, Plus, Search, TriangleAlert } from "lucide-react";
import {
  AppWindow,
  Avatar,
  PreviewPanel,
  StatusPill,
  previewTableCellClass,
  previewTableHeadClass,
} from "@/components/products/qdms/previews/primitives";

const patients = [
  {
    id: "JD-000048",
    name: "Nusrat Jahan",
    phone: "01711 245 890",
    gender: "Female",
    age: "32",
    referral: "Shakil Ahmed",
    status: "Active",
    tone: "success" as const,
  },
  {
    id: "JD-000047",
    name: "Rahim Uddin",
    phone: "01819 552 104",
    gender: "Male",
    age: "45",
    referral: "Direct",
    status: "Active",
    tone: "success" as const,
  },
  {
    id: "JD-000046",
    name: "Fatima Akter",
    phone: "01620 883 771",
    gender: "Female",
    age: "28",
    referral: "City Clinic",
    status: "Active",
    tone: "success" as const,
  },
  {
    id: "JD-000045",
    name: "Hasan Mahmud",
    phone: "01911 640 233",
    gender: "Male",
    age: "51",
    referral: "Dr. Kamrul Hasan",
    status: "Active",
    tone: "success" as const,
  },
];

const visits = [
  { date: "25 Nov 2026", test: "CBC + Lipid Profile", status: "Paid" },
  { date: "12 Sep 2026", test: "Thyroid Profile (TSH)", status: "Paid" },
  { date: "03 Jun 2026", test: "Chest X-Ray", status: "Paid" },
];

export function PatientManagementPreview() {
  return (
    <AppWindow
      variant="rail"
      active="patients"
      title="Patients"
      subtitle="Patient directory · 9 records"
    >
      <div className="space-y-2.5">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="flex min-w-0 flex-1 items-center gap-1.5 rounded-md border border-line bg-white px-2 py-1.5 text-[8.5px] text-ink-muted">
            <Search className="size-2.5 shrink-0" />
            <span className="truncate">Search by name, phone, or patient ID</span>
          </span>
          <span className="flex items-center gap-1 rounded-md border border-line bg-white px-2 py-1.5 text-[8.5px] text-ink-soft">
            <Filter className="size-2.5" /> Filter
          </span>
          <span className="inline-flex items-center gap-1 rounded-md bg-brand px-2 py-1.5 text-[8.5px] font-semibold text-[#0c2b1d]">
            <Plus className="size-2.5" /> Register patient
          </span>
        </div>

        <div className="flex items-start gap-1.5 rounded-md border border-[#ead9b0] bg-[#fdf6e3] px-2 py-1.5">
          <TriangleAlert className="mt-0.5 size-2.5 shrink-0 text-[#7a5310]" />
          <p className="text-[8px] leading-snug text-[#7a5310]">
            Possible duplicate:{" "}
            <span className="font-semibold">Jasmine Akther (JD-000045)</span>{" "}
            shares this phone number.
          </p>
          <span className="ml-auto shrink-0 text-[8px] font-semibold text-[#7a5310]">
            Review
          </span>
        </div>

        <div className="grid gap-2 @2xl:grid-cols-[1.5fr_1fr]">
          <PreviewPanel
            title="All patients"
            action="9 records"
            bodyClassName="p-0"
          >
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className={previewTableHeadClass}>Patient</th>
                    <th className={`${previewTableHeadClass} hidden @sm:table-cell`}>
                      Contact
                    </th>
                    <th className={`${previewTableHeadClass} hidden @md:table-cell`}>
                      Referral
                    </th>
                    <th className={previewTableHeadClass}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((patient) => (
                    <tr key={patient.id}>
                      <td className={previewTableCellClass}>
                        <span className="flex items-center gap-1.5">
                          <Avatar name={patient.name} className="size-5 text-[6.5px]" />
                          <span className="min-w-0">
                            <span className="block truncate font-medium whitespace-nowrap text-ink">
                              {patient.name}
                            </span>
                            <span className="block text-[7.5px] text-ink-muted">
                              {patient.id}
                            </span>
                          </span>
                        </span>
                      </td>
                      <td className={`${previewTableCellClass} hidden @sm:table-cell`}>
                        <span className="block whitespace-nowrap">
                          {patient.phone}
                        </span>
                        <span className="block text-[7px] text-ink-muted">
                          {patient.gender} · {patient.age}
                        </span>
                      </td>
                      <td
                        className={`${previewTableCellClass} hidden whitespace-nowrap @md:table-cell`}
                      >
                        {patient.referral}
                      </td>
                      <td className={previewTableCellClass}>
                        <StatusPill tone={patient.tone}>
                          {patient.status}
                        </StatusPill>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </PreviewPanel>

          <PreviewPanel title="Patient profile" action="JD-000048">
            <div className="flex items-center gap-2">
              <Avatar name="Nusrat Jahan" className="size-9 text-[11px]" />
              <div className="min-w-0">
                <p className="truncate font-heading text-[11px] leading-tight font-semibold">
                  Nusrat Jahan
                </p>
                <p className="text-[8px] text-ink-muted">
                  Female · 32 years · O+
                </p>
              </div>
            </div>

            <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-[8px]">
              <div>
                <dt className="text-ink-muted">Phone</dt>
                <dd className="mt-0.5 font-medium">01711 245 890</dd>
              </div>
              <div>
                <dt className="text-ink-muted">Last visit</dt>
                <dd className="mt-0.5 font-medium">25 Nov 2026</dd>
              </div>
              <div>
                <dt className="text-ink-muted">Referral source</dt>
                <dd className="mt-0.5 font-medium">Shakil Ahmed</dd>
              </div>
              <div>
                <dt className="text-ink-muted">Registered</dt>
                <dd className="mt-0.5 font-medium">20 Nov 2026</dd>
              </div>
            </dl>

            <div className="mt-3 border-t border-line pt-2">
              <div className="flex items-center gap-2 text-[8px]">
                <span className="rounded bg-brand-soft px-1.5 py-0.5 font-semibold text-[#145c3d]">
                  Visits
                </span>
                <span className="text-ink-muted">Invoices</span>
                <span className="text-ink-muted">Orders</span>
              </div>
              <ul className="mt-2 space-y-1.5">
                {visits.map((visit) => (
                  <li
                    key={visit.date}
                    className="flex items-center justify-between gap-2"
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-[8.5px] font-medium">
                        {visit.test}
                      </span>
                      <span className="block text-[7.5px] text-ink-muted">
                        {visit.date}
                      </span>
                    </span>
                    <StatusPill tone="success">{visit.status}</StatusPill>
                  </li>
                ))}
              </ul>
            </div>
          </PreviewPanel>
        </div>
      </div>
    </AppWindow>
  );
}
