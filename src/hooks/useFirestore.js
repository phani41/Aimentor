import { db, collection, addDoc, getDocs, query, orderBy, serverTimestamp } from '../firebase';

export function useFirestore() {
  const saveToFirestore = async (entry) => {
    try {
      await addDoc(collection(db, 'mentorHistory'), {
        ...entry,
        timestamp: serverTimestamp()
      });
    } catch (error) {
      console.error('Error saving to Firestore:', error);
    }
  };

  const getHistory = async () => {
    try {
      const q = query(collection(db, 'mentorHistory'), orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error getting history:', error);
      return [];
    }
  };

  return { saveToFirestore, getHistory };
}