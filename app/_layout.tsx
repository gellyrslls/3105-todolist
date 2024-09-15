import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import TodoList from '../components/TodoList';

const Layout = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TodoList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default Layout;