import React, { useEffect, useState } from 'react';
import requests from '../Requests';
import axios from 'axios';

const Main = () => {
    const [movies, setMovies] = useState([]);
    const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

    useEffect(() => {
        axios.get(requests.requestPopular)
            .then((response) => {
                setMovies(response.data.results);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    // Function to change the current movie index
    const changeMovieIndex = () => {
        setCurrentMovieIndex((prevIndex) => (prevIndex + 1) % movies.length);
    };

    // Set up an interval to change the movie index every 10 seconds (10000 milliseconds)
    useEffect(() => {
        const intervalId = setInterval(changeMovieIndex, 5000);

        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, [movies]);

    const truncateString = (str, num) => {
        if (str?.length > num) {
            return str.slice(0, num) + '...';
        } else {
            return str;
        }
    };

    const currentMovie = movies[currentMovieIndex];

    return (
        <div className='w-full h-[650px] text-white relative overflow-hidden'>
            <div className='w-full h-full'>
                <div className='absolute w-full h-[650px] bg-gradient-to-r from-black'></div>
                {/* Use Tailwind CSS classes for smooth image transition */}
                <img
                    className='w-full h-full object-cover transition-opacity duration-500'
                    src={`https://image.tmdb.org/t/p/original/${currentMovie?.poster_path}`}
                    alt={currentMovie?.title}
                    style={{ opacity: '1' }}
                />
            </div>
            <div className='absolute w-full top-[20%] p-4 md:p-8'>
                <h1 className='text-3xl md:text-5xl font-bold'>{currentMovie?.title}</h1>
                <div className='my-4'>
                    <button className='border bg-gray-300 text-black border-gray py-2 px-5 transition-all duration-300 hover:scale-110'>Play</button>
                    <button className='border text-white border-gray-300 py-2 px-5 ml-4 transition-all duration-300 hover:scale-110'>Watch later</button>
                </div>
                <p className='text-gray-400 text-sm'>Released: {currentMovie?.release_date}</p>
                <p className='w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200'>
                    {truncateString(currentMovie?.overview, 150)}
                </p>
            </div>
        </div>
    );
};

export default Main;