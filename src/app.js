import React from "react";
import { Ion, Cartesian3, Color } from "cesium";
import { Viewer, Entity } from "resium";

Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjOGM4ZTI2YS1jZDcwLTRmNWEtYTMwYS1iYmUyYTFlMjhkNGEiLCJpZCI6NTgwMDksInNjb3BlcyI6WyJsZ24iLCJwciIsImFjdyIsImFzbCIsImFzciIsImFzdyIsImFzcyIsImdjIiwibHIiLCJsdyIsInRyIiwidHciLCJ1c2ciXSwiaWF0IjoxNjIzODk4MjE2LCJleHAiOjE2MjQ1MDMwMTZ9.du_rHveTKi1ZU5Q4070riMHuJ-sGxoDoQAOMwgSQJ6Y";

const App = () => (
  <Viewer full>
    <Entity
      name="Tokyo"
      position={Cartesian3.fromDegrees(139.767052, 35.681167, 100)}
      point={{ pixelSize: 10, color: Color.WHITE }}
      description="hoge"
    />
  </Viewer>
);

export default App;
