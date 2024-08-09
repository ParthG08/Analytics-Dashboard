import * as d3 from "d3";
import { useEffect } from "react";
import { useState } from "react";

export default function IntensityTable2() {
  let [interval, setInterval] = useState(10);

  let jsonString = localStorage.getItem("myData");
  let data = JSON.parse(jsonString);
  let interval_list = [];

  useEffect(() => {
    const margin = { top: 30, right: 30, bottom: 40, left: 40 },
      width = 800 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    const svg = d3
      .select("#chart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleBand()
      .range([0, width])
      .domain(data.map((d) => d.name))
      .padding(0.2);

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    const y = d3.scaleLinear().domain([0, 100]).range([height, 0]);

    svg.append("g").call(d3.axisLeft(y));

    svg
      .selectAll("bars")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.name))
      .attr("y", (d) => y(d.value))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d.value));

    svg
      .selectAll("text.label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("x", (d) => x(d.name) + x.bandwidth() / 2)
      .attr("y", (d) => y(d.value) - 5)
      .attr("text-anchor", "middle")
      .text((d) => d.value);
  }, []);

  return <div id="chart"></div>;
}
