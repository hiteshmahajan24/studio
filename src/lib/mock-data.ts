import { Award, Star, Trophy, type LucideIcon } from 'lucide-react';

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
  Icon: LucideIcon;
};

export const earnedBadges: Badge[] = [
    { id: '1', name: 'First Article', Icon: Star },
    { id: '2', name: 'Hackathon Hero', Icon: Trophy },
    { id: '3', name: 'Top Contributor', Icon: Award },
];

export const user = {
    name: 'Alex Martinez',
    knowledgeCoins: 1250,
    leaderboardRank: 12,
};
