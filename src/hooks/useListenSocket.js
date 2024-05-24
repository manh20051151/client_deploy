// import { useEffect } from "react"
// import { useSocketContext } from "../context/SocketContext"
// import useConversation from "../zustand/useConversation"
// import { apiGetGroup } from "../apis"


// const useListenSocket = () => {
//     const {socket} = useSocketContext()
//     const {isSockett, setIsSockett, selectedConversation, setSelectedConversation} = useConversation()

//     useEffect( ()=>{
//         socket?.on("newSocket", async (newSocket)=>{
//             setIsSockett(newSocket);
//             console.log("isSocket", newSocket);
//             console.log("isSocket", isSockett);
//                       // Fetch the updated conversation details
//             const updatedConversation = await apiGetGroup(selectedConversation._id);
//         // Update the selectedConversation state with the new details
//             setSelectedConversation(updatedConversation.group);
//             // setTimeout(() => {
//             //     setIsSockett(!newSocket);
//             //     console.log("isSocket", isSockett);
//             // }, 5000); // Điều chỉnh thời gian nếu cần
//         })
//         return ()=>socket?.off("newSocket")
//     }, [socket, isSockett, setIsSockett])

// }

// export default useListenSocket