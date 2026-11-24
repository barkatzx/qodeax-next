import {
  AppWindow,
  MiniComparisonChart,
  PreviewPanel,
  PreviewStat,
  StatusPill,
  previewTableCellClass,
  previewTableHeadClass,
} from "@/components/products/qdms/previews/primitives";

const payments = [
  { method: "Cash", amount: "৳44,200", share: "52%", width: 52 },
  { method: "Card", amount: "৳28,300", share: "34%", width: 34 },
  { method: "Bank transfer", amount: "৳8,500", share: "10%", width: 10 },
  { method: "Mobile banking", amount: "৳3,500", share: "4%", width: 4 },
];

const recentPayments = [
  {
    date: "25 Nov",
    invoice: "INV-2026-000026",
    method: "Cash",
    amount: "৳1,200",
    status: "Completed",
    tone: "success" as const,
  },
  {
    date: "25 Nov",
    invoice: "INV-2026-000025",
    method: "Card",
    amount: "৳1,500",
    status: "Completed",
    tone: "success" as const,
  },
  {
    date: "24 Nov",
    invoice: "INV-2026-000023",
    method: "Bank",
    amount: "৳2,000",
    status: "Completed",
    tone: "success" as const,
  },
  {
    date: "24 Nov",
    invoice: "INV-2026-000022",
    method: "Mobile",
    amount: "৳900",
    status: "Pending",
    tone: "warning" as const,
  },
];

export function FinancialAnalyticsPreview() {
  return (
    <AppWindow
      variant="rail"
      active="payments"
      title="Finance"
      subtitle="Invoiced, collected & payables"
    >
      <div className="space-y-2.5">
        <div className="grid grid-cols-3 gap-2">
          <PreviewStat label="Invoiced revenue" value="৳412,800" delta="+11.8%" />
          <PreviewStat label="Collected revenue" value="৳284,500" delta="+9.4%" />
          <PreviewStat label="Outstanding dues" value="৳128,300" delta="18 invoices" />
        </div>

        <div className="grid gap-2 @2xl:grid-cols-[1.35fr_1fr]">
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
              primary={[31, 40, 36, 51, 46, 63, 57]}
              secondary={[45, 57, 50, 69, 61, 84, 76]}
              height={76}
              className="mt-2 h-[76px]"
            />
            <div className="mt-1 flex justify-between">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <span key={day} className="text-[7.5px] text-ink-muted">
                  {day}
                </span>
              ))}
            </div>
            <div className="mt-1.5 flex gap-3">
              <span className="flex items-center gap-1 text-[7.5px] text-ink-muted">
                <span className="size-1.5 rounded-full bg-brand" /> Collected
              </span>
              <span className="flex items-center gap-1 text-[7.5px] text-ink-muted">
                <span className="size-1.5 rounded-full bg-[#c3cbc6]" /> Invoiced
              </span>
            </div>
          </PreviewPanel>

          <PreviewPanel title="Payment methods" action="Net collected">
            <ul className="space-y-2">
              {payments.map((payment) => (
                <li key={payment.method}>
                  <div className="flex items-center justify-between text-[8.5px]">
                    <span className="text-ink-muted">{payment.method}</span>
                    <span className="font-medium">{payment.amount}</span>
                  </div>
                  <div className="mt-1 h-1 rounded-full bg-[#eef1ef]">
                    <div
                      className="h-full rounded-full bg-brand"
                      style={{ width: `${payment.width}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-2 grid grid-cols-2 gap-2 border-t border-line pt-2 text-[7.5px]">
              <div>
                <p className="text-ink-muted">Doctor payable</p>
                <p className="mt-0.5 font-semibold text-ink">৳32,000</p>
              </div>
              <div>
                <p className="text-ink-muted">Referral payable</p>
                <p className="mt-0.5 font-semibold text-ink">৳3,600</p>
              </div>
            </div>
          </PreviewPanel>
        </div>

        <PreviewPanel
          title="Recent payments"
          action="View ledger"
          bodyClassName="p-0"
        >
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className={previewTableHeadClass}>Date</th>
                  <th className={previewTableHeadClass}>Invoice</th>
                  <th className={previewTableHeadClass}>Method</th>
                  <th className={previewTableHeadClass}>Amount</th>
                  <th className={previewTableHeadClass}>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentPayments.map((payment) => (
                  <tr key={payment.invoice}>
                    <td className={`${previewTableCellClass} whitespace-nowrap text-ink-muted`}>
                      {payment.date}
                    </td>
                    <td className={`${previewTableCellClass} whitespace-nowrap font-medium text-ink`}>
                      {payment.invoice}
                    </td>
                    <td className={`${previewTableCellClass} whitespace-nowrap`}>
                      {payment.method}
                    </td>
                    <td className={`${previewTableCellClass} whitespace-nowrap font-medium`}>
                      {payment.amount}
                    </td>
                    <td className={previewTableCellClass}>
                      <StatusPill tone={payment.tone}>
                        {payment.status}
                      </StatusPill>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </PreviewPanel>
      </div>
    </AppWindow>
  );
}
