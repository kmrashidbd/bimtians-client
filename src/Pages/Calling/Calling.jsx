import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useLocation, useParams } from "react-router-dom";
import peer from "../../Components/Calling/Service/peer";

function Calling() {
  const { id } = useParams();
  const location = useLocation();
  const [myStream, setMyStream] = useState(null);
  useEffect(() => {
    async function play() {
      let option;
      if (location.state === "audio") {
        option = { audio: true };
      } else {
        option = { audio: true, video: true };
      }
      const stream = await navigator.mediaDevices.getUserMedia(option);
      const offer = await peer.getPeer();
      setMyStream(stream);
    }
    play();
  }, []);
  return (
    <div>
      my stream
      {myStream && (
        <ReactPlayer playing width="200px" height="200px" url={myStream} />
      )}
    </div>
  );
}

export default Calling;
