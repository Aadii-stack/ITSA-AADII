/**
 * Meta Summit Flagship Configuration
 *
 * NOTE FOR EDITORS:
 * - Update dates, venue, registration URL, and speaker details here when officially approved.
 * - If registrationUrl is null, the page cleanly renders an honest "Stay Notified" interest form.
 */

export const metaSummitConfig = {
  title: "Meta Summit",
  edition: "Annual Flagship Gathering",
  headline: "THE CIRCUIT OF STUDENT INNOVATION.",
  subtitle:
    "ITSA's signature annual technology convention uniting student engineers, hands-on masterclasses, hack challenges, and forward-looking discussions at SLRTCE.",
  status: "Announcements in Progress",
  isDateConfirmed: false,
  dateDisplay: "Dates TBA for Academic Cycle",
  venue: "Auditorium & Labs, SLRTCE Campus, Mira Road",
  registrationOpen: false,
  registrationUrl: null, // Set to official registration form link when published
  posterImage: null, // Set to "/assets/meta-summit-poster.jpg" when available
  overview: [
    "Meta Summit is the premier annual gathering hosted by the Information Technology Student Association (ITSA) at Shree L. R. Tiwari College of Engineering.",
    "Engineered as a vibrant convergence of student talent, faculty guidance, and industry-oriented exploration, Meta Summit brings together technical deep dives, live code demonstrations, competitive problem solving, and peer collaboration.",
    "Every edition is curated to push students beyond conventional textbook curricula into building real-world software, experimenting with modern architectures, and discovering their engineering identity."
  ],
  tracks: [
    {
      code: "TRK-01",
      title: "Intelligent Systems & Machine Learning",
      description: "Hands-on exposure to practical AI tooling, data modeling, neural architectures, and responsible implementation.",
      keywords: ["Computer Vision", "NLP", "Model Deployment", "Python Ecosystem"]
    },
    {
      code: "TRK-02",
      title: "Cloud Native & Modern Web Engineering",
      description: "Building production-grade web applications, containerized deployments, modern frontends, and API ecosystems.",
      keywords: ["React / Node", "Docker", "Cloud APIs", "Performance Engineering"]
    },
    {
      code: "TRK-03",
      title: "Cyber Resilience & Systems Programming",
      description: "Network fundamentals, ethical vulnerability analysis, secure coding practices, and distributed systems architecture.",
      keywords: ["Network Security", "Linux Systems", "DevSecOps", "Zero Trust"]
    },
    {
      code: "TRK-04",
      title: "Innovation Showcase & Sprint",
      description: "Departmental project exhibition, rapid prototype pitching, and peer-to-peer technical critiques.",
      keywords: ["Capstone Pitches", "Hardware-IoT", "Open Source", "Rapid Prototyping"]
    }
  ],
  scheduleNote: "The complete hour-by-hour itinerary, keynote speakers, and lab allocations will be published once approved by the departmental committee.",
  faqs: [
    {
      question: "What is Meta Summit and who organizes it?",
      answer: "Meta Summit is the flagship multi-track technical event conceptualized and managed by the Information Technology Student Association (ITSA) under the Department of Information Technology at SLRTCE."
    },
    {
      question: "Who is eligible to participate?",
      answer: "All students enrolled in Information Technology, Computer Science, and allied engineering disciplines at SLRTCE are encouraged to attend. Inter-college participation criteria are announced with each edition."
    },
    {
      question: "When will official registrations open?",
      answer: "Registration links and session ticketing are released alongside the final poster and event schedule. You can express interest below to receive notification immediately upon release."
    },
    {
      question: "Are certificates provided for attendees and winners?",
      answer: "Yes, verified attendees of workshops and winners of competitive tracks receive official credentials issued by ITSA and SLRTCE."
    }
  ]
};
