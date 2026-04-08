// src/data/opportunities.ts

export type Goal = "study" | "internship";

export interface Opportunity {
  id: number;
  title: string;
  country: string;
  deadline: string;
  tags: string[];
  field: string;
  ielts_required: boolean;
  goal: Goal;
  description: string;
  simplified: string[];
  steps: string[];
  official: string;
}

export const FLAGS: Record<string, string> = {
  Germany: "🇩🇪",
  France: "🇫🇷",
  Canada: "🇨🇦",
  USA: "🇺🇸",
  UK: "🇬🇧",
  Netherlands: "🇳🇱",
  Sweden: "🇸🇪",
  UAE: "🇦🇪",
  "South Korea": "🇰🇷",
  Turkey: "🇹🇷",
  Japan: "🇯🇵",
  Morocco: "🇲🇦",
  Spain: "🇪🇸",
  Italy: "🇮🇹",
  Belgium: "🇧🇪",
};

export const FIELDS = ["All Fields", "Computer Science", "Engineering", "Business"];
export const COUNTRIES = [
  "All Countries",
  "Germany",
  "France",
  "Canada",
  "USA",
  "Netherlands",
  "Turkey",
  "UAE",
  "Morocco",
];

export const OPPORTUNITIES: Opportunity[] = [
  {
    id: 1,
    title: "DAAD Scholarship — Master's in Germany",
    country: "Germany",
    deadline: "Nov 15, 2025",
    tags: ["Scholarship", "Fully Funded", "Masters"],
    field: "Computer Science",
    ielts_required: false,
    goal: "study",
    description:
      "The DAAD (German Academic Exchange Service) offers fully funded scholarships for Algerian students pursuing a Masters in Germany. Covers tuition, living allowance, and health insurance.",
    simplified: [
      "No IELTS required — German language basics preferred but not mandatory for English programs.",
      "You need: motivation letter, CV, 2 reference letters, transcripts.",
      "Competition level: Medium — Algerians are well-represented.",
    ],
    steps: [
      "Prepare your academic CV (2 pages max).",
      "Write a motivation letter explaining your research interest.",
      "Ask 2 professors for reference letters.",
      "Gather official transcripts and translate if needed.",
      "Create a DAAD portal account and submit your application.",
    ],
    official: "https://www.daad.de/en/",
  },
  {
    id: 2,
    title: "Mitacs Globalink Research Internship",
    country: "Canada",
    deadline: "Sep 22, 2025",
    tags: ["Internship", "Research", "Summer"],
    field: "Computer Science",
    ielts_required: true,
    goal: "internship",
    description:
      "12-week research internship at top Canadian universities. Fully funded. Ideal for 3L or Master students in STEM fields.",
    simplified: [
      "IELTS 6.5+ required — or TOEFL equivalent.",
      "You need: CV, research proposal, academic transcripts.",
      "Competition level: High — top 3L students preferred.",
    ],
    steps: [
      "Check your IELTS score (6.5+ needed).",
      "Browse available research projects on the Mitacs website.",
      "Prepare a tailored CV highlighting research experience.",
      "Write a brief research statement (1 page).",
      "Submit through the Mitacs portal before the deadline.",
    ],
    official: "https://www.mitacs.ca/globalink",
  },
  {
    id: 3,
    title: "Eiffel Excellence Scholarship — France",
    country: "France",
    deadline: "Jan 9, 2026",
    tags: ["Scholarship", "Masters", "PhD"],
    field: "Engineering",
    ielts_required: false,
    goal: "study",
    description:
      "Prestigious French government scholarship for Master and PhD students. Covers living costs, travel, and cultural activities.",
    simplified: [
      "No IELTS required if program is taught in French.",
      "Covers: monthly stipend €1,181, travel, housing allowance.",
      "Competition level: Medium — French language is an advantage.",
    ],
    steps: [
      "Identify target French institutions that participate in the Eiffel program.",
      "Contact the international office of your chosen institution.",
      "Prepare your academic file: CV, transcripts, motivation letter.",
      "Your institution submits the nomination on your behalf.",
      "Track your application through Campus France Algeria.",
    ],
    official: "https://www.campusfrance.org/fr/bourse-eiffel",
  },
  {
    id: 4,
    title: "Google Summer of Code",
    country: "USA",
    deadline: "Apr 2, 2026",
    tags: ["Remote", "Stipend", "Open Source"],
    field: "Computer Science",
    ielts_required: false,
    goal: "internship",
    description:
      "Paid remote internship working on open source software. Stipend ranges from $1,500 to $6,600 depending on your country. 100% remote.",
    simplified: [
      "No IELTS — no travel required, fully remote.",
      "You need: good programming skills and an open source proposal.",
      "Competition level: High — global competition but Algerians have participated.",
    ],
    steps: [
      "Browse GSoC organizations and pick one that matches your skills.",
      "Contribute small PRs to the organization's repo to get noticed.",
      "Write a detailed project proposal using the official template.",
      "Submit your proposal on the GSoC website before the deadline.",
      "Communicate actively with mentors during selection.",
    ],
    official: "https://summerofcode.withgoogle.com/",
  },
  {
    id: 5,
    title: "Erasmus+ Exchange Program",
    country: "Netherlands",
    deadline: "Mar 1, 2026",
    tags: ["Exchange", "Semester", "Funded"],
    field: "Computer Science",
    ielts_required: true,
    goal: "study",
    description:
      "EU-funded student exchange program for one or two semesters at a European university. Algerian universities with bilateral agreements can nominate students.",
    simplified: [
      "IELTS 6.0+ required for most participating universities.",
      "Includes: monthly grant €500–800, waived tuition.",
      "Competition level: Low-Medium — under-applied by Algerian students.",
    ],
    steps: [
      "Check if your Algerian university has an Erasmus+ partnership agreement.",
      "Meet with your international office coordinator.",
      "Obtain IELTS score (or B2 English certificate from your university).",
      "Submit application through your home university.",
      "Receive nomination and apply to the host university directly.",
    ],
    official: "https://erasmus-plus.ec.europa.eu/",
  },
  {
    id: 6,
    title: "OCP Group Engineering Internship",
    country: "Morocco",
    deadline: "May 30, 2026",
    tags: ["Internship", "Engineering", "Regional"],
    field: "Engineering",
    ielts_required: false,
    goal: "internship",
    description:
      "6-week summer internship at one of Africa's largest industrial groups. Gain hands-on engineering experience with a global mining and chemicals leader.",
    simplified: [
      "No IELTS needed — French is the working language.",
      "You need: CV, cover letter, proof of enrollment.",
      "Competition level: Low — regional opportunity, few Algerian applicants.",
    ],
    steps: [
      "Prepare your engineering CV in French.",
      "Write a cover letter explaining your engineering focus.",
      "Apply through the OCP Foundation internship portal.",
      "If shortlisted, prepare for a technical phone interview.",
      "Accept the offer and arrange transport to Morocco.",
    ],
    official: "https://www.ocpgroup.ma/",
  },
  {
    id: 7,
    title: "Turkish Government Scholarship (Türkiye Bursları)",
    country: "Turkey",
    deadline: "Feb 20, 2026",
    tags: ["Scholarship", "Bachelors", "Masters", "PhD"],
    field: "Computer Science",
    ielts_required: false,
    goal: "study",
    description:
      "Fully funded Turkish Government scholarship open to international students including Algerians. Includes Turkish language training before program start.",
    simplified: [
      "No IELTS required — Turkish language course included in the grant.",
      "Covers: full tuition, accommodation, monthly stipend, health insurance.",
      "Competition level: Low-Medium — very Algeria-friendly program.",
    ],
    steps: [
      "Create an account on the Türkiye Bursları scholarship portal.",
      "Select up to 12 universities and programs.",
      "Upload: transcripts, diploma, passport, photo, motivation letter.",
      "Complete the online application form carefully.",
      "If shortlisted, prepare for a virtual or in-person interview.",
    ],
    official: "https://www.turkiyeburslari.gov.tr/",
  },
  {
    id: 8,
    title: "Meta University Internship Program",
    country: "USA",
    deadline: "Oct 1, 2025",
    tags: ["Internship", "Remote", "Big Tech"],
    field: "Computer Science",
    ielts_required: false,
    goal: "internship",
    description:
      "Competitive internship at Meta for university students. Software engineering focused. Paid stipend, mentorship, and potential return offer.",
    simplified: [
      "No IELTS — remote-friendly for international students.",
      "Requires: strong coding skills (LeetCode Medium level) and prior project experience.",
      "Competition level: Very High — global applicant pool.",
    ],
    steps: [
      "Prepare for coding interviews using LeetCode (focus on arrays, trees, DP).",
      "Build and polish 2–3 impactful GitHub projects.",
      "Apply through Meta Careers website with your CV and GitHub link.",
      "Complete online coding assessment within 5 days of invite.",
      "Attend 2–3 technical interviews (virtual).",
    ],
    official: "https://www.metacareers.com/careerprograms/pathways/university",
  },
  {
    id: 9,
    title: "Heinrich Böll Foundation Scholarship",
    country: "Germany",
    deadline: "Mar 1, 2026",
    tags: ["Scholarship", "Masters", "Social Sciences"],
    field: "Business",
    ielts_required: false,
    goal: "study",
    description:
      "For students committed to democracy and social justice. Covers Masters and PhD programs in Germany. Funding is among the most generous available.",
    simplified: [
      "No IELTS — German B2 required for German programs; English programs accepted.",
      "Stipend: €850/month + additional allowances.",
      "Competition level: Medium — values-based selection (civic engagement matters).",
    ],
    steps: [
      "Read the foundation's values and ensure they align with your profile.",
      "Contact an active member of the Heinrich Böll network as a reference.",
      "Prepare your academic CV and a detailed motivation letter.",
      "Submit your application with academic records and project portfolio.",
      "Attend a selection seminar if shortlisted.",
    ],
    official: "https://www.boell.de/en/foundation/scholarships",
  },
  {
    id: 10,
    title: "Khalifa Fund Startup Grant",
    country: "UAE",
    deadline: "Rolling",
    tags: ["Grant", "Startup", "Entrepreneurship"],
    field: "Business",
    ielts_required: false,
    goal: "internship",
    description:
      "Funding and support for entrepreneurs in the MENA region. Khalifa Fund offers grants, mentorship, and incubation for early-stage startups.",
    simplified: [
      "No IELTS — business plan in English or Arabic accepted.",
      "You need: a solid business plan and pitch deck.",
      "Competition level: Medium — MENA focus, Algerians eligible.",
    ],
    steps: [
      "Develop a clear business plan (use the Business Model Canvas).",
      "Create a professional pitch deck (10–12 slides).",
      "Register on the Khalifa Fund online portal.",
      "Submit your business plan and required documents.",
      "Prepare for a pitch presentation to the evaluation panel.",
    ],
    official: "https://www.khalifafund.ae/",
  },
  {
    id: 11,
    title: "UNESCO-IHP Young Water Professionals",
    country: "France",
    deadline: "Jun 15, 2026",
    tags: ["Fellowship", "Environment", "Masters"],
    field: "Engineering",
    ielts_required: true,
    goal: "study",
    description:
      "UNESCO fellowship for young professionals in water sciences. Ideal for engineering students with an interest in environment and sustainability.",
    simplified: [
      "IELTS 6.0+ required (or TOEFL 79+).",
      "Covers: 6-month fellowship, travel, and allowance.",
      "Competition level: Low — niche program, minimal Algerian competition.",
    ],
    steps: [
      "Verify you have an IELTS score of 6.0 or TOEFL 79 equivalent.",
      "Identify a supervisor at a UNESCO partner institution.",
      "Write a research proposal in water resource management.",
      "Submit application with academic transcripts and CV.",
      "Provide 2 reference letters from academics.",
    ],
    official: "https://www.ihp.int/",
  },
  {
    id: 12,
    title: "Remote OK — Remote Jobs for Tech Professionals",
    country: "USA",
    deadline: "Rolling",
    tags: ["Remote Work", "Job", "Tech"],
    field: "Computer Science",
    ielts_required: false,
    goal: "internship",
    description:
      "Curated remote job board with hundreds of remote tech positions. Many companies explicitly welcome international applicants including from Algeria.",
    simplified: [
      "No IELTS — English proficiency assessed through portfolio and interviews.",
      "Need: strong portfolio, GitHub, and professional CV.",
      "Competition level: Variable — depends on the specific role.",
    ],
    steps: [
      "Build and publish at least 3 strong portfolio projects on GitHub.",
      "Set up a professional LinkedIn profile.",
      "Browse Remote OK and filter by 'entry level' and your skills.",
      "Tailor your CV and cover letter for each application.",
      "Prepare for async technical assessments and video interviews.",
    ],
    official: "https://remoteok.com/",
  },
];
