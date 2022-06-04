import React from "react";
import "./Sidebar.css";
import SidebarChat from "./SidebarChat";
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChatIcon from '@mui/icons-material/Chat';
import { Avatar, IconButton } from '@mui/material';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src="data:image/png;base64,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"/>
        <div className="sidebar__headerRight">
          <IconButton>
            <ChatIcon/>
          </IconButton>
          <IconButton>
            <DonutLargeIcon/>
          </IconButton>
          <IconButton>
            <MoreVertIcon/>
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="searchConatiner">
          <SearchIcon/>
          <input placeholder="search or start new chat" type="text" />
        </div>
      </div>
      <div className="sidebar__chats">
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
    </div>
    </div>
  );
}

export default Sidebar;
