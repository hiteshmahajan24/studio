import { Award, Star, Trophy, type LucideIcon } from 'lucide-react';
import type { AIQuestOutput } from '@/ai/flows/ai-quest-generator';
import type { PersonalizedRecommendationsOutput } from '@/ai/flows/personalized-recommendations';
import { SkillPathOutput } from '@/ai/flows/skill-path';


export type JobApplication = {
  id: string;
  title: string;
  company: string;
  status: 'Applied' | 'Under Review' | 'Interview' | 'Offered' | 'Rejected';
};

export const jobApplications: JobApplication[] = [
  { id: '1', title: 'Frontend Developer', company: 'Innovate Inc.', status: 'Under Review' },
  { id: '2', title: 'Full-Stack Engineer', company: 'Tech Solutions', status: 'Interview' },
  { id: '3', title: 'Product Manager Intern', company: 'Creative Co.', status: 'Applied' },
  { id: '4', title: 'Data Scientist', company: 'Data Insights', status: 'Rejected' },
];

export const openOpportunities = [
    {
      id: 'job1',
      title: 'Frontend Developer',
      company: 'Innovate Inc.',
      description: 'Seeking a creative Frontend Developer to build beautiful and responsive user interfaces using React and Tailwind CSS.',
    },
    {
      id: 'job2',
      title: 'AI/ML Engineer',
      company: 'Data Driven Co.',
      description: 'Join our AI team to build next-generation machine learning models. Experience with Python, TensorFlow, and cloud platforms is a must.',
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
        skills: ['React', 'TypeScript', 'Next.js', 'Node.js', 'Python', 'GCP'],
        experience: '3+ years in web development, focusing on frontend technologies. Contributed to several open-source projects.',
        resumes: [
            { id: 'resume-general', name: 'General Web Dev Resume.pdf', content: '...' },
            { id: 'resume-ai', name: 'AI/ML Focused Resume.pdf', content: '...' },
        ],
        certificates: [
            { id: 'cert-react', name: 'Advanced React Certification', tech: ['React', 'Next.js'] },
            { id: 'cert-gcp', name: 'GCP Associate Cloud Engineer', tech: ['GCP', 'Kubernetes'] },
            { id: 'cert-python', name: 'Python for Data Science', tech: ['Python'] },
        ]
    }
};

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
