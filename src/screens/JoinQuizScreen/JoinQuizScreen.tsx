import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export const JoinQuizScreen = () => {
  const [quizId, setQuizId] = useState('');

  const handleJoinQuiz = () => {
    // Logic to join the quiz using the quizId
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Join Quiz</Text>
      <TextInput
        style={styles.input}
        placeholder='Enter Quiz ID'
        value={quizId}
        onChangeText={setQuizId}
      />
      <Button title='Confirm' onPress={handleJoinQuiz} />
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
});
