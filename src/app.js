import React, { Component } from 'react'
import { Clock, Viewer, Entity } from "resium"
import { Cartesian3, ClockRange, ClockStep, Color, JulianDate, SampledPositionProperty, Ion } from "cesium"
import { eciToGeodetic, gstime, twoline2satrec, propagate } from 'satellite.js'
// import './index.css'

const ISS_TLE =
  `1 25544U 98067A   21121.52590485  .00001448  00000-0  34473-4 0  9997
    2 25544  51.6435 213.5204 0002719 305.2287 173.7124 15.48967392281368`

const satrec = twoline2satrec(
  ISS_TLE.split('\n')[0].trim(),
  ISS_TLE.split('\n')[1].trim()
)

const positionsOverTime = new SampledPositionProperty()

const totalSeconds = 60 * 60 * 6
const timestepInSeconds = 10
const start = JulianDate.fromDate(new Date())
const stop = JulianDate.addSeconds(start, totalSeconds, new JulianDate())

Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjOGM4ZTI2YS1jZDcwLTRmNWEtYTMwYS1iYmUyYTFlMjhkNGEiLCJpZCI6NTgwMDksInNjb3BlcyI6WyJsZ24iLCJwciIsImFjdyIsImFzbCIsImFzciIsImFzdyIsImFzcyIsImdjIiwibHIiLCJsdyIsInRyIiwidHciLCJ1c2ciXSwiaWF0IjoxNjIzODk4MjE2LCJleHAiOjE2MjQ1MDMwMTZ9.du_rHveTKi1ZU5Q4070riMHuJ-sGxoDoQAOMwgSQJ6Y";


for (let i = 0; i < totalSeconds; i += timestepInSeconds) {
  const time = JulianDate.addSeconds(start, i, new JulianDate());
  const jsDate = JulianDate.toDate(time);

  const positionAndVelocity = propagate(satrec, jsDate);
  const gmst = gstime(jsDate);
  const p = eciToGeodetic(positionAndVelocity.position, gmst);

  const position = Cartesian3.fromRadians(p.longitude, p.latitude, p.height * 1000);
  positionsOverTime.addSample(time, position);
}

export class EphemerisViewer extends Component {
  constructor(props) {
    super(props)

    this.state = {
    }

  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div>
        <Viewer style={{ marginTop: '6.55em' }} 
            baseLayerPicker={false}
            geocoder={false}
            homeButton={false}
            navigationHelpButton={false}
            sceneModePicker={false}
            full>
          <Entity
            name="ISS"
            position={positionsOverTime}
            label={{ text: "ISS", scale: 0.5}}
            point={{ pixelSize: 5, color: Color.RED }}
            selected
            tracked
          />

          <Clock
            startTime={start.clone()}
            currentTime={start.clone()}
            stopTime={stop.clone()}
            clockRange={ClockRange.LOOP_STOP} // loop when we hit the end time
            clockStep={ClockStep.SYSTEM_CLOCK_MULTIPLIER}
            multiplier={40} // how much time to advance each tick
            shouldAnimate // Animation on by default
          />
        </Viewer>
      </div>
    )
  }
}

export default EphemerisViewer