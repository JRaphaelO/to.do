import React, { useState } from 'react';
import { Alert, StyleSheet, View, AlertButton } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [deleteTask, setDeleteTask] = useState(false);

  function handleAddTask(newTaskTitle: string) {
    const task = tasks.find(task => task.title === newTaskTitle);
    if (task) {
      Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome');
      return;
    }

    const data: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    };

    setTasks([...tasks, data]);    
  }

  function handleToggleTaskDone(id: number) {
    const upadatedTasks = tasks.map(task => ({... task}));
    const index = upadatedTasks.findIndex(task => task.id === id);
    upadatedTasks[index].done = !upadatedTasks[index].done;
    setTasks(upadatedTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert('Excluir task', 'Deseja excluir a task?', [
      { text: 'Não', style: 'cancel', },
      { text: 'Sim', style: 'destructive', onPress: () => {
        const upadatedTasks = tasks.filter(task => task.id !== id);
        setTasks(upadatedTasks);
      }},
    ]);
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    const upadatedTasks = tasks.map(task => ({... task}));
    const index = upadatedTasks.findIndex(task => task.id === taskId);
    upadatedTasks[index].title = taskNewTitle;
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
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
});