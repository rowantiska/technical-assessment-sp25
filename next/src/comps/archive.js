import React, { useState, useEffect } from 'react';
import { FiX, FiPlayCircle, FiArrowRight, FiArrowLeft } from "react-icons/fi";
import Comments from './comments';

export default function Archive() {
    const [prevSongs, setPrevSongs] = useState([]); // List of all songs
    const [songOfDay, setSongOfDay] = useState([]); // Single song toggle
    const [day, setDay] = useState(1);
    const [modal, setModal] = useState(false);

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


    const prevDay = () => {
        if (day <= prevSongs.length-1) {
                setSongOfDay(prevSongs[day]);
                setDay(day + 1);
        }
    };

    const toggleModal = () => {
        setModal(!modal);
    };

    return (
        <div>
            <button onClick={toggleModal} className="p-3 border border-[#929292] rounded-md text-lg m-10 md:m-20 md:mt-10 md:mb-10">
                View archived songs
            </button>
            {modal && (
                <div className="w-full h-full absolute top-0 left-0 right-0 bottom-0">
                    <div className="bg-[#000] opacity-60 w-full h-full fixed top-0 left-0 right-0 bottom-0 z-3"></div>
                    <div className="flex items-center mt-10 justify-center">
                        <div className="bg-[#000] border border-[#929292] rounded-lg shadow-2xl z-10 w-[90%] md:w-[75%]">
                            <div>
                                <button onClick={toggleModal} className="m-4 text-2xl"><FiX /></button>
                                <p className="text-3xl m-10 mt-0 mb-6">Archived Songs from {songOfDay.date.substring(0,10)}</p>
                                <button className='flex items-center text-xl m-10 mt-0 p-3 border border-[#929292] rounded-md mb-2' onClick={prevDay}>Previous day<span className='ml-2 mt-[2px]'><FiArrowRight/></span></button>
                                <div className='flex justify-center flex-wrap mb-6'>
                                {songOfDay ? (
                                songOfDay.songsofday.map((song, index) => 
                                    <div className='w-72 h-72 m-6 mb-0 p-6 rounded-md bg-[#1F1F1F] border border-[#929292]' key={index}>
                                        <div className='flex justify-center'>
                                            <img className='min-w-32 max-h-32 m-2 rounded-md' src={song.image}></img>
                                        </div>
                                        <p className='text-lg font-medium h-8 truncate' key={index}>{song.title}</p>
                                        <p className='text-[#929292] truncate'>By {song.artist}</p>
                                        <a href={song.link} target="_blank"><button className='mt-2 text-[#000] bg-[#1BD760] p-2 text-xl rounded-full flex items-center'><FiPlayCircle/></button></a>
                                    </div>
                                )
                                ) : (
                                <p>No archived songs for date range</p>
                                )}
                                </div>
                                <div className='ml-20 mr-20 mt-10 h-[1px] w-auto bg-[#1F1F1F]'></div>
                                <Comments date={songOfDay.date.substring(0,10)} key={songOfDay.date.substring(0,10)}/>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}