import React, { useEffect, useState } from "react";

const ControlBox = ({ dispatch }) => {
  const [criteria, setCriteria] = useState("");
  const [order, setOrder] = useState("");

  useEffect(()=>{
    dispatch({
        type:'SORT_COMMENTS',
        payload:{criteria,order}
    })

  },[criteria,order])


  return (
    <div className="nested-comments">
      <div className="control-box">
        <div className="field-wrap">
          <label htmlFor="sortBy">Sort by</label>
          <select
            name="sortBy"
            id="sortBy"
            value={criteria}
            onChange={(e) => setCriteria(e.target.value)}
          >
            <option value="">Select..</option>
            <option value="likes">likes</option>
            <option value="dislikes">dislikes</option>
            <option value="time">time</option>
          </select>
        </div>
        <div className="field-wrap">
          <label htmlFor="order">Order</label>
          <select
            name="order"
            id="order"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
          >
            <option value="">Select..</option>
            <option value="INCREASING">increasing</option>
            <option value="DECREASING">decreasing</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ControlBox;
