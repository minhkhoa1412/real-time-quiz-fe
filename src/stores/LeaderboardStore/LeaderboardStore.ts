import { axiosInstance } from '~/utilities/AxiosConfig';

class LeaderboardStore {
  async getLeaderboard() {
    try {
      const response = await axiosInstance.get('/leaderboard');
      console.log('leaderboard', response.data);
      return response.data;
    } catch (error) {
      console.error('Error getting leaderboard:', error);
    }
  }
}

export const leaderboardStore = new LeaderboardStore();
