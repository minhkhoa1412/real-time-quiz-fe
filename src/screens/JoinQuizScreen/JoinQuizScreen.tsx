import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { useSocketLeaderboard } from '~/hooks/SocketLeaderboard';
import { useRxStore } from '~/hooks/Store';
import { authStore } from '~/stores/AuthStore/AuthStore';
import { leaderboardStore } from '~/stores/LeaderboardStore/LeaderboardStore';
import { quizStore } from '~/stores/QuizStore/QuizStore';

export const JoinQuizScreen = () => {
  const { navigate } = useNavigation<any>();
  const [quizId, setQuizId] = useState('671d2f21ec14da2bc4858a32');
  // const [quizId, setQuizId] = useState('671d32e18fb81cf4e0c11c95');
  const { leaderboard } = useSocketLeaderboard();

  const activeQuiz = useRxStore({
    defaultValue: quizStore.activeQuiz,
    subject: quizStore.activeQuizSubject,
  });

  useEffect(() => {
    if (activeQuiz) {
      navigate('QuizScreen');
    }
  }, [activeQuiz]);

  const handleJoinQuiz = () => {
    try {
      quizStore.getQuizByIdAndJoin(quizId);
    } catch (error: any) {
      console.error('Error joining quiz:', error);
      Alert.alert(`Error joining quiz: ${error.message}}`);
    }
  };

  const handleLogout = () => {
    authStore.logout();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Leaderboard</Text>
      <ScrollView>
        {leaderboard?.map(entry => (
          <Text style={styles.text} key={entry.userId}>
            Name: {entry.userName} - Score: {entry.totalScore} - Rank:{' '}
            {entry.rankNumber}
          </Text>
        ))}
      </ScrollView>
      <Text style={{ fontWeight: 'bold' }}>{`Username: ${
        authStore.userInfo?.userName ?? ''
      }`}</Text>
      <Text style={{}}>{`UserID: ${authStore.userInfo?.id ?? ''}`}</Text>
      <Text style={styles.title}>Join Quiz</Text>
      <TextInput
        style={styles.input}
        placeholder='Enter Quiz ID'
        value={quizId}
        onChangeText={setQuizId}
      />
      <Button title='Confirm' onPress={handleJoinQuiz} />
      <Button title='Logout' onPress={handleLogout} />
      <View style={{ marginBottom: 100 }}>
        <Button
          title='Get leaderboard'
          onPress={() => {
            leaderboardStore.getLeaderboard();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  textTitle: {
    fontSize: 22,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
});
