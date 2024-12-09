import React from 'react'
import { useState } from 'react'
import Comments from './comments.js'

export default function board(props) {
  const [username, setUsername] = useState("")
  const [comment, setComment] = useState("")
  const [update, setUpdate] = useState(0);
  const currentDate = props.date // get date from main page so we can change it when needed...

  const getUsernameInput = (event) => {
    setUsername(event.target.value);
  };

  const getCommentInput = (event) => {
    setComment(event.target.value);
  };

  const postData = () => {
    if(username.length != 0 & comment.length !=0){ // Make sure both feilds are valid (not empty)
      try{
        fetch('http://localhost:8080/comments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: username,
            comment: comment
          })
        })
        console.log("Posted data successfully")
        setUpdate(update+1) //Force remount of "comments"
      }
      catch(e){
        console.log("Error "+e)
      }
    }
    else{
      console.log("All feilds required")
    }
  }


  return (
    <div>
    <div className='m-10 mt-0 flex justify-center md:m-20'>
      <div className='w-full'>
        <p className='text-3xl'>Community Discussion</p>
          <div>
              <input onChange={getUsernameInput} placeholder='Username (posted to community)' className='mt-6 bg-[#1F1F1F] border border-[#929292] p-4 rounded-md w-full'></input>
              <textarea onChange={getCommentInput} placeholder='Post your thoughts on this weeks songs' className="mt-3 bg-[#1F1F1F] border border-[#929292] p-4 resize-none rounded-md w-full"></textarea>
              <button onClick={postData} className='mt-3 text-[#000] bg-[#1BD760] pr-6 pl-6 p-3 rounded-lg'>Post</button>
          </div>
      </div>
    </div>

    <div className='md:m-20 m-10 h-96 overflow-scroll'>
      <Comments date={currentDate} key={update}/>
    </div>

    </div>
  )
}
