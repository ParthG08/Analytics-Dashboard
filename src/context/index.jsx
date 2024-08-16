import { createContext } from "react";
import { useState } from "react";
import axios from "axios";
import * as d3 from "d3";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [data, setData] = useState([]);
  const [upperRange, setUpperRange] = useState(0);
  const [lowerRange, setLowerRange] = useState(0);
  const [topicList, setTopicList] = useState([]);
  const [filteredByTopic,setFilteredByTopic] = useState(false);
  const [regionsList,setRegionsList] = useState([]);
  const [filteredByRegion,setFilteredByRegion] = useState(false);
  const [countryList,setCountryList] = useState([]);
  const [filteredByCountry,setFilteredByCountry] = useState(false);
  const [sourceList,setSourceList] = useState([]);
  const [filteredBySource,setFilteredBySource] = useState(false);
  
  
  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:5000/api/data");
      const jsonData = JSON.stringify(response.data);

      if (localStorage.getItem("myData") == null) {
        localStorage.setItem("myData", jsonData);
      }

      let stringData = localStorage.getItem("myData");
      let fetchedData = JSON.parse(stringData);

      setData(fetchedData);
      console.log("Data stored in localStorage");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  function filterByYear(item) {
    if (item.end_year == "" || item.start_year == "") return false;
    else if (item.start_year > lowerRange && item.end_year < upperRange) {
      return true;
    } else return false;
  }

  function handleSubmiTopics(event) {
    event.preventDefault();
  }

  async function handleSubmit(event) {
    event.preventDefault();
    // const jsonString = localStorage.getItem("myData");
    // const newJSON = JSON.parse(jsonString);

    const jsonFilteredResponse = data.filter((d) => filterByYear(d));
    console.log(jsonFilteredResponse, "jsonFileterd");

    setData(jsonFilteredResponse);
  }

  let freq_list = new Array(20).fill(0);
  for (let idx = 0; idx < 20; idx++) {
    data.map((d) => {
      if (d.intensity >= idx * 5 && d.intensity < (idx + 1) * 5) {
        freq_list[idx] = freq_list[idx] + 1;
      }
    });
  }

  // console.log(freq_list);
  let sum_freq_list = 0;
  freq_list.forEach((d) => {
    sum_freq_list += d;
  });
  // console.log(sum_freq_list,"sum");
  let max_freq = Math.max(...freq_list);
  // console.log(max_freq);

  let freq_obj = [];
  for (let i = 0; i < 10; i++) {
    freq_obj.push(
      JSON.parse(
        `{"lb":${i * 5}, "ub":${(i + 1) * 5}, "value" :${freq_list[i]}}`
      )
    );
  }

  function renderIntensity() {
    const width = 540;
    const height = 250;
    const marginTop = 20;
    const marginRight = 20;
    const marginBottom = 30;
    const marginLeft = 40;
    const svg = d3
      .select("#chart")
      .append("svg")
      .attr("width", width + marginLeft + marginRight)
      .attr("height", height + marginTop + marginBottom)
      .append("g")
      .attr("transform", `translate(${marginLeft},${marginTop})`);
    const x = d3
      .scaleLinear()
      .domain([0, 100])
      .range([marginLeft, width - marginRight]);
    const y = d3
      .scaleLinear()
      .domain([0, max_freq + 10])
      .range([height - marginBottom, marginTop]);
    svg
      .append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x).ticks(20).tickSizeOuter(0))
      .call((g) =>
        g
          .append("text")
          .attr("x", width)
          .attr("y", marginBottom - 4)
          .attr("fill", "currentColor")
          .attr("text-anchor", "end")
          .text("Intenisty range →")
      );
    svg
      .append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).ticks(height / 40))
      .call((g) =>
        g
          .append("text")
          .attr("x", -marginLeft)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("↑ Frequency (no. of incidents)")
      );
    svg
      .append("g")
      .attr("fill", "steelblue")
      .selectAll()
      .data(freq_obj)
      .join("rect")
      .attr("x", (d) => x(d.lb))
      .attr("width", (d) => x(d.ub) - x(d.lb))
      .attr("y", (d) => y(d.value))
      .attr("height", (d) => y(0) - y(d.value));
  }

  function clearIntensity() {
    d3.select("#chart").html("");
  }

  function findAllTopics() {
    const mySet = new Set();
    data.forEach((item) => {
      if(item.topic !=='')mySet.add(item.topic);
    });

    const topicList = Array.from(mySet);
    return topicList;
  }

  let allTopicList = findAllTopics();

  async function resetData() {
    let jsonString = localStorage.getItem("myData");
    let newData = JSON.parse(jsonString);

    setData(newData);
  }

  function filterByTopic(){
    console.log("filtered by topic");
    let newData = data.filter((item)=>{
      if(topicList.indexOf(item.topic) == -1)return false;
      else return true;
    })
    console.log(newData,"filtered by topic data"); 
    setData(newData);
  }

  function findAllRegions() {
    const mySet = new Set();
    data.forEach((item) => {
      if(item.region != '')mySet.add(item.region);
    });

    const topicList = Array.from(mySet);
    return topicList;
  }

  let allRegionList = findAllRegions();

  function filterByRegions(){
    if(regionsList.length == 0){
      alert("There are no regions selected");
      return;
    }
    console.log("filtered by Regions");
    let newData = data.filter((item)=>{
      if(regionsList.indexOf(item.region) == -1)return false;
      else return true;
    })
    console.log(newData,"filtered by region data"); 
    setData(newData);
    setFilteredByRegion(true);
  }

  async function resetData() {
    let jsonString = localStorage.getItem("myData");
    let newData = JSON.parse(jsonString);

    setData(newData);
  }

  function filterByTopic(){
    if(topicList.length == 0){
      alert("There are no topics selected");
      return;
    }
    console.log("filtered by topic");
    let newData = data.filter((item)=>{
      if(topicList.indexOf(item.topic) == -1)return false;
      else return true;
    })
    console.log(newData,"filtered by topic data"); 
    setData(newData);
    setFilteredByTopic(true);
  }

  function findAllCountry() {
    const mySet = new Set();
    data.forEach((item) => {
      if(item.country != '')mySet.add(item.country);
    });

    const countryList = Array.from(mySet);
    return countryList;
  }

  let allCountryList = findAllCountry();

  function filterByCountry(){
    if(countryList.length == 0){
      alert("There are no topics selected");
      return;
    }
    console.log("filtered by topic");
    let newData = data.filter((item)=>{
      if(countryList.indexOf(item.country) == -1)return false;
      else return true;
    })
    console.log(newData,"filtered by topic data"); 
    setData(newData);
    setFilteredByCountry(true);

    console.log(data);
  }

  function findAllSource() {
    const mySet = new Set();
    data.forEach((item) => {
      if(item.source != '')mySet.add(item.source);
    });

    const sourceList = Array.from(mySet);
    return sourceList;
  }

  function filterBySource(){
    if(sourceList.length == 0){
      alert("There are no topics selected");
      return;
    }
    console.log("filtered by topic");
    let newData = data.filter((item)=>{
      if(sourceList.indexOf(item.source) == -1)return false;
      else return true;
    })
    console.log(newData,"filtered by topic data"); 
    setData(newData);
    setFilteredBySource(true);

    console.log(data);
  }

  let allSourceList = findAllSource();

  return (
    <GlobalContext.Provider
      value={{
        data,
        setData,
        upperRange,
        setUpperRange,
        lowerRange,
        setLowerRange,
        filterByYear,
        fetchData,
        handleSubmit,
        renderIntensity,
        clearIntensity,
        allTopicList,
        topicList,
        setTopicList,
        resetData,
        filterByTopic,
        filteredByTopic,
        setFilteredByTopic,
        allRegionList,
        filterByRegions,
        regionsList,
        setRegionsList,
        filteredByRegion,
        setFilteredByRegion,
        allCountryList,
        countryList,
        setCountryList,
        countryList,
        setCountryList,
        filterByCountry,
        filteredByCountry,
        setFilteredByCountry,
        allSourceList,
        sourceList,
        setSourceList,
        filterBySource,
        filteredBySource
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
