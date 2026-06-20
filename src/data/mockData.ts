// Centralized mock data for the Jain Community Platform demo

export const CURRENT_MEMBER = {
  id: "JCP-002847",
  name: "Raj Shah",
  mobile: "+91 98200 12345",
  city: "Mumbai",
  community: "Shwetambar Murtipujak",
  dob: "1988-06-12",
  gender: "Male",
  avatar: "RS",
  temple: "Shree Godiji Parshwanath Jain Derasar",
  language: "English",
};

export const FAMILY_MEMBERS = [
  { id: "f1", name: "Meera Shah", relation: "Spouse", age: 35 },
  { id: "f2", name: "Aarav Shah", relation: "Son", age: 9 },
  { id: "f3", name: "Diya Shah", relation: "Daughter", age: 6 },
];

export const TODAY_TITHI = "Posh Sud 5 — Tithi: Panchami, Vikram Samvat 2082";

export const TEMPLES = [
  { id: "t1", name: "Shree Godiji Parshwanath Jain Derasar", city: "Mumbai", rating: 4.9, image: "🛕" },
  { id: "t2", name: "Shri Mahavir Swami Derasar", city: "Surat", rating: 4.8, image: "🛕" },
  { id: "t3", name: "Dadawadi Jain Mandir", city: "Ahmedabad", rating: 4.7, image: "🛕" },
  { id: "t4", name: "Shri Shantinath Jain Mandir", city: "Pune", rating: 4.6, image: "🛕" },
  { id: "t5", name: "Hutheesing Jain Temple", city: "Ahmedabad", rating: 4.9, image: "🛕" },
  { id: "t6", name: "Walkeshwar Jain Mandir", city: "Mumbai", rating: 4.5, image: "🛕" },
  { id: "t7", name: "Shri Adinath Derasar", city: "Bengaluru", rating: 4.7, image: "🛕" },
  { id: "t8", name: "Shri Sankheshwar Parshwanath", city: "Patan", rating: 4.8, image: "🛕" },
];

export const CENTERS = [
  { id: "c1", name: "Mahavir Jain Vidyalaya", city: "Mumbai", programs: 12 },
  { id: "c2", name: "Jain International Trade Org", city: "Surat", programs: 8 },
  { id: "c3", name: "Veerayatan Center", city: "Rajgir", programs: 15 },
  { id: "c4", name: "Jain Center of Greater Boston", city: "Boston, USA", programs: 6 },
  { id: "c5", name: "Shrimad Rajchandra Mission", city: "Dharampur", programs: 22 },
  { id: "c6", name: "JITO Mumbai Chapter", city: "Mumbai", programs: 9 },
];

export const MONKS = [
  { id: "m1", name: "Acharya Vijay Ratnasundar Suri", currentCity: "Palitana", nextCity: "Bhavnagar", followers: 12450 },
  { id: "m2", name: "Sadhviji Shree Hetashree", currentCity: "Mumbai", nextCity: "Pune", followers: 8920 },
  { id: "m3", name: "Acharya Yashovijay Suri", currentCity: "Ahmedabad", nextCity: "Patan", followers: 15600 },
  { id: "m4", name: "Muni Shree Pranamyasagar", currentCity: "Surat", nextCity: "Vadodara", followers: 6320 },
  { id: "m5", name: "Sadhviji Shree Charanyasha", currentCity: "Indore", nextCity: "Ujjain", followers: 4180 },
];

export const VIHAAR_TIMELINE = [
  { city: "Palitana", date: "Jan 15, 2026", note: "Currently here" },
  { city: "Sihor", date: "Jan 5, 2026", note: "5-day stay" },
  { city: "Bhavnagar", date: "Dec 22, 2025", note: "Pravachan series" },
  { city: "Songadh", date: "Dec 10, 2025", note: "" },
  { city: "Talaja", date: "Nov 28, 2025", note: "" },
];

export const EVENTS = [
  { id: "e1", title: "Mahavir Jayanti Celebration", date: "Apr 10, 2026", venue: "Godiji Derasar, Mumbai", type: "free", organizer: "Mumbai Jain Sangh" },
  { id: "e2", title: "Paryushan Pravachan Series", date: "Aug 30 - Sep 7, 2026", venue: "Walkeshwar Mandir", type: "free", organizer: "Shwetambar Sangh" },
  { id: "e3", title: "Annual Charity Gala 2026", date: "Feb 14, 2026", venue: "Grand Hyatt, Mumbai", type: "paid", price: 2500, organizer: "JITO Mumbai" },
  { id: "e4", title: "Jain Youth Conference", date: "Mar 21, 2026", venue: "NESCO, Mumbai", type: "paid", price: 999, organizer: "Young Jains" },
  { id: "e5", title: "Snatra Pooja Mahotsav", date: "Feb 5, 2026", venue: "Dadawadi, Ahmedabad", type: "free", organizer: "Ahmedabad Sangh" },
  { id: "e6", title: "Navkar Mantra Jaap", date: "Jan 26, 2026", venue: "Online + Multiple Cities", type: "free", organizer: "Global Jain Network" },
];

export const TOURS = [
  { id: "tr1", name: "Shatrunjay Tirth Yatra", dates: "Mar 1-7, 2026", price: 18500, seatsLeft: 12, itinerary: ["Mumbai → Palitana", "Adishwar Darshan", "108 Jinalaya Tour", "Talaja Visit", "Return"] },
  { id: "tr2", name: "Sammed Shikhar Yatra", dates: "Apr 15-25, 2026", price: 32000, seatsLeft: 8, itinerary: ["Mumbai → Kolkata", "Madhuban Stay", "Parasnath Climb", "Pawapuri", "Rajgir", "Return"] },
  { id: "tr3", name: "Rajasthan Tirth Tour", dates: "May 5-12, 2026", price: 24500, seatsLeft: 22, itinerary: ["Mumbai → Udaipur", "Ranakpur", "Mt. Abu (Dilwara)", "Nakoda", "Jodhpur", "Return"] },
  { id: "tr4", name: "South India Jain Heritage", dates: "Jun 10-18, 2026", price: 28000, seatsLeft: 18, itinerary: ["Shravanabelagola", "Moodbidri", "Karkala", "Halebidu", "Return"] },
];

export const ANNOUNCEMENTS = [
  { id: "a1", title: "Paryushan Mahaparva Schedule Released", date: "Jan 10, 2026", snippet: "8-day spiritual program at all affiliated temples. Click for full schedule and timings." },
  { id: "a2", title: "New Dharmshala Booking System Live", date: "Jan 8, 2026", snippet: "Book rooms at 40+ partner dharmshalas across India directly from the app." },
  { id: "a3", title: "Charity Drive — Help Earthquake Victims", date: "Jan 5, 2026", snippet: "Community fundraiser launched. Every contribution counts." },
  { id: "a4", title: "Annual General Meeting Notice", date: "Jan 2, 2026", snippet: "AGM scheduled for Feb 15. All members invited." },
  { id: "a5", title: "Pathshala New Batch Admissions Open", date: "Dec 28, 2025", snippet: "Online and offline classes. Register before Jan 31." },
];

export const NOTICES = [
  { id: "n1", ref: "JCP/2026/001", subject: "Revised Donation Tax Exemption Guidelines", date: "Jan 12, 2026" },
  { id: "n2", ref: "JCP/2026/002", subject: "Temple Renovation Project — Phase 2", date: "Jan 9, 2026" },
  { id: "n3", ref: "JCP/2026/003", subject: "Volunteer Code of Conduct Update", date: "Jan 6, 2026" },
  { id: "n4", ref: "JCP/2026/004", subject: "Membership Renewal Reminder", date: "Dec 30, 2025" },
];

export const FEED_POSTS = [
  { id: "p1", author: "Priya Mehta", time: "2h ago", text: "Beautiful Snatra Pooja at Godiji today. So peaceful 🙏", image: true, likes: 124, comments: 18 },
  { id: "p2", author: "Vimal Jain", time: "5h ago", text: "Volunteer slots open for the Annapurna seva this Sunday. DM me!", image: false, likes: 48, comments: 12 },
  { id: "p3", author: "Acharya Vijay Ratnasundar Suri", time: "1d ago", text: "Compassion is the highest dharma. Reflect on this today.", image: false, likes: 892, comments: 64 },
  { id: "p4", author: "Anjali Doshi", time: "1d ago", text: "Just completed my 15th day of Varshitap. Feeling blessed.", image: true, likes: 312, comments: 47 },
  { id: "p5", author: "JITO Mumbai", time: "2d ago", text: "Registration open for Charity Gala 2026. Limited seats.", image: true, likes: 189, comments: 22 },
  { id: "p6", author: "Rakesh Sanghvi", time: "3d ago", text: "Pathshala kids did an amazing skit on 24 Tirthankaras today.", image: true, likes: 256, comments: 31 },
];

export const POLLS = [
  { id: "pl1", question: "Which Paryushan venue do you prefer this year?", options: [{ label: "Godiji Derasar", votes: 342 }, { label: "Walkeshwar", votes: 215 }, { label: "Online", votes: 188 }] },
  { id: "pl2", question: "Should we add Marathi as a language option?", options: [{ label: "Yes", votes: 612 }, { label: "No", votes: 89 }] },
];

export const OFFERS = [
  { id: "o1", partner: "Haldiram's", title: "20% off on Jain Thali", validity: "Mar 31, 2026", discount: "20%" },
  { id: "o2", partner: "Tanishq Jewellers", title: "5% off + free gold testing", validity: "Jun 30, 2026", discount: "5%" },
  { id: "o3", partner: "MakeMyTrip", title: "₹1500 off on Yatra packages", validity: "Dec 31, 2026", discount: "₹1500" },
  { id: "o4", partner: "Apollo Pharmacy", title: "15% off medicines for seniors", validity: "Apr 30, 2026", discount: "15%" },
  { id: "o5", partner: "Bisleri", title: "Free water cans for events", validity: "Ongoing", discount: "FREE" },
  { id: "o6", partner: "Croma", title: "Member-only EMI offers", validity: "Mar 15, 2026", discount: "EMI" },
];

export const DHARMSHALAS = [
  { id: "d1", name: "Palitana Tirth Dharmshala", city: "Palitana", rooms: ["AC Deluxe", "Non-AC", "Family Suite"], status: "Available" },
  { id: "d2", name: "Sammed Shikhar Bhavan", city: "Madhuban", rooms: ["AC", "Non-AC"], status: "Limited" },
  { id: "d3", name: "Shankheshwar Yatrik Bhavan", city: "Shankheshwar", rooms: ["AC Deluxe", "Dormitory"], status: "Available" },
  { id: "d4", name: "Mt. Abu Dilwara Dharmshala", city: "Mt. Abu", rooms: ["AC", "Family"], status: "Full" },
  { id: "d5", name: "Ranakpur Yatri Niwas", city: "Ranakpur", rooms: ["AC Deluxe", "Non-AC", "Dormitory"], status: "Available" },
];

export const DONATIONS_HISTORY = [
  { id: "dn1", temple: "Godiji Derasar", amount: 5001, date: "Jan 10, 2026", receipt: "RCP-89234" },
  { id: "dn2", temple: "Earthquake Relief", amount: 11000, date: "Jan 3, 2026", receipt: "RCP-89102" },
  { id: "dn3", temple: "Dadawadi Mandir", amount: 1001, date: "Dec 28, 2025", receipt: "RCP-88891" },
  { id: "dn4", temple: "Veerayatan Center", amount: 2501, date: "Dec 15, 2025", receipt: "RCP-88654" },
  { id: "dn5", temple: "Pathshala Fund", amount: 501, date: "Dec 1, 2025", receipt: "RCP-88312" },
];

export const PASSES = [
  { id: "ps1", type: "Event Pass", title: "Mahavir Jayanti 2026", validity: "Apr 10, 2026", status: "Valid" },
  { id: "ps2", type: "Ticket", title: "Charity Gala — VIP", validity: "Feb 14, 2026", status: "Valid" },
  { id: "ps3", type: "Bhojanshala", title: "Godiji Lunch Pass", validity: "Jan 31, 2026", status: "Valid" },
  { id: "ps4", type: "Booking", title: "Palitana Dharmshala", validity: "Mar 1-7, 2026", status: "Valid" },
  { id: "ps5", type: "Event Pass", title: "Navkar Mantra Jaap", validity: "Jan 26, 2026", status: "Used" },
  { id: "ps6", type: "Ticket", title: "Youth Conference 2025", validity: "Nov 20, 2025", status: "Expired" },
];

export const VOLUNTEER_OPPS = [
  { id: "v1", title: "Annapurna Seva — Sunday Bhojan", date: "Every Sunday", location: "Godiji Derasar", spotsLeft: 5 },
  { id: "v2", title: "Paryushan Event Coordination", date: "Aug 30 - Sep 7", location: "Multiple venues", spotsLeft: 12 },
  { id: "v3", title: "Pathshala Teaching Assistant", date: "Weekends", location: "Mumbai", spotsLeft: 3 },
  { id: "v4", title: "Earthquake Relief Distribution", date: "Jan 20-25", location: "Field deployment", spotsLeft: 8 },
];

export const NEARBY = [
  { type: "Temple", name: "Walkeshwar Jain Mandir", distance: "0.8 km" },
  { type: "Temple", name: "Godiji Parshwanath", distance: "1.2 km" },
  { type: "Dharmshala", name: "Malabar Hill Yatri Bhavan", distance: "1.5 km" },
  { type: "Bhojanshala", name: "Jain Bhojanalay", distance: "0.6 km" },
  { type: "Medical", name: "Jain Charitable Hospital", distance: "2.1 km" },
  { type: "Dharmshala", name: "Chowpatty Yatri Niwas", distance: "2.4 km" },
];

export const FAQS = [
  { q: "How do I book a Dharmshala?", a: "Navigate to Bookings → Dharmshala, select your dates and room type, and submit your request. You'll receive a confirmation within 24 hours." },
  { q: "Are donations tax-exempt?", a: "Yes, all donations to registered temples are 80G tax-exempt. You can download your receipt from Donation History." },
  { q: "How do I update my Vihaar follow list?", a: "Open any monk's profile and toggle 'Follow this Monk'. You'll receive location updates." },
  { q: "Can I change my linked temple?", a: "Yes, go to Profile → Linked Temple and select a new one from the dropdown." },
  { q: "How do I cancel an event RSVP?", a: "Go to My Passes, find the pass, and tap 'Cancel RSVP' on the pass detail." },
  { q: "Is the app available in regional languages?", a: "Yes, English, Hindi, and Gujarati are currently supported. More languages coming soon." },
];

export const NOTIFICATIONS = [
  { id: "nt1", title: "Booking Confirmed", body: "Your Palitana Dharmshala booking is approved.", time: "2h ago", read: false },
  { id: "nt2", title: "Event Reminder", body: "Mahavir Jayanti Celebration is in 5 days.", time: "5h ago", read: false },
  { id: "nt3", title: "Donation Receipt", body: "Receipt RCP-89234 is ready to download.", time: "1d ago", read: true },
  { id: "nt4", title: "New Vihaar Update", body: "Acharya Vijay Ratnasundar Suri is now in Palitana.", time: "2d ago", read: true },
  { id: "nt5", title: "Poll Result", body: "Paryushan venue poll closes in 3 days.", time: "3d ago", read: true },
];

// ===== ADMIN MOCK DATA =====

export const ADMIN_KPIS = [
  { label: "Total Members", value: "2,847", trend: "+12.4%", up: true },
  { label: "Active Events", value: "12", trend: "+3", up: true },
  { label: "This Month's Donations", value: "₹1,84,500", trend: "+22%", up: true },
  { label: "Pending Bookings", value: "23", trend: "-8%", up: false },
  { label: "Volunteer Apps", value: "47", trend: "+15", up: true },
  { label: "Support Tickets", value: "9", trend: "-3", up: false },
];

export const MEMBER_GROWTH = [
  { month: "Aug", members: 2210 },
  { month: "Sep", members: 2340 },
  { month: "Oct", members: 2480 },
  { month: "Nov", members: 2610 },
  { month: "Dec", members: 2742 },
  { month: "Jan", members: 2847 },
];

export const DONATION_TRENDS = [
  { month: "Aug", amount: 124000 },
  { month: "Sep", amount: 168000 },
  { month: "Oct", amount: 142000 },
  { month: "Nov", amount: 198000 },
  { month: "Dec", amount: 215000 },
  { month: "Jan", amount: 184500 },
];

export const EVENT_ATTENDANCE = [
  { name: "Free Events", value: 1820 },
  { name: "Paid Events", value: 640 },
  { name: "Yatra/Tours", value: 312 },
];

export const BOOKING_STATUS = [
  { name: "Approved", value: 142 },
  { name: "Pending", value: 23 },
  { name: "Rejected", value: 8 },
];

export const ADMIN_MEMBERS = [
  { id: "JCP-002847", name: "Raj Shah", mobile: "98200 12345", city: "Mumbai", community: "Shwetambar", status: "Active", joined: "Mar 2022" },
  { id: "JCP-002848", name: "Priya Mehta", mobile: "98330 22456", city: "Mumbai", community: "Shwetambar", status: "Active", joined: "Apr 2022" },
  { id: "JCP-002849", name: "Vimal Jain", mobile: "99202 33567", city: "Surat", community: "Digambar", status: "Active", joined: "May 2022" },
  { id: "JCP-002850", name: "Anjali Doshi", mobile: "98212 44678", city: "Ahmedabad", community: "Shwetambar", status: "Active", joined: "Jun 2022" },
  { id: "JCP-002851", name: "Rakesh Sanghvi", mobile: "98334 55789", city: "Pune", community: "Sthanakvasi", status: "Active", joined: "Jul 2022" },
  { id: "JCP-002852", name: "Nirav Kothari", mobile: "98455 66890", city: "Mumbai", community: "Shwetambar", status: "Inactive", joined: "Aug 2022" },
  { id: "JCP-002853", name: "Sneha Bafna", mobile: "98566 77901", city: "Bengaluru", community: "Digambar", status: "Active", joined: "Sep 2022" },
  { id: "JCP-002854", name: "Manish Lodha", mobile: "98677 88012", city: "Indore", community: "Shwetambar", status: "Active", joined: "Oct 2022" },
  { id: "JCP-002855", name: "Kavita Jhaveri", mobile: "98788 99123", city: "Mumbai", community: "Terapanth", status: "Active", joined: "Nov 2022" },
  { id: "JCP-002856", name: "Amit Mehta", mobile: "98899 10234", city: "Surat", community: "Shwetambar", status: "Active", joined: "Dec 2022" },
  { id: "JCP-002857", name: "Rekha Shah", mobile: "98910 21345", city: "Ahmedabad", community: "Shwetambar", status: "Active", joined: "Jan 2023" },
  { id: "JCP-002858", name: "Sanjay Bothra", mobile: "99021 32456", city: "Jaipur", community: "Terapanth", status: "Active", joined: "Feb 2023" },
  { id: "JCP-002859", name: "Pooja Salecha", mobile: "99132 43567", city: "Kolkata", community: "Shwetambar", status: "Active", joined: "Mar 2023" },
  { id: "JCP-002860", name: "Harsh Jain", mobile: "99243 54678", city: "Delhi", community: "Digambar", status: "Active", joined: "Apr 2023" },
  { id: "JCP-002861", name: "Tanvi Parekh", mobile: "99354 65789", city: "Mumbai", community: "Shwetambar", status: "Active", joined: "May 2023" },
  { id: "JCP-002862", name: "Bhavin Gandhi", mobile: "99465 76890", city: "Vadodara", community: "Shwetambar", status: "Active", joined: "Jun 2023" },
  { id: "JCP-002863", name: "Sonali Chopda", mobile: "99576 87901", city: "Nashik", community: "Sthanakvasi", status: "Active", joined: "Jul 2023" },
  { id: "JCP-002864", name: "Devansh Jain", mobile: "99687 98012", city: "Hyderabad", community: "Digambar", status: "Inactive", joined: "Aug 2023" },
];

export const ADMIN_BOOKINGS = [
  { id: "BK-1024", guest: "Priya Mehta", dates: "Mar 1-3", room: "AC Deluxe", status: "Pending" },
  { id: "BK-1025", guest: "Vimal Jain", dates: "Mar 5-7", room: "Family Suite", status: "Pending" },
  { id: "BK-1026", guest: "Rakesh Sanghvi", dates: "Feb 18-20", room: "Non-AC", status: "Approved" },
  { id: "BK-1027", guest: "Anjali Doshi", dates: "Mar 12-14", room: "AC", status: "Pending" },
  { id: "BK-1028", guest: "Manish Lodha", dates: "Feb 25-28", room: "Dormitory", status: "Approved" },
];

export const ADMIN_DONATIONS = [
  { donor: "Raj Shah", temple: "Godiji Derasar", amount: 5001, date: "Jan 10", status: "Success" },
  { donor: "Priya Mehta", temple: "Earthquake Relief", amount: 25000, date: "Jan 9", status: "Success" },
  { donor: "Vimal Jain", temple: "Dadawadi", amount: 11001, date: "Jan 8", status: "Success" },
  { donor: "Anonymous", temple: "Pathshala Fund", amount: 51000, date: "Jan 7", status: "Success" },
  { donor: "Anjali Doshi", temple: "Veerayatan", amount: 2501, date: "Jan 6", status: "Success" },
  { donor: "Rakesh Sanghvi", temple: "Godiji Derasar", amount: 1001, date: "Jan 5", status: "Success" },
  { donor: "Nirav Kothari", temple: "Earthquake Relief", amount: 10000, date: "Jan 4", status: "Pending" },
];

export const ADMIN_CAMPAIGNS = [
  { name: "Earthquake Relief Fund", raised: 1840000, target: 5000000 },
  { name: "Pathshala Building Renovation", raised: 720000, target: 1500000 },
  { name: "Annapurna Seva (Annual)", raised: 290000, target: 500000 },
];

export const ADMIN_TICKETS = [
  { id: "TKT-001", subject: "Cannot book Dharmshala", member: "Priya Mehta", priority: "High", status: "Open" },
  { id: "TKT-002", subject: "Donation receipt not received", member: "Vimal Jain", priority: "Medium", status: "In Progress" },
  { id: "TKT-003", subject: "Event RSVP cancellation", member: "Anjali Doshi", priority: "Low", status: "Resolved" },
  { id: "TKT-004", subject: "Profile photo upload failing", member: "Rakesh Sanghvi", priority: "Low", status: "Open" },
  { id: "TKT-005", subject: "Wrong tithi date showing", member: "Manish Lodha", priority: "Medium", status: "In Progress" },
];

export const ADMIN_ROLES = [
  { role: "Super Admin", modules: { Members: true, Bookings: true, Events: true, Donations: true, Content: true, Reports: true, Settings: true } },
  { role: "Zone Admin", modules: { Members: true, Bookings: true, Events: true, Donations: true, Content: false, Reports: true, Settings: false } },
  { role: "Temple Admin", modules: { Members: false, Bookings: true, Events: true, Donations: true, Content: false, Reports: false, Settings: false } },
  { role: "Content Admin", modules: { Members: false, Bookings: false, Events: false, Donations: false, Content: true, Reports: false, Settings: false } },
  { role: "Support Admin", modules: { Members: true, Bookings: false, Events: false, Donations: false, Content: false, Reports: false, Settings: false } },
];

export const QUICK_ACTIONS = [
  { key: "donate", label: "Donate", icon: "HandCoins" },
  { key: "book", label: "Book Room", icon: "BedDouble" },
  { key: "temple", label: "Find Temple", icon: "Landmark" },
  { key: "passes", label: "My Passes", icon: "QrCode" },
  { key: "volunteer", label: "Volunteer", icon: "HeartHandshake" },
  { key: "support", label: "Support", icon: "LifeBuoy" },
];
