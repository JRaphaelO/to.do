import React, { useEffect, useRef, useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import Icon from 'react-native-vector-icons/Feather';

import trashIcon from '../assets/icons/trash/trash.png';
import editIcon from '../assets/icons/edit/edit.png';
import closeIcon from '../assets/icons/close/close.png';

export interface Task {
    id: number;
    title: string;
    done: boolean;
  }

interface TaskItemProps {
    index: number;
    item: Task;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: (id: number, title: string) => void;
}

export function TaskItem ({ index, item, toggleTaskDone, removeTask, editTask }: TaskItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [taskTitle, setTaskTitle] = useState(item.title);
    const textInputRef = useRef<TextInput>(null);

    const handleStartEditing = () => {
        setIsEditing(true);
    };

    const handleCancelEditing = () => {
        setIsEditing(false);
        setTaskTitle(item.title);
    }

    const handleSubmitEditing = () => {
        setIsEditing(false);
        editTask(item.id, taskTitle);
    };

    useEffect(() => {
        if (!textInputRef.current) {
            return;
        }

        if (isEditing) {
            textInputRef.current.focus();
        } else {
            textInputRef.current.blur();
        }


    }, [isEditing]);

    return(
        <>
            <View>
                <TouchableOpacity
                    testID={`button-${index}`}
                    activeOpacity={0.7}
                    style={styles.taskButton}
                    onPress={() => toggleTaskDone(item.id)}
                >
                    <View
                        testID={`marker-${index}`}
                        style={[styles.taskMarker, item.done && styles.taskMarkerDone]}
                    >
                        {item.done && (
                            <Icon
                                name="check"
                                size={12}
                                color="#FFF" />
                        )}
                    </View>

                    <TextInput
                        style={[styles.taskText, item.done && styles.taskTextDone]}
                        value={taskTitle}
                        onChangeText={setTaskTitle}
                        editable={isEditing}
                        onSubmitEditing={handleSubmitEditing}
                        ref={textInputRef}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.iconsContainer}>
                { isEditing ? (
                    <TouchableOpacity
                        testID={`edit-${index}`}
                        onPress={handleCancelEditing}
                    >
                        <Icon name="x" size ={24} color="#b2b2b2" />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        testID={`edit-${index}`}
                        onPress={handleStartEditing}
                    >
                        <Image source={editIcon} />
                    </TouchableOpacity>
                )}

                <View style={styles.pipe} />

                <TouchableOpacity
                    disabled={isEditing}
                    testID={`trash-${index}`}
                    onPress={() => removeTask(item.id)}
                >
                    <Image source={trashIcon} style={{opacity: isEditing ? 0.2 : 1}}/>
                </TouchableOpacity>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    taskButton: {
      flex: 1,
      paddingHorizontal: 24,
      paddingVertical: 15,
      marginBottom: 4,
      borderRadius: 4,
      flexDirection: 'row',
      alignItems: 'center'
    },
    taskMarker: {
      height: 16,
      width: 16,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#B2B2B2',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskText: {
      color: '#666',
      fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
      height: 16,
      width: 16,
      borderRadius: 4,
      backgroundColor: '#1DB863',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskTextDone: {
      color: '#1DB863',
      textDecorationLine: 'line-through',
      fontFamily: 'Inter-Medium'
    },
    iconsContainer: {
      flexDirection: 'row',
      paddingHorizontal: 24,
      justifyContent: 'space-between',
    },
    pipe: {
      width: 1,
      height: 24,
      marginHorizontal: 12,
      backgroundColor: 'rgba(196,196,196,0.24)',
    }
  })