import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "@liveblocks/redux";
import "./App.css";
import { setDraft, addTodo, deleteTodo } from "./store";
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

function SomeoneIsTyping() {
  const someoneIsTyping = useSelector((state: any) =>
    state.liveblocks.others.some((user: any) => user.presence?.isTyping)
  );

  return someoneIsTyping ? (
    <div className="someone_is_typing">Someone is typing</div>
  ) : null;
}

export default function App() {
  const todos = useSelector((state: any) => state.todos);
  const draft = useSelector((state: any) => state.draft);
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
      <input
        className="input"
        type="text"
        placeholder="What needs to be done?"
        value={draft}
        onChange={(e) => dispatch(setDraft(e.target.value))}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            dispatch(addTodo());
          }
        }}
      ></input>
      <SomeoneIsTyping />
      {todos.map((todo: any, index: number) => {
        return (
          <div className="todo_container" key={index}>
            <div className="todo">{todo.text}</div>
            <button
              className="delete_button"
              onClick={() => dispatch(deleteTodo(index))}
            >
              ✕
            </button>
          </div>
        );
      })}
    </div>
  );
}
