import {
  AppWindow,
  Avatar,
  MiniComparisonChart,
  PreviewPanel,
  PreviewStat,
  ProgressBar,
  StatusPill,
  previewTableCellClass,
  previewTableHeadClass,
} from "@/components/products/qdms/previews/primitives";
import { cn } from "@/lib/utils";

const doctors = [
  { name: "Dr. Ayesha Rahman", appointments: 32, completed: 28, share: 92 },
  { name: "Dr. Imran Hossain", appointments: 24, completed: 20, share: 78 },
  { name: "Dr. Kamrul Hasan", appointments: 19, completed: 16, share: 68 },
  { name: "Dr. Farhana Islam", appointments: 14, completed: 11, share: 52 },
];

const recentOrders = [
  {
    order: "INV-2026-000026",
    patient: "Nusrat Jahan",
    total: "৳1,200",
    status: "Paid",
    tone: "success" as const,
  },
  {
    order: "INV-2026-000025",
    patient: "Rahim Uddin",
    total: "৳3,500",
    status: "Partial",
    tone: "warning" as const,
  },
  {
    order: "INV-2026-000024",
    patient: "Fatima Akter",
    total: "৳1,150",
    status: "Completed",
    tone: "info" as const,
  },
  {
    order: "INV-2026-000023",
    patient: "Hasan Mahmud",
    total: "৳900",
    status: "Paid",
    tone: "success" as const,
  },
];

const paymentMix = [
  { label: "Diagnostic tests", value: 58 },
  { label: "Consultations", value: 27 },
  { label: "Packages", value: 15 },
];

export function AnalyticsPreview() {
  return (
    <AppWindow
      active="overview"
      title="Dashboard analytics"
      subtitle="Operational & financial performance · November"
    >
      <div className="space-y-2.5">
        <div className="grid grid-cols-2 gap-2 @xl:grid-cols-4">
          <PreviewStat label="Today's visits" value="128" delta="+12%" />
          <PreviewStat label="Total patients" value="12,480" delta="registered" />
          <PreviewStat label="Diagnostic orders" value="96" delta="this month" />
          <PreviewStat
            label="Collected revenue"
            value="৳842,500"
            delta="+11.8%"
            tone="brand"
          />
        </div>

        <div className="grid gap-2 @2xl:grid-cols-[1.45fr_1fr]">
          <PreviewPanel title="Invoiced vs collected" action="Last 6 months">
            <div className="flex flex-wrap items-baseline gap-3">
              <span className="font-heading text-[19px] leading-none font-semibold tracking-[-0.03em]">
                ৳842,500
              </span>
              <span className="text-[8px] text-ink-muted">collected</span>
              <span className="font-heading text-[15px] leading-none font-semibold tracking-[-0.03em] text-[#8b9691]">
                ৳1,124,000
              </span>
              <span className="text-[8px] text-ink-muted">invoiced</span>
            </div>
            <MiniComparisonChart
              primary={[62, 74, 69, 88, 80, 96]}
              secondary={[78, 92, 85, 110, 101, 124]}
              height={92}
              className="mt-2 h-[92px]"
            />
            <div className="mt-1 flex justify-between">
              {["Jun", "Jul", "Aug", "Sep", "Oct", "Nov"].map((month) => (
                <span key={month} className="text-[7.5px] text-ink-muted">
                  {month}
                </span>
              ))}
            </div>
            <div className="mt-1.5 flex items-center gap-3">
              <span className="flex items-center gap-1 text-[7.5px] text-ink-muted">
                <span className="size-1.5 rounded-full bg-brand" /> Collected
              </span>
              <span className="flex items-center gap-1 text-[7.5px] text-ink-muted">
                <span className="size-1.5 rounded-full bg-[#c3cbc6]" /> Invoiced
              </span>
            </div>
          </PreviewPanel>

          <PreviewPanel title="Doctor analytics" action="This month">
            <ul className="space-y-2.5">
              {doctors.map((doctor) => (
                <li key={doctor.name} className="flex items-center gap-2">
                  <Avatar name={doctor.name} className="size-6 text-[7px]" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="truncate text-[8.5px] font-medium text-ink">
                        {doctor.name}
                      </span>
                      <span className="shrink-0 text-[7.5px] text-ink-muted">
                        {doctor.completed}/{doctor.appointments}
                      </span>
                    </div>
                    <ProgressBar value={doctor.share} className="mt-1 h-1" />
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-2.5 flex items-center justify-between border-t border-line pt-2 text-[8px]">
              <span className="text-ink-muted">Doctor payable</span>
              <span className="font-medium">৳64,800</span>
            </div>
            <div className="mt-1 flex items-center justify-between text-[8px]">
              <span className="text-ink-muted">Referral payable</span>
              <span className="font-medium">৳12,400</span>
            </div>
          </PreviewPanel>
        </div>

        <div className="grid gap-2 @2xl:grid-cols-[1.5fr_1fr]">
          <PreviewPanel
            title="Recent diagnostic orders"
            action="Today"
            bodyClassName="p-0"
          >
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className={previewTableHeadClass}>Order</th>
                    <th className={previewTableHeadClass}>Patient</th>
                    <th className={`${previewTableHeadClass} hidden @md:table-cell`}>
                      Report
                    </th>
                    <th className={previewTableHeadClass}>Total</th>
                    <th className={previewTableHeadClass}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((item) => (
                    <tr key={item.order}>
                      <td className={`${previewTableCellClass} whitespace-nowrap text-ink-muted`}>
                        {item.order}
                      </td>
                      <td className={`${previewTableCellClass} whitespace-nowrap font-medium text-ink`}>
                        {item.patient}
                      </td>
                      <td
                        className={`${previewTableCellClass} hidden whitespace-nowrap @md:table-cell`}
                      >
                        26 Nov 2026
                      </td>
                      <td className={`${previewTableCellClass} whitespace-nowrap font-medium`}>
                        {item.total}
                      </td>
                      <td className={previewTableCellClass}>
                        <StatusPill tone={item.tone}>{item.status}</StatusPill>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </PreviewPanel>

          <PreviewPanel title="Payment methods" action="November">
            <div className="flex h-2 overflow-hidden rounded-full bg-[#eef1ef]">
              <span className="h-full w-[58%] bg-brand" />
              <span className="h-full w-[27%] bg-[#8ea7f0]" />
              <span className="h-full w-[15%] bg-[#d9b66c]" />
            </div>
            <ul className="mt-2.5 space-y-2">
              {paymentMix.map((item, index) => (
                <li
                  key={item.label}
                  className="flex items-center justify-between text-[8px]"
                >
                  <span className="flex items-center gap-1.5 text-ink-muted">
                    <span
                      className={cn(
                        "size-1.5 rounded-full",
                        index === 0 && "bg-brand",
                        index === 1 && "bg-[#8ea7f0]",
                        index === 2 && "bg-[#d9b66c]",
                      )}
                    />
                    {item.label}
                  </span>
                  <span className="font-medium">{item.value}%</span>
                </li>
              ))}
            </ul>
            <div className="mt-2.5 space-y-1 border-t border-line pt-2 text-[7.5px]">
              <div className="flex justify-between">
                <span className="text-ink-muted">Cash</span>
                <span className="font-medium">৳44,200</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-muted">Card</span>
                <span className="font-medium">৳28,300</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-muted">Bank / mobile</span>
                <span className="font-medium">৳12,000</span>
              </div>
            </div>
          </PreviewPanel>
        </div>
      </div>
    </AppWindow>
  );
}
