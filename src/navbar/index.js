import { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";
import { GlobalContext } from "../context/index.jsx";
import { axisLeft } from "d3";

export default function Navbar() {
  let {
    setData,
    fetchData,
    setLowerRange,
    setUpperRange,
    handleSubmit,
    allTopicList,
    topicList,
    setTopicList,
    resetData,
    filterByTopic,
    filteredByTopic,
    setFilteredByTopic,
    allRegionList,
    regionsList,
    setRegionsList,
    filterByRegions,
    filteredByRegion,
    setFilteredByRegion,
    allCountryList,
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
  } = useContext(GlobalContext);

  useEffect(() => {
    fetchData();
  }, []);

  const [dropdown, setDropdown] = useState(false);

  function handleCountryCheck(event) {
    let name = event.target.name;
    let countryListCopy = [...countryList];

    if (countryListCopy.length === 0) {
      countryListCopy.push(name);
    } else if (countryListCopy.indexOf(name) === -1) {
      countryListCopy.push(name);
    } else {
      let index = countryListCopy.indexOf(name);
      countryListCopy.splice(index, 1); // Remove the item correctly
    }

    setCountryList(countryListCopy);
    console.log(countryListCopy);
  }

  function handleSourceList(event) {
    let name = event.target.name;
    let sourceListCopy = [...sourceList];

    if (sourceListCopy.length === 0) {
      sourceListCopy.push(name);
    } else if (sourceListCopy.indexOf(name) === -1) {
      sourceListCopy.push(name);
    } else {
      let index = sourceListCopy.indexOf(name);
      sourceListCopy.splice(index, 1); // Remove the item correctly
    }

    setSourceList(sourceListCopy);
    console.log(sourceListCopy);
  }

  function handleTopicCheck(event) {
    let name = event.target.name;
    let topicListCopy = [...topicList];

    if (topicListCopy.length === 0) {
      topicListCopy.push(name);
    } else if (topicListCopy.indexOf(name) === -1) {
      topicListCopy.push(name);
    } else {
      let index = topicListCopy.indexOf(name);
      topicListCopy.splice(index, 1); // Remove the item correctly
    }

    setTopicList(topicListCopy);
    console.log(topicListCopy);
  }

  function handleRegionCheck(event) {
    let name = event.target.name;
    let regionsListCopy = [...regionsList];

    if (regionsListCopy.length === 0) {
      regionsListCopy.push(name);
    } else if (regionsList.indexOf(name) === -1) {
      regionsListCopy.push(name);
    } else {
      let index = regionsListCopy.indexOf(name);
      regionsListCopy.splice(index, 1); // Remove the item correctly
    }

    setRegionsList(regionsListCopy);
    console.log(regionsListCopy);
  }

  return (
    <div style={{ marginLeft: "4rem", marginRight: "4rem", marginTop: "3rem" }}>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "1rem" }}>
        <input
          type="text"
          name="upperRange"
          placeholder="Enter Minimum Starting Year"
          onChange={(event) => {
            setLowerRange(event.target.value);
          }}
        />
        <input
          type="text"
          name="lowerRange"
          placeholder="Enter maximum starting year"
          onChange={(event) => {
            setUpperRange(event.target.value);
          }}
        />
        <button type="submit">Filter By Year</button>
      </form>
      {!filteredByTopic ? (
        <div>
          <div className="heading">Topic</div>
          <div className="checkbox-handler">
            {allTopicList.map((name) => (
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <input
                  type="checkbox"
                  name={name}
                  onChange={handleTopicCheck}
                />
                <p>{name}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ marginTop: "2rem" }}>
          Your data has been filtered by topic
        </div>
      )}
      <div
        style={{
          marginTop: "2rem",
          marginLeft: "2rem",
          display: "flex",
          gap: "1rem",
        }}
      >
        <button
          className="btn"
          onClick={() => {
            filterByTopic();
          }}
        >
          Filter By Topic
        </button>
      </div>

      {!filteredByRegion ? (
        <div>
          <div className="heading">Regions</div>
          <div className="checkbox-handler">
            {allRegionList.map((name) => (
              <div
                style={{ display: "flex", gap: "0.5rem", flexDirection: "row" }}
              >
                <input
                  name={name}
                  type="checkbox"
                  onClick={handleRegionCheck}
                ></input>
                <p>{name}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ marginTop: "2rem" }}>
          Your Data has been filtered by regions
        </div>
      )}

      <div>
        <button
          className="btn"
          style={{ marginTop: "2rem", marginLeft: "2rem" }}
          onClick={() => {
            filterByRegions();
          }}
        >
          Filter by Regions
        </button>
      </div>

      {!filteredByCountry ? (
        <div>
          <div className="heading">Countries</div>
          <div className="checkbox-handler">
            {allCountryList.map((name) => (
              <div
                style={{ display: "flex", gap: "0.5rem", flexDirection: "row" }}
              >
                <input
                  name={name}
                  type="checkbox"
                  onClick={handleCountryCheck}
                ></input>
                <p>{name}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ marginTop: "2rem" }}>
          Your Data has been filtered by Country
        </div>
      )}

      <div>
        <button
          className="btn"
          style={{ marginTop: "2rem", marginLeft: "2rem" }}
          onClick={() => {
            filterByCountry();
          }}
        >
          Filter by Country
        </button>
      </div>

      {!filteredBySource ? <div id="list1" class="dropdown-check-list" tabindex="100">
        <span
          class="anchor"
          onClick={() => {
            setDropdown(!dropdown);
          }}
        >
        Click here to Select Sources
        </span>
        {dropdown ? (
          <ul class="items">
            {allSourceList.map((item) => (
              <li style={{ marginTop: "0.2rem" }}>
                <input type="checkbox" name={item} onClick={handleSourceList} />
                {item}
              </li>
            ))} 
          </ul>
        ) : null}
        <button
          className="btn"
          style={{ marginTop: "2rem", marginLeft: "2rem" }}
          onClick={() => {
            filterBySource();
          }}
        >
          Filter by Sources
        </button>
      </div> : <div style={{marginTop:"4rem"}}>Data has been filtered by Sources</div>}

      <button
        className="btn"
        onClick={() => {
          resetData();
          setFilteredByTopic(false);
          setFilteredByRegion(false);
          setFilteredByCountry(false);
        }}
        style={{ marginLeft: "2rem", marginTop: "2rem" }}
      >
        Reset Data
      </button>
    </div>
  );
}
