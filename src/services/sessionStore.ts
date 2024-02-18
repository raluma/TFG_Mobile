import { create } from 'zustand';

export const useSessionStore = create((set) => {
  return {
    email: undefined,
    password: undefined,
    signup: (email: string, password: string) => {

    },
    login: (email: string, password: string) => { 
      set({ email, password });

      return `Has iniciado sesión este email ${email} con esta pass ${password}`;
    },
    logout: () => set({ email: undefined, password: undefined }),
    setEmail: (email: string) => { set({ email }) },
    setPassword: (email: string, password: string) => { set({ password }) }
  }
})






