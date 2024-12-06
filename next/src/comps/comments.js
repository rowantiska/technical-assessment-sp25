import React from 'react'
import { useEffect, useState } from 'react'

export default function comments(props) {
    const [allComments, setallComments] = useState([])
    const currentDate = props.date // get date from main page so we can change it when needed...

    useEffect(() => {
    const getData = async () => {
        try{
          fetch('http://localhost:8080/comments')
          .then(response => {
            if (!response.ok) {
              console.log('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            const dailyComments = data.filter(item =>
              String(item.created_at).substring(0, 10) === currentDate
            )
            setallComments(dailyComments)
          })
        }
        catch(e){
          console.log("Error "+e)
        }
      }
        getData();
    }, []); 

  return (
    <div>
      {allComments.map((comment, index) => (
          <div key={index}>
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
