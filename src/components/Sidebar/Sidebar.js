import React, { useEffect, useState } from "react";
import "./Sidebar.css";

//Redux
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import db, { auth } from "../../firebase";
import firebase from "firebase";
// Components
import { SidebarChannel } from "./components";
// MUI
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import SignalCellularAlt from "@material-ui/icons/SignalCellularAlt";
import InforOutlinedIcon from "@material-ui/icons/InfoOutlined";
import CallIcon from "@material-ui/icons/Call";
import { Avatar } from "@material-ui/core";
import MicIcon from "@material-ui/icons/Mic";
import HeadsetIcon from "@material-ui/icons/Headset";
import SettingsIcon from "@material-ui/icons/Settings";

function Sidebar() {
  const user = useSelector(selectUser);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    db.collection("channels").onSnapshot((snapshot) => {
      setChannels(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          channel: doc.data(),
        }))
      );
    });
  }, []);

  const handleAddChannel = () => {
    const channelName = prompt("Enter a new Channel Name");
    if (channelName) {
      db.collection("channels").add({
        channelName: channelName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
  };
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <h3>Discord Clone</h3>
        <ExpandMoreIcon />
      </div>
      <div className="sidebar__channels">
        <div className="sidebar__channelsHeader">
          <div className="sidebar__header">
            <ExpandMoreIcon />
            <h4>Channels</h4>
          </div>
          <AddIcon onClick={handleAddChannel} className="sidebar__addChannel" />
        </div>
        <div className="sidebar__channelsList">
          {channels.map(({ id, channel }) => (
            <SidebarChannel
              key={id}
              id={id}
              channelName={channel.channelName}
            />
          ))}
        </div>
      </div>

      <div className="sidebar__voice">
        <SignalCellularAlt className="sidebar__voiceIcon" fontSize="large" />
        <div className="sidebar__voiceInfo">
          <h3>Voice Connected</h3>
          <p>Stream</p>
        </div>
        <div className="sidebar__voiceIcons">
          <InforOutlinedIcon />
          <CallIcon />
        </div>
      </div>

      <div className="sidebar__profile">
        <Avatar onClick={() => auth.signOut()} src={user.photo} />
        <div className="sidebar__profileInfo">
          <h3>{user.displayName}</h3>
          <p># {user.uid.substring(0, 5)}</p>
        </div>
        <div className="sidebar__profileIcons">
          <MicIcon />
          <HeadsetIcon />
          <SettingsIcon />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
