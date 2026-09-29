// High-fidelity fallback data matching supabase/seed.sql

export const MOCK_FACULTY = [
  {
    id: 'f1',
    image_url: 'https://ui-avatars.com/api/?name=Aadesh+Karpe&background=E05A1B&color=fff&size=128&bold=true',
    name: 'Aadesh Karpe',
    slug: 'aadesh-karpe',
    designation: 'Co-Founder & Head Mentor',
    badge: 'Gram Mahasul Adhikari (Talathi)',
    subject: 'Exam Strategy · Answer Writing · PYQ Analysis',
    experience: '8+ years',
    description: 'Cleared the Talathi exam and serves as Gram Mahasul Adhikari. Leads exam strategy, answer writing workshops, and PYQ dissection sessions at Karmayogi Academy.',
    is_founder: true,
    is_published: true,
    display_order: 1,
  },
  {
    id: 'f2',
    image_url: 'https://ui-avatars.com/api/?name=Amol+Rajole&background=FEF3C7&color=1E3A8A&size=128&bold=true',
    name: 'Amol Rajole',
    slug: 'amol-rajole',
    designation: 'Co-Founder & Academic Director',
    badge: 'Co-Founder, Karmayogi Academy',
    subject: 'Curriculum Design · 52-Week Framework · Batch Operations',
    experience: '10+ years',
    description: 'Designed the 52-week preparation framework that has guided 1,300+ students. Oversees curriculum planning, study material development, and batch management.',
    is_founder: true,
    is_published: true,
    display_order: 2,
  },
  {
    id: 'f3',
    image_url:'',
    name: 'Mr. Sharad Patil',
    slug: 'sharad-patil',
    designation: 'Senior MPSC Mentor',
    badge: 'Serving Officer & MPSC Mentor',
    subject: 'Indian Polity & Constitution',
    experience: '6+ years',
    description: 'Selected officer with 6+ years of teaching experience. Simplifies complex constitutional articles and administrative laws for Prelims & Mains.',
    is_founder: false,
    is_published: true,
    display_order: 3,
  },
  {
    id: 'f4',
    image_url:'',
    name: 'Prof. Rajesh Deshmukh',
    slug: 'rajesh-deshmukh',
    designation: 'Senior MPSC Economist',
    badge: 'Senior MPSC Economist',
    subject: 'Indian & Maharashtra Economics',
    experience: '8+ years',
    description: 'Specialist in Union Budget, Economic Survey, and State Economy modules. Has mentored over 800+ successful aspirants.',
    is_founder: false,
    is_published: true,
    display_order: 4,
  },
  {
    id: 'f5',
    image_url: '',
    name: 'Dr. Sunita Kulkarni',
    slug: 'sunita-kulkarni',
    designation: 'Former State Service Officer',
    badge: 'Former State Service Officer',
    subject: 'Geography & Environmental Science',
    experience: '7+ years',
    description: 'Expert in Maharashtra & Indian Physical Geography, mapping techniques, and environmental ecology for MPSC Mains.',
    is_founder: false,
    is_published: true,
    display_order: 5,
  },
  {
    id: 'f6',
    image_url:'',
    name: 'Mr. Vikas More',
    slug: 'vikas-more',
    designation: 'PSI Qualifier & Law Specialist',
    badge: 'PSI Qualifier & Law Specialist',
    subject: 'State History, Law & Mental Ability',
    experience: '5+ years',
    description: 'Focuses on speed mathematics, mental ability, and Maharashtra Freedom Movement history for Combined B&C prelims.',
    is_founder: false,
    is_published: true,
    display_order: 6,
  },
];

export const MOCK_RESULT_STATISTICS = [
  { id: 's1', label: 'MAINS QUALIFIERS', value: '128+', description: 'Students who qualified MPSC Mains from Karmayogi Academy', display_order: 1 },
  { id: 's2', label: 'STUDENTS ENROLLED', value: '1,324+', description: 'Total students enrolled across all batches', display_order: 2 },
  { id: 's3', label: 'POST-HOLDER TEACHERS', value: '5', description: 'Faculty members who are serving government officers', display_order: 3 },
  { id: 's4', label: 'WEEKS PREPARATION SYSTEM', value: '52', description: 'Our proven 52-week structured preparation framework', display_order: 4 },
  { id: 's5', label: 'YEARS OF PROVEN RESULTS', value: '3+', description: 'Years of consistently delivering top results', display_order: 5 },
];

export const MOCK_RESULTS = [
  {
    id: 'r1',
    student_name: 'Mahesh Deshmukh',
    exam: 'MPSC Rajyaseva',
    post_secured: 'Naib Tahsildar (Class 2)',
    batch: 'Rajyaseva Batch 2023 (2024)',
    year: 2024,
    result_rank: 'State Rank 14',
    quote: "Karmayogi academy's personal mentorship helped me master descriptive answer writing.",
    is_featured: true,
    is_published: true,
  },
  {
    id: 'r2',
    student_name: 'Snehal Shinde',
    exam: 'Group B Combined',
    post_secured: 'Assistant Section Officer (ASO)',
    batch: 'Group B Batch 2023 (2024)',
    year: 2024,
    result_rank: 'Merit List',
    quote: 'The guidance on Maharashtra laws and PYQs gave me the exact competitive edge.',
    is_featured: true,
    is_published: true,
  },
  {
    id: 'r3',
    student_name: 'Kiran Patil',
    exam: 'PSI Special Exam',
    post_secured: 'Police Sub-Inspector (PSI)',
    batch: 'PSI Special Batch 2022 (2023)',
    year: 2023,
    result_rank: 'Top 20',
    quote: 'From prelims to physical test guidance, Karmayogi teachers stood by me till selection.',
    is_featured: true,
    is_published: true,
  },
  {
    id: 'r4',
    student_name: 'Pooja Jadhav',
    exam: 'Talathi Bharti',
    post_secured: 'Gram Mahasul Adhikari (Talathi)',
    batch: 'Talathi Fast-Track Batch (2024)',
    year: 2024,
    result_rank: '190+ Marks',
    quote: "Aadesh sir's speed techniques made math and grammar easy.",
    is_featured: true,
    is_published: true,
  },
  {
    id: 'r5',
    student_name: 'Amit Pawar',
    exam: 'Group B Combined',
    post_secured: 'State Tax Inspector (STI)',
    batch: 'Combined Group B 2023 (2024)',
    year: 2024,
    result_rank: 'Selected',
    quote: 'Regular OMR test series helped me eliminate negative marking errors.',
    is_featured: true,
    is_published: true,
  },
];

export const MOCK_RESOURCE_CATEGORIES = [
  { id: 'rc0', name: 'All', slug: 'all', display_order: 0 },
  { id: 'rc1', name: 'Syllabus', slug: 'syllabus', display_order: 1 },
  { id: 'rc2', name: 'PYQ', slug: 'pyq', display_order: 2 },
  { id: 'rc3', name: 'Strategy', slug: 'strategy', display_order: 3 },
  { id: 'rc4', name: 'Notes', slug: 'notes', display_order: 4 },
];

export const MOCK_RESOURCES = [
  {
    id: 'res1',
    title: 'MPSC Combined Prelims PYQ 2022',
    slug: 'mpsc-combined-prelims-pyq-2022',
    category_slug: 'pyq',
    target_exam: 'Combined B&C',
    file_type: 'PDF',
    description: 'Complete previous year question paper with answers for MPSC Combined Prelims 2022.',
  },
  {
    id: 'res2',
    title: 'Talathi Bharti Syllabus 2026',
    slug: 'talathi-bharti-syllabus-2026',
    category_slug: 'syllabus',
    target_exam: 'Talathi Bharti',
    file_type: 'PDF',
    description: 'Official updated syllabus for Talathi Bharti 2026 with topic-wise weightage analysis.',
  },
  {
    id: 'res3',
    title: 'PSI Exam Strategy Guide 2026',
    slug: 'psi-exam-strategy-guide-2026',
    category_slug: 'strategy',
    target_exam: 'PSI',
    file_type: 'PDF',
    description: 'Step-by-step preparation strategy for PSI Prelims, Mains, and Physical Test.',
  },
  {
    id: 'res4',
    title: 'MPSC Mains Answer Writing Guide',
    slug: 'mpsc-mains-answer-writing-guide',
    category_slug: 'strategy',
    target_exam: 'Rajyaseva',
    file_type: 'PDF',
    description: 'Expert guide on answer writing format, diagrams, and policy references for MPSC Mains.',
  },
  {
    id: 'res5',
    title: 'MPSC Combined Syllabus 2026',
    slug: 'mpsc-combined-syllabus-2026',
    category_slug: 'syllabus',
    target_exam: 'Combined B&C',
    file_type: 'PDF',
    description: 'Complete official syllabus for MPSC Combined Group B&C examination 2026.',
  },
  {
    id: 'res6',
    title: 'MPSC Economics PYQ Master Sheet',
    slug: 'mpsc-economics-pyq-master-sheet',
    category_slug: 'pyq',
    target_exam: 'Rajyaseva',
    file_type: 'PDF',
    description: 'Compiled previous year questions on Indian & Maharashtra Economy from 2015-2025.',
  },
  {
    id: 'res7',
    title: 'MPSC History High-Yield Topics Sheet',
    slug: 'mpsc-history-high-yield-topics',
    category_slug: 'notes',
    target_exam: 'MPSC Foundation',
    file_type: 'PDF',
    description: 'Condensed high-yield history topics specially curated for MPSC Foundation batch students.',
  },
];

export const MOCK_BLOG_CATEGORIES = [
  { id: 'bc0', name: 'All', slug: 'all', display_order: 0 },
  { id: 'bc1', name: 'Recruitment', slug: 'recruitment', display_order: 1 },
  { id: 'bc2', name: 'Syllabus Guide', slug: 'syllabus-guide', display_order: 2 },
  { id: 'bc3', name: 'Exam Strategy', slug: 'exam-strategy', display_order: 3 },
  { id: 'bc4', name: 'Preparation Tips', slug: 'preparation-tips', display_order: 4 },
];

export const MOCK_BLOGS = [
  {
    id: 'b1',
    title: 'MPSC Group C 2026 Talathi Recruitment — 1,539 Posts, Last Date Extended',
    slug: 'mpsc-group-c-2026-talathi-recruitment',
    category: 'Recruitment',
    category_slug: 'recruitment',
    date: 'Aug 13, 2026',
    excerpt: 'Detailed breakdown of the 1,539 Talathi posts announced across Maharashtra districts, eligibility criteria, exam pattern, and deadline extensions.',
    content: `
      <h2>MPSC Talathi Recruitment 2026 Overview</h2>
      <p>The Maharashtra Public Service Commission (MPSC) has announced 1,539 vacancies for the post of Talathi (Gram Mahasul Adhikari) across all Maharashtra districts. This is a tremendous opportunity for MPSC Group C aspirants targeting state administrative service.</p>
      
      <h3>Key Dates & Timeline</h3>
      <ul>
        <li><strong>Application Start:</strong> August 1, 2026</li>
        <li><strong>Application End:</strong> September 30, 2026 (Extended)</li>
        <li><strong>Exam Date:</strong> Scheduled for Q4 2026</li>
      </ul>

      <h3>Eligibility & Educational Qualification</h3>
      <p>Candidates must possess a graduate degree in any discipline from a UGC-recognized university. Age criteria is 18 to 38 years for open category candidates, with standard age relaxation for reserved categories.</p>

      <h3>Exam Pattern & Subject Weightage</h3>
      <p>The Talathi exam consists of 100 objective questions totaling 200 marks, administered in a 2-hour duration. The syllabus tests Marathi Language, English Grammar, General Studies (Maharashtra-focused), and Numerical/Logical Reasoning.</p>
    `,
    banner_gradient: 'from-amber-600 via-orange-600 to-red-600',
  },
  {
    id: 'b2',
    title: 'MPSC Rajyaseva 2027: Complete Syllabus & Descriptive Exam Pattern',
    slug: 'mpsc-rajyaseva-2027-syllabus',
    category: 'Syllabus Guide',
    category_slug: 'syllabus-guide',
    date: 'Aug 18, 2026',
    excerpt: 'Everything you need to know about MPSC Rajyaseva descriptive paper pattern, optional subject selection, GS 1 to GS 4 topics, and essay strategy.',
    content: `
      <h2>MPSC Rajyaseva 2027 — The Comprehensive Blueprint</h2>
      <p>The MPSC Rajyaseva examination is the pinnacle of Maharashtra state civil services recruitment, selecting candidates for prestigious roles such as Deputy Collector, Deputy Superintendent of Police (DySP), and Tehsildar.</p>

      <h3>Mains Examination Structure</h3>
      <p>The examination follows the descriptive pattern aligned with state administrative requirements:</p>
      <ul>
        <li><strong>General Studies 1:</strong> History, Geography & Agriculture of Maharashtra and India.</li>
        <li><strong>General Studies 2:</strong> Indian Constitution, Governance & Administrative Law.</li>
        <li><strong>General Studies 3:</strong> Economy, Planning & Science-Tech Development.</li>
        <li><strong>General Studies 4:</strong> Ethics, Integrity & Aptitude.</li>
      </ul>
    `,
    banner_gradient: 'from-blue-700 via-indigo-700 to-navy-900',
  },
  {
    id: 'b3',
    title: 'Tahsildar & Naib Tahsildar Bharti 2026: Complete Syllabus & Strategy',
    slug: 'tahsildar-bharti-2026',
    category: 'Exam Strategy',
    category_slug: 'exam-strategy',
    date: 'Jun 19, 2026',
    excerpt: 'Step-by-step roadmap for securing Class 1 & Class 2 executive magistrate posts through MPSC State Services examination.',
    content: `
      <h2>Roadmap to Executive Magistrate Roles in Maharashtra</h2>
      <p>Tahsildar (Class 1) and Naib Tahsildar (Class 2) are critical pillars of Maharashtra revenue and disaster management administration. Scoring high in Mains GS-2 and descriptive essays is the key differentiator.</p>
      
      <h3>Essential Preparation Pillars</h3>
      <p>1. In-depth understanding of Maharashtra Land Revenue Code (MLRC) 1966.</p>
      <p>2. Weekly answer writing practice on district administration case studies.</p>
      <p>3. Thorough mastery of Panchayat Raj and rural development schemes.</p>
    `,
    banner_gradient: 'from-emerald-700 via-teal-700 to-cyan-800',
  },
  {
    id: 'b4',
    title: 'MPSC Mains Answer Writing: The Exact Format Examiners Want',
    slug: 'mpsc-mains-answer-writing',
    category: 'Preparation Tips',
    category_slug: 'preparation-tips',
    date: 'May 27, 2026',
    excerpt: 'Learn how to structure introduction, body diagrams, policy references, and balanced conclusions to maximize marks in MPSC Mains descriptive answers.',
    content: `
      <h2>The Anatomy of a High-Scoring MPSC Mains Answer</h2>
      <p>Descriptive answers require precision, structure, and visual clarity. Examiners evaluate hundreds of answer sheets daily; your presentation determines your score.</p>
      
      <h3>The 4-Part Winning Structure</h3>
      <p><strong>1. Crisp Introduction (15-20 words):</strong> Define key terms or quote relevant constitutional articles.</p>
      <p><strong>2. Body Analysis with Micro-diagrams:</strong> Use flowcharts, bullet points, and subheadings.</p>
      <p><strong>3. Government Scheme & Data Integration:</strong> Ground every argument in Maharashtra government data and economic survey citations.</p>
      <p><strong>4. Forward-Looking Conclusion:</strong> End on a proactive, constructive governance recommendation.</p>
    `,
    banner_gradient: 'from-violet-700 via-purple-700 to-pink-700',
  },
  {
    id: 'b5',
    title: 'Talathi Bharti 2026: Complete Syllabus & Exam Pattern Guide',
    slug: 'talathi-bharti-2026-exam-pattern',
    category: 'Syllabus Guide',
    category_slug: 'syllabus-guide',
    date: 'Jul 30, 2026',
    excerpt: 'Comprehensive subject-wise syllabus analysis and high-yield topic distribution for Maharashtra Talathi exams.',
    content: `
      <h2>Talathi Exam Pattern & High-Yield Analysis</h2>
      <p>With standardized computer-based testing, accuracy and speed are paramount. This guide provides a detailed topic distribution for scoring 180+ marks.</p>
      
      <h3>Topic Breakdown</h3>
      <ul>
        <li><strong>Marathi Grammar (25 Questions):</strong> Sandhi, Samas, Prayog, Alankar, and Vocabulary.</li>
        <li><strong>English Grammar (25 Questions):</strong> Tenses, Voices, Prepositions, and Idioms.</li>
        <li><strong>General Knowledge (25 Questions):</strong> Maharashtra Geography, History, Polity, and Current Affairs.</li>
        <li><strong>Aptitude & Reasoning (25 Questions):</strong> Coding-Decoding, Series, Speed-Time-Distance, and Data Interpretation.</li>
      </ul>
    `,
    banner_gradient: 'from-blue-600 via-teal-600 to-emerald-700',
    image_url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1200'
  },
];

export const MOCK_COURSE_CATEGORIES = [
  { id: 'cc0', name: 'All', slug: 'all', display_order: 0 },
  { id: 'cc1', name: 'Rajyaseva', slug: 'rajyaseva', display_order: 1 },
  { id: 'cc2', name: 'PSI/STI/ASO', slug: 'psi-sti-aso', display_order: 2 },
  { id: 'cc3', name: 'Combined B&C', slug: 'combined-bc', display_order: 3 },
  { id: 'cc4', name: 'Foundation', slug: 'foundation', display_order: 4 },
  { id: 'cc5', name: 'Other', slug: 'other', display_order: 5 },
];

export const MOCK_COURSES = [
  {
    id: 'c1',
    title: 'MPSC Foundation Batch',
    slug: 'mpsc-foundation-batch',
    category: 'Foundation',
    category_slug: 'foundation',
    duration: '52 Weeks',
    admission_status: 'open',
    short_description: 'Comprehensive 52-week foundational program covering Rajyaseva & Group B/C exam syllabus from core basics.',
    description: '<p>The MPSC Foundation Batch is our flagship program designed for aspirants who want a complete, structured preparation journey. This 52-week program covers every subject from fundamental concepts to advanced exam-level practice.</p><p>Led by post-holder faculty who have personally cleared the MPSC exams, this batch ensures you receive guidance from officers who understand the examination inside out.</p>',
    banner_color: '#1E3A8A',
    is_featured: true,
    display_order: 1,
  },
  {
    id: 'c2',
    title: 'ASO Exam Coaching',
    slug: 'aso-exam-coaching',
    category: 'PSI/STI/ASO',
    category_slug: 'psi-sti-aso',
    duration: '52 Weeks',
    admission_status: 'open',
    short_description: 'Specialized batch for Assistant Section Officer (ASO) exam preparation in Mantralaya Mumbai.',
    description: '<p>The ASO Exam Coaching batch is specifically designed for aspirants targeting the Assistant Section Officer position in Mantralaya, Mumbai. Our focused curriculum covers the complete ASO syllabus with an emphasis on Maharashtra administration and law.</p>',
    banner_color: '#0284C7',
    is_featured: true,
    display_order: 2,
  },
  {
    id: 'c3',
    title: 'Rajyaseva Classes in Nashik',
    slug: 'rajyaseva-classes-in-nashik',
    category: 'Rajyaseva',
    category_slug: 'rajyaseva',
    duration: '52 Weeks',
    admission_status: 'open',
    short_description: 'Flagship coaching program for Dy. Collector, DSP, Tehsildar, and Class 1/2 gazetted posts.',
    description: '<p>Our Rajyaseva batch is the most comprehensive program for aspirants targeting Class 1 and Class 2 gazetted posts including Dy. Collector, DSP, and Tehsildar. The curriculum is designed around the latest MPSC Rajyaseva syllabus with expert faculty guidance.</p>',
    banner_color: '#047857',
    is_featured: true,
    display_order: 3,
  },
  {
    id: 'c4',
    title: 'Saralseva Recruitment Coaching',
    slug: 'saralseva',
    category: 'Other',
    category_slug: 'other',
    duration: '52 Weeks',
    admission_status: 'open',
    short_description: 'Targeted batch for Saralseva Bharti exams across Maharashtra state departments.',
    description: '<p>The Saralseva Recruitment Coaching batch prepares aspirants for non-gazetted posts across Maharashtra state departments. Our expert faculty provides targeted guidance for the Saralseva examination pattern and syllabus.</p>',
    banner_color: '#F59E0B',
    is_featured: false,
    display_order: 4,
  },
  {
    id: 'c5',
    title: 'SR Exam Coaching',
    slug: 'sr-exam-coaching',
    category: 'Other',
    category_slug: 'other',
    duration: '55 Weeks',
    admission_status: 'open',
    short_description: 'Dedicated guidance program for Sub-Registrar and Grade-II exam aspirants.',
    description: '<p>Our SR Exam Coaching batch provides specialized guidance for aspirants targeting the Sub-Registrar and Grade-II examination. The course covers all aspects of the exam including law, property registration, and Maharashtra-specific regulations.</p>',
    banner_color: '#1E3A8A',
    is_featured: false,
    display_order: 5,
  },
  {
    id: 'c6',
    title: 'PSI Classes in Nashik',
    slug: 'psi-classes-in-nashik',
    category: 'PSI/STI/ASO',
    category_slug: 'psi-sti-aso',
    duration: '52 Weeks',
    admission_status: 'open',
    short_description: 'Intensive Police Sub-Inspector (PSI) coaching with physical test guidance and law modules.',
    description: '<p>The PSI Classes batch offers intensive coaching for aspirants targeting the Police Sub-Inspector examination. Our program covers prelims, mains, physical test preparation, and interview guidance — a complete solution for PSI aspirants.</p>',
    banner_color: '#EA580C',
    is_featured: true,
    display_order: 6,
  },
  {
    id: 'c7',
    title: 'MPSC Combine Group B & C',
    slug: 'mpsc-combine-group-b-and-c',
    category: 'Combined B&C',
    category_slug: 'combined-bc',
    duration: '52 Weeks',
    admission_status: 'open',
    short_description: 'Integrated batch for PSI, STI, ASO, Tax Assistant, Excise Sub-Inspector, and Clerk-Typist.',
    description: '<p>The MPSC Combined Group B&C batch is an integrated coaching program covering all posts under MPSC\'s combined examination — PSI, STI, ASO, Tax Assistant, Excise Sub-Inspector, and Clerk-Typist.</p>',
    banner_color: '#1E3A8A',
    is_featured: true,
    display_order: 7,
  },
  {
    id: 'c8',
    title: 'Talathi Bharti Coaching',
    slug: 'talathi-bharti',
    category: 'Other',
    category_slug: 'other',
    duration: 'Variable',
    admission_status: 'open',
    short_description: 'Focused coaching for Maharashtra Revenue Department Talathi Recruitment.',
    description: '<p>The Talathi Bharti Coaching batch provides focused guidance for aspirants targeting the Maharashtra Revenue Department\'s Talathi recruitment. With post-holder faculty who cleared the Talathi exam themselves, this batch offers unmatched practical guidance.</p>',
    banner_color: '#F59E0B',
    is_featured: false,
    display_order: 8,
  },
];
