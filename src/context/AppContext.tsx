import { createContext, useContext, useState, type ReactNode } from "react";
import {
  ANNOUNCEMENTS, NOTICES, FEED_POSTS, POLLS, NOTIFICATIONS,
  ADMIN_BOOKINGS, ADMIN_TICKETS,
} from "@/data/mockData";

type Role = "member" | "admin";

interface AppState {
  role: Role;
  setRole: (r: Role) => void;
  isAuthed: boolean;
  setAuthed: (b: boolean) => void;

  notifications: typeof NOTIFICATIONS;
  markAllRead: () => void;

  feed: typeof FEED_POSTS;
  toggleLike: (id: string) => void;
  likedIds: Set<string>;

  polls: typeof POLLS;
  votePoll: (pollId: string, optionIdx: number) => void;
  votedPolls: Record<string, number>;

  bookings: typeof ADMIN_BOOKINGS;
  setBookingStatus: (id: string, status: string) => void;

  tickets: typeof ADMIN_TICKETS;
  setTicketStatus: (id: string, status: string) => void;

  followedMonks: Set<string>;
  toggleFollowMonk: (id: string) => void;

  announcements: typeof ANNOUNCEMENTS;
  notices: typeof NOTICES;
}

const Ctx = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>("member");
  const [isAuthed, setAuthed] = useState(true); // default logged-in for demo
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [feed, setFeed] = useState(FEED_POSTS);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [polls, setPolls] = useState(POLLS);
  const [votedPolls, setVotedPolls] = useState<Record<string, number>>({});
  const [bookings, setBookings] = useState(ADMIN_BOOKINGS);
  const [tickets, setTickets] = useState(ADMIN_TICKETS);
  const [followedMonks, setFollowedMonks] = useState<Set<string>>(new Set(["m1"]));

  return (
    <Ctx.Provider
      value={{
        role, setRole, isAuthed, setAuthed,
        notifications,
        markAllRead: () => setNotifications((n) => n.map((x) => ({ ...x, read: true }))),
        feed,
        likedIds,
        toggleLike: (id) => {
          setLikedIds((s) => {
            const n = new Set(s);
            const has = n.has(id);
            if (has) n.delete(id); else n.add(id);
            setFeed((f) => f.map((p) => p.id === id ? { ...p, likes: p.likes + (has ? -1 : 1) } : p));
            return n;
          });
        },
        polls, votedPolls,
        votePoll: (pollId, optionIdx) => {
          if (votedPolls[pollId] !== undefined) return;
          setVotedPolls((v) => ({ ...v, [pollId]: optionIdx }));
          setPolls((ps) => ps.map((p) => p.id === pollId
            ? { ...p, options: p.options.map((o, i) => i === optionIdx ? { ...o, votes: o.votes + 1 } : o) }
            : p));
        },
        bookings,
        setBookingStatus: (id, status) => setBookings((b) => b.map((x) => x.id === id ? { ...x, status } : x)),
        tickets,
        setTicketStatus: (id, status) => setTickets((t) => t.map((x) => x.id === id ? { ...x, status } : x)),
        followedMonks,
        toggleFollowMonk: (id) => setFollowedMonks((s) => {
          const n = new Set(s);
          if (n.has(id)) n.delete(id); else n.add(id);
          return n;
        }),
        announcements: ANNOUNCEMENTS,
        notices: NOTICES,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useApp() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useApp must be inside AppProvider");
  return v;
}
