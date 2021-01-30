import React from 'react';
import { Component } from 'react';
import { Cards, Charts, CountryPicker } from './components';
import styles from './App.module.css';
import { fetchData } from './api';
import covidImg  from './images/covidImg.png';

class App extends Component{
  constructor(){
    super();

    this.state = {
      data: {},
      country: ''
    }
  }

  async componentDidMount(){
    const fetchedData = await fetchData();
    this.setState( {data: fetchedData} );    
  }

  handleCountryChange = async (country) => {    
    const fetchedData = await fetchData(country);
    this.setState({ data: fetchedData, country: country })
  }

  render(){
    const {data, country} = this.state;            

    return(
      <div className={styles.container}>   
        <img src={covidImg} className={styles.image} alt='Covid-19' />    
        <Cards data={data} />
        <CountryPicker handleCountryChange = {this.handleCountryChange} />
        <Charts data={data} country={country} />        
      </div>
    );
  }
}

export default App;
