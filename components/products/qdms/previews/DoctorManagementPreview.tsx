import { CalendarDays, MoreHorizontal } from "lucide-react";
import {
  AppWindow,
  Avatar,
  PreviewPanel,
  ProgressBar,
} from "@/components/products/qdms/previews/primitives";

const doctors = [
  {
    name: "Dr. Ayesha Rahman",
    specialty: "Consultant",
    department: "Gynae & Obs",
    license: "GY-25465",
    chamber: "Chamber 2",
    appointments: "18",
    earnings: "৳18,400",
    share: 82,
  },
  {
    name: "Dr. Imran Hossain",
    specialty: "Radiology",
    department: "Chest Diseases",
    license: "RD-11820",
    chamber: "Chamber 1",
    appointments: "12",
    earnings: "৳14,200",
    share: 68,
  },
  {
    name: "Dr. Farhana Islam",
    specialty: "Consultant",
    department: "Cardiology",
    license: "CD-09214",
    chamber: "Chamber 3",
    appointments: "8",
    earnings: "৳9,800",
    share: 52,
  },
  {
    name: "Dr. Kamrul Hasan",
    specialty: "Associate Professor",
    department: "Medicine",
    license: "MD-07331",
    chamber: "Chamber 4",
    appointments: "15",
    earnings: "৳12,600",
    share: 74,
  },
];

const filters = ["All", "Active", "Inactive"];

export function DoctorManagementPreview() {
  return (
    <AppWindow
      variant="rail"
      active="doctors"
      title="Doctors"
      subtitle="Directory, schedules & compensation"
    >
      <div className="space-y-2.5">
        <div className="flex flex-wrap items-center gap-1.5">
          {filters.map((filter, index) => (
            <span
              key={filter}
              className={
                index === 0
                  ? "rounded-md bg-ink px-2 py-1 text-[8px] font-medium text-white"
                  : "rounded-md border border-line bg-white px-2 py-1 text-[8px] text-ink-soft"
              }
            >
              {filter}
            </span>
          ))}
          <span className="ml-auto rounded-md bg-brand px-2 py-1 text-[8px] font-semibold text-[#0c2b1d]">
            New doctor
          </span>
        </div>

        <PreviewPanel
          title="Doctor directory"
          action="4 active"
          bodyClassName="p-2"
        >
          <div className="grid gap-1.5 @sm:grid-cols-2">
            {doctors.map((doctor) => (
              <div
                key={doctor.name}
                className="rounded-lg border border-line bg-[#fdfdfc] p-2"
              >
                <div className="flex items-start gap-1.5">
                  <Avatar name={doctor.name} className="size-7 text-[8px]" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[9.5px] font-semibold text-ink">
                      {doctor.name}
                    </p>
                    <p className="truncate text-[7.5px] text-ink-muted">
                      {doctor.specialty} · {doctor.department}
                    </p>
                  </div>
                  <MoreHorizontal className="size-3 shrink-0 text-ink-muted/60" />
                </div>

                <div className="mt-2 flex items-end justify-between gap-2">
                  <div>
                    <p className="text-[7px] text-ink-muted uppercase">
                      Today&apos;s appointments
                    </p>
                    <p className="mt-0.5 flex items-center gap-1 text-[8.5px] font-medium">
                      <CalendarDays className="size-2.5 text-ink-muted" />
                      {doctor.appointments} patients
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[7px] text-ink-muted uppercase">
                      Earnings
                    </p>
                    <p className="mt-0.5 text-[9px] font-semibold">
                      {doctor.earnings}
                    </p>
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between text-[7px] text-ink-muted">
                  <span>{doctor.chamber}</span>
                  <span>License {doctor.license}</span>
                </div>
                <ProgressBar value={doctor.share} className="mt-1 h-1" />
              </div>
            ))}
          </div>
        </PreviewPanel>

        <div className="rounded-lg border border-line bg-white p-2.5">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <div>
              <p className="text-[8px] font-semibold tracking-[0.08em] text-ink-muted uppercase">
                Doctor settlement summary · November
              </p>
              <p className="mt-0.5 font-heading text-[14px] font-semibold tracking-[-0.02em]">
                ৳110,000 settled
              </p>
            </div>
            <div className="flex gap-4 text-right">
              <div>
                <p className="text-[7px] text-ink-muted uppercase">
                  Outstanding
                </p>
                <p className="text-[9.5px] font-semibold">৳24,500</p>
              </div>
              <div>
                <p className="text-[7px] text-ink-muted uppercase">
                  Next settlement
                </p>
                <p className="text-[9.5px] font-semibold">30 Nov</p>
              </div>
            </div>
          </div>
          <div className="mt-2 flex gap-1.5 border-t border-line pt-2 text-[7.5px] text-ink-muted">
            <span>Agreements: 4 active</span>
            <span aria-hidden>·</span>
            <span>Settlements: 8 recorded</span>
          </div>
        </div>
      </div>
    </AppWindow>
  );
}
