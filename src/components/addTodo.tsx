import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

export default function AddTodo({ addNewTask }: any) {
  const [input, setInput] = useState('');
  const [priority, setPriority] = useState('medium');

  const handleAdd = () => {
    if (input.trim() === '') return;

    addNewTask(input, priority);
    setInput('');
  };

  return (
    <View
      style={{
        backgroundColor: '#1e293b',
        padding: 12,
        borderRadius: 12,
        marginVertical: 10,
      }}
    >
      {/* INPUT */}
      <TextInput
        placeholder="Add new task..."
        placeholderTextColor="gray"
        value={input}
        onChangeText={setInput}
        style={{
          color: 'white',
          marginBottom: 10,
        }}
      />

      {/* PRIORITY BUTTONS */}
      <View style={{ flexDirection: 'row', marginBottom: 10 }}>
        {['low', 'medium', 'high'].map(p => (
          <TouchableOpacity
            key={p}
            onPress={() => setPriority(p)}
            style={{
              padding: 6,
              marginRight: 8,
              borderRadius: 6,
              backgroundColor: priority === p ? '#22c55e' : '#334155',
            }}
          >
            <Text style={{ color: 'white' }}>{p}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ADD BUTTON */}
      <TouchableOpacity
        onPress={handleAdd}
        style={{
          backgroundColor: '#22c55e',
          padding: 10,
          borderRadius: 8,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'black', fontWeight: 'bold' }}>Add Todo</Text>
      </TouchableOpacity>
    </View>
  );
}
