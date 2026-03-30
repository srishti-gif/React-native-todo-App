import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Keyboard } from 'react-native';
import { useDebounce } from '../hooks/useDebounce';

export function SearchTodo({
  setSearch,
}: {
  setSearch: (val: string) => void;
}) {
  const [input, setInput] = useState('');
  const debounced = useDebounce(input, 500);

  useEffect(() => {
    setSearch(debounced);
  }, [debounced]);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="🔍 Search"
        placeholderTextColor="gray"
        value={input}
        onChangeText={setInput}
        style={styles.input}
        returnKeyType="search"
        onSubmitEditing={Keyboard.dismiss}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1e293b',
    padding: 10,
    borderRadius: 10,
    width: 130,
  },
  input: {
    color: 'white',
  },
});
