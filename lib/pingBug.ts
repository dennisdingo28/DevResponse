import { BugPing } from "@/types";

export function pingBug({user,bug,socket}: BugPing){
    if(socket){
        socket.emit("pingBug",{bug});
    }
}