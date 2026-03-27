import React, { useEffect, useState } from 'react';
import { View, TextInput } from 'react-native';
import { useDebounce } from './useDebounce';

export  function SearchTodo({ setSearch }: any) {
  const [input, setInput] = useState('');
  const debounced = useDebounce(input, 500);

 
  useEffect(() => {
    setSearch(debounced);
  }, [debounced]);

  return (
    <View
      style={{
        backgroundColor: '#1e293b',
        padding: 10,
        borderRadius: 10,
        width: 130,
      }}
    >
      <TextInput
        placeholder="🔍 Search"
        placeholderTextColor="gray"
        value={input}
        onChangeText={setInput}
        style={{ color: 'white' }}
      />
    </View>
  );
}
