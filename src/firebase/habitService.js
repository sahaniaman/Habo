import { 
  collection, addDoc, updateDoc, deleteDoc, doc, 
  query, where, getDocs, getDoc, serverTimestamp,
  Timestamp, onSnapshot, orderBy, limit
} from "firebase/firestore";
import { db } from "./config";

// Helper functions
const formatDate = (date) => date.toISOString().split('T')[0];

const cleanHabitData = (data) => {
  const cleanData = { ...data };
  
  // Convert and validate dates
  if (cleanData.createdAt instanceof Date) {
    cleanData.createdAt = Timestamp.fromDate(cleanData.createdAt);
  } else if (!cleanData.createdAt) {
    cleanData.createdAt = serverTimestamp();
  }

  if (cleanData.lastCompleted instanceof Date) {
    cleanData.lastCompleted = Timestamp.fromDate(cleanData.lastCompleted);
  }

  // Remove invalid fields
  Object.keys(cleanData).forEach(key => {
    if (cleanData[key] === undefined || typeof cleanData[key] === 'function') {
      delete cleanData[key];
    }
  });
  
  return cleanData;
};

// Habit Operations
export const createHabit = async (habitData, userId) => {
  try {
    // Make sure to store habits under the user's collection
    const habitRef = await addDoc(collection(db, "users", userId, "habits"), {
      ...habitData,
      userId: userId,
      createdAt: serverTimestamp()
    });
    return { id: habitRef.id, ...habitData };
  } catch (error) {
    console.error("Error creating habit:", error);
    throw error;
  }
};

export const getUserHabits = async (userId) => {
  if (!userId) throw new Error("User ID is required");

  const habitQuery = query(
    collection(db, "users", userId, "habits"), 
    orderBy("createdAt", "desc")
  );

  const querySnapshot = await getDocs(habitQuery);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate() || null,
    lastCompleted: doc.data().lastCompleted?.toDate() || null
  }));
};

export const subscribeToHabits = (userId, callback) => {
  if (!userId) return;
  
  const habitQuery = query(
    collection(db, "habits"), 
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );
  
  return onSnapshot(habitQuery, (snapshot) => {
    const habits = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || null,
      lastCompleted: doc.data().lastCompleted?.toDate() || null
    }));
    
    callback(habits);
  });
};

export const updateHabit = async (habitId, updates) => {
  if (!habitId) throw new Error("Habit ID is required");

  const habitRef = doc(db, "habits", habitId);
  await updateDoc(habitRef, cleanHabitData(updates));
  return true;
};

export const deleteHabit = async (habitId) => {
  if (!habitId) throw new Error("Habit ID is required");

  const habitRef = doc(db, "habits", habitId);
  await deleteDoc(habitRef);
  return true;
};

// Habit Log Operations
export const logHabitCompletion = async (habitId, userId, completed = true) => {
  if (!habitId || !userId) throw new Error("Habit ID and User ID are required");

  // Verify habit exists and belongs to user
  const habitRef = doc(db, "habits", habitId);
  const habitSnap = await getDoc(habitRef);
  
  if (!habitSnap.exists() || habitSnap.data().userId !== userId) {
    throw new Error("Invalid habit reference");
  }

  await addDoc(collection(db, "habitLogs"), {
    habitId,
    userId,
    completed,
    date: formatDate(new Date()),
    timestamp: serverTimestamp()
  });

  // Update habit streak if completed
  if (completed) {
    const habit = habitSnap.data();
    const lastCompleted = habit.lastCompleted?.toDate();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let newStreak = habit.streak;
    if (!lastCompleted || lastCompleted < today) {
      newStreak = lastCompleted?.getDate() === today.getDate() - 1 ? 
        habit.streak + 1 : 1;
    }

    await updateDoc(habitRef, {
      streak: newStreak,
      longestStreak: Math.max(habit.longestStreak, newStreak),
      lastCompleted: serverTimestamp(),
      completedToday: true
    });
  }

  return true;
};

export const getHabitLogs = async (habitId, userId, limit = 30) => {
  if (!habitId || !userId) throw new Error("Habit ID and User ID are required");

  const logsQuery = query(
    collection(db, "habitLogs"),
    where("habitId", "==", habitId),
    where("userId", "==", userId),
    orderBy("timestamp", "desc"),
    limit(limit)
  );

  const querySnapshot = await getDocs(logsQuery);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    timestamp: doc.data().timestamp?.toDate() || null
  }));
};