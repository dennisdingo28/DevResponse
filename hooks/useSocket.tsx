// socketStore.ts
import {create} from 'zustand';
import io, { Socket } from 'socket.io-client';

type SocketStore = {
  socket: Socket | null;
  setSocket: (socket: Socket) => void;
}

export const useSocketStore = create<SocketStore>((set) => ({
  socket: null,
  setSocket: (socket) => set({ socket }),
}))

export function initializeSocket(id: string){
  const newSocket = io('http://localhost:5000',{query:{id}})
  useSocketStore.setState({ socket: newSocket })
  return ()=>{
    useSocketStore.setState({socket:null});
  }
}


export default useSocketStore;
