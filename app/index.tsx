import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View, Button } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const TodoList = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Buy groceries', done: false },
    { id: 2, text: 'Walk the dog', done: false },
    { id: 3, text: 'Finish homework', done: false },
  ]);

  const toggleTask = (taskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, done: !task.done } : task
      )
    );
  };

  const renderItem = ({ item }: { item: { id: number; text: string; done: boolean } }) => (
    <View style={styles.taskContainer}>
      <CheckBox
        checked={item.done}
        onPress={() => toggleTask(item.id)}
        containerStyle={styles.checkbox}
      />
      <Text style={[styles.taskText, item.done && styles.taskDone]}>
        {item.text}
      </Text>
    </View>
  );

  return (
    <View>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <Button title="Check All" onPress={() => setTasks(tasks.map(task => ({ ...task, done: true })))} />
      <Button title="Uncheck All" onPress={() => setTasks(tasks.map(task => ({ ...task, done: false })))} />
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  checkbox: {
    padding: 0,
    marginRight: 10,
  },
  taskText: {
    fontSize: 16,
  },
  taskDone: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
});

export default TodoList;
