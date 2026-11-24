import {
  Activity,
  CalendarDays,
  CircleDollarSign,
  FlaskConical,
  UserPlus,
  Users,
} from "lucide-react";
import {
  AppWindow,
  Avatar,
  MiniComparisonChart,
  PreviewPanel,
  PreviewStat,
  StatusPill,
  previewTableCellClass,
  previewTableHeadClass,
} from "@/components/products/qdms/previews/primitives";

const schedule = [
  {
    doctor: "Dr. Ayesha Rahman",
    specialty: "Pathology",
    chamber: "Chamber 2",
    appointments: "18",
    status: "Active",
    tone: "success" as const,
  },
  {
    doctor: "Dr. Imran Hossain",
    specialty: "Radiology",
    chamber: "Chamber 1",
    appointments: "12",
    status: "Active",
    tone: "success" as const,
  },
  {
    doctor: "Dr. Farhana Islam",
    specialty: "Cardiology",
    chamber: "Chamber 3",
    appointments: "08",
    status: "Starts 4 PM",
    tone: "warning" as const,
  },
];

const recentOrders = [
  {
    invoice: "INV-2026-000026",
    patient: "Nusrat Jahan",
    total: "৳1,200",
    status: "Paid",
    tone: "success" as const,
  },
  {
    invoice: "INV-2026-000025",
    patient: "Rahim Uddin",
    total: "৳3,500",
    status: "Pending",
    tone: "warning" as const,
  },
  {
    invoice: "INV-2026-000024",
    patient: "Fatima Akter",
    total: "৳1,150",
    status: "Completed",
    tone: "info" as const,
  },
  {
    invoice: "INV-2026-000023",
    patient: "Hasan Mahmud",
    total: "৳900",
    status: "Paid",
    tone: "success" as const,
  },
];

const recentPatients = [
  { name: "Nusrat Jahan", id: "JD-000048", referral: "Shakil Ahmed", time: "2m" },
  { name: "Rahim Uddin", id: "JD-000047", referral: "Direct", time: "18m" },
  { name: "Fatima Akter", id: "JD-000046", referral: "City Clinic", time: "42m" },
  { name: "Hasan Mahmud", id: "JD-000045", referral: "Dr. Kamrul Hasan", time: "1h" },
];

export function DashboardOverviewPreview() {
  return (
    <AppWindow
      active="overview"
      title="Dashboard"
      subtitle="Admin overview · Today · Asia/Dhaka"
    >
      <div className="space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-[8.5px] text-ink-muted">Welcome back</p>
            <p className="mt-0.5 font-heading text-[13px] leading-tight font-semibold tracking-[-0.02em]">
              Ayesha Rahman
            </p>
          </div>
          <div className="flex items-center gap-1">
            {["Today", "This week", "This month"].map((period, index) => (
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
            <span className="ml-1 inline-flex items-center gap-1 rounded-md bg-brand px-2 py-1 text-[8px] font-semibold text-[#0c2b1d]">
              <UserPlus className="size-2.5" /> Register patient
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 @xl:grid-cols-4">
          <PreviewStat label="Today's visits" value="128" delta="+12%" icon={Activity} />
          <PreviewStat label="Total patients" value="12,480" delta="registered" icon={Users} />
          <PreviewStat
            label="Today's appointments"
            value="42"
            delta="8 waiting"
            icon={CalendarDays}
          />
          <PreviewStat
            label="Collected revenue"
            value="৳84,500"
            delta="+9.4%"
            icon={CircleDollarSign}
            tone="brand"
          />
        </div>

        <div className="grid gap-2 @2xl:grid-cols-[1.45fr_1fr]">
          <PreviewPanel title="Invoiced vs collected" action="This week">
            <div className="flex flex-wrap items-baseline gap-3">
              <span className="font-heading text-[17px] leading-none font-semibold tracking-[-0.03em]">
                ৳412,800
              </span>
              <span className="text-[8px] text-ink-muted">invoiced</span>
              <span className="font-heading text-[17px] leading-none font-semibold tracking-[-0.03em] text-[#177a4f]">
                ৳284,500
              </span>
              <span className="text-[8px] text-ink-muted">collected</span>
            </div>
            <MiniComparisonChart
              primary={[32, 41, 38, 52, 47, 64, 58]}
              secondary={[48, 58, 51, 70, 62, 86, 78]}
              height={70}
              className="mt-2 h-[70px]"
            />
            <div className="mt-1 flex items-center justify-between">
              <div className="flex gap-3">
                <span className="flex items-center gap-1 text-[7.5px] text-ink-muted">
                  <span className="size-1.5 rounded-full bg-brand" /> Collected
                </span>
                <span className="flex items-center gap-1 text-[7.5px] text-ink-muted">
                  <span className="size-1.5 rounded-full bg-[#c3cbc6]" /> Invoiced
                </span>
              </div>
              <span className="text-[7.5px] text-ink-muted">Net of reversals</span>
            </div>
          </PreviewPanel>

          <PreviewPanel title="Today's doctor schedule" action="3 on duty">
            <div className="divide-y divide-line/70">
              {schedule.map((item) => (
                <div key={item.doctor} className="flex items-center gap-2 py-[7px] first:pt-0 last:pb-0">
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
                    <p className="text-[8.5px] font-semibold text-ink">
                      {item.appointments}
                    </p>
                    <p className="text-[7px] text-ink-muted">appts</p>
                  </div>
                  <StatusPill tone={item.tone}>{item.status}</StatusPill>
                </div>
              ))}
            </div>
          </PreviewPanel>
        </div>

        <div className="grid gap-2 @2xl:grid-cols-[1.45fr_1fr]">
          <PreviewPanel
            title="Recent diagnostic orders"
            action="View all"
            bodyClassName="p-0"
          >
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className={previewTableHeadClass}>Order</th>
                    <th className={previewTableHeadClass}>Patient</th>
                    <th className={previewTableHeadClass}>Total</th>
                    <th className={previewTableHeadClass}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.invoice}>
                      <td className={`${previewTableCellClass} whitespace-nowrap text-ink-muted`}>
                        {order.invoice}
                      </td>
                      <td className={`${previewTableCellClass} whitespace-nowrap font-medium text-ink`}>
                        {order.patient}
                      </td>
                      <td className={`${previewTableCellClass} whitespace-nowrap font-medium`}>
                        {order.total}
                      </td>
                      <td className={previewTableCellClass}>
                        <StatusPill tone={order.tone}>{order.status}</StatusPill>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </PreviewPanel>

          <PreviewPanel title="Recent patients" action="Today">
            <ul className="space-y-2.5">
              {recentPatients.map((patient) => (
                <li key={patient.id} className="flex items-center gap-2">
                  <Avatar name={patient.name} className="size-6 text-[7.5px]" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[9px] font-medium text-ink">
                      {patient.name}
                    </p>
                    <p className="truncate text-[7.5px] text-ink-muted">
                      {patient.id} · {patient.referral}
                    </p>
                  </div>
                  <span className="text-[7.5px] text-ink-muted">{patient.time}</span>
                </li>
              ))}
            </ul>
            <div className="mt-2 flex items-center gap-1 border-t border-line pt-2 text-[7.5px] text-ink-muted">
              <FlaskConical className="size-2.5" />
              Diagnostic orders are linked to patient records.
            </div>
          </PreviewPanel>
        </div>
      </div>
    </AppWindow>
  );
}
