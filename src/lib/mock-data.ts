import { Award, Star, Trophy, type LucideIcon } from 'lucide-react';
import type { AIQuestOutput } from '@/ai/flows/ai-quest-generator';
import type { PersonalizedRecommendationsOutput } from '@/ai/flows/personalized-recommendations';
import { SkillPathOutput } from '@/ai/flows/skill-path';


export type JobApplication = {
  id: string;
  title: string;
  company: string;
  status: 'Applied' | 'Under Review' | 'Interview' | 'Offered' | 'Rejected';
  dateApplied: string;
};

export const jobApplications: JobApplication[] = [
  { id: '1', title: 'Frontend Developer', company: 'Innovate Inc.', status: 'Under Review', dateApplied: '2024-07-15' },
  { id: '2', title: 'Full-Stack Engineer', company: 'Tech Solutions', status: 'Interview', dateApplied: '2024-07-12' },
  { id: '3', title: 'Product Manager Intern', company: 'Creative Co.', status: 'Applied', dateApplied: '2024-07-18' },
  { id: '4', title: 'Data Scientist', company: 'Data Insights', status: 'Rejected', dateApplied: '2024-07-05' },
];

export const openOpportunities = [
    {
      id: 'job1',
      title: 'Frontend Developer',
      company: 'Innovate Inc.',
      description: 'Seeking a creative Frontend Developer to build beautiful and responsive user interfaces using React and Tailwind CSS. The ideal candidate has experience with Next.js and a passion for clean code.',
    },
    {
      id: 'job2',
      title: 'AI/ML Engineer',
      company: 'Data Driven Co.',
      description: 'Join our AI team to build next-generation machine learning models. Experience with Python, TensorFlow, and cloud platforms like GCP is a must.',
    },
    {
        id: 'job3',
        title: 'Cloud Solutions Architect',
        company: 'ScaleUp Cloud',
        description: 'Design and implement scalable cloud infrastructure on GCP and AWS. Looking for experts in Kubernetes, Terraform, and CI/CD.',
    }
]

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
  description: string;
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
  community: 'Alumni' | 'Faculty' | 'Student';
  experience: Experience[];
  education: Education;
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
  },
];

export const allUsers: UserProfile[] = [
  ...allMentors.map(m => ({
    ...m,
    experience: [
      { role: m.title, company: m.industry === 'Tech' ? 'Innovate Inc.' : 'Creative Co.', period: '2020 - Present', description: 'My current role focuses on my primary expertise.'},
      { role: 'Senior Developer', company: 'Legacy Systems', period: '2017 - 2020', description: 'Worked on maintaining and upgrading legacy codebases.'}
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
    education: { degree: 'B.S. in Computer Science', university: 'State University', year: '2025 (Expected)'}
  },
    {
    id: 'user-2',
    name: 'Jessica Miller',
    title: 'Data Science Student',
    avatarId: 'mentor-5', // Reusing for mock
    expertise: ['Python', 'Pandas', 'Scikit-learn'],
    industry: 'Data Science',
    bio: 'Fascinated by data and the stories it can tell. Currently working on a project for sentiment analysis.',
    community: 'Student',
    experience: [],
    education: { degree: 'B.S. in Statistics', university: 'State University', year: '2025 (Expected)'}
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
