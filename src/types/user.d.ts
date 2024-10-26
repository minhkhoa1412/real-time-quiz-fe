import { QuizParticipation } from './QuizParticipation';

export interface IUser {
  id: string;
  userName: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  quizzes: QuizParticipation[];
}
