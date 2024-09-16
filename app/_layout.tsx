import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, Button } from 'react-native';
import TodoList from '../components/TodoList';

const Layout = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.title}>Tasks</Text>
        {/* Add a button to toggle mass check/uncheck */}
        <Button title="Check All" onPress={() => {/* You will handle this later in TodoList */}} />
      </View>
      <TodoList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Layout;
