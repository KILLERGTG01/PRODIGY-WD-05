"use client"
import React,{ useState } from "react"
import Input from "./components/input"
import Current from "./components/Current"
import WeekForecast from "./components/WeekForecast"
import WeatherDetails from "./components/WeatherDetails"


const Home = () => {
  const [data,setData]=useState({});
  const [location,setLocation]=useState("");
  const [error,setError]=useState("");

  const url="http://api.weatherapi.com/v1/forecast.json?key=3988e96171874c25b1672407242906&q=${location}days=7&aqi=yes&alerts=yes";
  
  const handleSearch= async(e:React.KeyboardEvent<HTMLInputElement>)=>{
    if(e.key==="Enter"){
      e.preventDefault();
      try{
        const response= await fetch(url);
        if(!response.ok){
          throw new Error();
        }
        const data = await response.json()
        setData(data);
        setLocation("");
        setError("");
      }catch(error){
        setError("City not found");
        setData({});
      }    
    }
  };
  let content;
  if(Object.keys(data).length===0 && error===''){
    content=(
      <div>
        <h2>Welcome to Gauge</h2>
      </div>
    );
  }else if(error!==""){
    content=(
      <div>
        <p>City Not Found</p>
        <p>Enter a valid city</p>
      </div>
    );
  }else{
    content =(
      <>
        <div>
          <Current data={data} />
          <WeekForecast data={data} />
        </div>
        <div>
          <WeatherDetails />
        </div>
      </>
    )
  }
  return (
    <div className='bg-cover bg-gradient-to-r from-blue-500 to-blue-300 h-screen'>
      <div className='bg-white/25 w-full flex flex-col h-fit'>
        <div className="flex flex-col md:flex-row justify-center p-12">
          <Input handleSearch={handleSearch} setLocation={setLocation}/>
          <h1 className="mb-8 md:mb-0 order-1 text-white py-2 rounded-xl italic font-bold">Gauge</h1>
        </div>
        {content}
      </div>
    </div>
  )
}

export default Home
