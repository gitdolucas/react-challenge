import { useState, useEffect } from 'react';

import * as d3 from 'd3';

const width = 600;
const height = 400;
const margin = { top: 20, right: 5, bottom: 20, left: 35 };
const red = "#eb6a5b";
const green = "#b6e86f";

export function Chart({ props }) {

    const [pathTemperature, setPathTemperature] = useState('');
    const [pathPrecipitation, setPathPrecipitation] = useState('');

    useEffect(() => {
        const { temperature, precipitation } = props;
        if (props.temperature.length === 0 || props.precipitation.length === 0) {
            return;
        }

        const lineGenerator = d3.line();

        const xScale = d3.scaleTime().range([margin.left, width -margin.left - margin.right]);
        const yScale = d3.scaleLinear().range([height - margin.bottom, 0 ]);
        const y2Scale = d3.scaleLinear().range([height - margin.bottom, 0 ]);
        
        //temperature
        const yearTemperature = d3.extent(temperature, d => d.year);
        const dataTemperature = d3.max(temperature, d => d.data);
        
        // precipitation
        const dataPrecipitation = d3.max(precipitation, d => d.data);

        const xAxis = d3.axisBottom().scale(xScale)
            .tickFormat(d3.timeFormat('%Y'));
        const yAxis = d3.axisLeft().scale(yScale)
            .tickFormat(d => `${d}ºC`);
        const y2Axis = d3.axisRight().scale(y2Scale)
            .tickFormat(d => `${d}ml`);

        xScale.domain(d3.extent(yearTemperature, d => new Date(parseInt(d),0)));
        yScale.domain([0, dataTemperature]);
        y2Scale.domain([0, dataPrecipitation]);

        lineGenerator.x(d => xScale(new Date(parseInt(d.year),0)));
        lineGenerator.y(d => yScale(d.data));

        setPathTemperature(lineGenerator(temperature));

        lineGenerator.y(d => y2Scale(d.data));

        setPathPrecipitation(lineGenerator(precipitation));
        const svg = d3.select("#chart");
        svg.append("g")            // Add the X Axis
            .attr("class", "x axis")
            .attr("transform", `translate(0, ${height - margin.bottom})`)
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate("+ width + ", 0)")
            .style("fill", green)
            .call(yAxis);

        svg.append("g")
            .attr("class", "y2 axis")
            .style("fill", "red")
            .call(y2Axis);

    }, [props])

    return (
        <svg id="chart" width={width} height={height}>
            <path d={pathTemperature} fill='none' stroke={green} />
            <path d={pathPrecipitation} fill='none' stroke={red} />
        </svg>
    )
};