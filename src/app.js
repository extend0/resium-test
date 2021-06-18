import React, { Suspense }  from "react";
//import { useFrame, useLoader } from '@react-three/fiber';
import {
 ZapparCamera, ImageTracker, ZapparCanvas, Loader, BrowserCompatibility,
} from '@zappar/zappar-react-three-fiber';
//import * as THREE from 'three';
import { Ion, Cartesian3, Color } from "cesium";
import { Viewer, Entity } from "resium";

import targetImage from './assets/example-tracking-image.zpt';

Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjOGM4ZTI2YS1jZDcwLTRmNWEtYTMwYS1iYmUyYTFlMjhkNGEiLCJpZCI6NTgwMDksInNjb3BlcyI6WyJsZ24iLCJwciIsImFjdyIsImFzbCIsImFzciIsImFzdyIsImFzcyIsImdjIiwibHIiLCJsdyIsInRyIiwidHciLCJ1c2ciXSwiaWF0IjoxNjIzODk4MjE2LCJleHAiOjE2MjQ1MDMwMTZ9.du_rHveTKi1ZU5Q4070riMHuJ-sGxoDoQAOMwgSQJ6Y";

function App() {
  return (
    <>
      <BrowserCompatibility />
      <ZapparCanvas>
        <ZapparCamera />
        <Suspense fallback={null}>
          <ImageTracker targetImage={targetImage}>
            <React.Suspense fallback={null}>
            <Viewer full>
    <Entity
      name="Tokyo"
      position={Cartesian3.fromDegrees(139.767052, 35.681167, 100)}
      point={{ pixelSize: 10, color: Color.WHITE }}
      description="hoge"
    />
  </Viewer>
            </React.Suspense>
          </ImageTracker>
        </Suspense>
        <directionalLight position={[2.5, 8, 5]} intensity={1.5} />
        <Loader />
      </ZapparCanvas>
      <div
        id="zappar-button"
        role="button"
        onKeyPress={() => action.play() }
        tabIndex={0}
        onClick={() => action.play() }
      >Play Animation</div>
    </>
  );
}
export default App;
