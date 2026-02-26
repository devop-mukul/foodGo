import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import Carousel from '../components/Carousel'

export default function Home() {
  const [food_category, set_food_category] = useState([]);
  const [food_item, set_food_item] = useState([]);

  const loadData = async () => {
    try {
      let response = await fetch("http://localhost:5000/api/foodData", {
        method: "POST",
        headers: {
          'Content-Type' : 'application/json'
        }
      });

      response = await response.json();

      set_food_item(response[0]);
      set_food_category(response[1]);
      console.log(response[0], response[1]);
    } catch (error) {
      console.error("loadData error:", error);
    }
  }

  useEffect(() => { 
    loadData();
  }, [])




  return (
    <div>
        <div> <Navbar/> </div>
        <div> <Carousel/> </div>
        <div className='m-3 d-flex flex-wrap justify-content-around'>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
        </div>

        

        <div> <Footer/> </div>

    </div>
  )
}

