import {useState, useEffect} from 'react';
import '../styles/TableComponent.css'

const TableComponent = () => {
    const [ data, setData ] = useState({});

    useEffect(() => {
        fetch("http://api.worldbank.org/v2/country/br?format=json")
            .then( response => response.json())
            .then( data => setData(data));
    }, []);


    function newTr( dataSet, dictKey ){
        if(typeof dataSet[dictKey] !== 'object'){

            return(
                <tr key={dictKey}>
                    <th>{dictKey}</th>
                    <td>{dataSet[dictKey]}</td>
                </tr>
                )
            } else {
                return (
                <tr key={dictKey}>
                    <th>{dictKey}</th>
                    <td>{tableUp(dataSet[dictKey])}</td>
                </tr>
                )
            }
    }

    function tableUp( dataSet ) {
        console.log(dataSet)
        return (
            <table>
                <tbody>
                { Object.keys(dataSet).map(item => newTr(dataSet, item)) }
                </tbody>
            </table>
        )
        
    }

    return (
        <div className="tableContainer">
            {data[1] && tableUp(data[1][0])}
        </div>
    )
}

export default TableComponent
