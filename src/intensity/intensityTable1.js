import * as d3 from "d3";
import { useEffect } from "react";
import { useState } from "react";

export default function IntensityTable1() {
  const [data, setData] = useState(() => {
    const storedData = localStorage.getItem("myData");
    return storedData ? JSON.parse(storedData) : [];
  });

  console.log(data);

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

  // console.log(freq_obj);

  const width = 960;
  const height = 500;
  const marginTop = 20;
  const marginRight = 20;
  const marginBottom = 30;
  const marginLeft = 40;

  useEffect(() => {
    const handleStorageChange = (event) => {
      console.log("storage change detected");
      if (event.key === "myData") {
        // Check if the changed item is 'myData'
        const newData = event.newValue ? JSON.parse(event.newValue) : [];
        setData(newData); // Update the state, causing a re-render
      }
    };

    console.log("useEffect for local storage called");
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(()=>{
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
      .domain([0, max_freq + 50])
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
  },[data]);

  return <div id="chart" style={{ textAlign: "center" }}></div>;
}
