import { BehaviorSubject } from 'rxjs';
import { Storable } from '../AsyncStorage/Storable';
import { axiosInstance } from '../../utilities/AxiosConfig';
import { IQuiz } from '~/types/quiz';

class QuizStore extends Storable {
  private _activeQuiz = new BehaviorSubject<IQuiz | null>(null);

  constructor() {
    console.log('intitializing QuizStore');
    super();
  }

  get activeQuiz() {
    return this._activeQuiz.getValue();
  }
  set activeQuiz(value: IQuiz | null) {
    this._activeQuiz.next(value);
  }
  get activeQuizSubject() {
    return this._activeQuiz;
  }

  async getQuizByIdAndJoin(quizId: string) {
    try {
      console.log('ahihihihi fe')
      const quizRes = await axiosInstance.get(`/quiz/${quizId}`);
      console.log('quizRes:', quizRes.data);
      if (quizRes.data) {
        const joinRes = await axiosInstance.post(`/quiz/${quizId}/join`);
        console.log('joinRes:', joinRes.data);
        if (joinRes.data) {
          this.activeQuiz = quizRes.data;
        }
      }
    } catch (error: any) {
      console.error('Error at getQuizByIdAndJoin:', error);
      throw error;
    }
  }

  async updateScore(quizId: string, score: number) {
    try {
      const res = await axiosInstance.post(`/quiz/${quizId}/score`, {
        score,
      });
      if (res.data) {
        console.log('Score updated:', res.data);
      }
    } catch (error: any) {
      console.error('Error at updateScore:', error);
      throw error;
    }
  }
}

export const quizStore = new QuizStore();
