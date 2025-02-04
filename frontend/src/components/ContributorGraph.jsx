// pie chart of user contributions

import React, { useMemo, useRef, useEffect } from "react";
import * as d3 from "d3";
import "./LanguageGraph.css";

const ContributorGraph = ({ contributors }) => {
  const chartRef = useRef(null);

  // process repo languages
  const pieData = useMemo(() => {
    if (!contributors || contributors.length === 0) return [];

    const topContributors = contributors.slice(0, 5)

    return topContributors.map((contributor) => ({
      label: contributor.login, 
      value: contributor.contributions, 
    }));
  }, [contributors]);

  // d3 pie chart
  useEffect(() => {
    if (!pieData.length) return;

    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;

    d3.select(chartRef.current).select("svg").remove();

    // create the SVG
    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // color scale
    const color = d3
      .scaleLinear()
      .domain([0, pieData.length])
      .range(["#bbbbbb", "#333333"]);

    // pie chart layout
    const pie = d3.pie().value((d) => d.value);
    const dataReady = pie(pieData);

    // arc generator
    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    // slices
    svg
      .selectAll("path")
      .data(dataReady)
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => color(d.data.label))
      .attr("stroke", "white")
      .style("stroke-width", "2px");

    // text labels
    svg
      .selectAll("text")
      .data(dataReady)
      .enter()
      .append("text")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .attr("fill", "white")
      .text((d) => d.data.label);
  }, [pieData]);

  return <div className="contributor-graph" ref={chartRef}></div>;
};

export default ContributorGraph;
