import React from 'react'
import { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { IoSend } from 'react-icons/io5'

// for add and edit comment
const InpComment = ({toggleInp,initialContent='',submitHandler}) => {

  const [content,setContent] = useState(initialContent)

  return(
    <div className='inp-comment'>
      <textarea 
        type="text" 
        placeholder='start typing...' 
        value={content}  
        onChange={(e)=> setContent(e.target.value)} 
      />
      <IoMdClose id="close" className="icon " onClick={()=> toggleInp(false)} ></IoMdClose>
      {
        content &&  <IoSend id="send" className="icon "  onClick={()=> submitHandler(content)}   ></IoSend>
      }
  </div>
  )
}

export default InpComment