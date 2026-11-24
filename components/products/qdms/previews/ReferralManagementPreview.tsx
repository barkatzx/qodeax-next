import { Share2 } from "lucide-react";
import {
  AppWindow,
  MiniBarChart,
  PreviewPanel,
  PreviewStat,
  StatusPill,
  previewTableCellClass,
  previewTableHeadClass,
} from "@/components/products/qdms/previews/primitives";

const sources = [
  {
    name: "Shakil Ahmed",
    type: "Individual",
    phone: "01740 482 391",
    commission: "10%",
    basis: "Invoice amount",
    status: "Active",
    tone: "success" as const,
  },
  {
    name: "City Clinic, Dhanmondi",
    type: "Clinic",
    phone: "01819 552 104",
    commission: "৳100 / invoice",
    basis: "Invoice amount",
    status: "Active",
    tone: "success" as const,
  },
  {
    name: "Green Pharmacy",
    type: "Pharmacy",
    phone: "01620 883 771",
    commission: "5%",
    basis: "Collected revenue",
    status: "Agreement",
    tone: "info" as const,
  },
  {
    name: "Life Hospital",
    type: "Hospital",
    phone: "01911 640 233",
    commission: "৳250 / order",
    basis: "Invoice amount",
    status: "Pending",
    tone: "warning" as const,
  },
];

const trend = [14, 20, 17, 26, 22, 30, 27];

export function ReferralManagementPreview() {
  return (
    <AppWindow
      variant="rail"
      active="referrals"
      title="Referral Sources"
      subtitle="Attribution, agreements & commissions"
    >
      <div className="space-y-2.5">
        <div className="grid grid-cols-2 gap-2 @lg:grid-cols-4">
          <PreviewStat label="Referred patients" value="64" delta="+8" />
          <PreviewStat label="Attributed orders" value="28" delta="this month" />
          <PreviewStat label="Settled commission" value="৳8,800" delta="November" />
          <PreviewStat label="Outstanding" value="৳3,600" delta="4 sources" />
        </div>

        <div className="grid gap-2 @2xl:grid-cols-[1.5fr_1fr]">
          <PreviewPanel
            title="Referral sources"
            action="24 active"
            bodyClassName="p-0"
          >
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className={previewTableHeadClass}>Source</th>
                    <th className={`${previewTableHeadClass} hidden @md:table-cell`}>
                      Contact
                    </th>
                    <th className={previewTableHeadClass}>Commission</th>
                    <th className={previewTableHeadClass}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {sources.map((source) => (
                    <tr key={source.name}>
                      <td className={previewTableCellClass}>
                        <span className="flex items-center gap-1.5">
                          <span className="flex size-4 shrink-0 items-center justify-center rounded bg-brand-soft text-[#177a4f]">
                            <Share2 className="size-2" />
                          </span>
                          <span className="min-w-0">
                            <span className="block font-medium text-ink">
                              {source.name}
                            </span>
                            <span className="block text-[7px] text-ink-muted">
                              {source.type}
                            </span>
                          </span>
                        </span>
                      </td>
                      <td
                        className={`${previewTableCellClass} hidden whitespace-nowrap text-ink-muted @md:table-cell`}
                      >
                        {source.phone}
                      </td>
                      <td className={previewTableCellClass}>
                        <span className="block font-medium whitespace-nowrap">
                          {source.commission}
                        </span>
                        <span className="block text-[7px] text-ink-muted">
                          {source.basis}
                        </span>
                      </td>
                      <td className={previewTableCellClass}>
                        <StatusPill tone={source.tone}>{source.status}</StatusPill>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </PreviewPanel>

          <PreviewPanel title="Commission summary" action="Settlements">
            <p className="font-heading text-[18px] leading-none font-semibold tracking-[-0.03em]">
              ৳12,400
            </p>
            <p className="mt-0.5 text-[7.5px] text-ink-muted">
              Across 24 referral sources
            </p>
            <MiniBarChart
              values={trend}
              labels={["W1", "W2", "W3", "W4", "W5", "W6", "Now"]}
              activeIndex={6}
              className="mt-2"
            />
            <div className="mt-2 space-y-1.5 border-t border-line pt-2">
              <div className="flex items-center justify-between text-[8px]">
                <span className="text-ink-muted">Settled</span>
                <span className="font-medium">৳8,800</span>
              </div>
              <div className="flex items-center justify-between text-[8px]">
                <span className="text-ink-muted">Outstanding</span>
                <span className="font-medium">৳3,600</span>
              </div>
              <div className="flex items-center justify-between text-[8px]">
                <span className="text-ink-muted">Active agreements</span>
                <span className="font-medium">24</span>
              </div>
              <div className="flex items-center justify-between text-[8px]">
                <span className="text-ink-muted">Pending adjustments</span>
                <span className="font-medium">2</span>
              </div>
            </div>
          </PreviewPanel>
        </div>
      </div>
    </AppWindow>
  );
}
