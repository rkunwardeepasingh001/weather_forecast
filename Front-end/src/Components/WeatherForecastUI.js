import React from "react";
import { MdCancel } from "react-icons/md";

const WeatherForecastUI = ({ data, setShow, timeIn }) => {

  const cancelHandler = () => {
    setShow(false);
  }

  const date = new Date();

  // Get day, month, and year
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-indexed, so add 1
  const year = date.getFullYear();

  // Format the day and month with leading zeros if necessary
  const formattedDay = day < 10 ? '0' + day : day;
  const formattedMonth = month < 10 ? '0' + month : month;
  const dateString = `${formattedDay}.${formattedMonth}.${year}`;

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <section class="vh-100" style={{ backgroundColor: '#cc4f9' }}>
      <MdCancel style={{ marginLeft: '1278px' }} onClick={cancelHandler} color="red" size={35} />

      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-md-12 col-xl-10">

            <div class="card shadow-0 border border-dark border-5 text-dark " style={{ borderRadius: '19px', width: '1100px', marginRight: '227px' }}>
              <div class="card-body p-4">

                <div class="row text-center">
                  <div class="col-md-9 text-center border-end border-5  border-dark py-4"
                    style={{ marginTop: '-1.5rem', marginBottom: '-1.5rem' }}>


                    <div class="d-flex justify-content-around mt-3">
                      <p class="">{data.data.sys.country} </p>

                      <p class="small">{dateString}</p>
                      <p class="small">{data.data.name}</p>

                    </div>
                    <div class="d-flex justify-content-around align-items-center py-5 my-4">


                      <p class="fw-bold mb-0" style={{ fontSize: '7rem' }}>{data.data.main.humidity}°C</p>

                      <div class="text-start">


                        <p class="h3 mb-3">{dayNames[new Date().getDay()]}</p>
                        <p class="small mb-0">{data.data.weather[0].description}</p>
                      </div>
                    </div>
                    <div class="d-flex justify-content-around align-items-center mb-3">
                      <div class="flex-column">
                        <i class="fas fa-minus"></i>
                      </div>
                      <div class="flex-column" style={{ borderRadius: '10px ', padding: '.75rem' }}>
                        <p class="small mb-1">temp</p>
                        <p class="small mb-0"><strong>{data.data.main.temp}°C</strong></p>
                      </div>

                      <div class="flex-column">
                        <p class="small mb-1">humidity</p>
                        <p class="small mb-0"><strong>{data.data.main.humidity}°C</strong></p>
                      </div>
                      <div class="flex-column">
                        <p class="small mb-1">pressure</p>
                        <p class="small mb-0"><strong>{data.data.main.pressure}°C</strong></p>
                      </div>
                      <div class="flex-column">
                        <p class="small mb-1">wind</p>
                        <p class="small mb-0"><strong>{data.data.wind.speed}</strong></p>
                      </div>
                      <div class="flex-column">
                        <p class="small mb-1">visibility</p>
                        <p class="small mb-0"><strong>{data.data.visibility}</strong></p>
                      </div>

                      <div class="flex-column">
                        <i class="fas fa-minus"></i>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-3 text-end">
                    <p class="small mt-3 mb-5 pb-5">{timeIn}</p>
                    <p class="pb-1"><span class="pe-2"></span>Temp_min<strong> : {data.data.main.temp_min}</strong></p>
                    <p class="pb-1"><span class="pe-2"></span>Temp_min<strong> : {data.data.main.temp_max}</strong></p>
                    <p class="pb-1"><span class="pe-2"></span>sunrise<strong> :  {data.data.sys.sunrise}</strong></p>
                    <p class="pb-1"><span class="pe-2"></span>sunset<strong> :  {data.data.sys.sunset}</strong></p>

                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )



}


export default WeatherForecastUI;