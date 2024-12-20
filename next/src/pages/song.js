import React from 'react';
import Link from 'next/link';
import "../globals.css";
import Board from '@/comps/board';
import Archive from '@/comps/archive';
import { FiPlayCircle } from "react-icons/fi";
require('dotenv').config();
const API_KEY = process.env.GENUIS_API;

export async function getServerSideProps() {

    var songData = [];
    var songsFound = false;
    //time :///
    const jsTime = new Date();
    const jsTimeUTC = new Date(jsTime.toISOString()); 
    const updatedTime = new Date(jsTimeUTC);
    updatedTime.setUTCHours(jsTimeUTC.getUTCHours() + 5); 
    const currentDate = String(updatedTime.toISOString()).substring(0,10);
    //Get DB data
    try{
        const response = await fetch('http://localhost:8080/appdata', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data = await response.json();
    //fetch songs based on date
        for (let i = 0; i < data.length; i++) {
            if(String(data[i].date).substring(0, 10) == currentDate){
                songsFound = true
                songData = data[i].songsofday
                break;
            }
        }
    }
    catch(e){
        console.log("Eror fetching songs/finding old songs "+e);
    }

if(songsFound == false){
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
                songData.push({
                    title: data.response.song.title_with_featured, 
                    image: data.response.song.header_image_thumbnail_url, 
                    link: data.response.song.apple_music_player_url, 
                    artist: data.response.song.artist_names
                    })
            }
        }
        catch(e){
            console.log("Error with random song id, finding another...");
        }
    }
}

//Post new songs to DB only if date not found
if(songsFound == false){
    try{
        fetch('http://localhost:8080/appdata', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            songsofday: songData,
            })
        })
        console.log("Posted new songs to DB successfully");
    }
    catch(e){
        console.log("Could not post new songs to DB "+e);
    } 
}

return {
    props: {
    songData,
    currentDate
    },
};
}

export default function Song({songData, currentDate}) {
return (
    <div className='p-0 md:pt-0 md:p-24'>
        <div className='flex justify-center items-center'>
            <div className='w-1/2 flex justify-start'>
                <p className='text-3xl md:m-20 m-10 md:mt-10 md:mb-10'>Songs for {currentDate}</p>

            </div>
            <div className='w-1/2 flex justify-end'>
                <Archive date={currentDate}/>
            </div>
        </div>
        <div className='flex justify-center flex-wrap'>
            {songData.map((song, index) => (
                <div className='w-96 h-96 m-6 mb-0 p-6 rounded-md bg-[#1F1F1F] border border-[#929292]' key={index}>
                    <div className='flex justify-center'>
                        <img className='min-w-44 max-h-44 m-6 mt-2 rounded-md' src={song.image}></img>
                    </div>
                    <p className='text-2xl font-medium h-10 truncate' key={index}>{song.title}</p>
                    <p className='text-[#929292] h-6 truncate'>By {song.artist}</p>
                    <a href={song.link} target="_blank"><button className='mt-4 text-[#000] bg-[#1BD760] p-3 text-2xl rounded-full flex items-center'><FiPlayCircle/></button></a>
                </div>
            ))}
        </div>

        <div className='m-10 h-[1px] w-auto bg-[#1F1F1F] md:m-20 md:mt-12 md:mb-12'></div>
        <div>
            <Board date={currentDate}/>
        </div>
    </div>
);
}