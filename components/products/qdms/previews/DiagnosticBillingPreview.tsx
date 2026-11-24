import { FileText, Printer, ReceiptText } from "lucide-react";
import {
  AppWindow,
  PreviewPanel,
  StatusPill,
  previewTableCellClass,
  previewTableHeadClass,
} from "@/components/products/qdms/previews/primitives";

const tests = [
  { name: "Complete Blood Count (CBC)", code: "CBC", category: "Hematology", price: "৳400" },
  { name: "Lipid Profile", code: "LIP", category: "Biochemistry", price: "৳800" },
  { name: "Chest X-Ray (PA)", code: "CXR", category: "Imaging", price: "৳900" },
  { name: "Thyroid Profile (TSH)", code: "TSH", category: "Hormone", price: "৳700" },
  { name: "USG Whole Abdomen", code: "USG", category: "Imaging", price: "৳1,500" },
];

const orderItems = [
  { name: "Complete Blood Count", code: "CBC", price: "৳400" },
  { name: "Lipid Profile", code: "LIP", price: "৳800" },
  { name: "Thyroid Profile (TSH)", code: "TSH", price: "৳700" },
];

const categories = ["All tests", "Hematology", "Biochemistry", "Imaging"];

export function DiagnosticBillingPreview() {
  return (
    <AppWindow
      variant="rail"
      active="tests"
      title="Diagnostics"
      subtitle="Test catalog, orders & billing"
    >
      <div className="space-y-2.5">
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((category, index) => (
            <span
              key={category}
              className={
                index === 0
                  ? "rounded-md bg-ink px-2 py-1 text-[8px] font-medium text-white"
                  : "rounded-md border border-line bg-white px-2 py-1 text-[8px] text-ink-soft"
              }
            >
              {category}
            </span>
          ))}
          <span className="ml-auto rounded-md bg-brand px-2 py-1 text-[8px] font-semibold text-[#0c2b1d]">
            New order
          </span>
        </div>

        <div className="grid gap-2 @2xl:grid-cols-[1.4fr_1fr]">
          <PreviewPanel
            title="Test catalog"
            action="126 services"
            bodyClassName="p-0"
          >
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className={previewTableHeadClass}>Test</th>
                    <th className={previewTableHeadClass}>Price</th>
                    <th className={previewTableHeadClass}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tests.map((test) => (
                    <tr key={test.code}>
                      <td className={previewTableCellClass}>
                        <span className="flex items-center gap-1.5">
                          <span className="flex size-4 shrink-0 items-center justify-center rounded bg-brand-soft text-[#177a4f]">
                            <FileText className="size-2" />
                          </span>
                          <span className="min-w-0">
                            <span className="block font-medium text-ink">
                              {test.name}
                            </span>
                            <span className="block text-[7px] text-ink-muted">
                              {test.code} · {test.category}
                            </span>
                          </span>
                        </span>
                      </td>
                      <td
                        className={`${previewTableCellClass} font-medium whitespace-nowrap`}
                      >
                        {test.price}
                      </td>
                      <td className={previewTableCellClass}>
                        <StatusPill tone="success">Active</StatusPill>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </PreviewPanel>

          <PreviewPanel title="Diagnostic order" action="INV-2026-000026">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-heading text-[11px] leading-tight font-semibold">
                  Nusrat Jahan
                </p>
                <p className="text-[7.5px] text-ink-muted">
                  JD-000048 · 25 Nov 2026
                </p>
              </div>
              <StatusPill tone="info">Partially paid</StatusPill>
            </div>

            <div className="mt-2 rounded-md border border-line bg-[#fafbfa] p-2">
              <div className="flex items-center justify-between text-[7.5px] font-semibold tracking-[0.08em] text-ink-muted uppercase">
                <span>Test</span>
                <span>Amount</span>
              </div>
              <ul className="mt-1.5 space-y-1">
                {orderItems.map((item) => (
                  <li
                    key={item.code}
                    className="flex items-center justify-between gap-2 text-[8.5px]"
                  >
                    <span className="min-w-0 truncate">{item.name}</span>
                    <span className="font-medium">{item.price}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-2 space-y-1 border-t border-line pt-1.5 text-[8px]">
                <div className="flex justify-between text-ink-muted">
                  <span>Subtotal</span>
                  <span>৳1,900</span>
                </div>
                <div className="flex justify-between text-ink-muted">
                  <span>Discount (approved)</span>
                  <span>৳200</span>
                </div>
                <div className="flex justify-between text-[9.5px] font-semibold text-ink">
                  <span>Total</span>
                  <span>৳1,700</span>
                </div>
                <div className="flex justify-between text-ink-muted">
                  <span>Paid / due</span>
                  <span>৳1,200 / ৳500</span>
                </div>
              </div>
            </div>

            <div className="mt-2 flex items-center justify-between gap-2 text-[7.5px] text-ink-muted">
              <span>Report delivery: 26 Nov 2026</span>
              <span className="flex items-center gap-1">
                <span className="inline-flex items-center gap-1 rounded-md border border-line bg-white px-1.5 py-1 text-[8px] font-medium text-ink-soft">
                  <Printer className="size-2.5" /> Invoice
                </span>
                <span className="inline-flex items-center gap-1 rounded-md bg-ink px-1.5 py-1 text-[8px] font-medium text-white">
                  <ReceiptText className="size-2.5" /> Receipt
                </span>
              </span>
            </div>
          </PreviewPanel>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-line bg-white px-2.5 py-2">
          <span className="flex size-6 items-center justify-center rounded-md bg-brand-soft text-[#177a4f]">
            <ReceiptText className="size-3" />
          </span>
          <p className="text-[8.5px] text-ink-muted">This month</p>
          <p className="ml-auto font-heading text-[12px] font-semibold">
            ৳7,650
          </p>
          <span className="text-[7.5px] text-ink-muted">sales</span>
          <span className="rounded bg-[#fdf6e3] px-1.5 py-0.5 text-[7.5px] font-semibold text-[#7a5310]">
            ৳2,000 due
          </span>
        </div>
      </div>
    </AppWindow>
  );
}
