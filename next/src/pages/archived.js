import React from 'react'
import "../globals.css";
import { FiPlayCircle } from "react-icons/fi";
import Comments from '@/comps/comments';

export async function getServerSideProps() {
  //Get DB data
  const response = await fetch('http://localhost:8080/appdata', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      },
  });
  const data = await response.json()
  var songData = data

return {
  props: {
    songData,
  },
};
}

export default function archived({songData}) {
  return (
    <div>
        <p className='text-3xl m-10'>Archived Songs</p>
        {songData.map((song, index) => (
          <div key={index} className='border border border-[#929292] rounded-md m-10'>
          <p className='text-2xl m-6'>Songs from <span>{song.date.substring(0,10)}</span></p>
          <div className='flex'>
          {song.songsofday.map((song, index) => (
                <div className='w-96 m-6 md:mt-0 mt-10 rounded-md p-4 bg-[#1F1F1F] border border-[#929292]' key={index}>
                  <div className='flex justify-center'>

                    <div className='w-1/4'>
                      <img className='rounded-md' src={song.image}></img>
                    </div> 
                    
                    <div className='w-3/4 ml-10'>
                      <p className='text-xl font-medium truncate ' key={index}>{song.title}</p>
                      <p className='text-[#929292] truncate mt-1'>By {song.artist}</p>
                      <button className='mt-2 text-[#000] bg-[#1BD760] p-2 text-xl rounded-full flex items-center'><a href={song.link} target="_blank"><FiPlayCircle/></a></button>
                    </div>
                    
                  </div>
              
            </div>
          ))}
        </div>

        <div className='m-6 h-72 overflow-scroll'>
          <p className='text-xl'>Comments from <span>{song.date.substring(0,10)}</span></p>
          <Comments date={song.date} archived={true}/>
        </div>

      </div>
        ))}
    </div>
  )
}
