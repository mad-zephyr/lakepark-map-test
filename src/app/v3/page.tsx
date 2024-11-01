'use client'
// https://tmpfiles.org/dl/14638176/house_2.glb
// "https://docs.mapbox.com/mapbox-gl-js/assets/tower.glb"
import { FC, useRef, useState } from 'react'
import Map, {
  FullscreenControl,
  GeolocateControl,
  MapRef,
  NavigationControl,
  ScaleControl,
} from 'react-map-gl'
import { Canvas } from 'react-three-map'

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN || ''

import 'mapbox-gl/dist/mapbox-gl.css'

// import { ModelGLTF } from "./_components/ModelGLTF";

const Page: FC = () => {
  const mapRef = useRef<MapRef | null>(null)

  const [position] = useState({
    longitude: 28.691597768997394,
    latitude: 47.10890434472199,
  })

  return (
    <>
      <Map
        antialias
        ref={mapRef}
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{
          ...position,
          zoom: 16,
          bearing: 20,
          pitch: 35,
        }}
        mapStyle="mapbox://styles/madzephyr/cm2taqwxy00gq01qt333s98tc"
        style={{ width: '100vw', height: '100vh' }}
      >
        <FullscreenControl position="top-left" />
        <GeolocateControl position="top-left" showAccuracyCircle />

        <NavigationControl position="top-left" />
        <ScaleControl />
        <Canvas
          latitude={position.latitude}
          longitude={position.longitude}
          shadows
          orthographic
        ></Canvas>
      </Map>
    </>
  )
}

export default Page
