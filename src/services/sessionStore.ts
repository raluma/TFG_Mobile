import { create } from 'zustand';
import { collection, query, where, doc, getDocs, addDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export const useSessionStore = create((set) => {
  return {
    actions: 0,
    id: undefined,
    email: undefined,
    password: undefined,
    response: undefined,
    signup: async (email: string, password: string) => {
      try {
        const q = query(collection(db, "Users"), where("email", "==", email));
        const querySnapchot =  await getDocs(q);  

        if (querySnapchot.size === 0) {
          await addDoc(collection(db, "Users"), { email, password });
          set({ response: `You are successfully signed up` });
          set((state: any) => ({ actions: state.actions + 1 }))
        } else {
          set({ response: `You are not successfully signed up. Email is in use.` });
          set((state: any) => ({ actions: state.actions + 1 }))
        }
      } catch (error) {
        set({ response: `You are not successfully signed up` });
        set((state: any) => ({ actions: state.actions + 1 }))
      }
    },
    login: async (email: string, password: string) => { 
      const q = query(collection(db, "Users"), where("email", "==", email));
      const querySnapchot =  await getDocs(q);

      if (querySnapchot.size === 1) {
        querySnapchot.forEach((doc) => {
          if (password === doc.data()["password"]) {
            set({ id: doc.id });
            set({ email, password });
            set({ response: `You are successfully logged in` });
            set((state: any) => ({ actions: state.actions + 1 }))
          } else {
            set({ response: `Error, email or password is incorrect` });
            set((state: any) => ({ actions: state.actions + 1 }))
          }
        })
      } else {
        set({ response: `Error, email or password is incorrect` });
        set((state: any) => ({ actions: state.actions + 1 }))
      }
    },
    logout: () => {
      set({ email: undefined, password: undefined });
      set({ response: `You are successfully logged out` });
      set((state: any) => ({ actions: state.actions + 1 }))
    },
    setAccount: async (id: string, oldEmail: string, email: string, password: string) => { 
      try {
        const q = query(collection(db, "Users"), where("email", "==", email));
        const querySnapchot =  await getDocs(q);  

        if (querySnapchot.size === 0) {
          await updateDoc(doc(db, "Users", id), { email, password });
          set({ email });
          set({ password });
          set({ response: `You have successfully updated your account` });
          set((state: any) => ({ actions: state.actions + 1 }))
        } else if (oldEmail === email) {
          querySnapchot.forEach(async () => {
            await updateDoc(doc(db, "Users", id), { email, password });
            set({ email });
            set({ password });
            set({ response: `You have successfully updated your account` });
            set((state: any) => ({ actions: state.actions + 1 }))
          });
        } else {
          set({ response: `You have not successfully updated your account. Email is in use.` });
          set((state: any) => ({ actions: state.actions + 1 }))
        }
      } catch(error) {
        set({ response: `You have not successfully updated your account` });
        set((state: any) => ({ actions: state.actions + 1 }))
      }
    }
  }
})






