import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function DateStrip({
  dates,
  selectedDate,
  setSelectedDate,
}: any) {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginBottom: 20,
        backgroundColor: '#1e293b',
        padding: 10,
        borderRadius: 12,
      }}
    >
      {dates.map((item: any, index: number) => (
        <TouchableOpacity
          key={index}
          onPress={() => setSelectedDate(item.key)}
          style={{
            marginRight: 10,
            padding: 8,
            borderRadius: 8,
            backgroundColor: selectedDate === item.key ? '#22c55e' : '#334155',
          }}
        >
          <Text style={{ color: 'white' }}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
