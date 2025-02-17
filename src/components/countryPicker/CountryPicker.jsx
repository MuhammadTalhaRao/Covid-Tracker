import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';
import styles from './countryPicker.module.css';
import { fetchCountries } from '../../api';

const CountryPicker = ({ handleCountryChange }) => {
    const [fetchedCountries, setfetchedCountries] = useState([]);

    useEffect(
        () => {
            const fetchedCountries = async () => {
                setfetchedCountries(await fetchCountries());
            };

            fetchedCountries();
        },
        [setfetchedCountries]
    )

    return (
        <div className={styles.container}>
            <FormControl className={styles.formControl}>
                <NativeSelect defaultValue = '' onChange = { (e) => handleCountryChange(e.target.value) }>
                    <option value='global'>Global</option>
                    {
                        fetchedCountries.map( 
                                (country, i) => 
                                    <option key={i} value={country}>{country}</option>                                
                        )
                    }
                </NativeSelect>
            </FormControl>
        </div>
    )
}

export default CountryPicker;