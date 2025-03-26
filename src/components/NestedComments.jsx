import React, { useEffect, useReducer, useState } from "react";
import JSONDATA from "../data.json";
import CommentsList from './CommentList.jsx'
import { commentReducer } from "../reducers/commentReducer.js";
import ControlBox from "./ControlBox.jsx";

const NestedComments = () => {
  const [state, dispatch] = useReducer(commentReducer, {
    comments: [],
    showReplies: [],
  });

  useEffect(() => {
    dispatch({
        type:"ADD_COMMENTS",
        payload:JSONDATA
    })
  },[]);

  return (
    <div>
      <ControlBox dispatch={dispatch} ></ControlBox>
      <CommentsList state={state} dispatch={dispatch} id={null}></CommentsList>
    </div>
  );
};

export default NestedComments;
