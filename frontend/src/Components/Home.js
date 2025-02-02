import React ,{useState}from 'react'
import HeroBannerImage from '../assets/banner.png'
import plans from '../assets/plans.jpg'
import diet from '../assets/diet.jpg'
import footing from '../assets/friends.jpg'
import coach from '../assets/coach.jpg'
import gym from '../assets/gym.jpg'
import gym1 from '../assets/gym1.jpg'
import gym2 from '../assets/gym2.jpg'
import starts from '../assets/stars.png'
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
    <div className='flex flex-col font-montserrat'>
        <div className='flex flex-row justify-between items-center px-3 md:px-16 w-full bg-primary py-2  md:py-6 text-white shadow-xl z-20'>
          <a href='' className='font-bold'>Logo</a>
          <div className='hidden md:flex flex-row gap-6 dis'>
            <a>Services</a>
            <a>About us</a>
            <a>Testimonial</a>
            <a>Help Center</a>
          </div>
          <a href='/login'className='bg-OffWhite py-2 px-4 text-blackk rounded-lg'>
            Login
          </a>
        </div>
        <div className='bg-primary relative h-screen md:h-[380px] lg:h-[500px] xl:h-[670px] 2xl:h-[1200px] font-montserrat text-secondary'>
          <div className='flex flex-row '>
          <div className='hidden md:flex flex-col pl-12 xl:pt-36 md:pt-8 lg:pt-12 z-20'>
            <p className='md:text-3xl xl:text-6xl 2xl:text-9xl font-semibold z-20'>Helps for your <br/>ideal body fitness</p>
            <p className=' xl:text-xl md:text-sm 2xl:text-4xl mt-8'>Motivate users with benefits and positive reinforcement, <br/>and offer modifications and progress tracking.</p>
            <a href='/login' className='bg-OffWhite w-40 2xl:w-80 2xl:text-4xl text-blackk text-center py-2 mt-6 rounded-xl font-semibold'>Start Training</a>
          </div>
          <div className='flex flex-col  items-center md:hidden pt-20 z-20 h-screen'>
  <p className='text-3xl text-center font-semibold z-20'>Helps for your ideal body fitness</p>
  <p className='text-xl mt-8 text-center'>
    Motivate users with benefits and positive reinforcement, and offer modifications and progress tracking.
  </p>
  <a 
    href='/login' 
    className='bg-OffWhite text-xl text-blackk text-center p-4 mt-8 rounded-xl font-semibold'
  >
    Start Training
  </a>
</div>
          <div className='w-full bottom-0 md:w-6/12 absolute  md:relative'>
            <img src={HeroBannerImage}/>
          </div>
          </div>
          <div className='bg-blackk w-full grid grid-cols-2 md:flex md:flex-row justify-around text-lg font-montserrat font-bold py-6'>
            <div className='flex flex-col items-center justify-center'>
              <p>+5</p>
              <p>Years of Service</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <p>10+</p>
              <p>Certified Trainers</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <p>786+</p>
              <p>Happy Members</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <p>95%</p>
              <p>Customer Satisf</p>
            </div>
          </div>
        </div>
        <div className='bg-OffWhite flex flex-col items-center pt-9 xl:w-full'>
          <div className='flex flex-col items-center md:items-start mt-48 md:mt-0 md:flex-row w-full'>
          <div className='relative w-full xl:w-1/2 overflow-x-scroll sm:overflow-visible flex space-x-4'>
  <img src={diet} className='w-[260px] rounded-xl shadow-2xl md:absolute right-60 top-28'/>
  <img src={footing} className='h-[250px] rounded-xl shadow-2xl z-20 md:absolute top-40 right-44'/>
  <img src={plans} className='w-[220px] rounded-xl shadow-2xl md:absolute z-30 top-72 right-64'/>
</div>

            <div className='flex flex-col my-10  md:my-32 gap-2'>
              <p className='md:text-3xl xl:text-5xl font-bold mb-2'>Transform your<br/> physique with our <br/> Services.</p>
              <div className='flex flex-row gap-[3px] xl:gap-3 items-center'>
                <div className='rounded-full bg-blackk text-OffWhite p-[1px] xl:p-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-2 xl:size-3">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </div>
              <p className='text-xs xl:text-base'>Personalized Coaching</p>
              </div>
              <div className='flex flex-row gap-[3px] xl:gap-3 items-center'>
                <div className='rounded-full bg-blackk text-OffWhite p-[1px] xl:p-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-2 xl:size-3">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </div>
              <p className='text-xs xl:text-base'>Nutrition & Fitness Plans</p>
              </div>
              <div className='flex flex-row gap-[3px] xl:gap-3 items-center'>
                <div className='rounded-full bg-blackk text-OffWhite p-[1px] xl:p-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-2 xl:size-3">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </div>
              <p className='text-xs xl:text-base'>Progress Tracking</p>
              </div>
              <a className='bg-primary px-2 py-2 w-40 text-center rounded-lg text-secondary mt-2'>
                Contact Us
              </a>
            </div>
          </div>
          <div className='mt-5 flex flex-col md:flex-row relative justify-center mb-5 w-full'>
            <img src={coach} className='h-[300px] rounded-xl z-20 hidden md:block md:absolute left-10 xl:left-44 top-4'/>
            <div className=' md:hidden w-full flex justify-center items-center absolute top-0'>
                <img src={coach} className='size-28 rounded-full'/>
            </div>
            <div className='md:h-[340px] w-full md:w-8/12 rounded-xl bg-primary ml:pl-14 mt-20 md:mt-0 xl:pl-32 text-secondary ml-0 md:ml-32 overflow-hidden'>
            <p className='ml-1 xl:ml-4 font-bold text-xl xl:text-3xl mt-3'>Coach Jasm</p>
            <p className='font-extralight mt-6 xl:mt-9 text-base ml-2'>
            I am a professional coach with extensive training and experience in helping individuals
achieve their personal and professional goals. I hold a degree in [insert  degree],
and I am certified in  e.g., life coaching, fitness training, nutrition.
With a passion for empowering others, I use a personalized 
approach to guide my clients through their journeys, 
whether it’s improving fitness, enhancing productivity, or achieving 
overall well-being. My mission is to provide the tools, strategies, and
support needed to help each client reach their fullest potential
            </p>
            </div>
          </div>
          <div className='flex flex-col items-center justify-center mt-6 w-full'>
            <p className='text-2xl font-extrabold'>Testimonial</p>
            <div className='flex flex-col xl:flex-row w-full'>
            <div className='w-full px-10 xl:px-0  xl:w-1/2 xl:relative '>
  <p className='xl:absolute top-14 left-12 text-2xl font-bold mb-2 xl:mb-0'>
    Our Members <br/> progress
  </p>
  <div className='flex flex-row gap-4 justify-evenly w-full overflow-x-scroll sm:overflow-visible'>
  <img 
    src={gym} 
    className='w-[150px] xl:w-[200px] rounded-2xl shadow-2xl xl:absolute xl:left-80 xl:top-14' 
  />
  <img 
    src={gym1} 
    className='w-[150px] rounded-2xl shadow-2xl xl:absolute xl:left-64 xl:top-72 z-20' 
  />
  <img 
    src={gym2} 
    className='w-[150px] rounded-2xl shadow-2xl xl:absolute xl:left-20 xl:top-40' 
  />
  </div>
</div>
<div className='w-full px-10 xl:px-0 xl:w-1/2 flex-end mt-8 xl:mt-24 mb-24'>
            <p className='top-14 left-12 text-2xl font-bold mb-2 xl:mb-5'>
            What Our Members <br />Say About Us?
            </p>
            <div className='bg-OffWhite shadow-2xl rounded-xl flex flex-col p-5 w-11/12 gap-2 text-gry mt-3'>
              <p className='text-2xl font-semibold'>Seif Iselm Benrabah</p>
              <img src={starts} className='w-20'/>
              <p className='mt-2 text-lg font-medium'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do <br/>
              eiusmod tempor incididunt ut labore et dolore magna aliqua.<br/> 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco<br/> 
              laboris nisi ut aliquip ex ea commodo consequat. 
              </p>
            </div>
            <div className='flex flex-row  gap-2 mt-6 justify-end w-11/12 pr-3'>
              <div className='rounded-full bg-black border-2 border-black text-OffWhite p-1'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
              </div>
              <div className='rounded-full border-2 border-black p-1'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
              </div> 
            </div>
            </div>
            </div>
          </div>
          <div className='bg-primary w-10/12 flex flex-col p-9 items-center justify-center gap-4 rounded-2xl mb-20'>
          <p className='text-white font-montserrat text-2xl font-semibold'>Subscribe our fitness tips</p>
          <p className='text-secondary text-center text-lg'>Clearly communicate the benefits of subscribing, such as exclusive content <br/>and breaking news.</p>
          <div className='relative mb-0 mt-3 w-8/12'>
        <input
        className='h-16 border-none rounded-xl w-full pl-5 focus:outline-none'
          value={search}
          onChange={(e) => setSearch(e.target.value.trim().toLowerCase())}
          placeholder="Send Message"
          type="text"
        />
        <button
          className="search-btn bg-primary text-white absolute right-1 p-4 top-1 h-14 rounded-xl"
          onClick={handleSearch}>
          Send
        </button>
          </div>
          </div>
          <div className='w-full bg-blackk flex flex-col md:flex-row items-center justify-around'>
            <div className='w-full md:w-3/6 flex flex-col text-white p-8 gap-3'>
            <p className='text-2xl font-bold'>LOGO</p>
            <p>
            Personalized coaching, fitness programs, and nutrition <br/>
            plans tailored to help you achieve your goals and track your progress
            </p>
            <p>email@gmail.com</p>
            </div>
            <div className='flex flex-row'>
            <div className='flex flex-col text-white p-8 gap-2'>
              <p className='text-lg font-semibold'>Sitemap</p>
              <a href='#Services'>Services</a>
              <a href='#AboutUs'>About us</a>
              <a href='#Testimonial'>Testimonial</a>
              <a href='#Help'>Help Center</a>
            </div>
            <div className='flex flex-col text-white p-8 gap-2'>
            <p className='text-lg font-semibold'>Sitemap</p>
            <div className='flex flex-row items-center justify-center gap-2'>
              <a><Fb className='w-3'/></a>
              <a><In className='w-5'/></a>
              <a><Insta className='w-5'/></a>
              <a><Wats className='w-5'/></a>
            </div>
            </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Home
