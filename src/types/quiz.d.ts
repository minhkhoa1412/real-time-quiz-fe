export enum QuizParticipantStatus {
  UNACTIVE = 'UNACTIVE',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
}

interface QuizContent {
  question: string;
  options: string[];
  answer: string;
  createdAt: Date;
}

export interface IQuiz {
  id: string;
  myScore?: number;
  title: string;
  content: QuizContent[];
  participants: QuizParticipation[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IQuizParticipation {
  id: string;
  userId: string;
  quizId: string;
  score: number;
  status: QuizParticipantStatus;
  user?: IUser;
}
