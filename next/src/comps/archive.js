import React, { useState, useEffect } from 'react';
import { FiX, FiPlayCircle, FiArrowRight, FiArrowLeft } from "react-icons/fi";
import Comments from './comments';

export default function Archive() {
    const [prevSongs, setPrevSongs] = useState([]); // List of all songs
    const [songOfDay, setSongOfDay] = useState([]); // Single song toggle
    const [modal, setModal] = useState(false);
    const [day, setDay] = useState(1);

    // Fetch archived songs on mount
    useEffect(() => {
        const getPrevSongs = async () => {
            try {
                const response = await fetch('http://localhost:8080/appdata', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                setPrevSongs(data);
                setSongOfDay(data[0]);
            } catch (e) {
                console.log("Error fetching songs: " + e);
            }
        };
        getPrevSongs();
    }, []);
    useEffect(() => {
    }, [songOfDay]);

    // Toggle day logic
    const toggleDay = () => {
        if (day < prevSongs.length-1) {
                setSongOfDay(prevSongs[day]); // Update the song of the day
                console.log(songOfDay)
                setDay(day + 1);
        }
    };

    const prevDay = () => {
        if (day > 0) {
                setDay(day - 1);
                setSongOfDay(prevSongs[day]); // Update the song of the day
        }
    };

    const toggleModal = () => {
        setModal(!modal);
    };

    return (
        <div>
            <button onClick={toggleModal} className="p-3 border border-[#929292] rounded-md text-lg m-10 md:m-20">
                View archived songs
            </button>
            {modal && (
                <div className="w-full h-full absolute top-0 left-0 right-0 bottom-0">
                    <div className="bg-[#000] opacity-75 w-full h-full fixed top-0 left-0 right-0 bottom-0 z-3"></div>
                    <div className="flex items-center mt-24 justify-center">
                        <div className="bg-[#000] border border-[#929292] rounded-lg shadow-2xl z-10 w-[75%]">
                            <div>
                                <button onClick={toggleModal} className="m-4 text-2xl"><FiX /></button>
                                <p className="text-3xl m-10 mt-0">Archived Songs</p>
                                <button className='ml-10 m-3 text-2xl' onClick={toggleDay}><FiArrowLeft/></button>
                                <button className='m-3 text-2xl' onClick={prevDay}><FiArrowRight/></button>
                                <p className='m-10 text-xl mt-0 mb-6'>Showing songs from {songOfDay.date.substring(0,10)}</p>
                                <div className='flex justify-center flex-wrap mb-6'>
                                {songOfDay ? (
                                songOfDay.songsofday.map((song, index) => 
                                    <div className='w-72 h-72 md:mt-0 mt-10 rounded-md m-10 mb-0 p-6 bg-[#1F1F1F] border border-[#929292]' key={index}>
                                        <div className='flex justify-center'>
                                            <img className='min-w-32 max-h-32 m-2 rounded-md' src={song.image}></img>
                                        </div>
                                        <p className='text-lg font-medium h-8 truncate' key={index}>{song.title}</p>
                                        <p className='text-[#929292] truncate'>By {song.artist}</p>
                                        <button className='mt-2 text-[#000] bg-[#1BD760] p-2 text-xl rounded-full flex items-center'><a href={song.link} target="_blank"><FiPlayCircle/></a></button>
                                    </div>
                                )
                                ) : (
                                <p>No archived songs</p>
                                )}
                                </div>
                                <Comments date={songOfDay.date.substring(0,10)} key={songOfDay.date.substring(0,10)}/>
                            </div>
                            <div className="overflow-scroll"></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}