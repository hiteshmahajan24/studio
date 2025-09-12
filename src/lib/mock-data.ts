import { Award, Star, Trophy, type LucideIcon } from 'lucide-react';
import type { AIQuestOutput } from '@/ai/flows/ai-quest-generator';
import type { PersonalizedRecommendationsOutput } from '@/ai/flows/personalized-recommendations';


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

export type Badge = {
  id: string;
  name: string;
  description: string;
  Icon: LucideIcon;
};

export const earnedBadges: Badge[] = [
    { id: '1', name: 'First Article', description: 'Published your first article.', Icon: Star },
    { id: '2', name: 'Hackathon Hero', description: 'Participated in a hackathon.', Icon: Trophy },
    { id: '3', name: 'Top Contributor', description: 'Became a top content creator.', Icon: Award },
];

export const user = {
    name: 'Alex Martinez',
    knowledgeCoins: 1500,
    leaderboardRank: 12,
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
