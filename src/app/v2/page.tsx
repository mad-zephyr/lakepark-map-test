"use client";
// https://tmpfiles.org/dl/14638176/house_2.glb
import Map, {
  FullscreenControl,
  GeolocateControl,
  NavigationControl,
  ScaleControl,
  ViewStateChangeEvent,
} from "react-map-gl";
import { FC, useState } from "react";

import classes from "./style.module.sass";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN || "";

// type TPosition = {
//   longitude: number;
//   latitude: number;
//   city: string;
//   state: string;
//   image: string;
// };

import "mapbox-gl/dist/mapbox-gl.css";

const Page: FC = () => {
  // const [popupInfo, setPopupInfo] = useState<TPosition | null>({
  //   longitude: 28.691597768997394,
  //   latitude: 47.10890434472199,
  //   city: "",
  //   state: "",
  //   image:
  //     "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
  // });

  const [position, setPosition] = useState({
    longitude: 28.691597768997394,
    latitude: 47.10890434472199,
  });

  return (
    <>
      <Map
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{
          ...position,
          zoom: 16,
          bearing: 220,
          pitch: 35,
        }}
        mapStyle="mapbox://styles/madzephyr/cm2jenk0k000n01ochr9784jj"
        style={{ width: "100vw", height: "100vh" }}
        testMode
        onDrag={(e: ViewStateChangeEvent) => {
          const { viewState } = e;
          setPosition({
            latitude: viewState.latitude,
            longitude: viewState.longitude,
          });
        }}
      >
        <GeolocateControl position="top-left" showAccuracyCircle />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />
      </Map>

      <ControlPanel />
    </>
  );
};

function ControlPanel() {
  return (
    <div className={classes.control}>
      <h3>Место для какого то UI </h3>
      <p>
        Map showing top 20 most populated cities of the United States. Click on
        a marker to learn more.
      </p>
    </div>
  );
}

export default Page;
