import Comment from "./Comment";
import InpComment from "./InpComment";
import { useState } from "react";

const CommentsList = ({ state, dispatch,id }) => {
  const { comments } = state;

  const [showAddInp, setShowAddInp] = useState(false);

  function toggleAddInp() {
    setShowAddInp((prev) => !prev);
  }

  function editSubmitHandler(content){
    dispatch({type:'ADD_COMMENT',payload:{id,content}})
    toggleAddInp()
  }

  return comments.length === 0 ? (
    <div>No comments found...</div>
  ) : (
    <div className="comment-list">
      {
        showAddInp 
          ? <InpComment toggleInp={toggleAddInp}  submitHandler={editSubmitHandler} ></InpComment>  
          :<button onClick={toggleAddInp}  id="add-comment-btn"  className="btn create"  >Add Comment</button>
      }

      {comments?.map((comment) => {
        return (
          <div key={comment.id}>
            <Comment comment={comment} dispatch={dispatch}></Comment>

            {state.showReplies.includes(comment.id) &&
              comment?.replies?.length > 0 && (
                <div className="nested-replies">
                  <CommentsList
                    state={{ ...state, comments: comment.replies }}
                    dispatch={dispatch}
                    id={comment.id}
                  ></CommentsList>
                </div>
              )}
          </div>
        );
      })}
    </div>
  );
};

export default CommentsList;
