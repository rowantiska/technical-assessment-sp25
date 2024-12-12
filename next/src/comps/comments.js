import React from 'react'
import { useEffect, useState } from 'react'

export default function comments(props) {
    const [allComments, setallComments] = useState([]);
    const [comments, setComments] = useState(false);
    const currentDate = String(props.date).substring(0,10);

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
            setallComments(dailyComments);
            setComments(true);
          })
        }
        catch(e){
          console.log("Error "+e);
        }
      }
        getData();
    }, []); 

  return (
    <div className={comments ? 'h-64 md:m-20 md:mt-10 m-10 overflow-auto' : 'md:m-20 md:mt-10 m-10'}>
      {allComments && allComments.length > 0 ? (
      allComments.map((comment, index) => (
          <div key={index}>
              <div className={props.archived ? "w-full bg-[#1F1F1F] border border-[#929292] mt-2 p-2 rounded-md" : "w-full bg-[#1F1F1F] border border-[#929292] mt-2 p-6 rounded-md"}>
                <div className='flex'>
                  <div className='w-4/5 flex justify-start'>
                    <p>Posted by <span className='font-semibold'>{comment.username}</span> at <span>{comment.created_at.substring(0,16)}</span></p>
                  </div>
                  <div className='w-1/5 flex justify-end'>
                    <p className='text-sm text-[#929292]'>ID: {comment.id}</p>
                  </div>
                </div>
                <p className='text-sm text-[#929292] mt-2'>Comment:</p>
                <p className='mt-1 text-lg'>{comment.comment}</p>
              </div>
          </div>
        )))
        : (
          <p className='text-center text-xl'>No comments for today</p>
        )}
    </div>
  )
}
