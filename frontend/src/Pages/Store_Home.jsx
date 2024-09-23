import React, { useState } from 'react'
import Header from '../components/Store_Header'
import ExploreMenu from "../components/Store_ExploreMenu"
import FoodDisplay from '../components/Store_FoodDisplay'
import Navbar from '../components/Store_Navbar'

const Home = () => {
  const [category, setCategory] = useState('All')

  return (
    <div>
        <Navbar />
        <Header />
        <div id="explore-menu">
            <ExploreMenu category={category} setCategory={setCategory}/>
        </div>
        <div id="food-display">
            <FoodDisplay category={category}/>
        </div>
    </div>
  )
}

export default Home;
