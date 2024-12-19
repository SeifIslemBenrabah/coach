import React ,{useState}from 'react'
import HeroBannerImage from '../assets/banner.png'
import {ReactComponent as In } from '../assets/1.svg'
import {ReactComponent as  Fb} from '../assets/2.svg'
import {ReactComponent as  Insta } from '../assets/3.svg'
import {ReactComponent as Wats} from '../assets/4.svg'
import axios from 'axios'
const Home = () => {
    const [search,setSearch] = useState('')
    const handleSearch = async () => {
        if (search) {
          const options = {
            method: 'GET',
            url: 'https://exercisedb.p.rapidapi.com/exercises/bodyPart/back',
            params: {
              limit: '10',
              offset: '0'
            },
            headers: {
              'x-rapidapi-key': 'b074a0976bmsh21ef395bb1cb7eap15db1fjsn25e330bd3352',
              'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
            }
          };      
          try {
            const response = await axios.request(options);
            const exercisesData = response.data
            const searchedExercises = exercisesData.filter(
              (item) =>
                item.name.toLowerCase().includes(search) ||
                item.target.toLowerCase().includes(search) ||
                item.equipment.toLowerCase().includes(search) ||
                item.bodyPart.toLowerCase().includes(search)
            );
    
            window.scrollTo({ top: 1800, left: 100, behavior: 'smooth' });
    
            setSearch('');
          } catch (error) {
            console.error('Error searching exercises:', error);
          }
        }
      };
  return (
    <div className='bg-OffWhite'>
        <div className='top-0 h-14 bg-primary flex flex-row justify-between items-center px-12 fixed w-full rounded-b-md'>
            <div className='text-white font-extrabold'>Logo</div>
            <div className='flex flex-row gap-6 items-center'>
                <a href='/login' className='bg-OffWhite p-1 rounded-md flex flex-row justify-center items-center font-bold text-primary font-montserrat'>Login</a>
            </div>
        </div>
        <div className='flex flex-row justify-between top-20 fixed z-20'>
            <div className='flex flex-col fixed w-full h-full'>
                <div className='ml-6 mt-16'>
        <p className='font-montserrat text-5xl text-primary font-extrabold leading-none mb-4 text-shadow-md'>
            Votre Bien-être, Notre Priorité 
        </p>
        <p className='font-montserrat text-secondary font-light text-4xl ml-4'>
            Coaching Personnalisé pour Vous
        </p>
            <div className='relative mt-7 ml-8 w-[600px]'>
            <input
            className='w-[600px] px-4 border-2 border-primary rounded-md bg-white h-14 hover:border-primary focus:outline-none focus:ring-0 hover:outline-primary'
            value={search}
            onChange={(e) => setSearch(e.target.value.trim().toLowerCase())}
            placeholder="Search Exercises"
            type="text"
            />
            <button
            className='bg-primary font-montserrat font-medium text-white w-24 h-14 absolute right-0 rounded-r-md'
            onClick={handleSearch}>
            Search
            </button>
        </div>
        <div className='mt-8 flex flex-row ml-8 gap-8 items-center'>
        <div className='w-[1px] h-32 bg-secondary'></div>
            <p className='font-montserrat text-secondary font-medium '>
                "Découvrez un coaching sur-mesure pour atteindre vos objectifs de santé,<br/>
                forme physique et bien-être.Nos programmes sont spécialement conçus<br/>
                pour répondre à vos besoins uniques, que ce soit pour la nutrition,<br/>
                l'entraînement ou un suivi personnalisé.Chaque programme est pensé<br/>
                pour vous aider à progresser efficacement, en vous apportant<br/>
                des résultats durables."
            </p>
        </div>
        <a href='/login'  className='bg-primary text-lg font-montserrat text-white items-center w-40 rounded-lg flex justify-center py-1 shadow-xl mt-5 ml-16'>
          Get Started
          </a>
        </div>
            </div>
            <div className='w-1/2 mt-6 fixed right-0 bottom-0 -z-20'>
            <img src={HeroBannerImage}  alt="banner" className="hero-banner-img" />
            </div>
        </div>
    </div>
  )
}

export default Home
