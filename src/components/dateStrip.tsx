import React from 'react';
import { View, Text, TouchableOpacity , FlatList } from 'react-native';
import { StyleSheet } from 'react-native';

export default function DateStrip({
  dates,
  selectedDate,
  setSelectedDate,
}: any) {
  return (
    <View style={styles.container}>
      <FlatList
        data={dates}
        horizontal
        keyExtractor={item => item.key}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedDate(item.key)}
            style={[styles.item, { backgroundColor: selectedDate === item.key ? '#22c55e' : '#334155' }]}
          >
            <Text style={styles.label}>{item.label}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

 const styles = StyleSheet.create({
   container: {
     flexDirection: 'row',
     marginBottom: 20,
     backgroundColor: '#1e293b',
     padding: 10,
     borderRadius: 12,
   },
   item: {
     marginRight: 10,
     padding: 8,
     borderRadius: 8,
   },

   label:{
    color:"white"
   }
 });



