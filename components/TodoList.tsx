import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, StyleSheet, Text } from 'react-native';
import { CheckBox } from 'react-native-elements'; // Import CheckBox from react-native-elements

// Each item will have an ID, text content, and a checked state
interface TodoItem {
  id: number;
  text: string;
  checked: boolean;
}

const TodoList = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]); // Stores all the to-do items
  const [inputText, setInputText] = useState('');     // Stores the input text for a new task
  const [massCheck, setMassCheck] = useState(false);  // Toggles mass check/uncheck

  // Function to add a new todo item
  const addTodo = () => {
    if (inputText.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: inputText,
        checked: false,
      };
      setTodos([...todos, newTodo]);  // Add new item to the list
      setInputText('');               // Clear the input
    }
  };

  // Function to toggle check/uncheck for individual items
  const toggleCheck = (id: number) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, checked: !todo.checked } : todo
    );
    setTodos(updatedTodos);
  };

  // Function to mass check/uncheck all items
  const toggleMassCheck = () => {
    const updatedTodos = todos.map(todo => ({
      ...todo,
      checked: !massCheck,  // Set all items' checked state based on massCheck
    }));
    setTodos(updatedTodos);
    setMassCheck(!massCheck);  // Toggle massCheck state
  };

  // Function to delete a todo item
  const deleteTodo = (id: number) => {
    const filteredTodos = todos.filter(todo => todo.id !== id);
    setTodos(filteredTodos);  // Update the list by removing the selected item
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Add a task..."
        value={inputText}
        onChangeText={setInputText}
      />
      <Button title="Add Task" onPress={addTodo} />

      {/* Mass check/uncheck button */}
      <Button title={massCheck ? "Uncheck All" : "Check All"} onPress={toggleMassCheck} />

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
    flex: 1, // Let text take up remaining space
  },
  uncheckedText: {
    color: '#000',
    flex: 1, // Let text take up remaining space
  },
});

export default TodoList;
