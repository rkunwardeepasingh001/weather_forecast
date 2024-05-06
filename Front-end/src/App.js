import React from 'react';
import './App.css';
import axios from 'axios';
import Swal from 'sweetalert2'

import WeatherForecastUI from './Components/WeatherForecastUI';

function App() {

  const [longitude, setLongitude] = React.useState('');
  const [latitude, setLatitude] = React.useState('');
  const [time, setTime] = React.useState("current");

  const [show, setShow] = React.useState(false);
  const [data, setData] = React.useState([]);

  const url = 'http://127.0.0.1:8000/weather-forecast-api/';

  const onSubmitForm = async (ev) => {

    if (latitude.length == "" || longitude == "") return;

    try {
      var res = await axios.post(url, {
        latitude: latitude,
        longitude: longitude,
        detailing_type: ev.target.value
      });


      if (res.data.name.length == 0) {

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Does not exist this Longitude and Latitude",
        });

        return;
      }

      setData(res);


    } catch (err) {

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to fetch Weather data from OpenWeather API ",
      });
      return;

    }
    setShow(true);

  }


  return (
    <>
      {!show && <div className="center">
        <h1>Weather forecast</h1>
        <form style={{ width: '100px' }}>

          <div className="inputbox ">
            <input type="text" value={longitude} onChange={(ev) => { setLongitude(ev.target.value) }} required />
            <span>Longitude</span>
          </div>

          <div className="inputbox">
            <input type="text" value={latitude} onChange={(ev) => { setLatitude(ev.target.value) }} required />
            <span>Latitude</span>
          </div>


          <div className="comboBox">
            <select value={time} style={{ height: '50px', width: '304px', border: "1px solid  black" }} onChange={(ev) => { setTime(ev.target.value) }}>
              <option value="">Select Current</option>
              <option value="current">current</option>
              <option value="minute forecast">minute forecast</option>
              <option value="hourly forecast">hourly forecast</option>
              <option value="daily forecast">daily forecast</option>

            </select>
          </div>



          <div className="inputbox center">
            <input style={{ marginLeft: '90px', marginTop: '34px' }} type="button" value="Weather Report" onClick={onSubmitForm} />
          </div>



        </form>
      </div>}

      {show && <WeatherForecastUI data={data} setShow={setShow} timeIn={time} />}
    </>


  );
}

export default App;
