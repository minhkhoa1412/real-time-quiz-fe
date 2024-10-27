import { useCallback, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { leaderboardStore } from '~/stores/LeaderboardStore/LeaderboardStore';

export interface LeaderboardEntry {
  userId: string;
  userName: string;
  rankNumber: number;
  totalScore: number;
}

export const useSocketLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  const handleLeaderboardUpdate = useCallback(
    (data: LeaderboardEntry) => {
      console.log('leaderboard updated', data);

      setLeaderboard(prevLeaderboard => {
        let updatedLeaderboard = prevLeaderboard.map(entry =>
          entry.userId === data.userId ? { ...entry, ...data } : entry,
        );

        if (!updatedLeaderboard.find(entry => entry.userId === data.userId)) {
          updatedLeaderboard.push(data);
        }

        updatedLeaderboard = updatedLeaderboard.map(entry => {
          if (entry.userId !== data.userId) {
            if (entry.rankNumber === data.rankNumber) {
              return { ...entry, rankNumber: entry.rankNumber + 1 };
            } else if (entry.rankNumber > data.rankNumber) {
              return entry;
            }
          }
          return entry;
        });

        return updatedLeaderboard.sort((a, b) => a.rankNumber - b.rankNumber);
      });
    },
    [leaderboard],
  );

  useEffect(() => {
    const socket = io('http://localhost:3000/leaderboard', {
      transports: ['websocket'],
    });

    const fetchInitialLeaderboard = async () => {
      const initialLeaderboard = await leaderboardStore.getLeaderboard();
      setLeaderboard(initialLeaderboard);
    };

    fetchInitialLeaderboard();

    socket.connect();
    socket.on('leaderboardUpdate', handleLeaderboardUpdate);

    return () => {
      socket.disconnect();
    };
  }, []);

  return { leaderboard };
};
