import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import { Task } from '../types/tasks';

const PRIORITY_COLORS: Record<string, string> = {
  high: '#ef4444',
  medium: '#f97316',
  low: '#22c55e',
};

const PRIORITIES: Task['priority'][] = ['high', 'medium', 'low'];

interface TaskCardProps {
  item: Task;
  toggleDone: (id: number) => void;
  deleteTask: (id: number) => void;
  updateTodo: (
    id: number,
    title: string,
    desc: string,
    priority: string,
  ) => void;
}

const TaskCard = ({
  item,
  toggleDone,
  deleteTask,
  updateTodo,
}: TaskCardProps) => {

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(item.title);
  const [editDesc, setEditDesc] = useState(item.desc);
  const [editPriority, setEditPriority] = useState<Task['priority']>(
    item.priority,
  );

  const handleSave = () => {
    if (!editTitle.trim()) return; 
    updateTodo(item.id, editTitle, editDesc, editPriority);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(item.title);
    setEditDesc(item.desc);
    setEditPriority(item.priority);
    setIsEditing(false);
  };

  
  if (isEditing) {
    return (
      <View style={styles.card}>
        <TextInput
          value={editTitle}
          onChangeText={setEditTitle}
          style={styles.input}
          placeholder="Task title"
          placeholderTextColor="gray"
        />

        <TextInput
          value={editDesc}
          onChangeText={setEditDesc}
          style={[styles.input, { marginTop: 8 }]}
          placeholder="Description"
          placeholderTextColor="gray"
        />

        {/* Priority buttons */}
        <View style={styles.priorityRow}>
          {PRIORITIES.map(p => (
            <TouchableOpacity
              key={p}
              onPress={() => setEditPriority(p)}
              style={[
                styles.priorityBtn,
                { borderColor: PRIORITY_COLORS[p] },
                editPriority === p && { backgroundColor: PRIORITY_COLORS[p] },
              ]}
            >
              <Text
                style={{
                  color: editPriority === p ? 'white' : PRIORITY_COLORS[p],
                  fontSize: 12,
                }}
              >
                {p}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Save / Cancel */}
        <View style={styles.row}>
          <TouchableOpacity onPress={handleSave} style={styles.saveBtn}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>✅ Save</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCancel} style={styles.cancelBtn}>
            <Text style={{ color: 'white' }}>✖ Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // ── NORMAL VIEW ───────────────────────────────
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.desc}>{item.desc}</Text>

      <View style={styles.row}>
        <Text style={{ color: PRIORITY_COLORS[item.priority] }}>
          {item.priority}
        </Text>

        <TouchableOpacity onPress={() => setIsEditing(true)}>
          <Text style={styles.action}>✏️</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => toggleDone(item.id)}>
          <Text style={styles.action}>{item.done ? '✅' : '⬜'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => deleteTask(item.id)}>
          <Text style={[styles.action, { color: 'red' }]}>❌</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1e293b',
    padding: 15,
    borderRadius: 12,
    marginVertical: 6,
  },
  title: { color: 'white', fontSize: 16 },
  desc: { color: 'gray', marginTop: 5 },
  row: { flexDirection: 'row', marginTop: 10, alignItems: 'center' },
  action: { marginLeft: 15, color: 'white' },
  input: {
    backgroundColor: '#0f172a',
    color: 'white',
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  priorityRow: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 8,
  },
  priorityBtn: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1.5,
  },
  saveBtn: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  cancelBtn: {
    backgroundColor: '#475569',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
});

export default TaskCard;
