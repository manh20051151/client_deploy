import { createContext, useContext, useEffect, useState } from "react";

import io from "socket.io-client";
import { useAuthContext } from "./AuthContext";


const SocketContext =createContext()


export const useSocketContext = () => {
	return useContext(SocketContext);
};


export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);

    const { authUser } = useAuthContext();
    // let userData = ""
    // if (authUser !== undefined && authUser.current){
    //     userData = JSON.parse(authUser.current);
    // }
    
    console.log(authUser);
    
    useEffect(() => {
        if (authUser) {
            const socket = io('http://ec2-13-215-193-21.ap-southeast-1.compute.amazonaws.com:5000', {
                query: {
                    userId: authUser._id,
                }
            });
            setSocket(socket);


            socket.on("getOnlineUsers", (users)=>{
                setOnlineUsers(users)
            })

            return () => socket.close();
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]); // Sử dụng current làm dependency

    return (
        <SocketContext.Provider 
        value={{ socket, onlineUsers }}
        >
            {children}
        </SocketContext.Provider>
    );
};