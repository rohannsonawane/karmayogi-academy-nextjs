-- =============================================
-- KARMAYOGI ACADEMY — Seed Data
-- Run AFTER migrations 001 and 002
-- =============================================

-- =============================================
-- SITE SETTINGS
-- =============================================
INSERT INTO public.site_settings (
  academy_name, phone, whatsapp, email, address,
  google_maps_url, facebook_url, instagram_url, youtube_url, google_play_url,
  opening_hours, footer_description, hero_tagline, hero_subtitle
) VALUES (
  'Karmayogi Academy Nashik',
  '+91 93255 89491',
  '919325589491',
  'info@karmayogiacademy.com',
  'Kasture Sadan, Ghankar Lane, beside Tulja Bhawani Mandir, near Panchavati Hotel, Vakil Wadi, Raviwar Karanje, Panchavati, Nashik, Maharashtra 422001',
  'https://maps.google.com/?q=Karmayogi+Academy+Nashik',
  'https://facebook.com/karmayogiacademy',
  'https://instagram.com/karmayogiacademy',
  'https://www.youtube.com/@karmayogimpsc',
  'https://play.google.com/store/apps/details?id=co.barney.ywavu',
  'Monday–Saturday: 8:00 AM – 9:00 PM | Sunday: 10:00 AM – 2:00 PM',
  'Maharashtra''s Premier MPSC Coaching Institute in Nashik. Dedicated officer preparation with 52-week structured system.',
  'Emerging as Officers, The Future is Unveiled',
  'Prepare for Rajyaseva, PSI, STI, ASO, Saralseva & Talathi Bharti with experienced post-holder faculty and a proven 52-week system.'
);

-- =============================================
-- COURSE CATEGORIES
-- =============================================
INSERT INTO public.course_categories (name, slug, display_order) VALUES
('Rajyaseva', 'rajyaseva', 1),
('PSI/STI/ASO', 'psi-sti-aso', 2),
('Combined B&C', 'combined-bc', 3),
('Foundation', 'foundation', 4),
('Saralseva', 'saralseva', 5),
('Other', 'other', 6);

-- =============================================
-- COURSES (8 courses)
-- =============================================
INSERT INTO public.courses (title, slug, category_id, short_description, description, duration, admission_status, is_featured, is_published, display_order) VALUES
(
  'MPSC Foundation Batch',
  'mpsc-foundation-batch',
  (SELECT id FROM public.course_categories WHERE slug = 'foundation'),
  'Comprehensive 52-week foundational program covering Rajyaseva & Group B/C exam syllabus from core basics.',
  '<p>The MPSC Foundation Batch is our flagship program designed for aspirants who want a complete, structured preparation journey. This 52-week program covers every subject from fundamental concepts to advanced exam-level practice.</p><p>Led by post-holder faculty who have personally cleared the MPSC exams, this batch ensures you receive guidance from officers who understand the examination inside out.</p>',
  '52 Weeks',
  'open',
  TRUE,
  TRUE,
  1
),
(
  'ASO Exam Coaching',
  'aso-exam-coaching',
  (SELECT id FROM public.course_categories WHERE slug = 'psi-sti-aso'),
  'Specialized batch for Assistant Section Officer (ASO) exam preparation in Mantralaya Mumbai.',
  '<p>The ASO Exam Coaching batch is specifically designed for aspirants targeting the Assistant Section Officer position in Mantralaya, Mumbai. Our focused curriculum covers the complete ASO syllabus with an emphasis on Maharashtra administration and law.</p>',
  '6 Months',
  'open',
  TRUE,
  TRUE,
  2
),
(
  'Rajyaseva Classes in Nashik',
  'rajyaseva-classes-in-nashik',
  (SELECT id FROM public.course_categories WHERE slug = 'rajyaseva'),
  'Flagship coaching program for Dy. Collector, DSP, Tehsildar, and Class 1/2 gazetted posts.',
  '<p>Our Rajyaseva batch is the most comprehensive program for aspirants targeting Class 1 and Class 2 gazetted posts including Dy. Collector, DSP, and Tehsildar. The curriculum is designed around the latest MPSC Rajyaseva syllabus with expert faculty guidance.</p>',
  '12 Months',
  'open',
  TRUE,
  TRUE,
  3
),
(
  'Saralseva Recruitment Coaching',
  'saralseva',
  (SELECT id FROM public.course_categories WHERE slug = 'saralseva'),
  'Targeted batch for Saralseva Bharti exams across Maharashtra state departments.',
  '<p>The Saralseva Recruitment Coaching batch prepares aspirants for non-gazetted posts across Maharashtra state departments. Our expert faculty provides targeted guidance for the Saralseva examination pattern and syllabus.</p>',
  '4 Months',
  'open',
  FALSE,
  TRUE,
  4
),
(
  'SR Exam Coaching',
  'sr-exam-coaching',
  (SELECT id FROM public.course_categories WHERE slug = 'other'),
  'Dedicated guidance program for Sub-Registrar and Grade-II exam aspirants.',
  '<p>Our SR Exam Coaching batch provides specialized guidance for aspirants targeting the Sub-Registrar and Grade-II examination. The course covers all aspects of the exam including law, property registration, and Maharashtra-specific regulations.</p>',
  '3 Months',
  'limited',
  FALSE,
  TRUE,
  5
),
(
  'PSI Classes in Nashik',
  'psi-classes-in-nashik',
  (SELECT id FROM public.course_categories WHERE slug = 'psi-sti-aso'),
  'Intensive Police Sub-Inspector (PSI) coaching with physical test guidance and law modules.',
  '<p>The PSI Classes batch offers intensive coaching for aspirants targeting the Police Sub-Inspector examination. Our program covers prelims, mains, physical test preparation, and interview guidance — a complete solution for PSI aspirants.</p>',
  '6 Months',
  'open',
  TRUE,
  TRUE,
  6
),
(
  'MPSC Combined Group B & C',
  'mpsc-combine-group-b-and-c',
  (SELECT id FROM public.course_categories WHERE slug = 'combined-bc'),
  'Integrated batch for PSI, STI, ASO, Tax Assistant, Excise Sub-Inspector, and Clerk-Typist.',
  '<p>The MPSC Combined Group B&C batch is an integrated coaching program covering all posts under MPSC''s combined examination — PSI, STI, ASO, Tax Assistant, Excise Sub-Inspector, and Clerk-Typist. This comprehensive batch maximizes your chances across multiple posts.</p>',
  '8 Months',
  'open',
  TRUE,
  TRUE,
  7
),
(
  'Talathi Bharti Coaching',
  'talathi-bharti',
  (SELECT id FROM public.course_categories WHERE slug = 'other'),
  'Focused coaching for Maharashtra Revenue Department Talathi Recruitment.',
  '<p>The Talathi Bharti Coaching batch provides focused guidance for aspirants targeting the Maharashtra Revenue Department''s Talathi recruitment. With post-holder faculty who cleared the Talathi exam themselves, this batch offers unmatched practical guidance.</p>',
  '3 Months',
  'open',
  FALSE,
  TRUE,
  8
);

-- =============================================
-- COURSE FEATURES
-- =============================================
INSERT INTO public.course_features (course_id, feature, display_order) VALUES
((SELECT id FROM public.courses WHERE slug = 'mpsc-foundation-batch'), 'Post-holder faculty with real exam experience', 1),
((SELECT id FROM public.courses WHERE slug = 'mpsc-foundation-batch'), '52-week structured preparation system', 2),
((SELECT id FROM public.courses WHERE slug = 'mpsc-foundation-batch'), 'Weekly prelims & mains mock tests', 3),
((SELECT id FROM public.courses WHERE slug = 'mpsc-foundation-batch'), 'Comprehensive PYQ analysis sessions', 4),
((SELECT id FROM public.courses WHERE slug = 'mpsc-foundation-batch'), 'Regular doubt clearing sessions', 5),
((SELECT id FROM public.courses WHERE slug = 'mpsc-foundation-batch'), '1-on-1 officer mentorship sessions', 6);

-- =============================================
-- FACULTY (5 members + 2 founders)
-- =============================================
INSERT INTO public.faculty (name, slug, designation, subject, experience, description, badge, is_founder, is_published, display_order) VALUES
(
  'Aadesh Karpe',
  'aadesh-karpe',
  'Co-Founder & Head Mentor',
  'Exam Strategy · Answer Writing · PYQ Analysis',
  '8+ years',
  'Cleared the Talathi exam and serves as Gram Mahsaul Adhikari. Leads exam strategy, answer writing workshops, and PYQ dissection sessions at Karmayogi Academy.',
  'Serving Gram Mahsaul Adhikari · Talathi Exam Qualifier',
  TRUE,
  TRUE,
  1
),
(
  'Amol Rajole',
  'amol-rajole',
  'Co-Founder & Academic Director',
  'Curriculum Design · 52-Week Framework · Batch Operations',
  '10+ years',
  'Designed the 52-week preparation framework that has guided 1,300+ students. Oversees curriculum planning, study material development, and batch management.',
  'Architect of the 52-Week Karmayogi Preparation System',
  TRUE,
  TRUE,
  2
),
(
  'Mr. Sharad Patil',
  'sharad-patil',
  'Senior MPSC Mentor',
  'Indian Polity & Constitution',
  '6+ years',
  'Selected officer with 6+ years of teaching experience. Simplifies complex constitutional articles and administrative laws for Prelims & Mains.',
  'Serving Officer & MPSC Mentor',
  FALSE,
  TRUE,
  3
),
(
  'Prof. Rajesh Deshmukh',
  'rajesh-deshmukh',
  'Senior MPSC Economist',
  'Indian & Maharashtra Economics',
  '8+ years',
  'Specialist in Union Budget, Economic Survey, and State Economy modules. Has mentored over 800+ successful aspirants.',
  NULL,
  FALSE,
  TRUE,
  4
),
(
  'Dr. Sunita Kulkarni',
  'sunita-kulkarni',
  'Former State Service Officer',
  'Geography & Environmental Science',
  '7+ years',
  'Expert in Maharashtra & Indian Physical Geography, mapping techniques, and environmental ecology for MPSC Mains.',
  NULL,
  FALSE,
  TRUE,
  5
),
(
  'Mr. Vikas More',
  'vikas-more',
  'PYQ Qualifier & Law Specialist',
  'State History, Law & Mental Ability',
  '5+ years',
  'Focuses on speed mathematics, mental ability, and Maharashtra Freedom Movement history for Combined B&C prelims.',
  NULL,
  FALSE,
  TRUE,
  6
);

-- =============================================
-- RESULT STATISTICS
-- =============================================
INSERT INTO public.result_statistics (label, value, description, display_order) VALUES
('Mains Qualifiers', '128+', 'Students who qualified MPSC Mains from Karmayogi Academy', 1),
('Students Enrolled', '1,324+', 'Total students enrolled across all batches', 2),
('Post-Holder Teachers', '5', 'Faculty members who are serving government officers', 3),
('Weeks Preparation System', '52', 'Our proven 52-week structured preparation framework', 4),
('Years of Proven Results', '3+', 'Years of consistently delivering top results', 5);

-- =============================================
-- RESULTS / ACHIEVERS
-- =============================================
INSERT INTO public.results (student_name, exam, post_secured, batch, year, result_rank, quote, is_featured, is_published) VALUES
('Mahesh Deshmukh', 'MPSC Rajyaseva', 'Naib Tahsildar (Class 2)', 'Rajyaseva Batch 2023 (2024)', 2024, 'State Rank 14', 'Karmayogi Academy''s personal mentorship helped me master descriptive answer writing to the fullest.', TRUE, TRUE),
('Snehal Shinde', 'Group B Combined', 'Assistant Section Officer (ASO)', 'Group B Batch 2023 (2024)', 2024, 'Merit List', 'The guidance on Maharashtra laws and PYQ gave me clear competitive edge.', TRUE, TRUE),
('Kiran Patil', 'PSI Special Exam', 'Police Sub-Inspector (PSI)', 'PSI Special Batch 2022 (2023)', 2023, 'Top 20', 'From practice to physical test guidance, Karmayogi teachers stood by me till the end to success.', TRUE, TRUE),
('Pooja Jadhav', 'Talathi Bharti', 'Gram Mahsaul Adhikari (Talathi)', 'Talathi Fast Track Batch (2024)', 2024, '190+ Marks', 'Aadesh Sir''s guidance on Talathi exam made study more goal and purpose-oriented.', TRUE, TRUE),
('Amit Pawar', 'Group B Combined', 'State Tax Inspector (STI)', 'Combined Group B 2023 (2024)', 2024, 'Selected', 'Regular GNR test series helped me build the competitive exam-specific strategy every time.', TRUE, TRUE);

-- =============================================
-- TESTIMONIALS
-- =============================================
INSERT INTO public.testimonials (student_name, course, review, rating, is_published, display_order) VALUES
('Dipika Mahale', 'MPSC Foundation Batch', 'Karmayogi Academy is one of the best MPSC coaching institutes for serious aspirants. The experienced faculty explains concepts clearly and focuses on exam-oriented preparation, making even complex topics easy to understand. The structured study plan, regular tests, and revision sessions helped me improve my accuracy and confidence.', 5, TRUE, 1),
('Rahul Sonawane', 'Rajyaseva Classes', 'The answer writing sessions were extremely beneficial. I improved my mains score by 40+ marks after joining Karmayogi. The faculty genuinely cares about each student''s progress. The PYQ analysis workshops were eye-opening.', 5, TRUE, 2),
('Priya Bhosale', 'PSI Classes in Nashik', 'Best coaching for PSI in Nashik. The physical test guidance along with the academic preparation helped me crack PSI in my first attempt. Highly recommend to all PSI aspirants.', 5, TRUE, 3),
('Suresh Gaikwad', 'MPSC Combined Group B & C', 'The faculty is extremely knowledgeable and supportive. Mock tests were conducted regularly which helped me manage time in the actual exam. Selected as STI in first attempt thanks to Karmayogi!', 5, TRUE, 4),
('Anjali Pawar', 'MPSC Foundation Batch', 'I was confused about how to start MPSC preparation. Karmayogi''s 52-week structured system gave me a clear roadmap. The batch quality is excellent and the study material is well-curated for current exam trends.', 5, TRUE, 5);

-- =============================================
-- BLOG CATEGORIES
-- =============================================
INSERT INTO public.blog_categories (name, slug, display_order) VALUES
('Recruitment', 'recruitment', 1),
('Syllabus Guide', 'syllabus-guide', 2),
('Exam Strategy', 'exam-strategy', 3),
('Preparation Tips', 'preparation-tips', 4);

-- =============================================
-- BLOGS (5 posts)
-- =============================================
INSERT INTO public.blogs (title, slug, category_id, excerpt, content, author, published_at, is_published) VALUES
(
  'MPSC Group C 2026 Talathi Recruitment — 1,539 Posts, Last Date Extended',
  'mpsc-group-c-2026-talathi-recruitment',
  (SELECT id FROM public.blog_categories WHERE slug = 'recruitment'),
  'Detailed breakdown of the 1,539 Talathi posts announced across Maharashtra districts, eligibility criteria, exam pattern, and deadline extensions.',
  '<h2>MPSC Talathi Recruitment 2026 Overview</h2><p>The Maharashtra Public Service Commission (MPSC) has announced 1,539 vacancies for the post of Talathi (Gram Mahsaul Adhikari) across all Maharashtra districts. This is a great opportunity for MPSC Group C aspirants.</p><h3>Key Dates</h3><ul><li>Application Start: August 1, 2026</li><li>Application End: September 30, 2026 (Extended)</li><li>Exam Date: To be announced</li></ul><h3>Eligibility</h3><p>Candidates must have a degree in any subject from a recognized university and must be between 18-38 years of age.</p><h3>Exam Pattern</h3><p>The Talathi exam consists of a written examination covering Maharashtra History, Geography, Economy, Polity, and Aptitude. The exam is now conducted by TCS iON.</p>',
  'Karmayogi Academy',
  NOW() - INTERVAL '22 days',
  TRUE
),
(
  'MPSC Rajyaseva 2027: Complete Syllabus & Descriptive Exam Pattern',
  'mpsc-rajyaseva-2027-syllabus',
  (SELECT id FROM public.blog_categories WHERE slug = 'syllabus-guide'),
  'Everything you need to know about MPSC Rajyaseva descriptive paper pattern, optional subject selection, GS 1 to GS 4 topics, and essay strategy.',
  '<h2>MPSC Rajyaseva 2027 — Complete Syllabus Guide</h2><p>The MPSC Rajyaseva examination is Maharashtra''s most prestigious state-level exam for Class 1 and Class 2 gazetted posts. The 2027 batch aspirants need to understand the updated syllabus thoroughly.</p><h3>Prelims Syllabus</h3><p>Paper 1 covers Maharashtra & India GK, Science, and Environment. Paper 2 (CSAT) covers reasoning, reading comprehension, and mathematics.</p><h3>Mains Syllabus</h3><p>The mains examination consists of 6 papers including GS 1 (History, Heritage), GS 2 (Governance, Polity), GS 3 (Economic Development), GS 4 (Ethics), an Optional Subject, and a Marathi/English Language paper.</p>',
  'Karmayogi Academy',
  NOW() - INTERVAL '15 days',
  TRUE
),
(
  'Tahsildar & Naib Tahsildar Bharti 2026: Complete Syllabus & Strategy',
  'tahsildar-bharti-2026',
  (SELECT id FROM public.blog_categories WHERE slug = 'syllabus-guide'),
  'Step-by-step roadmap for securing Class 1 & Class 2 executive magistrate posts through MPSC State Services examination.',
  '<h2>Tahsildar & Naib Tahsildar 2026 — Strategy Guide</h2><p>The Tahsildar and Naib Tahsildar posts are among the most coveted administrative positions in Maharashtra. Here is a complete strategy to crack these examinations.</p><h3>Understanding the Posts</h3><p>Tahsildar is a Class 1 gazetted officer who heads the revenue administration of a taluka. Naib Tahsildar is a Class 2 gazetted officer who assists the Tahsildar.</p><h3>Preparation Strategy</h3><p>Focus on Maharashtra-specific topics, revenue laws, land record management, and district administration. Answer writing practice is crucial for mains.</p>',
  'Karmayogi Academy',
  NOW() - INTERVAL '45 days',
  TRUE
),
(
  'MPSC Mains Answer Writing: The Exact Format Examiners Want',
  'mpsc-mains-answer-writing',
  (SELECT id FROM public.blog_categories WHERE slug = 'preparation-tips'),
  'Learn how to structure introduction, body diagrams, policy references, and balanced conclusions to maximize marks in MPSC Mains descriptive answers.',
  '<h2>MPSC Mains Answer Writing — The Right Format</h2><p>Many aspirants lose valuable marks in MPSC Mains not because they lack knowledge, but because they don''t follow the expected answer format. Here is the exact structure that examiners prefer.</p><h3>Introduction</h3><p>Start with a relevant definition or a current event hook. Keep it to 2-3 sentences. Never start with "In this answer, I will discuss..."</p><h3>Body</h3><p>Use diagrams, flowcharts, and bullet points wherever possible. Include policy references (Government schemes, Acts) and cite examples from Maharashtra specifically.</p><h3>Conclusion</h3><p>End with a balanced, future-oriented conclusion. Avoid one-sided conclusions. Refer to Constitutional provisions or Government initiatives.</p>',
  'Karmayogi Academy',
  NOW() - INTERVAL '8 days',
  TRUE
),
(
  'Talathi Bharti 2026: Complete Syllabus & Exam Pattern Guide',
  'talathi-bharti-2026-exam-pattern',
  (SELECT id FROM public.blog_categories WHERE slug = 'syllabus-guide'),
  'Comprehensive subject-wise syllabus analysis and high-yield topic distribution for Maharashtra Talathi exams.',
  '<h2>Talathi Bharti 2026 — Syllabus & Exam Pattern</h2><p>This comprehensive guide covers every aspect of the Maharashtra Talathi recruitment examination including syllabus, exam pattern, important topics, and preparation tips.</p><h3>Exam Pattern</h3><p>The Talathi exam consists of 100 MCQ questions for 100 marks with a 1-hour duration. There is no negative marking in the TCS iON based examination.</p><h3>Subject-wise Topic Distribution</h3><p>Maharashtra History: 20 marks | Maharashtra Geography: 20 marks | Indian Constitution: 10 marks | Economy: 15 marks | General Science: 15 marks | Aptitude & Reasoning: 20 marks</p>',
  'Karmayogi Academy',
  NOW() - INTERVAL '3 days',
  TRUE
);

-- =============================================
-- RESOURCE CATEGORIES
-- =============================================
INSERT INTO public.resource_categories (name, slug, display_order) VALUES
('Syllabus', 'syllabus', 1),
('PYQ', 'pyq', 2),
('Strategy', 'strategy', 3),
('Notes', 'notes', 4);

-- =============================================
-- RESOURCES (7 PDFs)
-- =============================================
INSERT INTO public.resources (title, slug, category_id, target_exam, description, is_published) VALUES
('MPSC Combined Prelims PYQ 2022', 'mpsc-combined-prelims-pyq-2022', (SELECT id FROM public.resource_categories WHERE slug = 'pyq'), 'Combined B&C', 'Complete previous year question paper with answers for MPSC Combined Prelims 2022.', TRUE),
('Talathi Bharti Syllabus 2026', 'talathi-bharti-syllabus-2026', (SELECT id FROM public.resource_categories WHERE slug = 'syllabus'), 'Talathi Bharti', 'Official updated syllabus for Talathi Bharti 2026 with topic-wise weightage analysis.', TRUE),
('PSI Exam Strategy Guide 2026', 'psi-exam-strategy-guide-2026', (SELECT id FROM public.resource_categories WHERE slug = 'strategy'), 'PSI', 'Step-by-step preparation strategy for PSI Prelims, Mains, and Physical Test.', TRUE),
('MPSC Mains Answer Writing Guide', 'mpsc-mains-answer-writing-guide', (SELECT id FROM public.resource_categories WHERE slug = 'strategy'), 'Rajyaseva', 'Expert guide on answer writing format, diagrams, and policy references for MPSC Mains.', TRUE),
('MPSC Combined Syllabus 2026', 'mpsc-combined-syllabus-2026', (SELECT id FROM public.resource_categories WHERE slug = 'syllabus'), 'Combined B&C', 'Complete official syllabus for MPSC Combined Group B&C examination 2026.', TRUE),
('MPSC Economics PYQ Master Sheet', 'mpsc-economics-pyq-master-sheet', (SELECT id FROM public.resource_categories WHERE slug = 'pyq'), 'Rajyaseva', 'Compiled previous year questions on Indian & Maharashtra Economy from 2015-2025.', TRUE),
('MPSC History High-Yield Topics Sheet', 'mpsc-history-high-yield-topics', (SELECT id FROM public.resource_categories WHERE slug = 'notes'), 'MPSC Foundation', 'Condensed high-yield history topics specially curated for MPSC Foundation batch students.', TRUE);

-- =============================================
-- HOMEPAGE SECTIONS
-- =============================================
INSERT INTO public.homepage_sections (section_key, title, subtitle, is_visible, display_order) VALUES
('hero', 'Prepare for Your MPSC Success', 'With post-holder faculty and a proven 52-week system', TRUE, 1),
('about', 'About Karmayogi Academy', 'Maharashtra''s Premier MPSC Coaching Institute', TRUE, 2),
('statistics', 'Our Track Record', 'Numbers that speak for our results', TRUE, 3),
('courses', 'Our MPSC Courses', 'Choose the right batch for your goal', TRUE, 4),
('why_karmayogi', 'Why Choose Karmayogi?', 'What makes us different', TRUE, 5),
('faculty', 'Learn from Officers', 'Post-holder faculty who cleared the very exams they teach', TRUE, 6),
('results', 'Our Achievers', 'Students who made it to government service', TRUE, 7),
('testimonials', 'Student Reviews', 'What our students say about us', TRUE, 8),
('blog', 'Latest Updates', 'Exam notifications and preparation tips from our mentors', TRUE, 9),
('resources', 'Free Study Resources', 'Download syllabus, PYQ, and strategy guides free', TRUE, 10),
('cta', 'Join the Officer Movement', 'Limited seats per batch for personalized mentorship', TRUE, 11);
