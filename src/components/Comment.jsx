import { useState } from "react";
import InpComment from "./InpComment";


const Comment = ({ comment,dispatch }) => {

    const {content,time,votes,id,replies} = comment
    const totalVotes = votes.likes + votes.dislikes
    const totalReplies = replies.length
    const [showEditInp,setShowEditInp] = useState([])

    function toggleEditInp(action){
      setShowEditInp(prev => 
        action ? [...prev,id] : prev.filter(cId=> cId!==id)
      )
    }

    function editSubmitHandler(content){
      dispatch({type:'EDIT_COMMENT',payload:{id,content}})
      toggleEditInp(false)
    }
  
  
    return (
      <div className="comment">
        {
        // edit ui 
        showEditInp.includes(id) ?
          <InpComment 
            initialContent={content}
            toggleInp={toggleEditInp} 
            submitHandler={editSubmitHandler}
          ></InpComment>
          : 
          // comment content ui
          <>
            <p>{content}</p>
            <div className="comment-mini-details">
              <span>Votes: {totalVotes} </span>
              <span> {new Date(time).toLocaleString()}</span>
            </div>
          </>
        }
          <div className="comment-action-wrap">
            <button className='btn primary' onClick={()=> dispatch({type:'LIKE_COMMENT',payload:id}) } >{votes.likes}👍</button>

            <button className="btn destroy" onClick={()=> dispatch({type:'DISLIKE_COMMENT',payload:id}) } >{votes.dislikes}👎</button>

            { totalReplies > 0 && <button  className="btn primary"  onClick={()=> dispatch({type:'TOGGLE_REPLIES',payload:id})}  >{totalReplies} Replies</button> }

            <button className='btn create' onClick={()=> toggleEditInp(true)} >Edit</button>

            <button className='btn destroy' onClick={()=> dispatch({type:'DELETE_COMMENT',payload:id}) } >Delete</button>
          </div>
      </div>
    );
  };

export default Comment