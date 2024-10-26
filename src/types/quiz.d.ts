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
  title: string;
  createdAt: Date;
  updatedAt: Date;
  content: QuizContent[];
  participants: QuizParticipation[];
}

export interface IQuizParticipation {
  id: string;
  userId: string;
  quizId: string;
  score: number;
  status: QuizParticipantStatus;
  user: User;
  quiz: Quiz;
}
