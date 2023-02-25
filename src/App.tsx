import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "@liveblocks/redux";
import "./App.css";

function WhoIsHere() {
  const othersUsersCount = useSelector(
    (state: any) => state.liveblocks.others.length
  );

  return (
    <div className="who_is_here">
      There are {othersUsersCount} other users online
    </div>
  );
}
export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.enterRoom("room-id"));

    return () => {
      dispatch(actions.leaveRoom("room-id"));
    };
  }, [dispatch]);

  return (
    <div className="container">
      <WhoIsHere />
    </div>
  );
}
