import { useCallback, useEffect, useState } from 'react';
import { filter } from 'rxjs';
import io from 'socket.io-client';
import { authStore } from '~/stores/AuthStore/AuthStore';
import { IQuizParticipation } from '~/types/quiz';

const SOCKET_URL = 'http://localhost:3000/quiz';

export const useSocket = (initScore?: number, quizId?: string) => {
  const [score, setScore] = useState(initScore ?? 0);
  const [socket, setSocket] = useState<any>(null);
  const [participants, setParticipants] = useState<IQuizParticipation[]>([]);

  const handleParticipantsUpdated = useCallback(
    (data: any) => {
      console.log('participantsUpdated updated:', data);

      setParticipants((prevParticipants: any) => {
        if (data.isJoining) {
          return [...prevParticipants, data.participants];
        } else {
          return prevParticipants.filter(
            (p: any) => p.userId !== data.participants.userId,
          );
        }
      });
    },
    [participants],
  );

  const handleScoreUpdated = useCallback(
    (data: any) => {
      console.log('Score updated:', data);

      if (data.userId === authStore.userInfo?.id) {
        setScore(data.score);
      }
      setParticipants(prevParticipants =>
        prevParticipants.map(p =>
          p.userId === data.userId ? { ...p, score: data.score } : p,
        ),
      );
    },
    [participants, score],
  );

  useEffect(() => {
    const socket = io(SOCKET_URL, {
      transports: ['websocket'],
    });

    socket.on('connect', () => {
      console.log('Connected to socket server');
      socket.emit('joinQuizRoom', { quizId });
      socket.once('joinQuizRoom', (data: any) => {
        console.log('All participants in quiz:', data);
        setParticipants(data);
      });
    });

    socket.on('scoreUpdated', handleScoreUpdated);

    socket.on('participantsUpdated', handleParticipantsUpdated);

    socket.on('disconnect', () => {
      console.log('Disconnected from socket server');
    });

    setSocket(socket);

    return () => {
      console.log('useSocket cleanup');
      socket.disconnect();
    };
  }, []);

  return { score, participants, socket };
};
