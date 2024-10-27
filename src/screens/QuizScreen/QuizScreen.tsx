import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSocket } from '~/hooks/SocketScore';
import { useRxStore } from '~/hooks/Store';
import { quizStore } from '~/stores/QuizStore/QuizStore';

export const QuizScreen = () => {
  const activeQuiz = useRxStore({
    defaultValue: quizStore.activeQuiz,
    subject: quizStore.activeQuizSubject,
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { score, participants } = useSocket(
    activeQuiz?.myScore,
    activeQuiz?.id,
  );

  useFocusEffect(
    useCallback(() => {
      return () => {
        if (activeQuiz) {
          quizStore.completeQuiz(activeQuiz.id);
        }
      };
    }, []),
  );

  const handleOptionPress = async (selectedOption: string) => {
    try {
      if (activeQuiz) {
        const currentQuestion = activeQuiz.content[currentQuestionIndex];
        if (selectedOption === currentQuestion.answer) {
          await quizStore.updateScore(activeQuiz.id, score + 1);
        }
        if (currentQuestionIndex < activeQuiz.content.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
          Alert.alert('Quiz Completed', `Your score is ${score + 1}`);
        }
      }
    } catch (error: any) {
      console.error('Error updating score:', error);
      Alert.alert(`Error updating score: ${error.message}`);
    }
  };

  if (!activeQuiz) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading...</Text>
      </View>
    );
  }

  const currentQuestion = activeQuiz.content[currentQuestionIndex];

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.score}>Score: {score}</Text>
        <Text style={styles.title}>{activeQuiz.title}</Text>
        <Text style={styles.question}>{currentQuestion.question}</Text>
        {currentQuestion.options.map((option, index) => (
          <Button
            key={option}
            title={option}
            onPress={() => handleOptionPress(option)}
          />
        ))}
      </View>
      <Text style={styles.textTitle}>Member in room</Text>
      <ScrollView>
        {participants?.map((participant) => (
          <Text style={styles.text} key={participant.user.userName}>
            Name: {participant.user.userName} - Score: {participant.score}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 16,
  },
  score: {
    fontSize: 20,
    marginBottom: 16,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  question: {
    fontSize: 18,
    marginBottom: 16,
    textAlign: 'center',
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
