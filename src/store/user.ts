import { create, StateCreator } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

type User = {
  nome: string;
  sobrenome: string;
  idade: number;
};

type Actions = {
  setUser: (user: User) => void;
};

type MyPersist = (
  config: StateCreator<User & Actions>,
  options: PersistOptions<User & Actions>
) => StateCreator<User & Actions>;


export const useUserStore = create<User & Actions>(
  (persist as MyPersist)(
    (set): User & Actions => ({
      nome: '',
      sobrenome: '',
      idade: 0,
      setUser: (user) => set({ ...user }),
    }),
    {
      name: 'user',
    },
  ),
);
