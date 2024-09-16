import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, Pressable, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TodoList from '../components/TodoList';

const Layout = () => {
  const [massCheck, setMassCheck] = React.useState(false);
  const [checkedCount, setCheckedCount] = React.useState(0);
  const [todos, setTodos] = React.useState([]);

  const handleDeleteChecked = () => {
      const remainingTodos = todos.filter(todo => !todo.checked);
      setTodos(remainingTodos);
      setCheckedCount(0);
      setMassCheck(false);
    };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.title}>Tasks</Text>

        <View style={styles.iconContainer}>
          {checkedCount > 0 && (
            <Pressable onPress={handleDeleteChecked}>
              <Icon name="delete" size={36} color="black" />
            </Pressable>
          )}

          <Icon
            name={massCheck ? "check-box" : "check-box-outline-blank"}
            size={36}
            color="black"
            onPress={() => setMassCheck(!massCheck)}
          />
        </View>
      </View>

      <TodoList
        todos={todos}
        setTodos={setTodos}
        massCheck={massCheck}
        setMassCheck={setMassCheck}
        setCheckedCount={setCheckedCount}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Layout;
