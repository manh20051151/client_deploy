import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { apiGetList, apiGetListFriend, apiGetUserById } from "../apis"
import { useSelector } from "react-redux"
import { useSocketContext } from "../context/SocketContext"

const useGetConversations = () => {
    const [loading, setLoading] = useState(false)
    const [conversations, setConversations] = useState([])
    const {socket} = useSocketContext()
    useEffect(()=>{
        const getConversations = async ()=>{
            setLoading(true)
            try {
                // console.log("213321312");
                // const res = await fetch('http://localhost:5000/api/user/getUser')

				const friend = await apiGetListFriend();
                console.log("friend1:",friend.friendList);
                //const sendersInfo = await Promise.all(friend.friendList.map(senderId => apiGetUserById(senderId)));
                const sendersInfo = await Promise.all(friend.friendList.map(async (senderId) => {
                    try {
                        return await apiGetUserById(senderId);
                    } catch (error) {
                        console.error(`Error fetching user with ID ${senderId}:`, error);
                        // Trả về một giá trị mặc định hoặc xử lý lỗi theo ý của bạn
                        return null;
                    }
                }));
                
                console.log("sendersInfo1", sendersInfo);
                // const data = await apiGetList()
                const data = sendersInfo
                const data2 = friend.friendList

                // const data = await res.json()
                console.log("data1:", data);
                console.log("data2:", data2);
                
                if(data.error){
                    throw new Error(data.error)
                }
                setConversations(data)
            } catch (error) {
                toast.error(error.message)
            } finally{
                setLoading(false)
            }
        }
        getConversations();
    },[]);

    useEffect( ()=>{
      socket?.on("SocketupdateListFriendNew", async ()=>{
        const getConversations = async ()=>{
            setLoading(true)
            try {
                // console.log("213321312");
                // const res = await fetch('http://localhost:5000/api/user/getUser')

				const friend = await apiGetListFriend();
                console.log("friend1:",friend.friendList);
                //const sendersInfo = await Promise.all(friend.friendList.map(senderId => apiGetUserById(senderId)));
                const sendersInfo = await Promise.all(friend.friendList.map(async (senderId) => {
                    try {
                        return await apiGetUserById(senderId);
                    } catch (error) {
                        console.error(`Error fetching user with ID ${senderId}:`, error);
                        // Trả về một giá trị mặc định hoặc xử lý lỗi theo ý của bạn
                        return null;
                    }
                }));
                
                console.log("sendersInfo1", sendersInfo);
                // const data = await apiGetList()
                const data = sendersInfo
                const data2 = friend.friendList

                // const data = await res.json()
                console.log("data1:", data);
                console.log("data2:", data2);
                
                if(data.error){
                    throw new Error(data.error)
                }
                setConversations(data)
            } catch (error) {
                toast.error(error.message)
            } finally{
                setLoading(false)
            }
        }
        getConversations();
      })
      return ()=>socket?.off("SocketupdateListFriendNew")
   }, [socket])

   useEffect( ()=>{
    socket?.on("SocketdeleteFriend", async ()=>{
      const getConversations = async ()=>{
          setLoading(true)
          try {
              // console.log("213321312");
              // const res = await fetch('http://localhost:5000/api/user/getUser')

              const friend = await apiGetListFriend();
              console.log("friend1:",friend.friendList);
              //const sendersInfo = await Promise.all(friend.friendList.map(senderId => apiGetUserById(senderId)));
              const sendersInfo = await Promise.all(friend.friendList.map(async (senderId) => {
                  try {
                      return await apiGetUserById(senderId);
                  } catch (error) {
                      console.error(`Error fetching user with ID ${senderId}:`, error);
                      // Trả về một giá trị mặc định hoặc xử lý lỗi theo ý của bạn
                      return null;
                  }
              }));
              
              console.log("sendersInfo1", sendersInfo);
              // const data = await apiGetList()
              const data = sendersInfo
              const data2 = friend.friendList

              // const data = await res.json()
              console.log("data1:", data);
              console.log("data2:", data2);
              
              if(data.error){
                  throw new Error(data.error)
              }
              setConversations(data)
          } catch (error) {
              toast.error(error.message)
          } finally{
              setLoading(false)
          }
      }
      getConversations();
    })
    return ()=>socket?.off("SocketdeleteFriend")
 }, [socket])

   
    return {loading, conversations};


}

export default useGetConversations