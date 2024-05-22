import React , { useState } from 'react'
import { FaHeart , FaRegHeart } from 'react-icons/fa'

function LikePoke() {
    const [ like , setLike] = useState(false)

    const toggleLike = () => {
        setLike((check) => !check)
    }

  return (
    <button className="mt-2" onClick={toggleLike}>
        {like ? <FaHeart style={{color : "red"}} /> : <FaRegHeart/>}
    </button>
  )
}

export default LikePoke