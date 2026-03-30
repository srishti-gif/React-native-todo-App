import React, { useMemo, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import DateStrip from './src/components/dateStrip';
import TaskCard from './src/components/taskCard';
import AddTodo from './src/components/addTodo';
import { SearchTodo } from './src/components/searchTodo';
import { mockTasks } from './src/components/mockData';

const DATES_FROM_NOW = 7;
  // Priority sort order
  const priorityOrder: Record<string, number> = {
    high: 1,
    medium: 2,
    low: 3,
  };

const App = () => {
  const [tasks, setTasks] = useState([...mockTasks]);
  const [search, setSearch] = useState('');



 const dates = useMemo(() => {
   const today = new Date();
   return Array.from({ length: DATES_FROM_NOW }, (_, index) => {
     const d = new Date();
     d.setDate(today.getDate() + index);
     const key = d.toISOString().split('T')[0];
     const label = d.toDateString().slice(4, 10);
     return { key, label };
   });
 }, []);
 const [selectedDate, setSelectedDate] = useState<string | null>(
   dates[0]?.key ?? null,
 );

 const updateTodo = (id: number, title: string, desc: string, priority: string) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === id ? { ...t, title, desc, priority: priority as 'high' | 'medium' | 'low' } : t,
      ),
    );
  }

  const addNewTask = (title: string, priority: string) => {
    if (!selectedDate) return; 

    const newTask = {
      id: Date.now(),
      date: selectedDate,
      title,
      desc: '',
      priority: priority as 'high' | 'medium' | 'low',
      category: 'General',
      done: false,
    };

    setTasks(prev => [newTask, ...prev]);
  };

  const toggleDone = (id: number) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, done: !t.done } : t)),
    );
  };


  const deleteTask = (id: number) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };


  const filteredTasks = useMemo(() => {
    if (!selectedDate) return []; 

    return tasks
      .filter(item => {
        const matchDate = item.date === selectedDate;
        const matchSearch = item.title
          .toLowerCase()
          .includes(search.toLowerCase());
        return matchDate && matchSearch;
      })
      .sort((a, b) => Number(a.done) - Number(b.done)) 
      .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]); 
  }, [tasks, selectedDate, search]);

  return (
    <View
      style={styles.container}
    >
      <Text style={{ fontSize: 24, color: 'white', marginBottom: 10 }}>
        My Tasks
      </Text>

      <DateStrip
        dates={dates}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      <View
        // style={{ flexDirection: 'column', justifyContent: 'space-between' }}
      >
        <SearchTodo setSearch={setSearch} />
        <AddTodo addNewTask={addNewTask} />
      </View>

      <FlatList
        data={filteredTasks}
        showsVerticalScrollIndicator
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TaskCard
            item={item}
            toggleDone={toggleDone}
            deleteTask={deleteTask}
            updateTodo={updateTodo}
           
          />
        )}
        ListEmptyComponent={
          <Text style={{ color: 'gray', marginTop: 20 }}>
            {selectedDate
              ? 'No tasks for this day 🚀'
              : 'Select a date to see tasks 📅'}
          </Text>
        }
      />
    </View>
  );
};

export default App;

const styles= StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    //marginTop: 50,
    backgroundColor: '#0f172a',
  },
})