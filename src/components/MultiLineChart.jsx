import { useState, useEffect } from 'react';
import {Chart} from '../charts/Chart'

const MultiLineChart = () => {
    const [temperature, setTemperature] = useState([])
    const [precipitation, setPrecipitation] = useState([])

    async function getAndSetTemperature() {
        fetch("https://climatedataapi.worldbank.org/climateweb/rest/v1/country/cru/tas/year/bra")
            .then(response => response.json())
            .then(data => setTemperature(data))
    }
    function getAndSetPrecipitation() {
        fetch("https://climatedataapi.worldbank.org/climateweb/rest/v1/country/cru/pr/year/bra")
            .then(response => response.json())
            .then(data => setPrecipitation(data))
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
