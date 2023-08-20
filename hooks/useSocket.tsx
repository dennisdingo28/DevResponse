import {create} from "zustand";
import io, { Socket } from 'socket.io-client'; // Import Socket type

type SocketStore = {
  socket: Socket | null;
  setSocket: (socket: Socket) => void;
  clearSocket: () => void;
};

export const useSocketStore = create<SocketStore>((set) => ({
  socket: null,
  setSocket: (socket) => set({ socket }),
  clearSocket: () => set({ socket: null }),
}));

export const initializeSocket = () => {
  const newSocket = io('http://localhost:5000');
  useSocketStore.setState({ socket: newSocket });

  return () => {
    newSocket.close();
    useSocketStore.setState({ socket: null });
  };
};
