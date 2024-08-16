import * as d3 from "d3";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { GlobalContext } from "../context/index.jsx";
import { render } from "@testing-library/react";

export default function IntensityTable1() {
  const { data, renderIntensity, clearIntensity } = useContext(GlobalContext);

  useEffect(() => {
    console.log("data changed");
    clearIntensity();
    renderIntensity();
  }, [data]);

  return <div id="chart" style={{ textAlign: "center" }}></div>;
}
