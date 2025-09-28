
import { Award, Star, Trophy, type LucideIcon, Code, Bot, BarChart2, Newspaper } from 'lucide-react';
import type { AIQuestOutput } from '@/ai/flows/ai-quest-generator.types';
import type { PersonalizedRecommendationsOutput } from '@/ai/flows/personalized-recommendations.types';
import { SkillPathOutput } from '@/ai/flows/skill-path.types';


export type JobApplication = {
  id: string;
  jobId: string | null; // Can be null if manually added
  title: string;
  company: string;
  status: 'Applied' | 'Under Review' | 'Interview' | 'Offered' | 'Rejected';
  dateApplied: string;
};

export const jobApplications: JobApplication[] = [
  { id: '1', jobId: 'job1', title: 'Frontend Developer', company: 'Innovate Inc.', status: 'Under Review', dateApplied: '2024-07-15' },
  { id: '2', jobId: 'job2', title: 'AI/ML Engineer', company: 'Data Driven Co.', status: 'Interview', dateApplied: '2024-07-12' },
  { id: '3', jobId: null, title: 'Product Manager Intern', company: 'Creative Co.', status: 'Applied', dateApplied: '2024-07-18' },
  { id: '4', jobId: null, title: 'Data Scientist', company: 'Data Insights', status: 'Rejected', dateApplied: '2024-07-05' },
];

export type OpenOpportunity = {
    id: string;
    title: string;
    company: string;
    description: string;
    location: string;
    type: 'Full-time' | 'Internship';
    skills: string[];
};

export const openOpportunities: OpenOpportunity[] = [
    {
      id: 'job1',
      title: 'Frontend Developer',
      company: 'Innovate Inc.',
      description: 'Seeking a creative Frontend Developer to build beautiful and responsive user interfaces using React and Tailwind CSS. The ideal candidate has experience with Next.js and a passion for clean code. You will be responsible for developing new user-facing features, building reusable components, and ensuring the technical feasibility of UI/UX designs. You will work closely with our product and design teams to deliver high-quality products.',
      location: 'Remote',
      type: 'Full-time',
      skills: ['React', 'Next.js', 'Tailwind', 'TypeScript', 'UI/UX']
    },
    {
      id: 'job2',
      title: 'AI/ML Engineer',
      company: 'Data Driven Co.',
      description: 'Join our AI team to build next-generation machine learning models. Experience with Python, TensorFlow, and cloud platforms like GCP is a must. Your work will involve prototyping, training, and deploying models that solve real-world problems. You should be comfortable with data preprocessing, feature engineering, and model evaluation.',
      location: 'San Francisco, CA',
      type: 'Full-time',
      skills: ['Python', 'TensorFlow', 'GCP', 'PyTorch', 'scikit-learn']
    },
    {
        id: 'job3',
        title: 'Cloud Solutions Architect',
        company: 'ScaleUp Cloud',
        description: 'Design and implement scalable cloud infrastructure on GCP and AWS. Looking for experts in Kubernetes, Terraform, and CI/CD. You will be a key player in our infrastructure team, ensuring our services are reliable, scalable, and secure. Strong understanding of networking and security principles is required.',
        location: 'New York, NY',
        type: 'Full-time',
        skills: ['GCP', 'AWS', 'Kubernetes', 'Terraform', 'CI/CD']
    },
    {
        id: 'job4',
        title: 'Software Engineer Intern',
        company: 'Innovate Inc.',
        description: 'Exciting internship opportunity for students passionate about web development. You will work alongside our senior developers on real projects, contributing to our main codebase. This is a great chance to learn about professional software development practices, including code reviews, testing, and agile methodologies.',
        location: 'Remote',
        type: 'Internship',
        skills: ['JavaScript', 'HTML/CSS', 'Git', 'React']
    },
     {
        id: 'job5',
        title: 'Data Science Intern',
        company: 'Data Driven Co.',
        description: 'Work with our data science team on analyzing large datasets, building predictive models, and creating visualizations. This internship will provide hands-on experience with the entire data science lifecycle, from data collection and cleaning to model deployment and interpretation. A strong foundation in statistics is a plus.',
        location: 'San Francisco, CA',
        type: 'Internship',
        skills: ['Python', 'Pandas', 'SQL', 'R', 'Tableau']
    }
];

export type MentorshipSession = {
  id: string;
  title: string;
  mentor: string;
  date: Date;
  duration: number; // in minutes
};

export const upcomingSessions: MentorshipSession[] = [
    { id: '1', title: 'Resume Review', mentor: 'Dr. Evelyn Reed', date: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000), duration: 30 },
    { id: '2', title: 'Mock Technical Interview', mentor: 'David Chen', date: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000), duration: 60 },
];

export type BadgeData = {
  id: string;
  name: string;
  description: string;
  Icon: LucideIcon;
};

export const earnedBadges: BadgeData[] = [
    { id: '1', name: 'First Article', description: 'Published your first article.', Icon: Star },
    { id: '2', name: 'Hackathon Hero', description: 'Participated in a hackathon.', Icon: Trophy },
    { id: '3', name: 'Top Contributor', description: 'Became a top content creator.', Icon: Award },
];

export const user = {
    name: 'Alex Martinez',
    knowledgeCoins: 1500,
    leaderboardRank: 12,
    questPoints: 2480,
    profile: {
        name: 'Alex Martinez',
        skills: ['React', 'TypeScript', 'Next.js', 'Node.js', 'Python', 'GCP', 'Tailwind CSS'],
        experience: '3+ years in web development, focusing on frontend technologies. Contributed to several open-source projects, including a popular UI component library. Passionate about building scalable and intuitive user interfaces.',
        resumes: [
            { id: 'resume-general', name: 'General Web Dev Resume.pdf', content: 'Detailed resume focusing on full-stack web development skills and project history.' },
            { id: 'resume-ai', name: 'AI/ML Focused Resume.pdf', content: 'Specialized resume highlighting projects and skills in Machine Learning and AI.' },
        ],
        certificates: [
            { id: 'cert-react', name: 'Advanced React Certification', tech: ['React', 'Next.js'] },
            { id: 'cert-gcp', name: 'GCP Associate Cloud Engineer', tech: ['GCP', 'Kubernetes'] },
            { id: 'cert-python', name: 'Python for Data Science', tech: ['Python'] },
        ]
    }
};

type Experience = {
  role: string;
  company: string;
  period: string;
};

type Education = {
  degree: string;
  university: string;
  year: string;
};

export type UserProfile = {
  id: string;
  name: string;
  title: string;
  avatarId: string;
  expertise: string[];
  industry: string;
  bio: string;
  community: 'Alumni' | 'Faculty' | 'Student' | 'Industry';
  experience: Experience[];
  education: Education;
  leaderboardRank: number;
}

export type Mentor = Omit<UserProfile, 'experience' | 'education'> & {
  topics: string[];
}


export const allMentors: Mentor[] = [
  { 
    id: 'mentor-1',
    name: 'Dr. Evelyn Reed', 
    title: 'AI Research Scientist', 
    avatarId: 'mentor-1', 
    expertise: ['AI/ML', 'Python', 'Research'],
    industry: 'Tech',
    bio: 'Leading researcher in natural language processing with a passion for mentoring the next generation of AI innovators.',
    topics: ['Career Advice in AI', 'Understanding Research Papers', 'AI Project Brainstorming'],
    community: 'Faculty',
    leaderboardRank: 4,
  },
  { 
    id: 'mentor-2',
    name: 'David Chen', 
    title: 'Principal Engineer @ Tech Solutions', 
    avatarId: 'mentor-2', 
    expertise: ['System Design', 'Cloud Architecture', 'DevOps'],
    industry: 'Software',
    bio: 'Architecting large-scale, resilient systems for over a decade. I can help you think about scale and reliability.',
    topics: ['System Design Interviews', 'Cloud Career Paths', 'Mock Technical Interview'],
    community: 'Alumni',
    leaderboardRank: 1,
  },
  { 
    id: 'mentor-3',
    name: 'Sarah Jones', 
    title: 'UX Design Lead', 
    avatarId: 'mentor-3', 
    expertise: ['UX/UI', 'Figma', 'User Research'],
    industry: 'Design',
    bio: 'Crafting user-centric experiences that are both beautiful and intuitive. Happy to guide you on design principles and career paths.',
    topics: ['Portfolio Review', 'Switching to UX Design', 'User Interview Techniques'],
    community: 'Alumni',
    leaderboardRank: 7,
  },
  { 
    id: 'mentor-4',
    name: 'Marcus Holloway', 
    title: 'Cybersecurity Analyst', 
    avatarId: 'mentor-4', 
    expertise: ['Security', 'Networking', 'Penetration Testing'],
    industry: 'Cybersecurity',
    bio: 'Specializing in threat detection and ethical hacking. Let\'s talk about how to keep systems secure.',
    topics: ['Cybersecurity Careers', 'Ethical Hacking Basics', 'Security Certifications Guide'],
    community: 'Industry',
    leaderboardRank: 15,
  },
  { 
    id: 'mentor-5',
    name: 'Priya Sharma', 
    title: 'Product Manager @ FinTech Corp', 
    avatarId: 'mentor-5', 
    expertise: ['Product Management', 'Agile', 'Market Analysis'],
    industry: 'FinTech',
    bio: 'From idea to launch, I guide products to success. I can help with roadmap planning, user stories, and breaking into product.',
    topics: ['Breaking into Product Management', 'Agile Methodologies', 'Market Research'],
    community: 'Alumni',
    leaderboardRank: 3,
  },
  { 
    id: 'mentor-6',
    name: 'James Carter', 
    title: 'Mobile Engineering Lead', 
    avatarId: 'mentor-6', 
    expertise: ['iOS', 'Android', 'React Native'],
    industry: 'Mobile',
    bio: 'Building world-class mobile applications for millions of users. Can mentor on native development, cross-platform solutions, and performance.',
    topics: ['Mobile Development Careers', 'Native vs. Cross-Platform', 'App Store Optimization'],
    community: 'Industry',
    leaderboardRank: 11,
  },
];

export const allUsers: UserProfile[] = [
  ...allMentors.map(m => ({
    ...m,
    experience: [
      { role: m.title, company: m.industry === 'Tech' ? 'Innovate Inc.' : 'Creative Co.', period: '2020 - Present'},
      { role: 'Senior Developer', company: 'Legacy Systems', period: '2017 - 2020'}
    ],
    education: { degree: 'M.S. in Computer Science', university: 'State University', year: '2017'}
  })),
  {
    id: 'user-1',
    name: 'Alex Martinez',
    title: 'Software Engineering Student',
    avatarId: 'student-avatar',
    expertise: ['React', 'TypeScript', 'Next.js'],
    industry: 'Software',
    bio: 'A passionate student focusing on modern web technologies. Eager to learn and contribute to open-source projects.',
    community: 'Student',
    experience: [],
    education: { degree: 'B.S. in Computer Science', university: 'State University', year: '2025 (Expected)'},
    leaderboardRank: 12,
  },
    {
    id: 'user-2',
    name: 'Jessica Miller',
    title: 'Data Science Student',
    avatarId: 'mentor-5', // Reusing for mock
    expertise: ['Python', 'Pandas', 'Scikit-learn', 'AI/ML'],
    industry: 'Data Science',
    bio: 'Fascinated by data and the stories it can tell. Currently working on a project for sentiment analysis.',
    community: 'Student',
    experience: [],
    education: { degree: 'B.S. in Statistics', university: 'State University', year: '2025 (Expected)'},
    leaderboardRank: 2,
  }
];


export const mockAIQuest: AIQuestOutput = {
    questTitle: 'Engage with the Community',
    questDescription: 'Post a helpful article on a topic you are passionate about and receive feedback from 3 peers.',
    knowledgeCoinsReward: 50,
};

export const mockRecommendations: PersonalizedRecommendationsOutput = {
    "recommendations": [
        {
          "type": "mentor",
          "itemId": "mentor123",
          "reason": "This mentor has expertise in your area of interest, especially in AI and machine learning."
        },
        {
          "type": "job",
          "itemId": "job456",
          "reason": "This frontend developer role at a fast-growing startup matches your skills in React and interest in innovative projects."
        },
        {
            "type": "article",
            "itemId": "article789",
            "reason": "Given your interest in web development, this article on the future of web components will be a great read."
        },
        {
            "type": "project",
            "itemId": "projectABC",
            "reason": "Contribute to this open-source project to apply your web development skills and collaborate with others."
        }
      ]
};

export const mockSuggestedSkills: SkillPathOutput = {
  suggestedSkills: [
    {
      name: 'Python',
      reason: 'Its versatility and extensive libraries make it a must-have for AI and backend development.',
    },
    {
      name: 'Kubernetes',
      reason: 'Essential for deploying and managing scalable applications in a containerized environment.',
    },
    {
      name: 'CI/CD Pipelines',
      reason: 'Automating your build and deployment process is crucial for modern software engineering.',
    },
  ],
};


export type RegisteredEvent = {
  id: string;
  title: string;
  date: Date;
  location: string;
  type: 'Webinar' | 'Workshop' | 'Conference';
};

export const registeredEvents: RegisteredEvent[] = [
    { id: '1', title: 'AI in Modern Applications', date: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), location: 'Online', type: 'Webinar' },
    { id: '2', title: 'Advanced React Patterns', date: new Date(new Date().getTime() + 12 * 24 * 60 * 60 * 1000), location: 'Tech Hub Auditorium', type: 'Workshop' },
    { id: '3', title: 'Future of Tech Summit', date: new Date(new Date().getTime() + 20 * 24 * 60 * 60 * 1000), location: 'Convention Center', type: 'Conference' },
];

export type Community = {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  topContributors: string[];
  joinCost: number;
  icon: React.ComponentType<any>;
  imageId: string;
};

export const communities: Community[] = [
    {
        id: 'comm-1',
        name: 'Web Wizards',
        description: 'For all things web development. Discuss frameworks, share projects, and get feedback.',
        memberCount: 128,
        topContributors: ['Sarah J.', 'Mike L.'],
        joinCost: 200,
        icon: Code,
        imageId: 'community-web',
    },
    {
        id: 'comm-2',
        name: 'AI Innovators',
        description: 'Explore the latest in AI, from large language models to computer vision. For enthusiasts and experts alike.',
        memberCount: 85,
        topContributors: ['Dr. Reed', 'Alex M.'],
        joinCost: 250,
        icon: Bot,
        imageId: 'event-ai',
    },
    {
        id: 'comm-3',
        name: 'Data Dynamos',
        description: 'Dive deep into data analysis, visualization, and machine learning models. Share datasets and techniques.',
        memberCount: 92,
        topContributors: ['Jessica M.', 'David C.'],
        joinCost: 200,
        icon: BarChart2,
        imageId: 'event-inter-dept',
    },
];

export type CommunityPost = {
    id: string;
    authorId: string;
    content: string;
    timestamp: string;
    likes: number;
    comments: number;
}

export const communityPosts: CommunityPost[] = [
    {
        id: 'post-1',
        authorId: 'mentor-3', // Sarah Jones
        content: 'Just found this awesome collection of open-source UI animations. Perfect for anyone looking to spice up their web projects! Check it out: ui-animations.dev',
        timestamp: '2h ago',
        likes: 15,
        comments: 4,
    },
    {
        id: 'post-2',
        authorId: 'user-1', // Alex Martinez
        content: 'I\'m working on a side project with Next.js 14 and Server Actions. Has anyone found a good way to handle complex form validation state across multiple components? The official docs are a bit light on this specific use case.',
        timestamp: '1d ago',
        likes: 8,
        comments: 6,
    },
    {
        id: 'post-3',
        authorId: 'mentor-2', // David Chen
        content: 'Quick tip for everyone preparing for system design interviews: Don\'t just focus on the components (load balancers, databases, etc.). Spend equal time on the "non-functionals" - scalability, latency, availability, and consistency. Explaining your trade-offs is key.',
        timestamp: '3d ago',
        likes: 42,
        comments: 12,
    },
    {
        id: 'post-4',
        authorId: 'user-2', // Jessica Miller
        content: 'Has anyone worked with the new D3.js v7 library? I\'m trying to create a custom force-directed graph for a network visualization project and running into some issues with node positioning. Any pointers would be appreciated!',
        timestamp: '5d ago',
        likes: 23,
        comments: 9,
    }
];

export type MockArticle = {
  id: string;
  title: string;
  authorId: string;
  imageId: string;
  tags: string[];
  readTime: number; // in minutes
  likes: number;
  comments: number;
};

export const mockArticles: MockArticle[] = [
  { id: 'article-1', title: 'A Deep Dive into React Server Components', authorId: 'mentor-2', imageId: 'article-react', tags: ['React', 'Next.js', 'Web Dev'], readTime: 8, likes: 128, comments: 12 },
  { id: 'article-2', title: 'The Rise of Vector Databases in AI', authorId: 'mentor-1', imageId: 'article-ai', tags: ['AI/ML', 'Databases'], readTime: 12, likes: 256, comments: 25 },
  { id: 'article-3', title: 'Creating a Design System with Figma and Storybook', authorId: 'mentor-3', imageId: 'article-design', tags: ['UX/UI', 'Design Systems'], readTime: 15, likes: 340, comments: 32 },
  { id: 'article-4', title: 'My Journey into Cybersecurity', authorId: 'mentor-4', imageId: 'article-security', tags: ['Cybersecurity', 'Career'], readTime: 7, likes: 98, comments: 8 },
  { id: 'article-5', title: 'Product Management 101: A Beginner\'s Guide', authorId: 'mentor-5', imageId: 'article-product', tags: ['Product', 'Beginner'], readTime: 10, likes: 175, comments: 18 },
  { id: 'article-6', title: 'Optimizing Mobile App Performance on iOS', authorId: 'mentor-6', imageId: 'article-mobile', tags: ['iOS', 'Mobile Dev'], readTime: 9, likes: 112, comments: 11 },
  { id: 'article-7', title: 'Is GraphQL Still Relevant in 2024?', authorId: 'user-1', imageId: 'article-graphql', tags: ['Web Dev', 'API'], readTime: 6, likes: 88, comments: 21 },
  { id: 'article-8', title: 'Getting Started with Pandas for Data Analysis', authorId: 'user-2', imageId: 'article-pandas', tags: ['Data Science', 'Python'], readTime: 11, likes: 210, comments: 15 },
  { id: 'article-9', title: 'Understanding CI/CD Pipelines', authorId: 'mentor-2', imageId: 'event-cloud', tags: ['DevOps', 'CI/CD'], readTime: 10, likes: 150, comments: 14 },
];

export type AcademicCourse = {
    id: string;
    name: string;
    progress: number;
    grade: number;
    letterGrade: string;
};

export const academicCourses: AcademicCourse[] = [
    { id: 'cs50', name: 'CS50: Introduction to Computer Science', progress: 75, grade: 92, letterGrade: 'A-' },
    { id: 'math201', name: 'MATH201: Linear Algebra', progress: 90, grade: 95, letterGrade: 'A' },
    { id: 'ds300', name: 'DS300: Data Structures & Algorithms', progress: 60, grade: 88, letterGrade: 'B+' },
    { id: 'hum101', name: 'HUM101: Ethics in Technology', progress: 85, grade: 91, letterGrade: 'A-' },
];

export type UpcomingAssignment = {
    id: string;
    title: string;
    course: string;
    dueDate: string;
    priority: 'High' | 'Medium' | 'Low';
};

export const upcomingAssignments: UpcomingAssignment[] = [
    { id: '1', title: 'Problem Set 5', course: 'CS50', dueDate: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString(), priority: 'High' },
    { id: '2', title: 'Mid-term Exam', course: 'MATH201', dueDate: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString(), priority: 'High' },
    { id: '3', title: 'Lab 4: Linked Lists', course: 'DS300', dueDate: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString(), priority: 'Medium' },
    { id: '4', title: 'Reading Response 3', course: 'HUM101', dueDate: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(), priority: 'Low' },
];

export type Quest = {
    id: string;
    title: string;
    description: string;
    category: 'Weekly' | 'Community' | 'Special Event';
    rewardPoints: number;
    status: 'active' | 'completed';
    progress: number;
    cta: string;
}

export const allQuests: Quest[] = [
    { id: 'q1', title: 'Community Connector', description: 'Join a new community and introduce yourself.', category: 'Community', rewardPoints: 100, status: 'active', progress: 0, cta: 'Explore Communities' },
    { id: 'q2', title: 'Knowledge Sharer', description: 'Ask a thoughtful question in a community discussion.', category: 'Community', rewardPoints: 150, status: 'active', progress: 50, cta: 'Go to Feed' },
    { id: 'q3', title: 'Weekly Wisdom', description: 'Read 3 articles from your recommended feed.', category: 'Weekly', rewardPoints: 75, status: 'active', progress: 33, cta: 'Read Articles' },
    { id: 'q4', title: 'Mentor Meetup', description: 'Schedule your first session with a mentor.', category: 'Weekly', rewardPoints: 200, status: 'completed', progress: 100, cta: '' },
    { id: 'q5', title: 'Career Kickstarter', description: 'Apply for a job using the AI Quick Apply feature.', category: 'Weekly', rewardPoints: 100, status: 'completed', progress: 100, cta: '' },
    { id: 'q6', title: 'Hackathon Participant', description: 'Register for the upcoming "AI for Good" hackathon.', category: 'Special Event', rewardPoints: 500, status: 'active', progress: 0, cta: 'Register Now' },
];
