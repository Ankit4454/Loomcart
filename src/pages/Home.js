import React from 'react';
import CategoryCard from '../components/CategoryCard';
import home from '../images/home.png';
import electronics from '../images/electronics.png';
import travel from '../images/travel.png';
import furniture from '../images/furniture.png';
import fashion from '../images/fashion.png';
import sports from '../images/sports.png';
import beauty from '../images/beauty.png';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const category = [
    {
      name: 'Electronics',
      img: <img src={electronics} alt='Electronics' width={100} />,
      link: '/category/Electronics'
    },
    {
      name: 'Travel',
      img: <img src={travel} alt='Travel' width={100} />,
      link: '/category/Travel and Luggage'
    },
    {
      name: 'Furniture',
      img: <img src={furniture} alt='Furniture' width={100} />,
      link: '/category/Home and Furniture'
    },
    {
      name: 'Fashion',
      img: <img src={fashion} alt='Fashion' width={90} />,
      link: '/category/Fashion'
    },
    {
      name: 'Sports',
      img: <img src={sports} alt='Sports' width={100} />,
      link: '/category/Sports and Outdoors'
    },
    {
      name: 'Beauty',
      img: <img src={beauty} alt='Beauty' width={95} />,
      link: '/category/Beauty and Personal Care'
    },
  ];

  return (
    <div className="relative min-h screen bg-center">
      <div className="relative flex items-center justify-center">
        <img src={home} alt="Home page" className="w-full" />
        <div className="absolute inset-0 flex px-10">
          <div className="relative flex flex-col items-start justify-center text-white">
            <h1 className="font-bold mb-4 sm:text-xl md:text-4xl lg:text-5xl">Discover Your Perfect Products</h1>
            <p className="mb-6 sm:text-sm md:text-lg lg:text-xl">Explore a wide range of products curated just for you.</p>
            <button onClick={() => navigate('/whatsnew')} className="bg-teal-700 text-white py-2 px-6 rounded-3xl hover:bg-teal-800">Learn More</button>
          </div>
        </div>
      </div>

      <div className="p-10">
        <div className="flex flex-col">
          <h1 className="pt-10 text-2xl font-bold text-gray-800">Shop Our Top Categories</h1>
          <div className="flex flex-wrap py-6 items-center justify-between gap-5">
            {category.map((cat) => (
              <CategoryCard key={cat.name} category={cat} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;