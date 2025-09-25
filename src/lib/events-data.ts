
export type EventBase = {
    id: string;
    title: string;
    description: string;
    category: 'Competition' | 'Hackathon' | 'Workshop';
    participationType: 'individual' | 'team';
    date: string;
    imageId: string;
    spotsLeft: number;
}

export type PlatformEvent = EventBase & {
    hostType: 'platform';
    rewards: ('knowledge-coins' | 'unique-badge' | 'certificate')[];
};

export type CollegeEvent = EventBase & {
    hostType: 'college';
    rewards: ('prize-money' | 'certificate')[];
};

export const allEvents: (PlatformEvent | CollegeEvent)[] = [
    {
        id: 'plat-event-1',
        title: 'NexusConnect UI/UX Challenge',
        description: 'Redesign a component of the NexusConnect platform and present your case study.',
        category: 'Competition',
        participationType: 'individual',
        hostType: 'platform',
        rewards: ['knowledge-coins', 'unique-badge', 'certificate'],
        date: new Date(new Date().setDate(new Date().getDate() + 10)).toISOString(),
        imageId: 'event-ui-ux',
        spotsLeft: 25,
    },
    {
        id: 'plat-event-2',
        title: 'AI for Good Hackathon',
        description: 'Build an AI-powered solution to solve a real-world social problem in 48 hours.',
        category: 'Hackathon',
        participationType: 'team',
        hostType: 'platform',
        rewards: ['knowledge-coins', 'unique-badge'],
        date: new Date(new Date().setDate(new Date().getDate() + 25)).toISOString(),
        imageId: 'event-ai',
        spotsLeft: 12,
    },
    {
        id: 'coll-event-1',
        title: 'Annual CodeFest',
        description: 'The university\'s flagship competitive programming contest. Solve algorithmic challenges and win big.',
        category: 'Competition',
        participationType: 'individual',
        hostType: 'college',
        rewards: ['prize-money', 'certificate'],
        date: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString(),
        imageId: 'event-codefest',
        spotsLeft: 5,
    },
    {
        id: 'coll-event-2',
        title: 'Startup Pitch Day',
        description: 'Pitch your innovative business idea to a panel of investors and faculty members.',
        category: 'Competition',
        participationType: 'team',
        hostType: 'college',
        rewards: ['prize-money', 'certificate'],
        date: new Date(new Date().setDate(new Date().getDate() + 40)).toISOString(),
        imageId: 'event-pitch',
        spotsLeft: 18,
    },
    {
        id: 'plat-event-3',
        title: 'Cloud Deployment Workshop',
        description: 'Learn how to deploy scalable applications using modern CI/CD pipelines and cloud services.',
        category: 'Workshop',
        participationType: 'individual',
        hostType: 'platform',
        rewards: ['knowledge-coins', 'certificate'],
        date: new Date(new Date().setDate(new Date().getDate() + 15)).toISOString(),
        imageId: 'event-cloud',
        spotsLeft: 40,
    },
     {
        id: 'coll-event-3',
        title: 'Inter-Departmental Hackathon',
        description: 'Collaborate with students from different departments to build an innovative project.',
        category: 'Hackathon',
        participationType: 'team',
        hostType: 'college',
        rewards: ['prize-money', 'certificate'],
        date: new Date(new Date().setDate(new Date().getDate() + 20)).toISOString(),
        imageId: 'event-inter-dept',
        spotsLeft: 8,
    },
];
