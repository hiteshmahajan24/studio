
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { user as initialUser } from '@/lib/mock-data';

type UserState = {
  knowledgeCoins: number;
  setKnowledgeCoins: (coins: number) => void;
  joinedCommunityIds: string[];
  joinCommunity: (communityId: string) => void;
  registeredEventIds: string[];
  registerForEvent: (eventId: string) => void;
};

const UserStateContext = createContext<UserState | undefined>(undefined);

export function UserStateProvider({ children }: { children: ReactNode }) {
  const [knowledgeCoins, setKnowledgeCoins] = useState(initialUser.knowledgeCoins);
  const [joinedCommunityIds, setJoinedCommunityIds] = useState<string[]>([]);
  const [registeredEventIds, setRegisteredEventIds] = useState<string[]>([]);

  const joinCommunity = (communityId: string) => {
    setJoinedCommunityIds((prev) => [...new Set([...prev, communityId])]);
  };

  const registerForEvent = (eventId: string) => {
    setRegisteredEventIds((prev) => [...new Set([...prev, eventId])]);
  };

  const value = {
    knowledgeCoins,
    setKnowledgeCoins,
    joinedCommunityIds,
    joinCommunity,
    registeredEventIds,
    registerForEvent,
  };

  return (
    <UserStateContext.Provider value={value}>
      {children}
    </UserStateContext.Provider>
  );
}

export function useUserState() {
  const context = useContext(UserStateContext);
  if (context === undefined) {
    throw new Error('useUserState must be used within a UserStateProvider');
  }
  return context;
}
