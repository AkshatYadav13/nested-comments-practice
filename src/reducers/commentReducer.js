function likeAndDisLikeHandler(comments,id,action){
    return comments.map((comment)=>{
        if(comment.id === id){
            return{
                ...comment,
                votes:{...comment.votes,
                    likes:comment.votes.likes + (action === 'LIKE' ?  1: 0 ) ,
                    dislikes:comment.votes.dislikes + (action === 'DISLIKE'?  1: 0)  ,
                }
            }
        }
        else if(comment?.replies?.length > 0){
            return {...comment,replies:likeAndDisLikeHandler(comment.replies,id,action) }
        }
        return comment
    })
}


function deleteCommentHandler(comments,id){
    return comments.reduce((acc,comment)=>{
        if(comment.id === id) return acc

        const updatedReplies = comment?.replies.length ? deleteCommentHandler(comment?.replies,id) : []

        acc.push({...comment,replies:updatedReplies})
        return acc
    },[])
}


function editCommentHandler(comments,id,content){
    return comments.map((comment)=>{
        if(comment.id === id){
            return{...comment,content}
        }
        else if(comment?.replies?.length > 0){
            return {...comment,replies:editCommentHandler(comment.replies,id,content)}
        }
        return comment
    })
}


function addNewCommentHandler(comments = [],{id, content}) {
    const newComment = {
        id: Date.now(),
        content,
        votes: { likes: 0, dislikes: 0 },
        time: Date.now(),
        replies: []
    };

    if (!id) return [...comments, newComment];

    function iterate(comments) {
        return comments.map(comment =>
            comment.id === id
                ? { ...comment, replies: [...comment.replies, newComment] }
                : { ...comment, replies: iterate(comment.replies) }
        );
    }
    return iterate(comments);
}


function sortCommentsHandler(comments,{criteria,order}){
    if(!criteria || !order) return comments

    function iterate(comments){
        return comments?.map(comment=>({
            ...comment,
            replies:comment.replies.length>0 ? iterate(comment.replies) : comment.replies,
        }))
        .sort((a,b)=>{
            let valA = (criteria === 'likes' || criteria === 'dislikes') ?  a.votes[criteria]  : a[criteria]    
            let valB = (criteria === 'likes' || criteria === 'dislikes') ?  b.votes[criteria]  : b[criteria]    

            return order === 'INCREASING' ? valA - valB : valB - valA
        })
    }   
    return iterate(comments)
}


export const commentReducer = (state,action)=>{
    switch(action.type){
        case "ADD_COMMENTS":
            return {...state,comments:action.payload}
        case "LIKE_COMMENT":
            return {...state,
                comments:likeAndDisLikeHandler(state.comments,action.payload,'LIKE')
            }
        case "DISLIKE_COMMENT":
            return {...state,
                comments:likeAndDisLikeHandler(state.comments,action.payload,'DISLIKE')

            }
        case "DELETE_COMMENT":
            return {...state,
                comments:deleteCommentHandler(state.comments,action.payload)
            }

        case "EDIT_COMMENT":
            const {content,id} = action.payload
            return {
                ...state,comments:editCommentHandler(state.comments,id,content)
            }
        
        case "TOGGLE_REPLIES":
            const isOpen  = state.showReplies.includes(action.payload)

            return {...state,
                showReplies:isOpen? state.showReplies.filter(cid=> cid!==action.payload) : [...state.showReplies,action.payload]
            }

        case "ADD_COMMENT":
            return {...state,
                comments:addNewCommentHandler(state.comments,action.payload)
            }

        case "SORT_COMMENTS":
            return{
                ...state,
                comments:sortCommentsHandler(state.comments,action.payload)
            }

        default:
            return state;
    }
}

