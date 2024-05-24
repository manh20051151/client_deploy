import React, { useEffect, useState } from "react";
import Button from "./Button";
import { Collapse, Typography } from "antd";
import styled from "styled-components";
import useGetListGroup from "../hooks/useGetGroups";
import useConversation from "../zustand/useConversation";
import { useAuthContext } from "../context/AuthContext";
import { apiCreateGroup, apiGetListGroup } from "../apis";
import { toast } from 'react-toastify';
import avatar from '../assets/anhtam.png'
import { useSocketContext } from "../context/SocketContext";
import { useDispatch } from "react-redux";
import { logout } from '../store/user/userSlice'
import path from "../ultils/path";

const { Panel } = Collapse;

const GroupList = () => {
  const dispatch = useDispatch()
  // const [ismodel, setIsmodel] = useState(false);

  const {socket} = useSocketContext()
  useEffect( ()=>{
    socket?.on("SocketdeleteUser", async ()=>{
      dispatch(logout())
      window.location.href = `/`;
    })
    return ()=>socket?.off("SocketdeleteUser")
 }, [socket])

  useEffect( ()=>{
   socket?.on("newSocket", async ()=>{
      const response = await apiGetListGroup();
      setGroups(response);
   })
   return ()=>socket?.off("newSocket")
}, [socket])


useEffect( ()=>{
  socket?.on("SocketUpdateMember", async ()=>{
     const response = await apiGetListGroup();
     setGroups(response);
  })
  return ()=>socket?.off("SocketUpdateMember")
}, [socket])

useEffect( ()=>{
  socket?.on("SocketDeleteMember", async ()=>{
     const response = await apiGetListGroup();
     setGroups(response);
  })
  return ()=>socket?.off("SocketDeleteMember")
}, [socket])

useEffect( ()=>{
  socket?.on("SocketupdateAvatarGroup", async ()=>{
     const response = await apiGetListGroup();
     setGroups(response);
  })
  return ()=>socket?.off("SocketupdateAvatarGroup")

}, [socket])


useEffect( ()=>{
  socket?.on("SocketdeleteGroup", async ()=>{
     const response = await apiGetListGroup();
     setGroups(response);
  })
  return ()=>socket?.off("SocketdeleteGroup")

}, [socket])
  const {selectedConversation, isUpdateAvatarGroup,setSelectedConversation,ismodel, setIsmodel, isModelUpdateNameGroup} = useConversation()
  const PanelStyled = styled(Panel)`
    &&& {
      .ant-collapse-header,
      p {
        font-size: 16px;
      }
    }
  `;
  const LinkStyled = styled(Typography.Link)`
    display: block;
    margin-bottom: 5px;
  `;
  const {authUser } = useAuthContext()
  // const {groups, loading} = useGetListGroup()
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [groups, setGroups] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiGetListGroup();

        setGroups(response);
      } catch (error) {
        console.error("Error fetching request add friends:", error);
      }
    };

    fetchData();

  }, [ismodel, isModelUpdateNameGroup, isUpdateAvatarGroup]); 

  // let filteredGroups = []


  useEffect(() => {
    async function filterGroups() {
      while (!groups || !groups.groups) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Đợi 1 giây trước khi kiểm tra lại
      }
  
      // Khi groups và groups.groups đã tồn tại
      setFilteredGroups(groups.groups.filter(group => group.participants.includes(authUser._id)));
    }
  
    filterGroups();
  }, [groups, ismodel]);
// filterGroups();

    console.log("filteredGroupsfilteredGroups: ",filteredGroups);
  //   let filteredGroups
  //   if (groups && groups.groups && Array.isArray(groups.groups)) {
  //     // Lọc ra các nhóm có phần tử trong mảng "participants" trùng với uid
  //      filteredGroups = groups.groups.filter(group => group.participants.includes(authUser._id));
  //     console.log("filteredGroupsfilteredGroups",filteredGroups);
  // } else {
  //     console.log("Lỗi: Biến groups không được định nghĩa hoặc có giá trị không hợp lệ.");
  // }
  const [nameGroup, setNameGroup] = useState('')
  const userId = authUser._id
  const handleCreateGroup= async()=>{
      const response = await  apiCreateGroup({nameGroup, userId})
      if(response.success){
          toast.success(response.mes)
          setGroups(prevGroups => {
            const newGroups = [...prevGroups.groups, response.group]; // Thêm nhóm mới vào danh sách nhóm hiện tại
            return { ...prevGroups, groups: newGroups };
          });
          setIsmodel(false);

      } else{
          toast.info(response.mes)
      }
  }


  return (
    <div>
      {/* {ismodel && (
        <div className="absolute top-0 left-0 bottom-0 right-0 bg-overlay items-center z-10 flex flex-col pt-10">
          <div className="flex flex-col gap-4">
            <label htmlFor="nameGroup" className="text-white">Nhập tên nhóm: </label>
            <input
              type="text"
              id="nameGroup"
              className="w-[800px]  pb-2 border-b outline-none"
              placeholder="Tên nhóm"
              value={nameGroup}
              onChange={e=>setNameGroup(e.target.value)}
            />
          </div>
          <div className="mt-4 flex gap-4">
            <Button
              name="Xác nhận"
              handleOnClick={handleCreateGroup}
            />

            <Button name="Trở về" handleOnClick={() => setIsmodel(false)} />
          </div>
        </div>
      )} */}
      <Collapse 
      defaultActiveKey={["1"]}
      >
        <PanelStyled header="Danh sách các nhóm" key="1">
        {
          filteredGroups.map(filteredGroup => <LinkStyled className=" " key={filteredGroup._id} onClick={() => setSelectedConversation(filteredGroup)} >
            <span className="flex items-center"> 
            <img  src={filteredGroup?.avatar || avatar} alt="logo" className=" w-12 h-12 object-cover  rounded-full" />
            <span className="font-bold text-black ml-2">{filteredGroup.nameGroup} </span>
            </span>
           
           </LinkStyled>)
        }
        </PanelStyled>
      </Collapse>

      {/* <span
        onClick={() => setIsmodel(true)}
        className="text-sky-400 hover:underline cursor-pointer"
      >
        Tạo nhóm
      </span> */}
    </div>
  );
};

export default GroupList;
