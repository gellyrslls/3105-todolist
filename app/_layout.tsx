import React from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TodoList from '../components/TodoList';

const Layout = () => {
  const [massCheck, setMassCheck] = React.useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.title}>Tasks</Text>
        {/* "Check All" button */}
        <Icon
          name={massCheck ? "check-box" : "check-box-outline-blank"}
          size={28}
          color="black"
          onPress={() => setMassCheck(!massCheck)} // Toggle mass check state
        />
      </View>
      {/* Pass massCheck and setMassCheck as props to TodoList */}
      <TodoList massCheck={massCheck} setMassCheck={setMassCheck} />
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
    paddingVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Layout;
