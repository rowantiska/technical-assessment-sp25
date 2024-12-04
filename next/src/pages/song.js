import React from 'react';
import "../globals.css";
import Board from '@/comps/board';
import { FiPlayCircle } from "react-icons/fi";
require('dotenv').config();

const API_KEY = process.env.GENUIS_API;

export async function getServerSideProps() {

    const now = new Date();
    const month = now.getMonth() + 1; // Months are 0-indexed
    const day = now.getDate();
    const date = month + "/"+ day

    const songData = [];

if(date){
    while(songData.length < 3) {
        const randomId = Math.floor(100000 + Math.random() * 900000); // Get random 6 digit id
        const response = await fetch('https://api.genius.com/songs/'+randomId, {
            method: 'GET',
            headers: {
            'Authorization': 'Bearer '+API_KEY,
            },
        });
        const data = await response.json();
        try{
            if(data.response.song.title){
                songData.push(data.response.song)
            }
        }
        catch(e){
            console.log("Error with random song id, finding another...")
        }
    }
    //Pass down the data fetched once the comp is mounted
        return {
            props: {
            songData,
            },
        };
}
}

export default function Song({songData}) {
  return (
    <div>
        <p className='text-3xl md:m-20 m-10 md:mt-10'>Daily Songs</p>
        <div className='flex justify-center flex-wrap'>
            {songData.map((song, index) => (
                <div className='w-96 h-96 md:mt-0 mt-10 rounded-md m-10 mb-0 p-6 bg-[#1F1F1F]'>
                    <div className='flex justify-center'>
                        <img className='min-w-40 max-h-40 m-6 rounded-md' src={song.header_image_thumbnail_url}></img>
                    </div>
                    <p className='text-2xl font-medium h-10 truncate' key={index}>{song.title_with_featured}</p>
                    <p className='text-[#929292] h-6 truncate'>By {song.artist_names}</p>
                    <button className='mt-4 text-[#000] bg-[#1BD760] p-3 text-2xl rounded-full flex items-center'><a href={song.apple_music_player_url} target="_blank"><FiPlayCircle/></a></button>
                </div>
            ))}
        </div>
              <div className='m-16 h-[1px] w-auto bg-[#1F1F1F]'></div>
        <div>
            <Board/>
        </div>
    </div>
  );
}