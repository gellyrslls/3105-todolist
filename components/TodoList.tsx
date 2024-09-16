import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, StyleSheet, Text, Modal, Pressable } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { FAB } from 'react-native-paper';

interface TodoItem {
  id: number;
  text: string;
  checked: boolean;
}

const TodoList = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [inputText, setInputText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [massCheck, setMassCheck] = useState(false);

  const addTodo = () => {
    if (inputText.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: inputText,
        checked: false,
      };
      setTodos([...todos, newTodo]);
      setInputText('');
      setModalVisible(false); // Close the modal after adding the task
    }
  };

  const toggleCheck = (id: number) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, checked: !todo.checked } : todo
    );
    setTodos(updatedTodos);
  };

  const toggleMassCheck = () => {
    const updatedTodos = todos.map(todo => ({
      ...todo,
      checked: !massCheck,
    }));
    setTodos(updatedTodos);
    setMassCheck(!massCheck);
  };

  const deleteTodo = (id: number) => {
    const filteredTodos = todos.filter(todo => todo.id !== id);
    setTodos(filteredTodos);
  };

  return (
    <View style={styles.container}>
      {/* FlatList to render all the tasks */}
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <CheckBox
              checked={item.checked}
              onPress={() => toggleCheck(item.id)}
              containerStyle={styles.checkboxContainer}
              checkedColor="green"
            />
            <Text style={item.checked ? styles.checkedText : styles.uncheckedText}>
              {item.text}
            </Text>
            <Button title="Delete" onPress={() => deleteTodo(item.id)} />
          </View>
        )}
      />

      {/* Modal for adding new tasks */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <TextInput
            style={styles.input}
            placeholder="Enter task..."
            value={inputText}
            onChangeText={setInputText}
          />
          <Pressable style={styles.button} onPress={addTodo}>
            <Text style={styles.buttonText}>Add Task</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => setModalVisible(false)}>
            <Text style={styles.buttonText}>Cancel</Text>
          </Pressable>
        </View>
      </Modal>

      {/* Floating Action Button */}
      <FAB
        style={styles.fab}
        small
        icon="plus"
        onPress={() => setModalVisible(true)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    width: '80%',
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  checkboxContainer: {
    padding: 0,
    margin: 0,
  },
  checkedText: {
    textDecorationLine: 'line-through',
    color: 'green',
    flex: 1,
  },
  uncheckedText: {
    color: '#000',
    flex: 1,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#6200ee',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default TodoList;
