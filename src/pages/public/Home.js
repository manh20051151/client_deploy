// App.js

import React from "react";
import "./Home.css";
import Conversation from "../../components/Conversation";
import MessageContainer from "../../components/MessageContainer";
import Conversations from "../../components/Conversations";
import SearchInput from "../../components/SearchInput";
import GroupList from "../../components/GroupList";
import LeftSidebar from "../../components/LeftSidebar";
import SearchBar from "../../components/SearchBar";
import { Outlet } from "react-router-dom";

// const LeftSidebar = () => {
//   return (
//     <div className="left-sidebar">
//       <Avatar />

//       <ChatButton>
//         <img
//           className="iconchatdanhba"
//           src={"https://www.svgrepo.com/show/526900/chat-round-line.svg"}
//           alt=""
//         />
//       </ChatButton>

//       <ContactsButton>
//         <img
//           className="iconchatdanhba"
//           src={"https://www.svgrepo.com/show/343062/contacts.svg"}
//           alt=""
//         />
//       </ContactsButton>

//       <SettingButton>
//         <img
//           className="iconsetting"
//           src={"https://www.svgrepo.com/show/500685/setting.svg"}
//           alt=""
//         />
//       </SettingButton>
//     </div>
//   );
// };

const Avatar = () => {
  return <div className="mt-4">{/* Avatar content */}
              <div className='avatar  mt-0 online'>
                <div className='w-14 rounded-full'>
                    <img src={'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'} />
                </div>
            </div>
  </div>;
};

// const ChatButton = ({ children }) => {
//   return (
//     <div className="chat-button">
//       {children} {/* Hiển thị nội dung truyền vào */}
//     </div>
//   );
// };

// const SettingButton = ({ children }) => {
//   return (
//     <div className="setting-button">
//       {children} {/* Hiển thị nội dung truyền vào */}
//     </div>
//   );
// };

// const ContactsButton = ({ children }) => {
//   return (
//     <div className="contacts-button">
//       {children} {/* Hiển thị nội dung truyền vào */}
//     </div>
//   );
// };

// const Addfriend = ({ children }) => {
//   return (
//     <div className="add-friend">
//       {children} {/* Hiển thị nội dung truyền vào */}
//     </div>
//   );
// };
// const Creategroup = ({ children }) => {
//   return (
//     <div className="create-group">
//       {children} {/* Hiển thị nội dung truyền vào */}
//     </div>
//   );
// };

// const SearchBar = () => {
//   return (
//     <div>
//       <div className="search-bar">
//         {/* <img
//           src={"https://www.svgrepo.com/show/522443/search.svg"}
//           width="25px"
//           height="25px"
//           alt=""
//         />
//         <input className="timkiem" type="text" placeholder="Tìm kiếm" /> */}
//         <SearchInput />
//         <Addfriend>
//           <img
//             className="add"
//             src={"https://www.svgrepo.com/show/440013/person-plus.svg"}
//             alt=""
//           />
//         </Addfriend>
//         <Creategroup>
//           <img
//             className="add"
//             src={"https://www.svgrepo.com/show/458218/group-add.svg"}
//             alt=""
//           />
//         </Creategroup>
//       </div>

//       <div
//         style={{ marginTop: 10, marginLeft: 20, marginBottom: 10 }}
//         className="filter-options"
//       >
//         <span className="text">Tất cả</span>
//         <span className="text">Chưa đọc</span>
//       </div>
//     </div>
//   );
// };

const TopMiddle = () => {
  return (
    <div className="top-middle">
      <SearchBar />
    </div>
  );
};

const BottomMiddle = () => {
  return (
    <div className="bottom-middle">
      <div id="tren" className="half" style={{height: "380px", overflowY: "auto"}}>
        <Conversations />
      </div>
      <div style={{fontSize: "20px"}}>Nhóm</div>
      <div id="duoi" className="half" style={{height: "380px", overflowY: "auto"}}>
        <GroupList />
      </div>
    </div>
  );
};

const MiddleContent = () => {
  return (
    <div className="middle-content">
      <TopMiddle />
      <BottomMiddle />
    </div>
  );
};

const RightContent = () => {
  return (
    <div className=" right-content flex rounded-lg overflow-hidden bg-gray-400 bg-clip-padding
    backdrop-filter backdrop-blur-lg bg-opacity-0">
        <MessageContainer />
    </div>
  );
};

const Home = () => {
  return (
    // <div className=" containerr">
    //   {/* <div className="w-[65px] top-0 bottom-0 flex-none fixed"> */}
    //     <LeftSidebar/>
    //   {/* </div> */}
    //   {/* <div className="w-[65px]"></div> */}
    //   <MiddleContent />
    //   <RightContent />
    // </div>
    <div className="flex w-full bg-gray-100 min-h-screen relative text-gray-900">
    <div className="w-[65px] top-0 bottom-0 flex-none fixed">
      <LeftSidebar />
    </div>
    <div className="w-[65px]"></div>
    <div className="flex-auto">
      <Outlet />
    </div>
  </div>
  );
};

export default Home;
