import { useState, type ReactNode } from "react";
import { useApp } from "@/context/AppContext";
import {
  CURRENT_MEMBER, FAMILY_MEMBERS, TODAY_TITHI, TEMPLES, CENTERS, MONKS, VIHAAR_TIMELINE,
  EVENTS, TOURS, DHARMSHALAS, DONATIONS_HISTORY, PASSES, VOLUNTEER_OPPS, NEARBY,
  OFFERS, FAQS, QUICK_ACTIONS,
} from "@/data/mockData";
import { Card, QRCode, Section, StatusBadge } from "@/components/common";
import { toast } from "sonner";
import {
  Bell, Home, Users, CalendarDays, QrCode, User, ChevronRight, ChevronLeft,
  HandCoins, BedDouble, Landmark, HeartHandshake, LifeBuoy, MapPin,
  Search, Star, Heart, MessageCircle, Share2, Filter, Plus, X, Check, BookOpen, Sparkles,
  Megaphone, FileText, Tag, Utensils, Building2, Globe2, ChevronDown, LogOut, Languages, ShieldCheck,
} from "lucide-react";

type Screen =
  | "home" | "directory" | "events" | "passes" | "profile"
  | "templeDetail" | "centerDetail" | "monkDetail" | "vihaar"
  | "eventDetail" | "tourDetail" | "donate" | "donationHistory"
  | "bookDharm" | "bookService" | "bhojanshala"
  | "feed" | "polls" | "announcements" | "offers" | "volunteer" | "nearby"
  | "pathshala" | "specialPrograms" | "support" | "notifications"
  | "login" | "register";

type NavCtx = { go: (s: Screen, payload?: any) => void; back: () => void; payload?: any };

export default function MemberApp() {
  const { isAuthed } = useApp();
  const [stack, setStack] = useState<{ s: Screen; p?: any }[]>([{ s: isAuthed ? "home" : "login" }]);
  const cur = stack[stack.length - 1];

  const go = (s: Screen, p?: any) => setStack((st) => [...st, { s, p }]);
  const back = () => setStack((st) => st.length > 1 ? st.slice(0, -1) : st);
  const reset = (s: Screen) => setStack([{ s }]);

  const nav: NavCtx = { go, back, payload: cur.p };
  const showBottomNav = ["home", "directory", "events", "passes", "profile"].includes(cur.s);

  return (
    <div className="phone-frame relative overflow-hidden md:my-6 md:rounded-3xl md:border md:border-border">
      <Header nav={nav} reset={reset} />
      <main className="pb-24 pt-2 px-4 space-y-5">
        {renderScreen(cur.s, nav, reset)}
      </main>
      {showBottomNav && <BottomNav active={cur.s} reset={reset} />}
    </div>
  );
}

function renderScreen(s: Screen, nav: NavCtx, reset: (s: Screen) => void) {
  switch (s) {
    case "login": return <Login onDone={() => reset("home")} />;
    case "register": return <Register onDone={() => reset("home")} />;
    case "home": return <HomeScreen nav={nav} />;
    case "directory": return <DirectoryScreen nav={nav} />;
    case "templeDetail": return <TempleDetail nav={nav} />;
    case "centerDetail": return <CenterDetail nav={nav} />;
    case "monkDetail": return <MonkDetail nav={nav} />;
    case "vihaar": return <VihaarScreen nav={nav} />;
    case "events": return <EventsScreen nav={nav} />;
    case "eventDetail": return <EventDetail nav={nav} />;
    case "tourDetail": return <TourDetail nav={nav} />;
    case "donate": return <DonateScreen nav={nav} />;
    case "donationHistory": return <DonationHistory nav={nav} />;
    case "bookDharm": return <BookDharmshala nav={nav} />;
    case "bookService": return <BookService nav={nav} />;
    case "bhojanshala": return <Bhojanshala nav={nav} />;
    case "passes": return <PassesScreen />;
    case "profile": return <ProfileScreen nav={nav} reset={reset} />;
    case "feed": return <FeedScreen />;
    case "polls": return <PollsScreen />;
    case "announcements": return <AnnouncementsScreen />;
    case "offers": return <OffersScreen />;
    case "volunteer": return <VolunteerScreen />;
    case "nearby": return <NearbyScreen />;
    case "pathshala": return <PathshalaScreen />;
    case "specialPrograms": return <SpecialPrograms />;
    case "support": return <SupportScreen />;
    case "notifications": return <NotificationsScreen nav={nav} />;
    default: return null;
  }
}

function Header({ nav, reset }: { nav: NavCtx; reset: (s: Screen) => void }) {
  const { notifications } = useApp();
  const unread = notifications.filter((n) => !n.read).length;
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-border bg-member px-4 py-3 text-member-foreground">
      <button onClick={() => reset("home")} className="flex items-center gap-2">
        <div className="h-9 w-9 grid place-items-center rounded-full bg-member-foreground/15">
          <Sparkles className="h-5 w-5" />
        </div>
        <div className="text-left leading-tight">
          <div className="text-sm font-bold">Jain Community</div>
          <div className="text-[10px] opacity-80">Member Edition</div>
        </div>
      </button>
      <div className="flex items-center gap-3">
        <button onClick={() => nav.go("notifications")} className="relative">
          <Bell className="h-5 w-5" />
          {unread > 0 && (
            <span className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-saffron text-[9px] font-bold text-foreground">
              {unread}
            </span>
          )}
        </button>
        <button onClick={() => reset("profile")} className="grid h-9 w-9 place-items-center rounded-full bg-member-foreground/15 text-sm font-bold">
          {CURRENT_MEMBER.avatar}
        </button>
      </div>
    </header>
  );
}

function BottomNav({ active, reset }: { active: string; reset: (s: Screen) => void }) {
  const items: { key: Screen; label: string; icon: any }[] = [
    { key: "home", label: "Home", icon: Home },
    { key: "directory", label: "Directory", icon: Users },
    { key: "events", label: "Events", icon: CalendarDays },
    { key: "passes", label: "Passes", icon: QrCode },
    { key: "profile", label: "Profile", icon: User },
  ];
  return (
    <nav className="absolute bottom-0 left-0 right-0 z-30 grid grid-cols-5 border-t border-border bg-card/95 backdrop-blur">
      {items.map(({ key, label, icon: Icon }) => {
        const on = active === key;
        return (
          <button
            key={key}
            onClick={() => reset(key)}
            className={`flex flex-col items-center gap-0.5 py-2.5 text-[10px] transition ${on ? "text-member" : "text-muted-foreground"}`}
          >
            <Icon className={`h-5 w-5 ${on ? "stroke-[2.3]" : ""}`} />
            {label}
          </button>
        );
      })}
    </nav>
  );
}

function BackBar({ title, nav }: { title: string; nav: NavCtx }) {
  return (
    <div className="-mx-4 -mt-2 mb-2 flex items-center gap-2 border-b border-border bg-card px-4 py-3">
      <button onClick={nav.back} className="rounded-md p-1 hover:bg-muted"><ChevronLeft className="h-5 w-5" /></button>
      <h2 className="text-base font-semibold">{title}</h2>
    </div>
  );
}

// ============ SCREENS ============

function Login({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  return (
    <div className="flex flex-col items-center pt-8 space-y-6">
      <Sparkles className="h-12 w-12 text-member" />
      <div className="text-center">
        <h1 className="text-xl font-bold">Welcome Back</h1>
        <p className="text-sm text-muted-foreground">Sign in to your community account</p>
      </div>
      <div className="w-full space-y-3">
        {step === "phone" ? (
          <>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Mobile number" className="w-full rounded-lg border border-input bg-card px-4 py-3 text-sm" />
            <button onClick={() => setStep("otp")} className="w-full rounded-lg bg-member py-3 text-sm font-semibold text-member-foreground">Send OTP</button>
          </>
        ) : (
          <>
            <input value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP (try 123456)" className="w-full rounded-lg border border-input bg-card px-4 py-3 text-center text-lg tracking-widest" />
            <button onClick={() => { toast.success("Logged in"); onDone(); }} className="w-full rounded-lg bg-member py-3 text-sm font-semibold text-member-foreground">Verify & Continue</button>
          </>
        )}
        <button onClick={onDone} className="w-full py-2 text-xs text-muted-foreground">Skip for demo →</button>
      </div>
    </div>
  );
}

function Register({ onDone }: { onDone: () => void }) {
  return (
    <div className="space-y-4 pt-4">
      <h1 className="text-xl font-bold">Create Account</h1>
      {["Full Name", "Date of Birth", "City"].map((p) => (
        <input key={p} placeholder={p} className="w-full rounded-lg border border-input bg-card px-4 py-3 text-sm" />
      ))}
      <select className="w-full rounded-lg border border-input bg-card px-4 py-3 text-sm">
        <option>Community</option><option>Shwetambar</option><option>Digambar</option><option>Sthanakvasi</option><option>Terapanth</option>
      </select>
      <button onClick={() => { toast.success("Registered"); onDone(); }} className="w-full rounded-lg bg-member py-3 text-sm font-semibold text-member-foreground">Continue</button>
    </div>
  );
}

function HomeScreen({ nav }: { nav: NavCtx }) {
  const { feed } = useApp();
  return (
    <>
      <div className="rounded-2xl bg-gradient-to-br from-member to-info p-5 text-member-foreground shadow-sm">
        <div className="text-xs opacity-80">{new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}</div>
        <div className="mt-1 text-xl font-bold">🙏 Namaste, {CURRENT_MEMBER.name.split(" ")[0]}</div>
        <div className="mt-3 rounded-lg bg-member-foreground/15 px-3 py-2 text-xs">
          <div className="font-semibold">Today's Tithi</div>
          <div className="opacity-90">{TODAY_TITHI}</div>
        </div>
      </div>

      <Section title="Quick Actions">
        <div className="grid grid-cols-3 gap-2">
          {QUICK_ACTIONS.map((q) => {
            const Icon = ({ HandCoins, BedDouble, Landmark, QrCode, HeartHandshake, LifeBuoy } as any)[q.icon];
            const target: Record<string, Screen> = { donate: "donate", book: "bookDharm", temple: "directory", passes: "passes", volunteer: "volunteer", support: "support" };
            return (
              <button key={q.key} onClick={() => nav.go(target[q.key])} className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-3 transition hover:bg-muted">
                <Icon className="h-6 w-6 text-member" />
                <span className="text-[11px] font-medium">{q.label}</span>
              </button>
            );
          })}
        </div>
      </Section>

      <Section title="Upcoming Events" action={<button onClick={() => nav.go("events")} className="text-xs font-medium text-member">View all</button>}>
        <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1">
          {EVENTS.slice(0, 4).map((e) => (
            <button key={e.id} onClick={() => nav.go("eventDetail", e)} className="w-56 shrink-0 overflow-hidden rounded-xl border border-border bg-card text-left shadow-sm">
              <div className="grid h-24 place-items-center bg-gradient-to-br from-saffron/30 to-member/20 text-3xl">🪷</div>
              <div className="p-3">
                <div className="text-xs text-muted-foreground">{e.date}</div>
                <div className="line-clamp-2 text-sm font-semibold">{e.title}</div>
                <div className="mt-1 text-[11px] text-muted-foreground">{e.venue}</div>
              </div>
            </button>
          ))}
        </div>
      </Section>

      <Section title="Announcements" action={<button onClick={() => nav.go("announcements")} className="text-xs font-medium text-member">All</button>}>
        <div className="space-y-2">
          {useApp().announcements.slice(0, 2).map((a) => (
            <Card key={a.id}>
              <div className="flex items-start gap-2">
                <Megaphone className="mt-0.5 h-4 w-4 shrink-0 text-saffron" />
                <div className="flex-1">
                  <div className="text-sm font-semibold">{a.title}</div>
                  <div className="text-xs text-muted-foreground line-clamp-2">{a.snippet}</div>
                  <button className="mt-1 text-[11px] font-medium text-member">Read more →</button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Vihaar Update">
        <Card>
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-saffron/20 text-xl">🧘</div>
            <div className="flex-1">
              <div className="text-sm font-semibold">{MONKS[0].name}</div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3" />Currently in {MONKS[0].currentCity}</div>
            </div>
            <button onClick={() => nav.go("vihaar", MONKS[0])} className="rounded-lg bg-member px-3 py-1.5 text-xs font-medium text-member-foreground">Journey</button>
          </div>
        </Card>
      </Section>

      <Section title="Special Programs">
        <button onClick={() => nav.go("specialPrograms")} className="w-full">
          <Card className="text-left">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold">Varshitap & 99 Yatra Sangh</div>
                <div className="text-xs text-muted-foreground">Track your spiritual journey</div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
          </Card>
        </button>
      </Section>

      <Section title="Community Feed" action={<button onClick={() => nav.go("feed")} className="text-xs font-medium text-member">Open</button>}>
        <div className="space-y-2">
          {feed.slice(0, 2).map((p) => (
            <Card key={p.id}>
              <div className="flex items-center gap-2 text-xs">
                <div className="grid h-7 w-7 place-items-center rounded-full bg-member/15 text-[11px] font-bold text-member">{p.author[0]}</div>
                <span className="font-semibold">{p.author}</span>
                <span className="text-muted-foreground">· {p.time}</span>
              </div>
              <p className="mt-2 text-sm">{p.text}</p>
              <div className="mt-2 flex items-center gap-4 text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1"><Heart className="h-3 w-3" /> {p.likes}</span>
                <span className="flex items-center gap-1"><MessageCircle className="h-3 w-3" /> {p.comments}</span>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="More">
        <div className="grid grid-cols-2 gap-2">
          {[
            { l: "Polls", i: BookOpen, s: "polls" },
            { l: "Offers", i: Tag, s: "offers" },
            { l: "Nearby", i: MapPin, s: "nearby" },
            { l: "Pathshala", i: BookOpen, s: "pathshala" },
          ].map((x) => (
            <button key={x.l} onClick={() => nav.go(x.s as Screen)} className="flex items-center gap-2 rounded-xl border border-border bg-card p-3 text-sm">
              <x.i className="h-4 w-4 text-member" /> {x.l}
            </button>
          ))}
        </div>
      </Section>
    </>
  );
}

function DirectoryScreen({ nav }: { nav: NavCtx }) {
  const [tab, setTab] = useState<"temples" | "centers" | "monks">("temples");
  const [q, setQ] = useState("");
  return (
    <>
      <h2 className="text-lg font-bold pt-1">Directory</h2>
      <div className="flex rounded-lg bg-muted p-1 text-xs font-medium">
        {(["temples", "centers", "monks"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`flex-1 rounded-md py-2 capitalize ${tab === t ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"}`}>{t === "centers" ? "Jain Centers" : t}</button>
        ))}
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Search ${tab}...`} className="w-full rounded-lg border border-input bg-card py-2.5 pl-9 pr-3 text-sm" />
      </div>

      {tab === "temples" && (
        <div className="grid grid-cols-2 gap-3">
          {TEMPLES.filter((t) => t.name.toLowerCase().includes(q.toLowerCase()) || t.city.toLowerCase().includes(q.toLowerCase())).map((t) => (
            <button key={t.id} onClick={() => nav.go("templeDetail", t)} className="rounded-xl border border-border bg-card text-left shadow-sm overflow-hidden">
              <div className="grid h-20 place-items-center bg-gradient-to-br from-saffron/20 to-member/20 text-3xl">🛕</div>
              <div className="p-2.5">
                <div className="text-xs font-semibold line-clamp-2">{t.name}</div>
                <div className="mt-1 flex items-center justify-between text-[10px] text-muted-foreground">
                  <span>{t.city}</span>
                  <span className="flex items-center gap-0.5"><Star className="h-2.5 w-2.5 fill-saffron text-saffron" />{t.rating}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
      {tab === "centers" && (
        <div className="space-y-2">
          {CENTERS.map((c) => (
            <button key={c.id} onClick={() => nav.go("centerDetail", c)} className="w-full">
              <Card className="text-left flex items-center gap-3">
                <Building2 className="h-8 w-8 text-member" />
                <div className="flex-1">
                  <div className="text-sm font-semibold">{c.name}</div>
                  <div className="text-xs text-muted-foreground">{c.city} · {c.programs} programs</div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </Card>
            </button>
          ))}
        </div>
      )}
      {tab === "monks" && (
        <div className="space-y-2">
          {MONKS.map((m) => (
            <button key={m.id} onClick={() => nav.go("monkDetail", m)} className="w-full">
              <Card className="text-left flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-saffron/20 text-xl">🧘</div>
                <div className="flex-1">
                  <div className="text-sm font-semibold">{m.name}</div>
                  <div className="text-xs text-muted-foreground">In {m.currentCity} · {m.followers.toLocaleString()} followers</div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </Card>
            </button>
          ))}
        </div>
      )}
    </>
  );
}

function TempleDetail({ nav }: { nav: NavCtx }) {
  const t = nav.payload as typeof TEMPLES[0];
  const [tab, setTab] = useState("About");
  return (
    <>
      <BackBar title={t.name} nav={nav} />
      <div className="-mx-4 -mt-2 grid h-40 place-items-center bg-gradient-to-br from-saffron/30 to-member/30 text-6xl">🛕</div>
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3" />{t.city}</div>
          <div className="flex items-center gap-1 text-xs"><Star className="h-3 w-3 fill-saffron text-saffron" />{t.rating} (1,240 reviews)</div>
        </div>
        <button onClick={() => nav.go("donate", t)} className="rounded-lg bg-member px-3 py-2 text-xs font-semibold text-member-foreground">Donate</button>
      </div>
      <div className="flex gap-2 overflow-x-auto -mx-4 px-4 text-xs">
        {["About", "Gallery", "Events", "Services", "Announcements"].map((x) => (
          <button key={x} onClick={() => setTab(x)} className={`shrink-0 rounded-full px-3 py-1.5 ${tab === x ? "bg-member text-member-foreground" : "bg-muted"}`}>{x}</button>
        ))}
      </div>
      {tab === "About" && <Card><p className="text-sm leading-relaxed">A historic temple built in the early 1800s, this derasar is one of the most revered Jain pilgrimage sites in {t.city}. Daily aartis at 6:00 AM, 12:00 PM, and 7:30 PM. The temple is open to all members of the community.</p></Card>}
      {tab === "Gallery" && (
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="aspect-square grid place-items-center rounded-lg bg-gradient-to-br from-saffron/20 to-member/20 text-2xl">🪷</div>
          ))}
        </div>
      )}
      {tab === "Events" && EVENTS.slice(0, 3).map((e) => <Card key={e.id}><div className="text-sm font-semibold">{e.title}</div><div className="text-xs text-muted-foreground">{e.date}</div></Card>)}
      {tab === "Services" && ["Pooja Booking", "Vidhi Services", "Hall Booking", "Pravachan Schedule"].map((s) => (
        <Card key={s}><div className="flex items-center justify-between"><span className="text-sm">{s}</span><button onClick={() => nav.go("bookService")} className="text-xs font-medium text-member">Book →</button></div></Card>
      ))}
      {tab === "Announcements" && useApp().announcements.slice(0, 3).map((a) => <Card key={a.id}><div className="text-sm font-semibold">{a.title}</div><div className="text-xs text-muted-foreground">{a.snippet}</div></Card>)}
    </>
  );
}

function CenterDetail({ nav }: { nav: NavCtx }) {
  const c = nav.payload;
  const [tab, setTab] = useState("About");
  return (
    <>
      <BackBar title={c.name} nav={nav} />
      <div className="-mx-4 -mt-2 grid h-32 place-items-center bg-gradient-to-br from-member/20 to-info/30 text-5xl">🏛️</div>
      <div className="flex gap-2 overflow-x-auto -mx-4 px-4 text-xs">
        {["About", "Activities", "Programs", "Events", "Gallery"].map((x) => (
          <button key={x} onClick={() => setTab(x)} className={`shrink-0 rounded-full px-3 py-1.5 ${tab === x ? "bg-member text-member-foreground" : "bg-muted"}`}>{x}</button>
        ))}
      </div>
      <Card><p className="text-sm">{c.name} is a leading Jain community center in {c.city}, running {c.programs} programs including youth camps, pathshalas, vegetarian cooking workshops, and spiritual study groups.</p></Card>
      {tab === "Programs" && ["Pathshala for Kids", "Youth Leadership", "Senior Wellness", "Cooking Workshops"].map((p) => (
        <Card key={p}><div className="text-sm font-semibold">{p}</div><div className="text-xs text-muted-foreground">Ongoing · Open enrollment</div></Card>
      ))}
    </>
  );
}

function MonkDetail({ nav }: { nav: NavCtx }) {
  const m = nav.payload as typeof MONKS[0];
  const { followedMonks, toggleFollowMonk } = useApp();
  const isFollowing = followedMonks.has(m.id);
  return (
    <>
      <BackBar title="Monk Profile" nav={nav} />
      <div className="flex flex-col items-center pt-2 space-y-3">
        <div className="grid h-24 w-24 place-items-center rounded-full bg-saffron/20 text-4xl">🧘</div>
        <div className="text-center">
          <div className="text-base font-bold">{m.name}</div>
          <div className="text-xs text-muted-foreground">{m.followers.toLocaleString()} followers</div>
        </div>
        <button onClick={() => { toggleFollowMonk(m.id); toast.success(isFollowing ? "Unfollowed" : "Following"); }} className={`rounded-full px-5 py-2 text-xs font-semibold ${isFollowing ? "bg-muted text-foreground" : "bg-member text-member-foreground"}`}>
          {isFollowing ? "Following ✓" : "Follow this Monk"}
        </button>
      </div>
      <Section title="Biography">
        <Card><p className="text-sm leading-relaxed">A revered Jain monk known for his profound spiritual discourses and commitment to Ahimsa. Has conducted over 200 pravachans across India and inspired thousands of followers worldwide.</p></Card>
      </Section>
      <Section title="Achievements">
        <Card>
          <ul className="space-y-1.5 text-sm">
            <li>• Authored 12 books on Jain philosophy</li>
            <li>• Conducted 45 Chaturmas across India</li>
            <li>• Led 99 Yatra Sangh in 2024</li>
            <li>• Recipient of Jain Ratna Award</li>
          </ul>
        </Card>
      </Section>
      <Section title="Current Vihaar">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-muted-foreground">Currently in</div>
              <div className="text-sm font-semibold">{m.currentCity}</div>
              <div className="mt-1 text-[11px] text-muted-foreground">Next: {m.nextCity}</div>
            </div>
            <button onClick={() => nav.go("vihaar", m)} className="text-xs font-medium text-member">Full Journey →</button>
          </div>
        </Card>
      </Section>
    </>
  );
}

function VihaarScreen({ nav }: { nav: NavCtx }) {
  const m = nav.payload as typeof MONKS[0];
  return (
    <>
      <BackBar title="Vihaar Journey" nav={nav} />
      <Card>
        <div className="text-xs text-muted-foreground">Currently</div>
        <div className="text-base font-bold">{m.currentCity}</div>
        <div className="mt-1 text-xs">Next destination: <span className="font-semibold">{m.nextCity}</span></div>
      </Card>
      <Section title="Journey Timeline">
        <div className="relative space-y-4 pl-6">
          <div className="absolute left-[10px] top-2 bottom-2 w-0.5 bg-border" />
          {VIHAAR_TIMELINE.map((v, i) => (
            <div key={i} className="relative">
              <div className={`absolute -left-[18px] top-1 h-4 w-4 rounded-full border-2 border-card ${i === 0 ? "bg-saffron" : "bg-member"}`} />
              <div className="text-sm font-semibold">{v.city}</div>
              <div className="text-xs text-muted-foreground">{v.date}{v.note && ` · ${v.note}`}</div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

function EventsScreen({ nav }: { nav: NavCtx }) {
  const [tab, setTab] = useState<"free" | "paid" | "tours">("free");
  return (
    <>
      <h2 className="text-lg font-bold pt-1">Events</h2>
      <div className="flex rounded-lg bg-muted p-1 text-xs font-medium">
        {(["free", "paid", "tours"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`flex-1 rounded-md py-2 capitalize ${tab === t ? "bg-card shadow-sm" : "text-muted-foreground"}`}>{t === "tours" ? "Tours/Yatra" : `${t} events`}</button>
        ))}
      </div>
      {tab !== "tours" && EVENTS.filter((e) => e.type === tab).map((e) => (
        <button key={e.id} onClick={() => nav.go("eventDetail", e)} className="w-full">
          <Card className="text-left">
            <div className="flex gap-3">
              <div className="grid h-16 w-16 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-saffron/30 to-member/20 text-2xl">🪷</div>
              <div className="flex-1">
                <div className="text-sm font-semibold">{e.title}</div>
                <div className="text-xs text-muted-foreground">{e.date}</div>
                <div className="text-xs text-muted-foreground">{e.venue}</div>
                {e.type === "paid" && <div className="mt-1 text-sm font-bold text-member">₹{(e as any).price}</div>}
              </div>
            </div>
          </Card>
        </button>
      ))}
      {tab === "tours" && TOURS.map((t) => (
        <button key={t.id} onClick={() => nav.go("tourDetail", t)} className="w-full">
          <Card className="text-left">
            <div className="text-sm font-semibold">{t.name}</div>
            <div className="text-xs text-muted-foreground">{t.dates}</div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm font-bold text-member">₹{t.price.toLocaleString()}</span>
              <span className="chip bg-warning/20 text-warning">{t.seatsLeft} seats left</span>
            </div>
          </Card>
        </button>
      ))}
    </>
  );
}

function EventDetail({ nav }: { nav: NavCtx }) {
  const e = nav.payload as typeof EVENTS[0];
  const [tier, setTier] = useState("General");
  const [confirmed, setConfirmed] = useState(false);
  if (confirmed) return <SuccessScreen nav={nav} title="You're going!" subtitle={`Pass for ${e.title}`} />;
  return (
    <>
      <BackBar title="Event Details" nav={nav} />
      <div className="-mx-4 -mt-2 grid h-44 place-items-center bg-gradient-to-br from-saffron/30 to-member/30 text-6xl">🪷</div>
      <h1 className="text-xl font-bold">{e.title}</h1>
      <div className="space-y-1 text-sm text-muted-foreground">
        <div className="flex items-center gap-2"><CalendarDays className="h-4 w-4" />{e.date}</div>
        <div className="flex items-center gap-2"><MapPin className="h-4 w-4" />{e.venue}</div>
        <div className="flex items-center gap-2"><Users className="h-4 w-4" />Organized by {e.organizer}</div>
      </div>
      <Card><p className="text-sm leading-relaxed">Join us for this auspicious gathering. The event includes pravachan, bhajan, prasad distribution, and community fellowship. All members and family welcome.</p></Card>
      {e.type === "paid" && (
        <Section title="Select Ticket">
          {[{ t: "General", p: (e as any).price }, { t: "VIP", p: (e as any).price * 2 }, { t: "Family", p: (e as any).price * 3 }].map((opt) => (
            <button key={opt.t} onClick={() => setTier(opt.t)} className={`w-full mb-2 rounded-lg border p-3 text-left ${tier === opt.t ? "border-member bg-member/5" : "border-border"}`}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">{opt.t}</span>
                <span className="text-sm font-bold">₹{opt.p}</span>
              </div>
            </button>
          ))}
        </Section>
      )}
      <button onClick={() => { toast.success(e.type === "paid" ? "Payment successful" : "RSVP confirmed"); setConfirmed(true); }} className="w-full rounded-lg bg-member py-3 text-sm font-semibold text-member-foreground">
        {e.type === "paid" ? `Pay ₹${(e as any).price}` : "RSVP Now"}
      </button>
    </>
  );
}

function TourDetail({ nav }: { nav: NavCtx }) {
  const t = nav.payload as typeof TOURS[0];
  const [done, setDone] = useState(false);
  if (done) return <SuccessScreen nav={nav} title="Registration Confirmed" subtitle={t.name} />;
  return (
    <>
      <BackBar title="Tour / Yatra" nav={nav} />
      <h1 className="text-xl font-bold">{t.name}</h1>
      <div className="text-xs text-muted-foreground">{t.dates} · {t.seatsLeft} seats remaining</div>
      <Card>
        <div className="text-sm font-semibold mb-2">Itinerary</div>
        <ol className="space-y-1.5 text-sm">
          {t.itinerary.map((step, i) => (
            <li key={i} className="flex gap-2"><span className="text-member font-bold">{i + 1}.</span>{step}</li>
          ))}
        </ol>
      </Card>
      <div className="rounded-xl bg-member/5 p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm">Tour fee per person</span>
          <span className="text-lg font-bold text-member">₹{t.price.toLocaleString()}</span>
        </div>
      </div>
      <button onClick={() => { toast.success("Registered for yatra"); setDone(true); }} className="w-full rounded-lg bg-member py-3 text-sm font-semibold text-member-foreground">Register Now</button>
    </>
  );
}

function DonateScreen({ nav }: { nav: NavCtx }) {
  const [amount, setAmount] = useState(501);
  const [temple, setTemple] = useState(TEMPLES[0].name);
  const [done, setDone] = useState(false);
  if (done) return <DonationReceipt nav={nav} amount={amount} temple={temple} />;
  return (
    <>
      <BackBar title="Make a Donation" nav={nav} />
      <Section title="Donate To">
        <select value={temple} onChange={(e) => setTemple(e.target.value)} className="w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm">
          {TEMPLES.map((t) => <option key={t.id}>{t.name}</option>)}
          <option>Earthquake Relief Fund</option>
          <option>Pathshala Building Renovation</option>
        </select>
      </Section>
      <Section title="Amount">
        <div className="grid grid-cols-4 gap-2">
          {[101, 501, 1001, 5001].map((a) => (
            <button key={a} onClick={() => setAmount(a)} className={`rounded-lg border py-2 text-sm font-semibold ${amount === a ? "border-member bg-member text-member-foreground" : "border-border bg-card"}`}>₹{a}</button>
          ))}
        </div>
        <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="mt-2 w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm" placeholder="Custom amount" />
      </Section>
      <button onClick={() => { toast.success("Donation successful"); setDone(true); }} className="w-full rounded-lg bg-member py-3 text-sm font-semibold text-member-foreground">Donate ₹{amount.toLocaleString()}</button>
      <button onClick={() => nav.go("donationHistory")} className="w-full py-2 text-xs font-medium text-member">View donation history →</button>
    </>
  );
}

function DonationReceipt({ nav, amount, temple }: { nav: NavCtx; amount: number; temple: string }) {
  const id = "RCP-" + Math.floor(Math.random() * 90000 + 10000);
  return (
    <>
      <BackBar title="Receipt" nav={nav} />
      <div className="flex flex-col items-center py-4 space-y-2">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-success/15 text-success"><Check className="h-8 w-8" /></div>
        <div className="text-lg font-bold">Donation Successful</div>
      </div>
      <Card>
        <div className="space-y-2 text-sm">
          <Row k="Receipt No." v={id} />
          <Row k="Donor" v={CURRENT_MEMBER.name} />
          <Row k="Beneficiary" v={temple} />
          <Row k="Amount" v={`₹${amount.toLocaleString()}`} />
          <Row k="Date" v={new Date().toLocaleDateString()} />
          <Row k="Mode" v="UPI / Net Banking" />
        </div>
      </Card>
      <button onClick={() => toast.success("Receipt downloaded")} className="w-full rounded-lg border border-member bg-card py-3 text-sm font-semibold text-member">Download Receipt (80G)</button>
    </>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return <div className="flex justify-between"><span className="text-muted-foreground">{k}</span><span className="font-medium">{v}</span></div>;
}

function DonationHistory({ nav }: { nav: NavCtx }) {
  return (
    <>
      <BackBar title="Donation History" nav={nav} />
      {DONATIONS_HISTORY.map((d) => (
        <Card key={d.id}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold">{d.temple}</div>
              <div className="text-xs text-muted-foreground">{d.date} · {d.receipt}</div>
            </div>
            <div className="text-right">
              <div className="text-base font-bold text-member">₹{d.amount.toLocaleString()}</div>
              <button onClick={() => toast.success("Receipt downloaded")} className="text-[11px] font-medium text-member">Download</button>
            </div>
          </div>
        </Card>
      ))}
    </>
  );
}

function BookDharmshala({ nav }: { nav: NavCtx }) {
  const [selected, setSelected] = useState<any>(null);
  const [confirmed, setConfirmed] = useState(false);
  if (confirmed) return <SuccessScreen nav={nav} title="Booking Submitted" subtitle="Status: Pending Approval · BK-1029" />;
  return (
    <>
      <BackBar title="Dharmshala Booking" nav={nav} />
      {!selected && DHARMSHALAS.map((d) => (
        <button key={d.id} onClick={() => setSelected(d)} className="w-full">
          <Card className="text-left">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold">{d.name}</div>
                <div className="text-xs text-muted-foreground">{d.city} · {d.rooms.join(", ")}</div>
              </div>
              <StatusBadge status={d.status} />
            </div>
          </Card>
        </button>
      ))}
      {selected && (
        <Card>
          <div className="text-sm font-semibold mb-3">{selected.name}</div>
          <div className="space-y-2 text-sm">
            <label className="block">Check-in<input type="date" className="mt-1 w-full rounded-lg border border-input bg-card px-3 py-2" /></label>
            <label className="block">Check-out<input type="date" className="mt-1 w-full rounded-lg border border-input bg-card px-3 py-2" /></label>
            <label className="block">Room Type<select className="mt-1 w-full rounded-lg border border-input bg-card px-3 py-2">{selected.rooms.map((r: string) => <option key={r}>{r}</option>)}</select></label>
            <label className="block">Guests<input type="number" defaultValue={2} className="mt-1 w-full rounded-lg border border-input bg-card px-3 py-2" /></label>
          </div>
          <button onClick={() => { toast.success("Request submitted"); setConfirmed(true); }} className="mt-4 w-full rounded-lg bg-member py-2.5 text-sm font-semibold text-member-foreground">Submit Request</button>
        </Card>
      )}
    </>
  );
}

function BookService({ nav }: { nav: NavCtx }) {
  const [cat, setCat] = useState("Pooja");
  const [slot, setSlot] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const slots = ["6:00 AM", "8:30 AM", "11:00 AM", "12:30 PM", "5:00 PM", "7:30 PM"];
  if (done) return <SuccessScreen nav={nav} title="Service Booked" subtitle={`${cat} · ${slot}`} />;
  return (
    <>
      <BackBar title="Temple Services" nav={nav} />
      <div className="flex gap-2 overflow-x-auto -mx-4 px-4 text-xs">
        {["Pooja", "Vidhi", "Hall", "Pravachan"].map((c) => (
          <button key={c} onClick={() => setCat(c)} className={`shrink-0 rounded-full px-3 py-1.5 ${cat === c ? "bg-member text-member-foreground" : "bg-muted"}`}>{c}</button>
        ))}
      </div>
      <div className="text-sm font-semibold">Available Slots — {cat}</div>
      <div className="grid grid-cols-3 gap-2">
        {slots.map((s) => (
          <button key={s} onClick={() => setSlot(s)} className={`rounded-lg border py-2.5 text-sm font-medium ${slot === s ? "border-member bg-member text-member-foreground" : "border-border bg-card"}`}>{s}</button>
        ))}
      </div>
      <button disabled={!slot} onClick={() => { toast.success("Service booked"); setDone(true); }} className="w-full rounded-lg bg-member py-3 text-sm font-semibold text-member-foreground disabled:opacity-50">Confirm Booking</button>
    </>
  );
}

function Bhojanshala({ nav }: { nav: NavCtx }) {
  const [pass, setPass] = useState(false);
  return (
    <>
      <BackBar title="Bhojanshala" nav={nav} />
      <Card>
        <div className="text-sm font-semibold mb-2 flex items-center gap-2"><Utensils className="h-4 w-4 text-saffron" />Meal Schedule</div>
        <table className="w-full text-sm">
          <tbody>
            <tr><td className="py-1.5 font-medium">Breakfast</td><td className="text-muted-foreground text-right">7:00 - 9:00 AM</td></tr>
            <tr className="border-t border-border"><td className="py-1.5 font-medium">Lunch</td><td className="text-muted-foreground text-right">11:30 AM - 1:30 PM</td></tr>
            <tr className="border-t border-border"><td className="py-1.5 font-medium">Dinner</td><td className="text-muted-foreground text-right">6:30 - 8:30 PM</td></tr>
          </tbody>
        </table>
      </Card>
      {!pass ? (
        <button onClick={() => { toast.success("Pass generated"); setPass(true); }} className="w-full rounded-lg bg-member py-3 text-sm font-semibold text-member-foreground">Request Meal Pass</button>
      ) : (
        <Card>
          <div className="flex items-center gap-4">
            <QRCode size={88} />
            <div>
              <div className="text-xs text-muted-foreground">Bhojanshala Pass</div>
              <div className="text-sm font-bold">{CURRENT_MEMBER.name}</div>
              <div className="text-xs">Valid: Today · Lunch</div>
              <div className="text-[10px] text-muted-foreground mt-1">Pass: BJ-{Math.floor(Math.random() * 9000 + 1000)}</div>
            </div>
          </div>
        </Card>
      )}
    </>
  );
}

function SuccessScreen({ nav, title, subtitle }: { nav: NavCtx; title: string; subtitle: string }) {
  return (
    <>
      <BackBar title="Confirmation" nav={nav} />
      <div className="flex flex-col items-center py-10 space-y-3">
        <div className="grid h-20 w-20 place-items-center rounded-full bg-success/15 text-success"><Check className="h-10 w-10" /></div>
        <div className="text-lg font-bold">{title}</div>
        <div className="text-sm text-muted-foreground text-center">{subtitle}</div>
        <QRCode size={120} />
        <button onClick={nav.back} className="rounded-lg bg-member px-6 py-2.5 text-sm font-semibold text-member-foreground">Done</button>
      </div>
    </>
  );
}

function PassesScreen() {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Event Pass", "Ticket", "Bhojanshala", "Booking"];
  const list = filter === "All" ? PASSES : PASSES.filter((p) => p.type === filter);
  return (
    <>
      <h2 className="text-lg font-bold pt-1">My Passes</h2>
      <div className="rounded-2xl bg-gradient-to-br from-member to-info p-4 text-member-foreground">
        <div className="text-[10px] uppercase opacity-80">Digital Member Card</div>
        <div className="flex items-center gap-3 mt-2">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-member-foreground/20 text-xl font-bold">{CURRENT_MEMBER.avatar}</div>
          <div className="flex-1">
            <div className="text-base font-bold">{CURRENT_MEMBER.name}</div>
            <div className="text-xs opacity-90">{CURRENT_MEMBER.id}</div>
            <div className="text-[10px] opacity-80">{CURRENT_MEMBER.community}</div>
          </div>
          <QRCode size={64} />
        </div>
      </div>
      <div className="flex gap-2 overflow-x-auto -mx-4 px-4 text-xs">
        {filters.map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`shrink-0 rounded-full px-3 py-1.5 ${filter === f ? "bg-member text-member-foreground" : "bg-muted"}`}>{f}</button>
        ))}
      </div>
      {list.map((p) => (
        <Card key={p.id}>
          <div className="flex gap-3">
            <QRCode size={72} />
            <div className="flex-1">
              <div className="text-[10px] uppercase text-muted-foreground tracking-wide">{p.type}</div>
              <div className="text-sm font-bold">{p.title}</div>
              <div className="text-xs text-muted-foreground">Valid: {p.validity}</div>
              <div className="mt-2"><StatusBadge status={p.status} /></div>
            </div>
          </div>
        </Card>
      ))}
    </>
  );
}

function ProfileScreen({ nav, reset }: { nav: NavCtx; reset: (s: Screen) => void }) {
  const [showFamily, setShowFamily] = useState(false);
  return (
    <>
      <h2 className="text-lg font-bold pt-1">Profile</h2>
      <Card>
        <div className="flex items-center gap-3">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-member text-member-foreground text-xl font-bold">{CURRENT_MEMBER.avatar}</div>
          <div className="flex-1">
            <div className="text-base font-bold">{CURRENT_MEMBER.name}</div>
            <div className="text-xs text-muted-foreground">{CURRENT_MEMBER.id}</div>
            <div className="text-xs text-muted-foreground">{CURRENT_MEMBER.community}</div>
          </div>
          <button onClick={() => toast.info("Edit profile opened")} className="text-xs font-medium text-member">Edit</button>
        </div>
      </Card>

      <ProfileGroup title="Personal Details">
        <Row k="Mobile" v={CURRENT_MEMBER.mobile} />
        <Row k="DOB" v={CURRENT_MEMBER.dob} />
        <Row k="Gender" v={CURRENT_MEMBER.gender} />
        <Row k="City" v={CURRENT_MEMBER.city} />
        <Row k="Linked Temple" v={CURRENT_MEMBER.temple} />
      </ProfileGroup>

      <ProfileGroup title="Family Members" right={<button onClick={() => setShowFamily(true)} className="text-xs text-member"><Plus className="inline h-3 w-3" /> Add</button>}>
        {FAMILY_MEMBERS.map((f) => (
          <div key={f.id} className="flex justify-between py-1.5"><span className="text-sm">{f.name}</span><span className="text-xs text-muted-foreground">{f.relation} · {f.age}y</span></div>
        ))}
      </ProfileGroup>

      <ProfileGroup title="Preferences">
        <Toggle label="Push Notifications" defaultOn />
        <Toggle label="Event Reminders" defaultOn />
        <Toggle label="Donation Receipts" defaultOn />
        <Toggle label="Vihaar Updates" defaultOn />
        <Toggle label="Marketing Emails" />
        <div className="flex items-center justify-between py-2"><span className="text-sm flex items-center gap-2"><Languages className="h-4 w-4" /> Language</span><select className="rounded-md border border-input bg-card px-2 py-1 text-xs"><option>English</option><option>हिन्दी</option><option>ગુજરાતી</option></select></div>
      </ProfileGroup>

      <ProfileGroup title="Privacy">
        <Toggle label="Show profile in directory" defaultOn />
        <Toggle label="Allow family invites" defaultOn />
        <Toggle label="Share donation publicly" />
      </ProfileGroup>

      <div className="grid grid-cols-2 gap-2">
        <button onClick={() => nav.go("support")} className="rounded-lg border border-border bg-card py-3 text-sm font-medium flex items-center justify-center gap-2"><LifeBuoy className="h-4 w-4" /> Support</button>
        <button onClick={() => nav.go("pathshala")} className="rounded-lg border border-border bg-card py-3 text-sm font-medium flex items-center justify-center gap-2"><BookOpen className="h-4 w-4" /> Pathshala</button>
      </div>

      <button onClick={() => { toast.info("Logged out"); reset("login"); }} className="w-full rounded-lg border border-destructive/40 bg-destructive/5 py-3 text-sm font-semibold text-destructive flex items-center justify-center gap-2"><LogOut className="h-4 w-4" /> Logout</button>

      {showFamily && (
        <Modal onClose={() => setShowFamily(false)} title="Add Family Member">
          <input placeholder="Name" className="w-full rounded-lg border border-input bg-card px-3 py-2 text-sm" />
          <input placeholder="Relation" className="w-full rounded-lg border border-input bg-card px-3 py-2 text-sm" />
          <input type="date" className="w-full rounded-lg border border-input bg-card px-3 py-2 text-sm" />
          <button onClick={() => { toast.success("Family member added"); setShowFamily(false); }} className="w-full rounded-lg bg-member py-2.5 text-sm font-semibold text-member-foreground">Save</button>
        </Modal>
      )}
    </>
  );
}

function ProfileGroup({ title, right, children }: { title: string; right?: ReactNode; children: ReactNode }) {
  return (
    <Card>
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{title}</h4>
        {right}
      </div>
      <div className="space-y-0.5">{children}</div>
    </Card>
  );
}
function Toggle({ label, defaultOn = false }: { label: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button onClick={() => setOn(!on)} className="w-full flex items-center justify-between py-2">
      <span className="text-sm">{label}</span>
      <span className={`h-5 w-9 rounded-full p-0.5 transition ${on ? "bg-member" : "bg-muted-foreground/30"}`}>
        <span className={`block h-4 w-4 rounded-full bg-white transition ${on ? "translate-x-4" : ""}`} />
      </span>
    </button>
  );
}

function FeedScreen() {
  const { feed, toggleLike, likedIds } = useApp();
  return (
    <>
      <h2 className="text-lg font-bold pt-1">Community Feed</h2>
      {feed.map((p) => (
        <Card key={p.id}>
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-member/15 text-sm font-bold text-member">{p.author[0]}</div>
            <div className="flex-1">
              <div className="text-sm font-semibold">{p.author}</div>
              <div className="text-[10px] text-muted-foreground">{p.time}</div>
            </div>
          </div>
          <p className="mt-2 text-sm">{p.text}</p>
          {p.image && <div className="mt-2 grid h-40 place-items-center rounded-lg bg-gradient-to-br from-saffron/20 to-member/20 text-4xl">🪷</div>}
          <div className="mt-3 flex items-center gap-5 text-xs">
            <button onClick={() => toggleLike(p.id)} className={`flex items-center gap-1.5 ${likedIds.has(p.id) ? "text-destructive" : "text-muted-foreground"}`}>
              <Heart className={`h-4 w-4 ${likedIds.has(p.id) ? "fill-current" : ""}`} />{p.likes}
            </button>
            <button className="flex items-center gap-1.5 text-muted-foreground"><MessageCircle className="h-4 w-4" />{p.comments}</button>
            <button onClick={() => toast.success("Shared")} className="flex items-center gap-1.5 text-muted-foreground"><Share2 className="h-4 w-4" />Share</button>
          </div>
        </Card>
      ))}
    </>
  );
}

function PollsScreen() {
  const { polls, votePoll, votedPolls } = useApp();
  return (
    <>
      <h2 className="text-lg font-bold pt-1">Community Polls</h2>
      {polls.map((p) => {
        const total = p.options.reduce((s, o) => s + o.votes, 0);
        const voted = votedPolls[p.id];
        return (
          <Card key={p.id}>
            <div className="text-sm font-semibold mb-3">{p.question}</div>
            <div className="space-y-2">
              {p.options.map((o, i) => {
                const pct = total ? Math.round((o.votes / total) * 100) : 0;
                if (voted !== undefined) {
                  return (
                    <div key={i} className="relative overflow-hidden rounded-lg border border-border bg-card p-2.5">
                      <div className="absolute inset-y-0 left-0 bg-member/15" style={{ width: `${pct}%` }} />
                      <div className="relative flex items-center justify-between text-sm">
                        <span className={voted === i ? "font-bold text-member" : ""}>{o.label}</span>
                        <span className="font-semibold">{pct}%</span>
                      </div>
                    </div>
                  );
                }
                return (
                  <button key={i} onClick={() => votePoll(p.id, i)} className="w-full rounded-lg border border-border bg-card py-2.5 text-sm hover:border-member">{o.label}</button>
                );
              })}
            </div>
            <div className="mt-2 text-[10px] text-muted-foreground">{total + (voted !== undefined ? 0 : 0)} votes</div>
          </Card>
        );
      })}
    </>
  );
}

function AnnouncementsScreen() {
  const { announcements, notices } = useApp();
  const [tab, setTab] = useState<"announcements" | "notices">("announcements");
  const [openNotice, setOpenNotice] = useState<any>(null);
  return (
    <>
      <h2 className="text-lg font-bold pt-1">Updates</h2>
      <div className="flex rounded-lg bg-muted p-1 text-xs font-medium">
        {(["announcements", "notices"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`flex-1 rounded-md py-2 capitalize ${tab === t ? "bg-card shadow-sm" : "text-muted-foreground"}`}>{t}</button>
        ))}
      </div>
      {tab === "announcements" && announcements.map((a) => (
        <Card key={a.id}>
          <div className="flex items-start gap-2">
            <Megaphone className="h-4 w-4 text-saffron mt-0.5" />
            <div>
              <div className="text-sm font-semibold">{a.title}</div>
              <div className="text-[10px] text-muted-foreground">{a.date}</div>
              <p className="mt-1 text-xs text-muted-foreground">{a.snippet}</p>
            </div>
          </div>
        </Card>
      ))}
      {tab === "notices" && notices.map((n) => (
        <Card key={n.id}>
          <div className="flex items-start gap-2">
            <FileText className="h-4 w-4 text-info mt-0.5" />
            <div className="flex-1">
              <div className="text-[10px] text-muted-foreground">{n.ref} · {n.date}</div>
              <div className="text-sm font-semibold">{n.subject}</div>
              <button onClick={() => setOpenNotice(n)} className="mt-1 text-xs text-member font-medium">View Full Notice →</button>
            </div>
          </div>
        </Card>
      ))}
      {openNotice && (
        <Modal onClose={() => setOpenNotice(null)} title={openNotice.subject}>
          <div className="text-xs text-muted-foreground">Ref: {openNotice.ref} · Issued: {openNotice.date}</div>
          <p className="text-sm leading-relaxed">This is an official notice from the Jain Community Platform administration. All members are requested to take note of the above subject. For queries, contact the support team via the Help section. Compliance is appreciated.</p>
        </Modal>
      )}
    </>
  );
}

function OffersScreen() {
  const [code, setCode] = useState<string | null>(null);
  return (
    <>
      <h2 className="text-lg font-bold pt-1">Offers & Benefits</h2>
      <div className="grid grid-cols-2 gap-3">
        {OFFERS.map((o) => (
          <Card key={o.id}>
            <div className="text-2xl mb-1">🎁</div>
            <div className="text-[10px] uppercase text-muted-foreground tracking-wide">{o.partner}</div>
            <div className="text-sm font-semibold line-clamp-2">{o.title}</div>
            <div className="mt-1 text-base font-bold text-saffron">{o.discount}</div>
            <div className="text-[10px] text-muted-foreground">Until {o.validity}</div>
            <button onClick={() => setCode("JCP-" + o.id.toUpperCase() + "-" + Math.floor(Math.random() * 9999))} className="mt-2 w-full rounded-md bg-member py-1.5 text-[11px] font-semibold text-member-foreground">Redeem</button>
          </Card>
        ))}
      </div>
      {code && (
        <Modal onClose={() => setCode(null)} title="Redemption Code">
          <div className="rounded-lg border-2 border-dashed border-member bg-member/5 py-6 text-center">
            <div className="text-xs text-muted-foreground">Show this code at counter</div>
            <div className="mt-2 text-2xl font-bold tracking-widest text-member">{code}</div>
          </div>
          <button onClick={() => { navigator.clipboard?.writeText(code); toast.success("Copied"); }} className="w-full rounded-lg bg-member py-2.5 text-sm font-semibold text-member-foreground">Copy Code</button>
        </Modal>
      )}
    </>
  );
}

function VolunteerScreen() {
  const [appliedId, setAppliedId] = useState<string | null>(null);
  return (
    <>
      <h2 className="text-lg font-bold pt-1 flex items-center gap-2"><HeartHandshake className="h-5 w-5 text-saffron" /> Volunteer / Seva</h2>
      {VOLUNTEER_OPPS.map((v) => (
        <Card key={v.id}>
          <div className="text-sm font-semibold">{v.title}</div>
          <div className="text-xs text-muted-foreground">{v.date} · {v.location}</div>
          <div className="mt-1.5 flex items-center justify-between">
            <span className="chip bg-warning/20 text-warning">{v.spotsLeft} spots left</span>
            {appliedId === v.id ? (
              <span className="text-xs text-success font-medium flex items-center gap-1"><Check className="h-3 w-3" /> Applied</span>
            ) : (
              <button onClick={() => { toast.success("Application submitted"); setAppliedId(v.id); }} className="rounded-md bg-member px-3 py-1 text-xs font-semibold text-member-foreground">Apply</button>
            )}
          </div>
        </Card>
      ))}
    </>
  );
}

function NearbyScreen() {
  return (
    <>
      <h2 className="text-lg font-bold pt-1">Nearby Services</h2>
      <div className="relative -mx-4 grid h-48 place-items-center overflow-hidden bg-gradient-to-br from-info/20 via-success/15 to-saffron/15">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(transparent 95%, currentColor 95%), linear-gradient(90deg, transparent 95%, currentColor 95%)", backgroundSize: "24px 24px" }} />
        {[
          { x: "20%", y: "30%" }, { x: "60%", y: "45%" }, { x: "40%", y: "65%" }, { x: "75%", y: "25%" }, { x: "30%", y: "80%" },
        ].map((p, i) => (
          <MapPin key={i} className="absolute h-6 w-6 text-destructive drop-shadow-md" style={{ left: p.x, top: p.y }} fill="currentColor" />
        ))}
        <div className="z-10 rounded-full bg-card/80 px-3 py-1.5 text-xs font-medium backdrop-blur">Showing 6 places near you</div>
      </div>
      {NEARBY.map((n, i) => (
        <Card key={i}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase text-muted-foreground tracking-wide">{n.type}</div>
              <div className="text-sm font-semibold">{n.name}</div>
            </div>
            <span className="chip bg-info/15 text-info">{n.distance}</span>
          </div>
        </Card>
      ))}
    </>
  );
}

function PathshalaScreen() {
  return (
    <>
      <h2 className="text-lg font-bold pt-1 flex items-center gap-2"><BookOpen className="h-5 w-5 text-saffron" /> Jain Pathshala</h2>
      <Card>
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-full bg-member/15 text-lg font-bold text-member">A</div>
          <div>
            <div className="text-sm font-bold">Aarav Shah</div>
            <div className="text-xs text-muted-foreground">Class 4 · Mumbai Pathshala</div>
          </div>
        </div>
        <div className="mt-3">
          <div className="flex justify-between text-xs"><span>Attendance</span><span className="font-semibold">87%</span></div>
          <div className="mt-1 h-2 rounded-full bg-muted"><div className="h-2 rounded-full bg-success" style={{ width: "87%" }} /></div>
        </div>
      </Card>
      <Section title="Subjects">
        {[
          { name: "Tirthankar Stories", p: 75 },
          { name: "Navkar Mantra", p: 92 },
          { name: "Jain Philosophy", p: 68 },
          { name: "Sutras & Stotras", p: 80 },
        ].map((s) => (
          <Card key={s.name}>
            <div className="flex justify-between text-sm"><span>{s.name}</span><span className="font-semibold">{s.p}%</span></div>
            <div className="mt-1 h-1.5 rounded-full bg-muted"><div className="h-1.5 rounded-full bg-member" style={{ width: `${s.p}%` }} /></div>
          </Card>
        ))}
      </Section>
      <Section title="Recent Assessments">
        <Card>
          <table className="w-full text-xs">
            <thead className="text-muted-foreground"><tr><th className="text-left py-1">Topic</th><th className="text-right">Score</th></tr></thead>
            <tbody>
              <tr className="border-t border-border"><td className="py-1.5">Mahavir's Life</td><td className="text-right font-semibold text-success">18/20</td></tr>
              <tr className="border-t border-border"><td className="py-1.5">Five Vows</td><td className="text-right font-semibold text-success">16/20</td></tr>
              <tr className="border-t border-border"><td className="py-1.5">Karma Theory</td><td className="text-right font-semibold text-warning">12/20</td></tr>
            </tbody>
          </table>
        </Card>
      </Section>
    </>
  );
}

function SpecialPrograms() {
  return (
    <>
      <h2 className="text-lg font-bold pt-1">Special Programs</h2>
      <Card>
        <div className="text-sm font-semibold mb-3 flex items-center gap-2"><Sparkles className="h-4 w-4 text-saffron" /> Varshitap Tracker</div>
        <div className="flex items-center gap-4">
          <div className="relative h-24 w-24">
            <svg viewBox="0 0 36 36" className="h-24 w-24 -rotate-90">
              <circle cx="18" cy="18" r="15" fill="none" stroke="currentColor" strokeWidth="3" className="text-muted" />
              <circle cx="18" cy="18" r="15" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray={`${(145 / 365) * 94.2}, 94.2`} className="text-member" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 grid place-items-center"><div className="text-center"><div className="text-base font-bold">145</div><div className="text-[9px] text-muted-foreground">of 365</div></div></div>
          </div>
          <div className="flex-1 text-sm">
            <div className="font-semibold">Day 145 of 365</div>
            <div className="text-xs text-muted-foreground">220 days remaining</div>
            <div className="mt-2 text-xs">Next paaran: Feb 14</div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="text-sm font-semibold mb-2 flex items-center gap-2"><Globe2 className="h-4 w-4 text-saffron" /> 99 Yatra Sangh</div>
        <div className="text-sm">Current Sangh: <span className="font-semibold">Palitana Mahasangh 2026</span></div>
        <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3" /> Today's location: Talaja</div>
        <button onClick={() => toast.info("Itinerary opened")} className="mt-3 w-full rounded-lg bg-member py-2 text-xs font-semibold text-member-foreground">View Full Itinerary</button>
      </Card>
    </>
  );
}

function SupportScreen() {
  const [subject, setSubject] = useState("");
  const [desc, setDesc] = useState("");
  const [tickets, setTickets] = useState<{ id: string; subject: string; status: string }[]>([
    { id: "TKT-099", subject: "Pass not loading", status: "Resolved" },
  ]);
  return (
    <>
      <h2 className="text-lg font-bold pt-1">Help & Support</h2>
      <Section title="FAQs">
        <div className="space-y-2">{FAQS.map((f, i) => <FAQ key={i} q={f.q} a={f.a} />)}</div>
      </Section>
      <Section title="Raise a Ticket">
        <Card>
          <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject" className="w-full rounded-lg border border-input bg-card px-3 py-2 text-sm mb-2" />
          <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Describe your issue..." rows={3} className="w-full rounded-lg border border-input bg-card px-3 py-2 text-sm" />
          <button onClick={() => { if (!subject) return; setTickets((t) => [{ id: "TKT-" + Math.floor(Math.random() * 900 + 100), subject, status: "Open" }, ...t]); setSubject(""); setDesc(""); toast.success("Ticket submitted"); }} className="mt-2 w-full rounded-lg bg-member py-2 text-sm font-semibold text-member-foreground">Submit Ticket</button>
        </Card>
      </Section>
      <Section title="My Tickets">
        {tickets.map((t) => (
          <Card key={t.id}><div className="flex justify-between"><div><div className="text-sm font-semibold">{t.subject}</div><div className="text-xs text-muted-foreground">{t.id}</div></div><StatusBadge status={t.status} /></div></Card>
        ))}
      </Section>
      <button onClick={() => toast.info("Opening WhatsApp")} className="w-full rounded-lg bg-success/15 py-3 text-sm font-semibold text-success flex items-center justify-center gap-2"><MessageCircle className="h-4 w-4" /> WhatsApp Support</button>
    </>
  );
}

function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <Card>
      <button onClick={() => setOpen(!open)} className="flex w-full items-start justify-between gap-2 text-left">
        <span className="text-sm font-medium">{q}</span>
        <ChevronDown className={`h-4 w-4 shrink-0 transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <p className="mt-2 text-xs text-muted-foreground">{a}</p>}
    </Card>
  );
}

function NotificationsScreen({ nav }: { nav: NavCtx }) {
  const { notifications, markAllRead } = useApp();
  return (
    <>
      <BackBar title="Notifications" nav={nav} />
      <button onClick={markAllRead} className="text-xs font-medium text-member">Mark all as read</button>
      {notifications.map((n) => (
        <Card key={n.id} className={n.read ? "" : "border-l-4 border-l-member"}>
          <div className="flex items-start gap-2">
            <Bell className="h-4 w-4 text-member mt-0.5" />
            <div className="flex-1">
              <div className="text-sm font-semibold">{n.title}</div>
              <div className="text-xs text-muted-foreground">{n.body}</div>
              <div className="text-[10px] text-muted-foreground mt-1">{n.time}</div>
            </div>
            {!n.read && <div className="h-2 w-2 rounded-full bg-member" />}
          </div>
        </Card>
      ))}
    </>
  );
}

function Modal({ title, children, onClose }: { title: string; children: ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-end md:place-items-center bg-foreground/40 p-4" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md rounded-2xl bg-card p-4 space-y-3 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold">{title}</h3>
          <button onClick={onClose}><X className="h-5 w-5" /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

