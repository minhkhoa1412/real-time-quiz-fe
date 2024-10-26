import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3000/quiz';

export const useSocket = (quizId?: string) => {
  const [score, setScore] = useState(0);
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    const socket = io(SOCKET_URL, {
      transports: ['websocket'],
    });

    socket.on('connect', () => {
      console.log('Connected to socket server');
      socket.emit('joinQuiz', { quizId });
    });

    socket.on('scoreUpdated', (data: any) => {
      console.log('Score updated:', data);
      setScore(data.score);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from socket server');
    });

    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, [quizId]);

  const socketEmit = () => {
    if (socket) {
      socket.emit('joinQuiz', { quizId, score });
    } 
  }

  return { score, socket, socketEmit };
};
