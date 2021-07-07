import { useState, useEffect } from 'react';
import {Chart} from '../charts/Chart'
import Temperature from '../jsons/Temperature'
import Precipitation from '../jsons/Precipitation'

const MultiLineChart = () => {
    const [temperature, setTemperature] = useState([])
    const [precipitation, setPrecipitation] = useState([])

    async function getAndSetTemperature() {
        // fetch("http://climatedataapi.worldbank.org/climateweb/rest/v1/country/cru/tas/year/bra")
        //     .then(response => response.json())
        //     .then(data => setTemperature(data))
        setTemperature(Temperature)
    }
    function getAndSetPrecipitation() {
        // fetch("http://climatedataapi.worldbank.org/climateweb/rest/v1/country/cru/pr/year/bra")
        //     .then(response => response.json())
        //     .then(data => setPrecipitation(data))
        setPrecipitation(Precipitation)
    }

    useEffect(() => {
        
        getAndSetTemperature();
        getAndSetPrecipitation();

    }, [])

    return (
        <div>
            {temperature !== [] && precipitation !== [] && <Chart props={{temperature, precipitation}}/>}
        </div>
    )
}

export default MultiLineChart
