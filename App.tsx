/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import DateStrip from './src/components/dateStrip';
import TaskCard from './src/components/taskCard';
import { mockTasks } from './src/components/mockData';
import AddTodo from './src/components/addTodo';
import { SearchTodo } from './src/components/searchTodo';

const App = () => {
  const [tasks, setTasks] = useState(mockTasks);
  const [search, setSearch] = useState('');
  const [selectedDate, setSelectedDate] = useState('');


  const addNewTask = (title: string, priority: string) => {
    const newTask = {
      id: Date.now(),
      date: selectedDate,
      title,
      desc: '',
      priority,
      category: 'General',
      done: false,
    };

    setTasks(prev => [newTask, ...prev]);
  };

  const getDates = () => {
    const dates = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);

      const key = d.toISOString().split('T')[0]; 
      const label = d.toDateString().slice(4, 10); 

      dates.push({
        key,
        label,
      });
    }

    return dates;
  };

  const [dates] = useState(getDates());
// Set the initial selected date to the first date in the list when the component mounts or when the dates array changes
  useEffect(() => {
    if (dates.length > 0) {
      setSelectedDate(dates[0].key);
    }
  }, [dates]);


 // Function to toggle the 'done' status of a task based on its ID
  const toggleDone = (id: number) => {
    const updated = tasks.map(t => (t.id === id ? { ...t, done: !t.done } : t));
    setTasks(updated);
  };

 // Function to delete a task based on its ID by filtering it out of the tasks array
  const deleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  //setting prioty order for sorting
  const priorityOrder: any = {
    high: 1,
    medium: 2,
    low: 3,
  };

 const filteredTasks = tasks
   .filter(item => {
    //filtering tasks based on selected date and search query
     const matchDate = item.date === selectedDate;
     //checking if task title includes search query (case-insensitive)
     const matchSearch = item.title
       .toLowerCase()
       .includes(search.toLowerCase());
      //only include tasks that match both the selected date and search query
     return matchDate && matchSearch;
   })
   //sorting tasks based on priority using the defined priority order   .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
   //sorting tasks so that incomplete tasks come before completed ones
   .sort((a, b) => Number(a.done) - Number(b.done))
   //final sort to ensure consistent order for tasks with same priority and done status
   .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        marginTop: 50,
        backgroundColor: '#0f172a',
      }}
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
        style={{ flexDirection: 'column', justifyContent: 'space-between' }} >
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
          />
        )}
        ListEmptyComponent={
          <Text style={{ color: 'gray', marginTop: 20 }}>
            No tasks for this day 🚀
          </Text>
        }
      />
    </View>
  );
};

export default App;