// socketStore.ts
import {create} from 'zustand';
import io, { Socket } from 'socket.io-client';

type SocketStore = {
  socket: Socket | null;
  setSocket: (socket: Socket) => void;
  clearSocket: () => void;
}

export const useSocketStore = create<SocketStore>((set) => ({
  socket: null,
  setSocket: (socket) => set({ socket }),
  clearSocket: () => set({ socket: null }),
}))

export function initializeSocket(){
  const newSocket = io('http://localhost:5000')
  useSocketStore.setState({ socket: newSocket })
}

export default useSocketStore;
