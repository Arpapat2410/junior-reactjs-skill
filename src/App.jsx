import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import ReactLoading from 'react-loading';

//Components
import FavPoke from './components/FavPoke';

function App() {

  const [poke, setPoke] = useState("");
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [number, setNumber] = useState(1)
  const [fav, setFav] = useState([])


  useEffect(() => {

    let abortController = new AbortController()

    const loadPoke = async () => {
      try {

        setLoading(true)
        let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${number}`, { signal: abortController.signal })

        setPoke(response.data)
        setError("")

      } catch (error) {
        setError("Someting went wrong", error)

      } finally {
        setLoading(false)
      }
    }

    loadPoke()


    return () => abortController.abort()

  }, [number])

  console.log(poke);

  const prevPoke = () => {
    setNumber((number) => number - 1)
  }

  const nextPoke = () => {
    setNumber((number) => number + 1)
  }

  const addFav = () => {
    setFav((oldState => [...oldState, poke]))
  }

  console.log("Pokemon ID : ", number);
  console.log("Your fav pokemon : ", fav);


  return (
    <div className="max-w-5xl p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:border-gray-700 m-auto ">
      <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2'>
        <div>
          {loading ? 
            <ReactLoading type='spin' color='black' height={'20%'} width={'20%'} />
    :
            <>
              <div className='text-4xl textarea-bordered' >{poke?.name}</div>
              <button  className="mt-5 btn btn-outline btn-primary hover:text-white" onClick={addFav}>Add to Favourite</button>
              <img src={poke?.sprites?.other?.home.front_default} alt={poke?.name} />
              <ul className='my-4'>
                {poke?.abilities?.map((abil, idx) => (
                  <li className='mt-2' key={idx} >{abil.ability.name}</li>
                ))}
              </ul>
              <div className='mt-6flex justify-center'>
                <button className='btn mr-5 px-5' onClick={prevPoke}>Previous</button>
                <button className='btn  px-9' onClick={nextPoke}>Next</button>
              </div>
            </>
          }
        </div>

        <div className=''>
          <div className='text-3xl '>Your favourite pokemon</div>
          {fav.length > 0 ? <FavPoke fav={fav} /> : <div className='flex h-full justify-center items-center'><p>No favourite pokemon</p></div>}
        </div>
      </div>
    </div>
  )
}

export default App
