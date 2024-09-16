import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, StyleSheet, Text, Modal, Pressable, TextInput, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { FAB } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface TodoItem {
  id: number;
  text: string;
  checked: boolean;
}

interface TodoListProps {
  todos: TodoItem[];
  setTodos: React.Dispatch<React.SetStateAction<TodoItem[]>>;
  massCheck: boolean;
  setMassCheck: React.Dispatch<React.SetStateAction<boolean>>;
  setCheckedCount: React.Dispatch<React.SetStateAction<number>>;
}

const TodoList: React.FC<TodoListProps> = ({ todos, setTodos, massCheck, setMassCheck, setCheckedCount }) => {
  const [inputText, setInputText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const inputRef = useRef<TextInput>(null);

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

  const toggleCheck = (id: number) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, checked: !todo.checked } : todo
    );
    setTodos(updatedTodos);
  };

  useEffect(() => {
    const updatedTodos = todos.map(todo => ({
      ...todo,
      checked: massCheck,
    }));
    setTodos(updatedTodos);
  }, [massCheck]);

  useEffect(() => {
    const checkedTodosCount = todos.filter(todo => todo.checked).length;
    setCheckedCount(checkedTodosCount);
  }, [todos, setCheckedCount]);

  useEffect(() => {
    if (modalVisible && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [modalVisible]);

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
              checkedColor="#8a8a8a"
            />
            <Text style={item.checked ? styles.checkedText : styles.uncheckedText}>
              {item.text}
            </Text>
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
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalBackdrop}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.modalView}
              >
                <TextInput
                  ref={inputRef}
                  style={styles.input}
                  placeholder="New task"
                  value={inputText}
                  onChangeText={setInputText}
                />

                <Pressable
                  onPress={addTodo}
                  disabled={inputText.trim() === ''}
                >
                  <Text style={[styles.saveButtonText, inputText.trim() === '' ? styles.disabledText : styles.activeText]}>
                    Save
                  </Text>
                </Pressable>
              </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
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
    color: '#8a8a8a',
    flex: 1,
  },
  uncheckedText: {
    color: '#000',
    flex: 1,
  },
  fab: {
    position: 'absolute',
    padding: 5,
    margin: 16,
    right: -15,
    bottom: 10,
    backgroundColor: '#9dbefc',
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    position: 'relative',
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    width: '100%',
  },
  saveButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  activeText: {
    color: '#007bff',
  },
  disabledText: {
    color: '#d3d3d3',
  },
});

export default TodoList;
