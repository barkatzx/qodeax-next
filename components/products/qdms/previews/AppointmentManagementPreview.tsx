import { Clock3, Printer, ReceiptText, Ticket } from "lucide-react";
import {
  AppWindow,
  Avatar,
  PreviewPanel,
  PreviewStat,
  StatusPill,
} from "@/components/products/qdms/previews/primitives";

const periods = ["Today", "Weekly", "Monthly", "Yearly", "All time"];

const queue = [
  {
    doctor: "Dr. Ayesha Rahman",
    specialty: "Pathology",
    chamber: "Chamber 2",
    waiting: "6",
    next: "24",
    status: "Active",
    tone: "success" as const,
  },
  {
    doctor: "Dr. Imran Hossain",
    specialty: "Radiology",
    chamber: "Chamber 1",
    waiting: "4",
    next: "18",
    status: "Active",
    tone: "success" as const,
  },
  {
    doctor: "Dr. Farhana Islam",
    specialty: "Cardiology",
    chamber: "Chamber 3",
    waiting: "2",
    next: "09",
    status: "Starts 4 PM",
    tone: "warning" as const,
  },
];

const upcoming = [
  { time: "10:45", patient: "Tanvir Ahmed", serial: "25" },
  { time: "11:00", patient: "Sharmin Sultana", serial: "26" },
  { time: "11:15", patient: "Kamal Hossain", serial: "27" },
];

export function AppointmentManagementPreview() {
  return (
    <AppWindow
      variant="rail"
      active="appointments"
      title="Appointments"
      subtitle="Today · Asia/Dhaka · 42 scheduled"
    >
      <div className="space-y-2.5">
        <div className="flex flex-wrap items-center gap-1">
          {periods.map((period, index) => (
            <span
              key={period}
              className={
                index === 0
                  ? "rounded-md bg-ink px-2 py-1 text-[8px] font-medium text-white"
                  : "rounded-md border border-line bg-white px-2 py-1 text-[8px] text-ink-muted"
              }
            >
              {period}
            </span>
          ))}
          <span className="ml-auto rounded-md bg-brand px-2 py-1 text-[8px] font-semibold text-[#0c2b1d]">
            New appointment
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <PreviewStat label="Scheduled" value="42" delta="today" />
          <PreviewStat label="Completed" value="28" delta="67%" />
          <PreviewStat label="Waiting" value="8" delta="avg 12m" />
        </div>

        <div className="grid gap-2 @2xl:grid-cols-[1.45fr_1fr]">
          <PreviewPanel
            title="Doctor-wise queue"
            action="Live"
            bodyClassName="px-0 py-0"
          >
            <div className="divide-y divide-line/70">
              {queue.map((item) => (
                <div
                  key={item.doctor}
                  className="flex items-center gap-2 px-2.5 py-2"
                >
                  <Avatar name={item.doctor} className="size-6 text-[7.5px]" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[9.5px] font-medium text-ink">
                      {item.doctor}
                    </p>
                    <p className="truncate text-[7.5px] text-ink-muted">
                      {item.specialty} · {item.chamber}
                    </p>
                  </div>
                  <div className="hidden text-right @sm:block">
                    <p className="text-[9px] font-semibold text-ink">
                      {item.waiting} waiting
                    </p>
                    <p className="text-[7.5px] text-ink-muted">
                      Next #{item.next}
                    </p>
                  </div>
                  <StatusPill tone={item.tone}>{item.status}</StatusPill>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between border-t border-line px-2.5 py-1.5 text-[7.5px] text-ink-muted">
              <span>Daily serials are assigned per doctor</span>
              <span className="font-medium text-ink">15 appointments</span>
            </div>
          </PreviewPanel>

          <PreviewPanel
            title="Now serving"
            action="Token"
            bodyClassName="p-2.5"
          >
            <div className="rounded-lg bg-dark p-3 text-white">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[7.5px] font-medium tracking-[0.15em] text-white/60 uppercase">
                    Appointment token
                  </p>
                  <p className="mt-1 font-heading text-[22px] leading-none font-bold tracking-[-0.03em] text-brand">
                    JD-024
                  </p>
                  <p className="mt-0.5 text-[8px] text-white/55">
                    Serial #24
                  </p>
                </div>
                <span className="flex size-7 items-center justify-center rounded-md bg-white/10">
                  <Ticket className="size-3.5 text-brand" />
                </span>
              </div>
              <p className="mt-2 text-[9.5px] font-medium">Nusrat Jahan</p>
              <p className="text-[7.5px] text-white/55">
                JD-000048 · Dr. Ayesha Rahman · Chamber 2
              </p>
              <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-2">
                <span className="flex items-center gap-1 text-[7.5px] text-white/55">
                  <Clock3 className="size-2.5" /> 10:32 AM · ৳500 fee
                </span>
                <span className="flex items-center gap-1">
                  <span className="inline-flex items-center gap-1 rounded bg-brand px-1.5 py-1 text-[7.5px] font-semibold text-[#0c2b1d]">
                    <Printer className="size-2.5" /> Print token
                  </span>
                  <span className="inline-flex items-center gap-1 rounded bg-white/10 px-1.5 py-1 text-[7.5px] font-medium text-white">
                    <ReceiptText className="size-2.5" /> Receipt
                  </span>
                </span>
              </div>
            </div>

            <p className="mt-2 text-[7.5px] font-semibold tracking-[0.1em] text-ink-muted uppercase">
              Up next
            </p>
            <ul className="mt-1 space-y-1">
              {upcoming.map((item) => (
                <li
                  key={item.serial}
                  className="flex items-center gap-2 text-[8px]"
                >
                  <span className="w-7 text-ink-muted">{item.time}</span>
                  <span className="min-w-0 flex-1 truncate font-medium">
                    {item.patient}
                  </span>
                  <span className="text-ink-muted">#{item.serial}</span>
                </li>
              ))}
            </ul>
          </PreviewPanel>
        </div>
      </div>
    </AppWindow>
  );
}
