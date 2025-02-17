import axios from 'axios';
const url = 'https://covid19.mathdro.id/api';

export const fetchData = async(country) => {
    let changeableURL = url;

    if(country){
        changeableURL = `${url}/countries/${country}`
    }
    if(country === 'global'){
        changeableURL = url;
    }

    try{
        const {data: {confirmed, recovered, deaths, lastUpdate} } = await axios.get(changeableURL);
        const responce = {
            confirmed,
            recovered,
            deaths,
            lastUpdate
        }
        return responce;
    }
    catch(error){
        console.log('Error:',error);
        return error;
    }
}

export const fetchDailyData = async() => {
    try{
        const {data} = await axios.get(`${url}/daily`);
        const modifiedData = data.map(
            (dailyData) => ({
                confirmed: dailyData.confirmed.total,
                deaths: dailyData.deaths.total,
                date: dailyData.reportDate
            })
        )

        return modifiedData;
    }
    catch(error){
        console.log('Error:',error);
    }
}

export const fetchCountries = async () => {
    try{
        const {data: {countries}} = await axios.get(`${url}/countries`);

        return countries.map(countries => countries.name);
    }
    catch(error){
        console.log('Error:', error);
    }
}