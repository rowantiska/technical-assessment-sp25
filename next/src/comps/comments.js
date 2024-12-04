import React from 'react'
import { useEffect, useState } from 'react'

export default function comments({}) {
    const [allComments, setallComments] = useState(["Loading..."])

    useEffect(() => {
    const getData = async () => {
        try{
          fetch('http://localhost:8080/comments')
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json(); // Convert the response to JSON
          })
          .then(data => {
            var commentsArr = data.map(item => item);
            setallComments(commentsArr);
          })
        }
        catch(e){
          console.log("Error "+e)
        }
      }
        //getData() //Get data when pages loads
        console.log(allComments)
        getData();
    }, []); 

  return (
    <div>
      {allComments.map((comment, index) => (
          <div id={index}>
              <div className='w-full bg-[#1F1F1F] border border-[#929292] mt-2 p-6 rounded-md'>
                <p className='text-sm text-[#929292] text-right'>ID: {comment.id}</p>
                <p>Posted by <span className='font-semibold'>{comment.username}</span> at <span>{comment.created_at}</span></p>
                <p className='text-sm text-[#929292] mt-2'>Comment</p>
                <p className='mt-1 text-lg'>{comment.comment}</p>
              </div>
          </div>
        ))}
    </div>
  )
}
