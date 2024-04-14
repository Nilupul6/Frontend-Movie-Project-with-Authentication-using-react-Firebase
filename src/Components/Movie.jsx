import React, { useState } from 'react'
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';


const Movie = ({item}) => {


    const [like, setLike] = useState(false);
    const [saved, setSaved] = useState(false);
    const {user} = UserAuth();

    const movieID = doc(db,'users',`${user?.email}`)

    const saveShow = async() =>{
      if(user?.email){
        setLike(!like)
        setSaved(true)
        await updateDoc(movieID,{
          savedShows : arrayUnion({
            id: item.id,
            title: item.title,
            img: item.backdrop_path,
          }),
        });
      }else{
        alert('Please log in to save a Movie');
      }
    }

  return (
    <div className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2 transition-all duration-300 hover:scale-110'>
        <img src={`https://image.tmdb.org/t/p/original/${item?.poster_path}`} 
        alt={item.title} 
        />

        <div className='absolute top-0 left-0 w-full h-full hover: bg-black/80 opacity-0 hover:opacity-100 text-white'>
            <p className='white-space-normal test-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>{item?.title}</p>
            <p onClick={saveShow}>
                {like ? <FaHeart className='absolute top-6 left-4 text-gray-300' /> : <FaRegHeart className='absolute top-6 left-4 text-gray-300'/>}
            </p>
        </div>

    </div>
  )
}

export default Movie