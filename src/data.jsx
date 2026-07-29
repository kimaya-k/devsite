export const profile = {
  name: 'Kimaya Deshpande',
  location: 'Atlanta, GA',
  email: 'deshpank@purdue.edu',
  github: 'https://github.com/kimaya-k',
  linkedin: 'https://www.linkedin.com/in/kimaya-deshpande-026452253/',
  school: 'Purdue University',
  grad: 'May 2027',
};

export const stats = [
  { value: '2027', label: 'Grad Year — Purdue CS' },
  { value: '5', label: 'Internships & Research Roles' },
  { value: '2×', label: 'Hackathon Podium Finishes' },
];

export const heroPhrases = [
  'AI optimization.',
  'privacy.',
  'healthcare.',
  'education.',
  'production.',
  'scale.',
  'the edge cases.',
];

export const heroBio = 
    "Hi, I'm Kimaya, a CS undergrad at Purdue, currently working at Humana and CATME. I like to build impactful software, web applications, and AI systems that have a real impact on the community through healthcare and education. Off the clock I'm either watching F1 or eating cake. Dive into my world of developing, experimenting and exploring."

export const experience = [
  {
    role: 'Enterprise AI Software Intern',
    org: 'Humana',
    mark: { text: 'H', color: '#3f5138', logo: 'logos/humana.jpg' },
    date: 'May 2026 — Aug 2026',
    tags: ['LangGraph', 'DevOps', 'Multi-Hop'],
    points: [
      'Developed a multi-hop clinical AI pipeline using LangGraph agents to improve the accuracy and precision of acute-change evaluation by verifying home-visit patient notes against LLM outputs, tightening diagnostic reliability further downstream.',
    ],
  },
  {
    role: 'Software Developer',
    org: 'CATME',
    mark: { text: 'C', color: '#8a6b2f', logo: 'logos/catme.jpg' },
    date: 'Jan 2026 — Present',
    tags: ['Perl', 'SQL', 'Zendesk'],
    points: [
      'Maintained and enhanced the backend of Purdue\'s team formation and peer evaluation platform by resolving production issues, troubleshooting user issues in Zendesk, implementing new software features, and developing an audit-tracking system using Perl and SQL.',
    ],
  },
  {
    role: 'Research Assistant',
    org: 'Tech Justice Lab',
    mark: { text: 'TJ', color: '#3d4f6b', logo: 'logos/techjusticelab.jpg' },
    date: 'Nov 2025 — Present',
    tags: ['Privacy', 'LLMs', 'Automated Inference'],
    points: [
      'Researched under Prof. Hanshen Xiao and PhD candidate Y. Du. on automated profile-inference attacks by LLMs by extending multimodal agentic profiling frameworks and designing pipelines to evaluate privacy leakage and de-anonymization risks across real and synthetic datasets.',
    ],
  },
  {
    role: 'Software Intern',
    org: 'DataGenie',
    mark: { text: 'DG', color: '#4a4536', logo: 'logos/datagenie.jpg' },
    date: 'May 2025 — Aug 2025',
    tags: ['n8n', 'Encryption', 'Multi-Agent'],
    points: [
      'Developed multi-agent workflow in n8n that automated internal client qualification, and engineered custom encryption to enhance product security and data integrity.'
    ],
  },
  {
    role: 'Student Developer',
    org: 'Dow Chemical — Data Mine Corporate Partners',
    mark: { text: 'D', color: '#7a3b30', logo: 'logos/dow.jpg' },
    date: 'Aug 2025 — May 2026',
    tags: ['DSPy', 'FastAPI', 'Docker'],
    points: [
      'Built an AI report generation agent using LangGraph, DSPy, RAG, and vector embeddings to automate project reports with Quarto visualizations. Developed a FastAPI–DuckDB backend, containerized the application with Docker, and performed large-scale data analysis using SQL, Python, and Bash.',
    ],
  },
];

export const projects = [
  {
    name: 'A.C.T',
    tag: '2nd Place — Humana Hackathon',
    date: '2026',
    description:
      'A multi-agent system that automates insurance member support — handling inquiries, ROI authorization, and claim summarization to cut repeat calls and response delays.',
    stack: ['Google Cloud ADK', 'BigQuery', 'Tailwind CSS'],
    link: null,
  },
  {
    name: 'FlowFuel',
    tag: '2nd Place — InnovateHer Hackathon',
    date: '2025',
    description:
      'A full-stack health app pairing a nutrition guide with a cycle tracker, scraping Purdue Dining data and routing it through Groq AI for cycle-aware recommendations.',
    stack: ['React', 'Node.js', 'Groq AI', 'RapidAPI'],
    link: null,
  },
  {
    name: 'UNIX Shell Interpreter',
    tag: 'Systems Programming',
    date: '2026',
    description:
      'A custom shell built from scratch — pipes, I/O redirection, background processes, subshells, and wildcard globbing, with a hand-written line editor supporting history and tab completion.',
    stack: ['C++', 'Flex', 'Bison'],
    link: null,
  },
  {
    name: 'Dynamic Memory Allocator',
    tag: 'Systems Programming',
    date: '2026',
    description:
      'A malloc implementation using segregated free lists, boundary-tag coalescing, and block splitting, built on sbrk and pthread mutexes with runtime corruption detection.',
    stack: ['C', 'pthreads'],
    link: null,
  },
  {
    name: 'Car Image Classifier',
    tag: 'Harvard Extension School — CSCI-S14A',
    date: '2023 — 2024',
    description:
      'An image classifier built on Inception_v3, studying how epoch count and batch size trade off against accuracy and training time, deployed as a Dockerized Flask app on AWS EC2.',
    stack: ['Python', 'Flask', 'Docker', 'AWS EC2'],
    link: null,
  },
];

export const skills = [
  {
    label: 'Languages',
    items: ['C', 'C++', 'Python', 'Java', 'JavaScript', 'SQL', 'HTML/CSS', 'Bash', 'Perl', 'Assembly (LEGv8, x86-64)'],
  },
  {
    label: 'AI & Agents',
    items: ['LangGraph', 'n8n', 'Google ADK', 'RAG', 'Multi-Hop Pipelines', 'DSPy'],
  },
  {
    label: 'Backend & Data',
    items: ['FastAPI', 'Flask', 'Node.js', 'DuckDB', 'Databricks', 'Pandas', 'NumPy', 'Docker'],
  },
  {
    label: 'Tooling',
    items: ['Git', 'Azure DevOps', 'Postman', 'Zendesk'],
  },
];

export const involvement = [
  {
    role: 'Jandos Scholar & WISP Mentor',
    org: 'Women in Science Program, Purdue',
    date: 'Aug 2026 — Present',
    note: 'Awarded for academic achievement and community engagement; mentors STEM students on technical and professional development.',
  },
  {
    role: 'Project Mentor',
    org: 'Purdue LaunchPad',
    date: 'Aug 2025 — Dec 2025',
    note: 'Mentored a student building an AI-powered app for AIME math problems using LoRA and GSM8K, covering environment setup and full-stack review.',
  },
  {
    role: 'Representative',
    org: 'Purdue Science Student Council',
    date: 'Mar 2025 — Dec 2025',
    note: "Organized community outreach events including Science Sunday and card-making for retirement homes.",
  },
   {
    role: 'Project Mentor',
    org: 'LaunchPad',
    date: 'Mar 2025 — Dec 2025',
    note: "Mentoring a student in designing and developing an AI-powered web application for solving and explaining AIME math competition problems, leveraging Python, LoRA fine-tuning, and GSM8k datasets. Guiding end-to-end project development including model training, dataset curation, output evaluation, and performance optimization.",
  },
];

export const courses = [
  { name: 'Data Structures and Algorithms', note: 'Core CS coursework' },
  { name: 'Object Oriented Programming', note: 'Core CS coursework' },
  { name: 'Advanced C', note: 'Systems-level programming' },
  { name: 'Computer Architecture', note: 'Systems-level programming' },
  { name: 'Systems Programming', note: 'Operating systems, memory, concurrency' },
  { name: 'Artificial Intelligence', note: 'Core CS coursework' },
];

export const techStack = [
  'C', 'C++', 'Python', 'Java', 'JavaScript', 'SQL', 'Bash', 'Perl',
  'React', 'Node.js', 'FastAPI', 'Flask', 'LangGraph', 'n8n',
  'Docker', 'Git', 'Azure DevOps', 'DuckDB', 'Databricks', 'Pandas',
];
