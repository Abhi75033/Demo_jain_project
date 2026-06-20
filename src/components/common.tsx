import { type ReactNode } from "react";

export function QRCode({ size = 96 }: { size?: number }) {
  // Stylized fake QR — deterministic pseudo-random pattern
  const cells: boolean[] = [];
  let seed = 7;
  for (let i = 0; i < 169; i++) {
    seed = (seed * 9301 + 49297) % 233280;
    cells.push(seed / 233280 > 0.5);
  }
  return (
    <div
      className="grid bg-white p-1.5 rounded-md"
      style={{ width: size, height: size, gridTemplateColumns: "repeat(13, 1fr)", gap: 1 }}
    >
      {cells.map((on, i) => {
        const row = Math.floor(i / 13);
        const col = i % 13;
        const inFinder =
          (row < 3 && col < 3) ||
          (row < 3 && col > 9) ||
          (row > 9 && col < 3);
        return (
          <div
            key={i}
            className={inFinder || on ? "bg-foreground" : "bg-transparent"}
            style={{ borderRadius: 1 }}
          />
        );
      })}
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const s = status.toLowerCase();
  const cls =
    s === "valid" || s === "approved" || s === "active" || s === "success" || s === "resolved" || s === "available"
      ? "bg-success/15 text-success"
      : s === "pending" || s === "in progress" || s === "limited"
      ? "bg-warning/20 text-warning"
      : s === "used" || s === "inactive"
      ? "bg-muted text-muted-foreground"
      : "bg-destructive/15 text-destructive";
  return <span className={`chip ${cls}`}>{status}</span>;
}

export function Section({ title, action, children }: { title: string; action?: ReactNode; children: ReactNode }) {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold tracking-tight text-foreground">{title}</h3>
        {action}
      </div>
      {children}
    </section>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-border bg-card p-4 shadow-sm ${className}`}>{children}</div>
  );
}
