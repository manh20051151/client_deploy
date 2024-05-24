import React, { useEffect, useState } from 'react';
import { apiDeleteRequestAddFriends, apiDeleteRequestAddFriendsCancel, apiGetRequestAddFriends, apiGetRequestAddFriendsMe, apiGetUserById, apiUpdateListFriends, apiUpdateListFriendsNew, apiUpdateListFriendsNewFr, apiUpdateRequestAddFriends, apiUpdateRequestAddFriendsCancel } from '../../apis';
import avatar from '../../assets/anhtam.png'
import { toast } from 'react-toastify';
// import { getCurrent } from "../../store/user/asyncActions";
// import { useDispatch } from 'react-redux';

const AddFriend = () => {
  const [senders, setSenders] = useState([]);
  const [recivers, setRecivers] = useState([]);
  // const dispath = useDispatch()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiGetRequestAddFriends();
        // Lấy danh sách senderIds từ response
        const senderIds = response.map(sender => sender.senderId);
        // Gọi API để lấy thông tin chi tiết của từng người gửi
        const sendersInfo = await Promise.all(senderIds.map(senderId => apiGetUserById(senderId)));
        // Cập nhật senders với thông tin chi tiết của người gửi
        setSenders(sendersInfo);
      } catch (error) {
        console.error("Error fetching request add friends:", error);
      }
    };

    fetchData();

  }, [setSenders]); // Chỉ gọi API một lần khi component được render lần đầu tiên

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiGetRequestAddFriendsMe();
        // Lấy danh sách senderIds từ response
        const senderIds = response.map(sender => sender.reciverId);
        // Gọi API để lấy thông tin chi tiết của từng người gửi
        const sendersInfo = await Promise.all(senderIds.map(senderId => apiGetUserById(senderId)));
        // Cập nhật senders với thông tin chi tiết của người gửi
        setRecivers(sendersInfo);
      } catch (error) {
        console.error("Error fetching request add friends:", error);
      }
    };

    fetchData();

  }, [setRecivers]); // Chỉ gọi API một lần khi component được render lần đầu tiên

  const handleUpdate = async (userId) => {
    try {
      // const response = await apiDeleteRequestAddFriends(userId);
      
      // const response = await apiUpdateRequestAddFriends(userId);
      const response = await apiDeleteRequestAddFriends(userId);
      if (response.success) {
        toast.success("Kết Bạn thành công");
        await apiUpdateListFriendsNew(userId)
        await apiUpdateListFriendsNewFr(userId)
        // dispath(getCurrent())
        // Sau khi cập nhật thành công, gọi lại API để lấy danh sách yêu cầu kết bạn mới
        const updatedSenders = await apiGetRequestAddFriends();
        const updatedSenderIds = updatedSenders.map(sender => sender.senderId);
        const updatedSendersInfo = await Promise.all(updatedSenderIds.map(senderId => apiGetUserById(senderId)));
        setSenders(updatedSendersInfo);
      } else {
        toast.error("Kết Bạn thất bại");
      }
    } catch (error) {
      console.error("Error updating friend request:", error);
      toast.error("Có lỗi xảy ra khi cập nhật yêu cầu kết bạn");
    }
  };
  const handleUpdateNo = async (userId) => {
    try {
      // const response = await apiUpdateRequestAddFriends(userId);
      const response = await apiDeleteRequestAddFriends(userId);
      if (response.success) {
        toast.success("Hủy Kết Bạn thành công");
        // Sau khi cập nhật thành công, gọi lại API để lấy danh sách yêu cầu kết bạn mới
        const updatedSenders = await apiGetRequestAddFriends();
        const updatedSenderIds = updatedSenders.map(sender => sender.senderId);
        const updatedSendersInfo = await Promise.all(updatedSenderIds.map(senderId => apiGetUserById(senderId)));
        setSenders(updatedSendersInfo);
      } else {
        toast.error("Hủy kết Bạn thất bại");
      }
    } catch (error) {
      console.error("Error updating friend request:", error);
      toast.error("Có lỗi xảy ra khi cập nhật yêu cầu kết bạn");
    }
  };

  const handleUpdateCancel = async (userId) => {
    try {
      // const response = await apiUpdateRequestAddFriendsCancel(userId);
      const response = await apiDeleteRequestAddFriendsCancel(userId);
      if (response.success) {
        toast.success("Hủy Kết Bạn thành công");
        // Sau khi cập nhật thành công, gọi lại API để lấy danh sách yêu cầu kết bạn mới
        const updatedSenders = await apiGetRequestAddFriendsMe();
        const updatedSenderIds = updatedSenders.map(sender => sender.reciverId);
        const updatedSendersInfo = await Promise.all(updatedSenderIds.map(reciverId => apiGetUserById(reciverId)));
        setRecivers(updatedSendersInfo);
      } else {
        toast.error("Hủy kết Bạn thất bại");
      }
    } catch (error) {
      console.error("Error updating friend request:", error);
      toast.error("Có lỗi xảy ra khi cập nhật yêu cầu kết bạn");
    }
  };
  console.log("senders", senders);
  return (
    <div className='flex'>
      <div className='flex-1 min-h-screen'>
        <div className='h-20 border bg-white border-collapse items-center flex font-bold '>
          <span className='text-[20px] pl-4'>Lời mời kết bạn</span>
        </div>
        {senders?.map((el, index)=>(
          
          <div key={index} className='items-center flex h-16 border border-b-gray-50 bg-white'>
            <span><img src={el.user?.avatar || avatar} alt="avatar" className="ml-8 h-10 w-10 object-cover rounded-full mr-2" /></span>
            <span className='pl-12 font-bold w-full'> {el.user.name} </span>
            <div className='pr-8 justify-end w-full flex font-medium'>
              <span onClick={() => handleUpdate(el.user._id)} className='hover:cursor-pointer pr-4'>Chấp nhận</span>
              <span onClick={() => handleUpdateNo(el.user._id)} className='hover:cursor-pointer '>Từ chối</span>
            </div>

          </div>
        ))} 
      </div>

      <div className='flex-1 border border-l-white min-h-screen'>
        <div className='h-20 border bg-white border-collapse items-center flex font-bold '>
          <span className='text-[20px] pl-4'>Lời mời đã gửi</span>
        </div>
        {recivers?.map((el, index)=>(
          
          <div key={index} className='items-center flex h-16 border border-b-gray-50 bg-white'>
            <span><img src={el.user?.avatar || avatar} alt="avatar" className="ml-8 h-10 w-10 object-cover rounded-full mr-2" /></span>
            <span className='pl-12 font-bold w-full'> {el.user?.name} </span>
            <div className='pr-8 justify-end w-full flex font-medium'>
              <span onClick={() => handleUpdateCancel(el.user._id)} className='hover:cursor-pointer '>Hủy</span>
            </div>

          </div>
        ))} 
      </div>

    </div>
    
  );
};

export default AddFriend;
