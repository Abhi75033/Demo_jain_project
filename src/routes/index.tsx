import { createFileRoute } from "@tanstack/react-router";
import { useApp } from "@/context/AppContext";
import MemberApp from "@/components/member/MemberApp";
import AdminApp from "@/components/admin/AdminApp";
import { Smartphone, LayoutDashboard } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jain Community Platform — Demo" },
      { name: "description", content: "A complete community platform demo for members, monks, temples, events, donations, and admin management." },
    ],
  }),
  component: Page,
});

function Page() {
  const { role, setRole } = useApp();
  return (
    <div className={role === "admin" ? "bg-background min-h-screen" : "bg-muted/40 min-h-screen"}>
      <RoleSwitcher role={role} setRole={setRole} />
      <div className="pt-12">
        {role === "member" ? <MemberApp /> : <AdminApp />}
      </div>
    </div>
  );
}

function RoleSwitcher({ role, setRole }: { role: "member" | "admin"; setRole: (r: "member" | "admin") => void }) {
  return (
    <div className="fixed top-0 inset-x-0 z-50 flex justify-center border-b border-border bg-card/95 backdrop-blur px-4 py-2">
      <div className="flex items-center gap-3">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">View as:</span>
        <div className="inline-flex rounded-full bg-muted p-1 text-xs font-semibold">
          <button onClick={() => setRole("member")} className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 transition ${role === "member" ? "bg-member text-member-foreground shadow-sm" : "text-muted-foreground"}`}>
            <Smartphone className="h-3.5 w-3.5" /> Member
          </button>
          <button onClick={() => setRole("admin")} className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 transition ${role === "admin" ? "bg-admin text-admin-foreground shadow-sm" : "text-muted-foreground"}`}>
            <LayoutDashboard className="h-3.5 w-3.5" /> Admin
          </button>
        </div>
        <span className="hidden sm:inline text-[10px] text-muted-foreground">Demo · All data is mock</span>
      </div>
    </div>
  );
}
