// import React, { useEffect, useState } from 'react';
// import { apiGetRequestAddFriends, apiGetRequestAddFriendsMe, apiGetUserById, apiUpdateListFriends, apiUpdateRequestAddFriends } from '../../apis';
// import avatar from '../../assets/anhtam.png'
// import { toast } from 'react-toastify';
// import { getCurrent } from "../../store/user/asyncActions";
// import { useDispatch } from 'react-redux';

// const Recivers = () => {
//     const [senders, setSenders] = useState([]);
//     const dispath = useDispatch()
//     useEffect(() => {
//       const fetchData = async () => {
//         try {
//           const response = await apiGetRequestAddFriends();
//           // Lấy danh sách senderIds từ response
//           const senderIds = response.map(sender => sender.senderId);
//           // Gọi API để lấy thông tin chi tiết của từng người gửi
//           const sendersInfo = await Promise.all(senderIds.map(senderId => apiGetUserById(senderId)));
//           // Cập nhật senders với thông tin chi tiết của người gửi
//           setSenders(sendersInfo);
//         } catch (error) {
//           console.error("Error fetching request add friends:", error);
//         }
//       };
  
//       fetchData();
  
//     }, [setSenders]); // Chỉ gọi API một lần khi component được render lần đầu tiên
  
  
  
//     const handleUpdate = async (userId) => {
//       try {
//         const response = await apiUpdateRequestAddFriends(userId);
//         if (response.success) {
//           toast.success("Kết Bạn thành công");
//           await apiUpdateListFriends(userId)
//           dispath(getCurrent())
//           // Sau khi cập nhật thành công, gọi lại API để lấy danh sách yêu cầu kết bạn mới
//           const updatedSenders = await apiGetRequestAddFriends();
//           const updatedSenderIds = updatedSenders.map(sender => sender.senderId);
//           const updatedSendersInfo = await Promise.all(updatedSenderIds.map(senderId => apiGetUserById(senderId)));
//           setSenders(updatedSendersInfo);
//         } else {
//           toast.error("Kết Bạn thất bại");
//         }
//       } catch (error) {
//         console.error("Error updating friend request:", error);
//         toast.error("Có lỗi xảy ra khi cập nhật yêu cầu kết bạn");
//       }
//     };
//     const handleUpdateNo = async (userId) => {
//       try {
//         const response = await apiUpdateRequestAddFriends(userId);
//         if (response.success) {
//           toast.success("Hủy Kết Bạn thành công");
//           // Sau khi cập nhật thành công, gọi lại API để lấy danh sách yêu cầu kết bạn mới
//           const updatedSenders = await apiGetRequestAddFriends();
//           const updatedSenderIds = updatedSenders.map(sender => sender.senderId);
//           const updatedSendersInfo = await Promise.all(updatedSenderIds.map(senderId => apiGetUserById(senderId)));
//           setSenders(updatedSendersInfo);
//         } else {
//           toast.error("Hủy kết Bạn thất bại");
//         }
//       } catch (error) {
//         console.error("Error updating friend request:", error);
//         toast.error("Có lỗi xảy ra khi cập nhật yêu cầu kết bạn");
//       }
//     };
//     console.log("senders", senders);
//   return (
//     <div>
//       {senders?.map((el, index) => (
//         <div
//           key={index}
//           className="items-center flex h-16 border border-b-gray-50 bg-white"
//         >
//           <span>
//             <img
//               src={el.user?.avatar || avatar}
//               alt="avatar"
//               className="ml-8 h-10 w-10 object-cover rounded-full mr-2"
//             />
//           </span>
//           <span className="pl-4 font-bold"> {el.user.name} </span>
//           <div className="pr-8 justify-end w-full flex font-medium">
//             <span
//               onClick={() => handleUpdate(el.user._id)}
//               className="hover:cursor-pointer pr-4"
//             >
//               Chấp nhận
//             </span>
//             <span
//               onClick={() => handleUpdateNo(el.user._id)}
//               className="hover:cursor-pointer "
//             >
//               Từ chối
//             </span>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Recivers;
