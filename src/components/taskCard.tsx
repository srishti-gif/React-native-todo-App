import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const TaskCard = ({ item, toggleDone, deleteTask }: any) => {
  return (
    <View
      style={{
        backgroundColor: '#1e293b',
        padding: 15,
        borderRadius: 12,
        marginVertical: 6,
      }}
    >
      <Text style={{ color: 'white', fontSize: 16 }}>{item.title}</Text>

      <Text style={{ color: 'gray', marginTop: 5 }}>{item.desc}</Text>

      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        <Text
          style={{
            color:
              item.priority === 'high'
                ? 'red'
                : item.priority === 'medium'
                ? 'orange'
                : 'green',
          }}
        >
          {item.priority}
        </Text>

        <TouchableOpacity onPress={() => toggleDone(item.id)}>
          <Text style={{ marginLeft: 15, color: 'white' }}>
            {item.done ? '✅' : '⬜'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => deleteTask(item.id)}>
          <Text style={{ marginLeft: 15, color: 'red' }}>❌</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TaskCard;
