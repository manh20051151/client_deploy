import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { apiSendMesageGroup } from "../apis";

const useSendMessageGroup = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      // const res = await fetch(`http://localhost:5000/api/message/send/${selectedConversation._id}`,{
      //     method: 'POST',
      //     headers:{
      //         'Content-Type': 'appliaction/json'
      //     },
      //     body: JSON.stringify({message})
      // })
      const data = { message: message };
      const res = await apiSendMesageGroup(data, selectedConversation._id);
      // const data = await res.json();
      console.log("data: ",res);
      
      if (res.error) {
        throw new Error(res.error);
      }
      setMessages([...messages, res]);
    } catch (error) {
      toast.error(error.message);
      
    } finally{
      setLoading(false);
    }
  };

  return {loading ,sendMessage};
};

export default useSendMessageGroup;
