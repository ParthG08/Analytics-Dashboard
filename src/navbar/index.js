import { useEffect, useState } from "react";
import axios from "axios";
import './styles.css'

export default function Navbar(){  
  let [upperRange,setUpperRange] = useState(0);
  let [lowerRange,setLowerRange] = useState(0);

  function filterByYear(item){
    if(item.end_year == '' || item.start_year == '')return false;
    else if(item.start_year>lowerRange && item.end_year<upperRange)return true;
    else return false;  
  }

  async function handleSubmit(event){
    event.preventDefault();
    console.log(upperRange,lowerRange);
    localStorage.removeItem('myData');
    const response = await axios.get("http://localhost:5000/api/data");
    const newJSON = response.data;
    
    const jsonFilteredResponse = newJSON.filter((d)=>filterByYear(d));
    console.log(jsonFilteredResponse,"jsonFileterd");
    const stringJsonFilteredResponse = JSON.stringify(jsonFilteredResponse);

    localStorage.removeItem('myData');
    localStorage.setItem('myData',stringJsonFilteredResponse);

    console.log("data stored in localStorage");
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:5000/api/data");
        const jsonData = JSON.stringify(response.data);
        console.log("navbar2")
        if(localStorage.getItem("myData") == null){
            localStorage.setItem("myData", jsonData);
        }
        console.log("Data stored in localStorage");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return <div>
    <form onSubmit={handleSubmit}>
    <input type="text" name="upperRange" onChange={(event)=>{setLowerRange(event.target.value)}} />
    <input type="text" name="lowerRange" onChange={(event)=>{setUpperRange(event.target.value)}} />
    <button type="submit">Submit</button>
  </form>
  </div>;
}
