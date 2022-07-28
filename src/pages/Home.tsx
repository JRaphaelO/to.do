import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const data: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    };

    setTasks([...tasks, data]);    
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    const upadatedTasks = tasks.map(task => ({... task}));
    const index = upadatedTasks.findIndex(task => task.id === id);
    upadatedTasks[index].done = !upadatedTasks[index].done;
    setTasks(upadatedTasks);
  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state
    const upadatedTasks = tasks.filter(task => task.id !== id);
    setTasks(upadatedTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})