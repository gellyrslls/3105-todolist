import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, Modal, Pressable, TextInput } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { FAB } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Todo item type
interface TodoItem {
  id: number;
  text: string;
  checked: boolean;
}

interface TodoListProps {
  massCheck: boolean;
  setMassCheck: React.Dispatch<React.SetStateAction<boolean>>;
}

const TodoList: React.FC<TodoListProps> = ({ massCheck, setMassCheck }) => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [inputText, setInputText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  // Function to add a new todo item
  const addTodo = () => {
    if (inputText.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: inputText,
        checked: false,
      };
      setTodos([...todos, newTodo]);
      setInputText('');
      setModalVisible(false);
    }
  };

  // Function to toggle individual todo check
  const toggleCheck = (id: number) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, checked: !todo.checked } : todo
    );
    setTodos(updatedTodos);
  };

  // Effect to update all todos when "Check All" is toggled
  useEffect(() => {
    const updatedTodos = todos.map(todo => ({
      ...todo,
      checked: massCheck, // Apply mass check state to all todos
    }));
    setTodos(updatedTodos);
  }, [massCheck]); // This effect runs whenever massCheck changes

  // Function to delete a todo item
  const deleteTodo = (id: number) => {
    const filteredTodos = todos.filter(todo => todo.id !== id);
    setTodos(filteredTodos);
  };

  return (
    <View style={styles.container}>
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
            <Pressable onPress={() => deleteTodo(item.id)}>
              <Icon name="delete" size={30} color="red" />
            </Pressable>
          </View>
        )}
      />

      <FAB
        style={styles.fab}
        small={false}
        icon="plus"
        onPress={() => setModalVisible(true)}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <TextInput
            style={styles.input}
            placeholder="Add a task..."
            value={inputText}
            onChangeText={setInputText}
          />
          <Pressable style={styles.addButton} onPress={addTodo}>
            <Text style={styles.addButtonText}>Add Task</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
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
    backgroundColor: '#007bff',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    width: '80%',
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 10,
  },
  addButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default TodoList;
