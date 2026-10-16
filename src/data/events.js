/**
 * Shared Events Data Source for ITSA Website.
 *
 * NOTE FOR EDITORS:
 * - When an upcoming event is confirmed by the committee, add an object to `upcomingEvents`
 *   and optionally reference it in `featuredEvent`.
 * - If `featuredEvent` is null, the homepage automatically displays the neutral invitation.
 * - If `upcomingEvents` is empty, the Events page displays an intentional, clean empty state.
 */

export const featuredEvent = null; // Set to event object when an official upcoming event is active

export const upcomingEvents = [
  /*
  Example structure when confirmed:
  {
    id: "upcoming-01",
    title: "Official Event Name",
    date: "TBA / Date",
    time: "Time",
    venue: "SLRTCE Seminar Hall / Lab",
    category: "Workshops",
    description: "Short official description.",
    poster: "/assets/sample-poster.jpg", // optional
    status: "Upcoming",
    registrationUrl: "https://forms.gle/...", // or null
  }
  */
];

export const pastEvents = [
  {
    id: "past-01",
    title: "Hands-on Git, GitHub & Open Source Workflows",
    date: "Academic Year Session",
    venue: "IT Department Labs, SLRTCE",
    category: "Workshops",
    description:
      "An interactive session for IT undergraduates covering version control fundamentals, collaborative pull-request workflows, and open-source contribution practices.",
    status: "Completed",
    highlights: ["Interactive CLI session", "Git branching strategies", "GitHub profile building"],
    categoryLabel: "Technical Workshop",
  },
  {
    id: "past-02",
    title: "CodeSprint: Departmental Algorithm Challenge",
    date: "Competitive Series",
    venue: "Online / Computer Lab",
    category: "Competitions",
    description:
      "A timed algorithmic problem-solving sprint designed to test data structures proficiency, time-complexity analysis, and clean coding practices among students.",
    status: "Completed",
    highlights: ["Data structures & algorithms", "Timed submission leaderboard", "Peer code walkthroughs"],
    categoryLabel: "Competitive Coding",
  },
  {
    id: "past-03",
    title: "Introduction to Cloud Computing & Containerization",
    date: "Tech Lecture & Demo",
    venue: "Auditorium / Hybrid",
    category: "Tech Talks",
    description:
      "An overview of modern cloud infrastructure, Docker containerization, and modern deployment pipelines for student project architectures.",
    status: "Completed",
    highlights: ["Docker basics", "Cloud architecture primer", "Deploying student web apps"],
    categoryLabel: "Tech Talk",
  },
  {
    id: "past-04",
    title: "Web Engineering Masterclass: Modern Frontend",
    date: "Skill Sprint",
    venue: "Lab 3, IT Dept",
    category: "Workshops",
    description:
      "A deep dive into component architecture, state management, and responsive interfaces for building production-ready student portfolios and capstone projects.",
    status: "Completed",
    highlights: ["Modern JavaScript", "Component design", "Responsive CSS principles"],
    categoryLabel: "Hands-on Lab",
  },
];

export const eventCategories = ["All", "Workshops", "Competitions", "Tech Talks"];
