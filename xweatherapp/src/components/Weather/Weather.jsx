import React, { useState } from 'react';
import './Weather.css';
import axios from 'axios';

const Weather = () => {

    const [text, setText] = useState("");
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        try {
            setLoading(true);
            const key = '71d7427510854eb78ce195810240406';
            const url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${text}`;
            const response = await axios.get(url);
            setData(response.data);
        } catch (error) {
            setData(null);
            alert('Failed to fetch weather data');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='container'>
            <div className='search-wrapper'>
                <input type="text" value={text} placeholder='Enter city name' onChange={(e) => setText(e.target.value)} />
                <button type="button" onClick={handleSearch}>Search</button>
            </div>
            <div className='wrapper'>
                {loading ? (<p>Loading data…</p>) : (
                    <>
                        {data && (
                            <div className='weather-cards'>
                                <div className='weather-card'>
                                    <h3>Temperature</h3>
                                    <span>{data.current.temp_c}&deg;C</span>
                                </div>
                                <div className='weather-card'>
                                    <h3>Humidity</h3>
                                    <span>{data.current.humidity}%</span>
                                </div>
                                <div className='weather-card'>
                                    <h3>Condition</h3>
                                    <span>{data.current.condition.text}</span>
                                </div>
                                <div className='weather-card'>
                                    <h3>Wind Speed</h3>
                                    <span>{data.current.wind_kph} kph</span>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>

    )
}

export default Weather;
