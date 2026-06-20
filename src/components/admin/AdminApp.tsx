import { useState, type ReactNode } from "react";
import {
  ADMIN_KPIS, MEMBER_GROWTH, DONATION_TRENDS, EVENT_ATTENDANCE, BOOKING_STATUS,
  ADMIN_MEMBERS, ADMIN_DONATIONS, ADMIN_CAMPAIGNS, ADMIN_ROLES,
  TEMPLES, CENTERS, MONKS, EVENTS, TOURS, FEED_POSTS, ANNOUNCEMENTS, NOTICES, POLLS, OFFERS, VOLUNTEER_OPPS,
} from "@/data/mockData";
import { useApp } from "@/context/AppContext";
import { Card, StatusBadge } from "@/components/common";
import { toast } from "sonner";
import {
  LayoutDashboard, Users, MapPin, Landmark, BedDouble, CalendarDays, HandCoins, FileText,
  HeartHandshake, BarChart3, LifeBuoy, Settings, Bell, ChevronDown, Plus, Search, X, TrendingUp, TrendingDown,
  Check, MoreHorizontal, Edit3, Trash2, Send, Sparkles, Menu,
} from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

type AdminPage =
  | "dashboard" | "members" | "monks" | "temples" | "bookings"
  | "events" | "donations" | "content" | "volunteers" | "reports" | "tickets" | "settings";

const NAV: { key: AdminPage; label: string; icon: any }[] = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "members", label: "Members", icon: Users },
  { key: "monks", label: "Monks & Vihaar", icon: MapPin },
  { key: "temples", label: "Temples & Centers", icon: Landmark },
  { key: "bookings", label: "Bookings", icon: BedDouble },
  { key: "events", label: "Events & Tours", icon: CalendarDays },
  { key: "donations", label: "Donations", icon: HandCoins },
  { key: "content", label: "Content", icon: FileText },
  { key: "volunteers", label: "Volunteers", icon: HeartHandshake },
  { key: "reports", label: "Reports", icon: BarChart3 },
  { key: "tickets", label: "Support Tickets", icon: LifeBuoy },
  { key: "settings", label: "Settings", icon: Settings },
];

const CHART_COLORS = ["oklch(0.5 0.13 150)", "oklch(0.74 0.16 60)", "oklch(0.6 0.12 230)", "oklch(0.6 0.15 27)"];

export default function AdminApp() {
  const [page, setPage] = useState<AdminPage>("dashboard");
  const [open, setOpen] = useState(true);
  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className={`${open ? "w-60" : "w-16"} shrink-0 border-r border-border bg-card transition-all duration-200 flex flex-col sticky top-0 h-screen`}>
        <div className="flex items-center gap-2 border-b border-border px-4 py-4">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-admin text-admin-foreground"><Sparkles className="h-4 w-4" /></div>
          {open && <div className="leading-tight"><div className="text-sm font-bold">Jain Community</div><div className="text-[10px] text-muted-foreground">Admin Console</div></div>}
        </div>
        <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-0.5">
          {NAV.map((n) => {
            const Icon = n.icon;
            const active = page === n.key;
            return (
              <button key={n.key} onClick={() => setPage(n.key)} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${active ? "bg-admin text-admin-foreground" : "text-foreground hover:bg-muted"}`}>
                <Icon className="h-4 w-4 shrink-0" />
                {open && <span>{n.label}</span>}
              </button>
            );
          })}
        </nav>
        <button onClick={() => setOpen(!open)} className="border-t border-border px-4 py-3 text-xs text-muted-foreground flex items-center gap-2 hover:bg-muted"><Menu className="h-4 w-4" />{open && "Collapse"}</button>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-card px-6 py-3">
          <div>
            <div className="text-lg font-bold capitalize">{NAV.find((n) => n.key === page)?.label}</div>
            <div className="text-xs text-muted-foreground">Manage your community at scale</div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative rounded-lg p-2 hover:bg-muted"><Bell className="h-5 w-5" /><span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-destructive" /></button>
            <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5">
              <div className="grid h-7 w-7 place-items-center rounded-full bg-admin text-xs font-bold text-admin-foreground">AD</div>
              <div className="leading-tight">
                <div className="text-xs font-semibold">Admin Demo</div>
                <div className="text-[10px] text-admin font-medium">Super Admin</div>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-6 space-y-6 max-w-[1400px] w-full">
          {page === "dashboard" && <Dashboard />}
          {page === "members" && <Members />}
          {page === "monks" && <MonksAdmin />}
          {page === "temples" && <TemplesAdmin />}
          {page === "bookings" && <BookingsAdmin />}
          {page === "events" && <EventsAdmin />}
          {page === "donations" && <DonationsAdmin />}
          {page === "content" && <ContentAdmin />}
          {page === "volunteers" && <VolunteersAdmin />}
          {page === "reports" && <Reports />}
          {page === "tickets" && <TicketsAdmin />}
          {page === "settings" && <SettingsAdmin />}
        </main>
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <>
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {ADMIN_KPIS.map((k) => (
          <Card key={k.label}>
            <div className="text-xs text-muted-foreground">{k.label}</div>
            <div className="mt-1 text-2xl font-bold">{k.value}</div>
            <div className={`mt-1 inline-flex items-center gap-1 text-xs font-medium ${k.up ? "text-success" : "text-destructive"}`}>
              {k.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}{k.trend}
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <div className="mb-3 text-sm font-semibold">Member Growth (6 months)</div>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={MEMBER_GROWTH}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="month" fontSize={11} />
              <YAxis fontSize={11} />
              <Tooltip />
              <Line type="monotone" dataKey="members" stroke={CHART_COLORS[0]} strokeWidth={2.5} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
        <Card>
          <div className="mb-3 text-sm font-semibold">Donations by Month (₹)</div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={DONATION_TRENDS}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="month" fontSize={11} />
              <YAxis fontSize={11} />
              <Tooltip />
              <Bar dataKey="amount" fill={CHART_COLORS[1]} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card>
        <div className="mb-3 text-sm font-semibold">Recent Activity</div>
        <div className="space-y-2">
          {[
            { icon: BedDouble, t: "New booking request", d: "Priya Mehta · Palitana Dharmshala · 2 min ago" },
            { icon: HandCoins, t: "Donation received", d: "₹25,000 from Vimal Jain to Earthquake Relief · 18 min ago" },
            { icon: Users, t: "New member registered", d: "Devansh Jain · Hyderabad · 1 hour ago" },
            { icon: CalendarDays, t: "Event RSVP", d: "Anjali Doshi · Mahavir Jayanti · 2 hours ago" },
            { icon: LifeBuoy, t: "Support ticket opened", d: "Rakesh Sanghvi · Profile upload issue · 3 hours ago" },
          ].map((a, i) => {
            const Icon = a.icon;
            return (
              <div key={i} className="flex items-center gap-3 rounded-lg border border-border p-3">
                <div className="grid h-8 w-8 place-items-center rounded-full bg-admin/10"><Icon className="h-4 w-4 text-admin" /></div>
                <div className="flex-1"><div className="text-sm font-medium">{a.t}</div><div className="text-xs text-muted-foreground">{a.d}</div></div>
              </div>
            );
          })}
        </div>
      </Card>
    </>
  );
}

function Members() {
  const [q, setQ] = useState("");
  const [city, setCity] = useState("All");
  const [drawer, setDrawer] = useState<any>(null);
  const cities = ["All", ...Array.from(new Set(ADMIN_MEMBERS.map((m) => m.city)))];
  const list = ADMIN_MEMBERS.filter((m) =>
    (city === "All" || m.city === city) &&
    (m.name.toLowerCase().includes(q.toLowerCase()) || m.mobile.includes(q) || m.id.includes(q))
  );
  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search members..." className="w-full rounded-lg border border-input bg-card py-2 pl-9 pr-3 text-sm" />
        </div>
        <select value={city} onChange={(e) => setCity(e.target.value)} className="rounded-lg border border-input bg-card px-3 py-2 text-sm">
          {cities.map((c) => <option key={c}>{c}</option>)}
        </select>
        <button onClick={() => toast.success("Export started")} className="rounded-lg bg-admin px-4 py-2 text-sm font-semibold text-admin-foreground">Export CSV</button>
      </div>
      <Card className="!p-0 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted text-xs text-muted-foreground">
            <tr>
              {["Name", "Mobile", "City", "Community", "Member ID", "Status", "Joined", ""].map((h) => <th key={h} className="px-4 py-3 text-left font-semibold">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {list.map((m) => (
              <tr key={m.id} className="border-t border-border hover:bg-muted/40 cursor-pointer" onClick={() => setDrawer(m)}>
                <td className="px-4 py-3 font-medium">{m.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{m.mobile}</td>
                <td className="px-4 py-3">{m.city}</td>
                <td className="px-4 py-3">{m.community}</td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{m.id}</td>
                <td className="px-4 py-3"><StatusBadge status={m.status} /></td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{m.joined}</td>
                <td className="px-4 py-3 text-right"><MoreHorizontal className="h-4 w-4 text-muted-foreground" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      {drawer && <Drawer title={drawer.name} onClose={() => setDrawer(null)}>
        <div className="flex items-center gap-3 mb-4">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-admin text-admin-foreground text-lg font-bold">{drawer.name[0]}</div>
          <div><div className="text-base font-bold">{drawer.name}</div><div className="text-xs text-muted-foreground">{drawer.id}</div></div>
        </div>
        <Card><div className="text-xs font-semibold uppercase text-muted-foreground mb-2">Details</div>
          {[["Mobile", drawer.mobile], ["City", drawer.city], ["Community", drawer.community], ["Status", drawer.status], ["Joined", drawer.joined]].map(([k, v]) => (
            <div key={k} className="flex justify-between py-1 text-sm"><span className="text-muted-foreground">{k}</span><span>{v}</span></div>
          ))}
        </Card>
        <Card className="mt-3"><div className="text-xs font-semibold uppercase text-muted-foreground mb-2">Activity</div>
          <div className="space-y-1.5 text-sm">
            <div>• Donated ₹5,001 on Jan 10</div>
            <div>• RSVPd to Mahavir Jayanti</div>
            <div>• Booked Palitana Dharmshala</div>
          </div>
        </Card>
        <div className="mt-4 flex gap-2">
          <button onClick={() => toast.success("Profile updated")} className="flex-1 rounded-lg bg-admin py-2 text-sm font-semibold text-admin-foreground">Edit</button>
          <button onClick={() => toast.success("Member deactivated")} className="flex-1 rounded-lg border border-destructive text-destructive py-2 text-sm font-semibold">Deactivate</button>
        </div>
      </Drawer>}
    </>
  );
}

function MonksAdmin() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [updates, setUpdates] = useState(MONKS.map((m) => ({ id: m.id, name: m.name, city: m.currentCity, when: "2h ago" })));
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {MONKS.map((m) => (
          <Card key={m.id}>
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-saffron/20 text-xl">🧘</div>
              <div className="flex-1">
                <div className="text-sm font-semibold">{m.name}</div>
                <div className="text-xs text-muted-foreground">{m.currentCity} → {m.nextCity}</div>
              </div>
            </div>
            <button onClick={() => setOpenId(m.id)} className="mt-3 w-full rounded-lg bg-admin py-2 text-xs font-semibold text-admin-foreground">Update Location</button>
          </Card>
        ))}
      </div>
      <Card>
        <div className="text-sm font-semibold mb-3">Current Vihaar Status</div>
        <table className="w-full text-sm">
          <thead className="text-xs text-muted-foreground"><tr><th className="text-left py-2">Monk</th><th className="text-left">City</th><th className="text-left">Last Update</th></tr></thead>
          <tbody>
            {updates.map((u) => <tr key={u.id} className="border-t border-border"><td className="py-2">{u.name}</td><td>{u.city}</td><td className="text-muted-foreground">{u.when}</td></tr>)}
          </tbody>
        </table>
      </Card>
      {openId && (
        <Modal title="Push Vihaar Update" onClose={() => setOpenId(null)}>
          <input placeholder="New city" id="upd-city" className="w-full rounded-lg border border-input bg-card px-3 py-2 text-sm" />
          <textarea placeholder="Note" rows={2} className="w-full rounded-lg border border-input bg-card px-3 py-2 text-sm" />
          <button onClick={() => {
            const city = (document.getElementById("upd-city") as HTMLInputElement).value || "Updated City";
            setUpdates((u) => u.map((x) => x.id === openId ? { ...x, city, when: "Just now" } : x));
            toast.success("Update pushed to followers");
            setOpenId(null);
          }} className="w-full rounded-lg bg-admin py-2 text-sm font-semibold text-admin-foreground">Push Update</button>
        </Modal>
      )}
    </>
  );
}

function TemplesAdmin() {
  const [tab, setTab] = useState<"temples" | "centers">("temples");
  const [add, setAdd] = useState(false);
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex rounded-lg bg-muted p-1 text-xs font-medium">
          {(["temples", "centers"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`rounded-md px-4 py-1.5 capitalize ${tab === t ? "bg-card shadow-sm" : "text-muted-foreground"}`}>{t === "centers" ? "Jain Centers" : "Temples"}</button>
          ))}
        </div>
        <button onClick={() => setAdd(true)} className="rounded-lg bg-admin px-4 py-2 text-sm font-semibold text-admin-foreground flex items-center gap-2"><Plus className="h-4 w-4" />Add New</button>
      </div>
      <Card className="!p-0 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted text-xs text-muted-foreground"><tr>{["Name", "City", "Status", "Created", "Actions"].map((h) => <th key={h} className="px-4 py-3 text-left font-semibold">{h}</th>)}</tr></thead>
          <tbody>
            {(tab === "temples" ? TEMPLES : CENTERS).map((t: any) => (
              <tr key={t.id} className="border-t border-border">
                <td className="px-4 py-3 font-medium">{t.name}</td>
                <td className="px-4 py-3">{t.city}</td>
                <td className="px-4 py-3"><StatusBadge status="Active" /></td>
                <td className="px-4 py-3 text-muted-foreground text-xs">Jan 2024</td>
                <td className="px-4 py-3 flex gap-2"><button className="text-admin"><Edit3 className="h-4 w-4" /></button><button className="text-destructive"><Trash2 className="h-4 w-4" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      {add && (
        <Modal title={`Add ${tab === "temples" ? "Temple" : "Jain Center"}`} onClose={() => setAdd(false)}>
          {["Name", "Address", "Contact Number", "Timings"].map((p) => <input key={p} placeholder={p} className="w-full rounded-lg border border-input bg-card px-3 py-2 text-sm" />)}
          <div className="rounded-lg border-2 border-dashed border-border p-4 text-center text-xs text-muted-foreground">Click to upload gallery images</div>
          <button onClick={() => { toast.success("Created"); setAdd(false); }} className="w-full rounded-lg bg-admin py-2 text-sm font-semibold text-admin-foreground">Save</button>
        </Modal>
      )}
    </>
  );
}

function BookingsAdmin() {
  const { bookings, setBookingStatus } = useApp();
  const [tab, setTab] = useState<"dharm" | "service" | "bhojan">("dharm");
  return (
    <>
      <div className="flex rounded-lg bg-muted p-1 text-xs font-medium w-fit">
        {[
          { k: "dharm", l: "Dharmshala" },
          { k: "service", l: "Temple Services" },
          { k: "bhojan", l: "Bhojanshala" },
        ].map((t) => <button key={t.k} onClick={() => setTab(t.k as any)} className={`rounded-md px-4 py-1.5 ${tab === t.k ? "bg-card shadow-sm" : "text-muted-foreground"}`}>{t.l}</button>)}
      </div>
      {tab === "dharm" && (
        <Card className="!p-0 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted text-xs text-muted-foreground"><tr>{["Booking", "Guest", "Dates", "Room Type", "Status", "Actions"].map((h) => <th key={h} className="px-4 py-3 text-left font-semibold">{h}</th>)}</tr></thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} className="border-t border-border">
                  <td className="px-4 py-3 font-medium">{b.id}</td>
                  <td className="px-4 py-3">{b.guest}</td>
                  <td className="px-4 py-3">{b.dates}</td>
                  <td className="px-4 py-3">{b.room}</td>
                  <td className="px-4 py-3"><StatusBadge status={b.status} /></td>
                  <td className="px-4 py-3">
                    {b.status === "Pending" ? (
                      <div className="flex gap-2">
                        <button onClick={() => { setBookingStatus(b.id, "Approved"); toast.success("Booking approved"); }} className="rounded-md bg-success px-2 py-1 text-xs font-semibold text-white">Approve</button>
                        <button onClick={() => { setBookingStatus(b.id, "Rejected"); toast.error("Booking rejected"); }} className="rounded-md border border-destructive text-destructive px-2 py-1 text-xs font-semibold">Reject</button>
                      </div>
                    ) : <span className="text-xs text-muted-foreground">Done</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
      {tab === "service" && (
        <Card className="!p-0 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted text-xs text-muted-foreground"><tr>{["Booking", "Member", "Service", "Slot", "Status", "Actions"].map((h) => <th key={h} className="px-4 py-3 text-left font-semibold">{h}</th>)}</tr></thead>
            <tbody>
              {[
                { id: "SV-201", member: "Priya Mehta", service: "Snatra Pooja", slot: "Feb 10, 8:30 AM", status: "Pending" },
                { id: "SV-202", member: "Vimal Jain", service: "Hall Booking", slot: "Feb 14, 5:00 PM", status: "Approved" },
                { id: "SV-203", member: "Anjali Doshi", service: "Vidhi", slot: "Feb 18, 11:00 AM", status: "Pending" },
              ].map((b) => (
                <tr key={b.id} className="border-t border-border">
                  <td className="px-4 py-3 font-medium">{b.id}</td><td className="px-4 py-3">{b.member}</td><td className="px-4 py-3">{b.service}</td><td className="px-4 py-3">{b.slot}</td>
                  <td className="px-4 py-3"><StatusBadge status={b.status} /></td>
                  <td className="px-4 py-3"><button onClick={() => toast.success("Approved")} className="rounded-md bg-success px-2 py-1 text-xs font-semibold text-white">Approve</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
      {tab === "bhojan" && (
        <>
          <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
            <Card><div className="text-xs text-muted-foreground">Meals Today</div><div className="text-2xl font-bold">84</div></Card>
            <Card><div className="text-xs text-muted-foreground">Capacity</div><div className="text-2xl font-bold">120</div></Card>
            <Card><div className="text-xs text-muted-foreground">Pending Passes</div><div className="text-2xl font-bold">7</div></Card>
            <Card><div className="text-xs text-muted-foreground">This Week</div><div className="text-2xl font-bold">512</div></Card>
          </div>
          <Card className="!p-0 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted text-xs text-muted-foreground"><tr>{["Pass ID", "Member", "Meal", "Time", "Status"].map((h) => <th key={h} className="px-4 py-3 text-left font-semibold">{h}</th>)}</tr></thead>
              <tbody>
                {[
                  { id: "BJ-3401", m: "Raj Shah", meal: "Lunch", t: "12:30 PM", s: "Issued" },
                  { id: "BJ-3402", m: "Priya Mehta", meal: "Dinner", t: "7:30 PM", s: "Issued" },
                  { id: "BJ-3403", m: "Vimal Jain", meal: "Lunch", t: "1:00 PM", s: "Used" },
                ].map((r) => (
                  <tr key={r.id} className="border-t border-border"><td className="px-4 py-3 font-medium">{r.id}</td><td className="px-4 py-3">{r.m}</td><td className="px-4 py-3">{r.meal}</td><td className="px-4 py-3">{r.t}</td><td className="px-4 py-3"><StatusBadge status={r.s === "Used" ? "Used" : "Active"} /></td></tr>
                ))}
              </tbody>
            </table>
          </Card>
        </>
      )}
    </>
  );
}

function EventsAdmin() {
  const [create, setCreate] = useState(false);
  return (
    <>
      <div className="flex justify-end">
        <button onClick={() => setCreate(true)} className="rounded-lg bg-admin px-4 py-2 text-sm font-semibold text-admin-foreground flex items-center gap-2"><Plus className="h-4 w-4" />Create New Event</button>
      </div>
      <Card className="!p-0 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted text-xs text-muted-foreground"><tr>{["Title", "Type", "Date", "Registrations", "Status"].map((h) => <th key={h} className="px-4 py-3 text-left font-semibold">{h}</th>)}</tr></thead>
          <tbody>
            {EVENTS.map((e) => (
              <tr key={e.id} className="border-t border-border">
                <td className="px-4 py-3 font-medium">{e.title}</td>
                <td className="px-4 py-3"><span className="chip bg-info/15 text-info">{e.type}</span></td>
                <td className="px-4 py-3">{e.date}</td>
                <td className="px-4 py-3">{Math.floor(Math.random() * 400 + 50)}</td>
                <td className="px-4 py-3"><StatusBadge status="Active" /></td>
              </tr>
            ))}
            {TOURS.map((t) => (
              <tr key={t.id} className="border-t border-border">
                <td className="px-4 py-3 font-medium">{t.name}</td>
                <td className="px-4 py-3"><span className="chip bg-saffron/20 text-saffron">tour</span></td>
                <td className="px-4 py-3">{t.dates}</td>
                <td className="px-4 py-3">{50 - t.seatsLeft}</td>
                <td className="px-4 py-3"><StatusBadge status="Active" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <Card>
        <div className="text-sm font-semibold mb-3">Ticket Sales — Charity Gala 2026</div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={[
            { day: "W1", sales: 18 }, { day: "W2", sales: 34 }, { day: "W3", sales: 62 }, { day: "W4", sales: 89 }, { day: "W5", sales: 124 },
          ]}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="day" fontSize={11} /><YAxis fontSize={11} /><Tooltip /><Bar dataKey="sales" fill={CHART_COLORS[0]} radius={[6, 6, 0, 0]} /></BarChart>
        </ResponsiveContainer>
      </Card>
      {create && (
        <Modal title="Create New Event" onClose={() => setCreate(false)}>
          <input placeholder="Event Title" className="w-full rounded-lg border border-input bg-card px-3 py-2 text-sm" />
          <select className="w-full rounded-lg border border-input bg-card px-3 py-2 text-sm"><option>Free</option><option>Paid</option><option>Yatra</option></select>
          <input type="date" className="w-full rounded-lg border border-input bg-card px-3 py-2 text-sm" />
          <input placeholder="Venue" className="w-full rounded-lg border border-input bg-card px-3 py-2 text-sm" />
          <input type="number" placeholder="Capacity" className="w-full rounded-lg border border-input bg-card px-3 py-2 text-sm" />
          <textarea placeholder="Description" rows={3} className="w-full rounded-lg border border-input bg-card px-3 py-2 text-sm" />
          <div className="grid grid-cols-2 gap-2">
            <input placeholder="General ₹" type="number" className="rounded-lg border border-input bg-card px-3 py-2 text-sm" />
            <input placeholder="VIP ₹" type="number" className="rounded-lg border border-input bg-card px-3 py-2 text-sm" />
          </div>
          <button onClick={() => { toast.success("Event created"); setCreate(false); }} className="w-full rounded-lg bg-admin py-2 text-sm font-semibold text-admin-foreground">Publish</button>
        </Modal>
      )}
    </>
  );
}

function DonationsAdmin() {
  const [tab, setTab] = useState<"list" | "campaigns">("list");
  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        <Card><div className="text-xs text-muted-foreground">This Month</div><div className="text-2xl font-bold">₹1,84,500</div><div className="text-xs text-success">+22% vs Dec</div></Card>
        <Card><div className="text-xs text-muted-foreground">This Year</div><div className="text-2xl font-bold">₹21,40,000</div><div className="text-xs text-success">+38%</div></Card>
        <Card><div className="text-xs text-muted-foreground">Active Campaigns</div><div className="text-2xl font-bold">3</div></Card>
      </div>
      <div className="flex rounded-lg bg-muted p-1 text-xs font-medium w-fit">
        {(["list", "campaigns"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`rounded-md px-4 py-1.5 capitalize ${tab === t ? "bg-card shadow-sm" : "text-muted-foreground"}`}>{t}</button>
        ))}
      </div>
      {tab === "list" && (
        <Card className="!p-0 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted text-xs text-muted-foreground"><tr>{["Donor", "Temple/Cause", "Amount", "Date", "Status"].map((h) => <th key={h} className="px-4 py-3 text-left font-semibold">{h}</th>)}</tr></thead>
            <tbody>
              {ADMIN_DONATIONS.map((d, i) => (
                <tr key={i} className="border-t border-border">
                  <td className="px-4 py-3 font-medium">{d.donor}</td><td className="px-4 py-3">{d.temple}</td>
                  <td className="px-4 py-3 font-bold text-admin">₹{d.amount.toLocaleString()}</td>
                  <td className="px-4 py-3">{d.date}</td><td className="px-4 py-3"><StatusBadge status={d.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
      {tab === "campaigns" && (
        <div className="grid gap-4 md:grid-cols-3">
          {ADMIN_CAMPAIGNS.map((c) => {
            const pct = Math.round((c.raised / c.target) * 100);
            return (
              <Card key={c.name}>
                <div className="text-sm font-semibold">{c.name}</div>
                <div className="mt-2 flex justify-between text-xs"><span className="text-muted-foreground">Raised</span><span className="font-semibold">{pct}%</span></div>
                <div className="mt-1 h-2 rounded-full bg-muted"><div className="h-2 rounded-full bg-admin" style={{ width: `${pct}%` }} /></div>
                <div className="mt-2 text-xs text-muted-foreground">₹{c.raised.toLocaleString()} of ₹{c.target.toLocaleString()}</div>
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
}

function ContentAdmin() {
  const [tab, setTab] = useState<"feed" | "ann" | "not" | "poll" | "offer">("feed");
  return (
    <>
      <div className="flex rounded-lg bg-muted p-1 text-xs font-medium w-fit">
        {[
          { k: "feed", l: "Feed" }, { k: "ann", l: "Announcements" }, { k: "not", l: "Notices" }, { k: "poll", l: "Polls" }, { k: "offer", l: "Offers" },
        ].map((t) => <button key={t.k} onClick={() => setTab(t.k as any)} className={`rounded-md px-4 py-1.5 ${tab === t.k ? "bg-card shadow-sm" : "text-muted-foreground"}`}>{t.l}</button>)}
      </div>
      {tab === "feed" && (
        <>
          <Card>
            <div className="text-sm font-semibold mb-2">Create Post</div>
            <textarea placeholder="What's happening in the community?" rows={3} className="w-full rounded-lg border border-input bg-card px-3 py-2 text-sm" />
            <div className="mt-2 flex items-center justify-between">
              <div className="rounded-lg border-2 border-dashed border-border px-3 py-2 text-xs text-muted-foreground">+ Add image</div>
              <button onClick={() => toast.success("Post published")} className="rounded-lg bg-admin px-4 py-2 text-sm font-semibold text-admin-foreground">Publish</button>
            </div>
          </Card>
          <div className="space-y-3">
            {FEED_POSTS.slice(0, 4).map((p) => (
              <Card key={p.id}>
                <div className="text-xs text-muted-foreground">{p.author} · {p.time}</div>
                <div className="text-sm mt-1">{p.text}</div>
                <div className="mt-2 flex gap-4 text-xs text-muted-foreground"><span>❤ {p.likes} likes</span><span>💬 {p.comments} comments</span></div>
              </Card>
            ))}
          </div>
        </>
      )}
      {tab === "ann" && (
        <>
          <Card>
            <div className="text-sm font-semibold mb-2">New Announcement</div>
            <input placeholder="Title" className="w-full rounded-lg border border-input bg-card px-3 py-2 text-sm mb-2" />
            <textarea placeholder="Body..." rows={3} className="w-full rounded-lg border border-input bg-card px-3 py-2 text-sm" />
            <div className="mt-2 grid grid-cols-2 gap-2">
              <input type="date" className="rounded-lg border border-input bg-card px-3 py-2 text-sm" />
              <input type="date" className="rounded-lg border border-input bg-card px-3 py-2 text-sm" />
            </div>
            <button onClick={() => toast.success("Announcement published")} className="mt-2 w-full rounded-lg bg-admin py-2 text-sm font-semibold text-admin-foreground">Publish</button>
          </Card>
          {ANNOUNCEMENTS.map((a) => <Card key={a.id}><div className="text-sm font-semibold">{a.title}</div><div className="text-xs text-muted-foreground">{a.date}</div></Card>)}
        </>
      )}
      {tab === "not" && (
        <>
          <Card>
            <div className="text-sm font-semibold mb-2">New Notice</div>
            <input placeholder="Reference No." className="w-full rounded-lg border border-input bg-card px-3 py-2 text-sm mb-2" />
            <input placeholder="Subject" className="w-full rounded-lg border border-input bg-card px-3 py-2 text-sm mb-2" />
            <textarea placeholder="Notice body..." rows={4} className="w-full rounded-lg border border-input bg-card px-3 py-2 text-sm" />
            <button onClick={() => toast.success("Notice issued")} className="mt-2 w-full rounded-lg bg-admin py-2 text-sm font-semibold text-admin-foreground">Issue Notice</button>
          </Card>
          {NOTICES.map((n) => <Card key={n.id}><div className="text-xs text-muted-foreground">{n.ref} · {n.date}</div><div className="text-sm font-semibold">{n.subject}</div></Card>)}
        </>
      )}
      {tab === "poll" && (
        <>
          <Card>
            <div className="text-sm font-semibold mb-2">Create Poll</div>
            <input placeholder="Question" className="w-full rounded-lg border border-input bg-card px-3 py-2 text-sm mb-2" />
            {[1, 2, 3].map((i) => <input key={i} placeholder={`Option ${i}`} className="w-full rounded-lg border border-input bg-card px-3 py-2 text-sm mb-2" />)}
            <button onClick={() => toast.success("Poll launched")} className="w-full rounded-lg bg-admin py-2 text-sm font-semibold text-admin-foreground">Launch Poll</button>
          </Card>
          {POLLS.map((p) => {
            const total = p.options.reduce((s, o) => s + o.votes, 0);
            return (
              <Card key={p.id}>
                <div className="text-sm font-semibold mb-2">{p.question}</div>
                {p.options.map((o, i) => {
                  const pct = Math.round((o.votes / total) * 100);
                  return (
                    <div key={i} className="mb-1.5">
                      <div className="flex justify-between text-xs"><span>{o.label}</span><span className="font-semibold">{pct}% · {o.votes}</span></div>
                      <div className="h-1.5 rounded-full bg-muted"><div className="h-1.5 rounded-full bg-admin" style={{ width: `${pct}%` }} /></div>
                    </div>
                  );
                })}
              </Card>
            );
          })}
        </>
      )}
      {tab === "offer" && (
        <>
          <Card>
            <div className="text-sm font-semibold mb-2">Add Offer</div>
            <div className="grid grid-cols-2 gap-2">
              <input placeholder="Partner" className="rounded-lg border border-input bg-card px-3 py-2 text-sm" />
              <input placeholder="Discount %" className="rounded-lg border border-input bg-card px-3 py-2 text-sm" />
            </div>
            <input placeholder="Offer title" className="w-full mt-2 rounded-lg border border-input bg-card px-3 py-2 text-sm" />
            <button onClick={() => toast.success("Offer added")} className="mt-2 w-full rounded-lg bg-admin py-2 text-sm font-semibold text-admin-foreground">Add</button>
          </Card>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {OFFERS.map((o) => <Card key={o.id}><div className="text-xs text-muted-foreground">{o.partner}</div><div className="text-sm font-semibold">{o.title}</div><div className="text-base font-bold text-saffron">{o.discount}</div></Card>)}
          </div>
        </>
      )}
    </>
  );
}

function VolunteersAdmin() {
  const [openId, setOpenId] = useState<string | null>(null);
  return (
    <>
      <Card className="!p-0 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted text-xs text-muted-foreground"><tr>{["Opportunity", "Date", "Location", "Applicants", ""].map((h) => <th key={h} className="px-4 py-3 text-left font-semibold">{h}</th>)}</tr></thead>
          <tbody>
            {VOLUNTEER_OPPS.map((v) => (
              <tr key={v.id} className="border-t border-border">
                <td className="px-4 py-3 font-medium">{v.title}</td><td className="px-4 py-3">{v.date}</td><td className="px-4 py-3">{v.location}</td>
                <td className="px-4 py-3">{Math.floor(Math.random() * 20 + 5)}</td>
                <td className="px-4 py-3"><button onClick={() => setOpenId(v.id)} className="text-xs font-semibold text-admin">View Applicants →</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      {openId && (
        <Modal title="Applicants" onClose={() => setOpenId(null)}>
          {["Priya Mehta", "Vimal Jain", "Anjali Doshi", "Rakesh Sanghvi"].map((n) => (
            <div key={n} className="flex items-center justify-between rounded-lg border border-border p-3">
              <div className="flex items-center gap-2"><div className="grid h-8 w-8 place-items-center rounded-full bg-admin/15 text-xs font-bold text-admin">{n[0]}</div><div className="text-sm">{n}</div></div>
              <div className="flex gap-2">
                <button onClick={() => toast.success(`Approved ${n}`)} className="rounded-md bg-success px-2 py-1 text-xs font-semibold text-white">Approve</button>
                <button onClick={() => toast.error(`Rejected ${n}`)} className="rounded-md border border-destructive text-destructive px-2 py-1 text-xs font-semibold">Reject</button>
              </div>
            </div>
          ))}
        </Modal>
      )}
    </>
  );
}

function Reports() {
  return (
    <>
      <div className="flex justify-end">
        <button onClick={() => toast.success("Report exported to Excel")} className="rounded-lg bg-admin px-4 py-2 text-sm font-semibold text-admin-foreground">Export to Excel</button>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card><div className="mb-2 text-sm font-semibold">Member Growth</div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={MEMBER_GROWTH}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" fontSize={11} /><YAxis fontSize={11} /><Tooltip /><Line type="monotone" dataKey="members" stroke={CHART_COLORS[0]} strokeWidth={2.5} /></LineChart>
          </ResponsiveContainer>
        </Card>
        <Card><div className="mb-2 text-sm font-semibold">Donation Trends</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={DONATION_TRENDS}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" fontSize={11} /><YAxis fontSize={11} /><Tooltip /><Bar dataKey="amount" fill={CHART_COLORS[1]} radius={[6, 6, 0, 0]} /></BarChart>
          </ResponsiveContainer>
        </Card>
        <Card><div className="mb-2 text-sm font-semibold">Event Attendance</div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart><Pie data={EVENT_ATTENDANCE} dataKey="value" nameKey="name" outerRadius={80} label>
              {EVENT_ATTENDANCE.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
            </Pie><Tooltip /><Legend /></PieChart>
          </ResponsiveContainer>
        </Card>
        <Card><div className="mb-2 text-sm font-semibold">Booking Status</div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart><Pie data={BOOKING_STATUS} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} label>
              {BOOKING_STATUS.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
            </Pie><Tooltip /><Legend /></PieChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </>
  );
}

function TicketsAdmin() {
  const { tickets, setTicketStatus } = useApp();
  const [openId, setOpenId] = useState<string | null>(tickets[0]?.id ?? null);
  const open = tickets.find((t) => t.id === openId);
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Card className="!p-0 overflow-hidden lg:col-span-1">
        <div className="border-b border-border p-3 text-sm font-semibold">All Tickets</div>
        <div className="max-h-[600px] overflow-y-auto">
          {tickets.map((t) => (
            <button key={t.id} onClick={() => setOpenId(t.id)} className={`block w-full border-b border-border p-3 text-left transition hover:bg-muted ${openId === t.id ? "bg-admin/5" : ""}`}>
              <div className="flex justify-between"><span className="text-xs font-mono text-muted-foreground">{t.id}</span><StatusBadge status={t.status} /></div>
              <div className="mt-1 text-sm font-semibold line-clamp-1">{t.subject}</div>
              <div className="text-xs text-muted-foreground">{t.member} · {t.priority}</div>
            </button>
          ))}
        </div>
      </Card>
      <Card className="lg:col-span-2">
        {open && (
          <>
            <div className="flex items-center justify-between border-b border-border pb-3 mb-3">
              <div><div className="text-base font-bold">{open.subject}</div><div className="text-xs text-muted-foreground">{open.id} · From {open.member}</div></div>
              <select value={open.status} onChange={(e) => { setTicketStatus(open.id, e.target.value); toast.success("Status updated"); }} className="rounded-lg border border-input bg-card px-3 py-1.5 text-xs">
                <option>Open</option><option>In Progress</option><option>Resolved</option>
              </select>
            </div>
            <div className="space-y-3">
              <div className="rounded-lg bg-muted p-3 text-sm"><div className="text-xs font-semibold text-muted-foreground mb-1">{open.member}</div>Hi team, I'm facing an issue with the system as described in the subject. Can you please help me resolve this? Thanks.</div>
              <div className="ml-8 rounded-lg bg-admin/10 p-3 text-sm"><div className="text-xs font-semibold text-admin mb-1">Support Team</div>Thanks for reaching out. We're looking into this and will get back within 24 hours.</div>
            </div>
            <div className="mt-4 flex gap-2">
              <input placeholder="Type a reply..." className="flex-1 rounded-lg border border-input bg-card px-3 py-2 text-sm" />
              <button onClick={() => toast.success("Reply sent")} className="rounded-lg bg-admin px-4 py-2 text-sm font-semibold text-admin-foreground flex items-center gap-2"><Send className="h-4 w-4" />Send</button>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}

function SettingsAdmin() {
  return (
    <Card>
      <div className="text-sm font-semibold mb-3">Roles & Permissions Matrix</div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted text-xs text-muted-foreground">
            <tr><th className="px-4 py-3 text-left font-semibold">Role</th>
              {Object.keys(ADMIN_ROLES[0].modules).map((m) => <th key={m} className="px-3 py-3 text-center font-semibold">{m}</th>)}
            </tr>
          </thead>
          <tbody>
            {ADMIN_ROLES.map((r) => (
              <tr key={r.role} className="border-t border-border">
                <td className="px-4 py-3 font-semibold">{r.role}</td>
                {Object.entries(r.modules).map(([k, v]) => (
                  <td key={k} className="px-3 py-3 text-center">
                    <input type="checkbox" defaultChecked={v} className="h-4 w-4 accent-[oklch(0.5_0.13_150)]" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={() => toast.success("Permissions saved")} className="mt-4 rounded-lg bg-admin px-4 py-2 text-sm font-semibold text-admin-foreground">Save Changes</button>
    </Card>
  );
}

// ============ helpers ============
function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/40 p-4" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md rounded-2xl bg-card p-5 space-y-3 shadow-xl">
        <div className="flex items-center justify-between"><h3 className="text-base font-bold">{title}</h3><button onClick={onClose}><X className="h-5 w-5" /></button></div>
        {children}
      </div>
    </div>
  );
}

function Drawer({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-foreground/40" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md bg-card overflow-y-auto p-5 space-y-3 shadow-xl">
        <div className="flex items-center justify-between"><h3 className="text-base font-bold">{title}</h3><button onClick={onClose}><X className="h-5 w-5" /></button></div>
        {children}
      </div>
    </div>
  );
}
