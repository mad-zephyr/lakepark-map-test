"use client";
// https://tmpfiles.org/dl/14638176/house_2.glb
// "https://docs.mapbox.com/mapbox-gl-js/assets/tower.glb"

import Map, {
  FullscreenControl,
  GeolocateControl,
  NavigationControl,
  ScaleControl,
  MapRef,
} from "react-map-gl";
import { FC, Suspense, useCallback, useEffect, useRef, useState } from "react";

import classes from "./style.module.sass";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN || "";

import "mapbox-gl/dist/mapbox-gl.css";
import { Canvas, coordsToVector3 } from "react-three-map";
import { ModelFBX } from "./_components/ModelFBX";

// import LowPolyHouse from "@/assets/models/lowpoly_house.fbx";
import { MathUtils } from "three";
// import { useControls } from "leva";
import { Lights } from "./_components/Lights";

import { Billboard, Text } from "@react-three/drei";

// import { ModelGLTF } from "./_components/ModelGLTF";

type THouse =
  | {
      name: string;
      id: number;
      long: number;
      lat: number;
      rotation: number;
      scale: number;
    } & Partial<{
      modelUrl: string;
      modelExtension: "fbx";
      pos: {
        x: number;
        y: number;
        z: number;
      };
    }>;

const Page: FC = () => {
  const mapRef = useRef<MapRef | null>(null);

  const [position] = useState({
    longitude: 28.691597768997394,
    latitude: 47.10890434472199,
  });

  const [activeHouse, setActiveHouse] = useState<THouse | null>(null);

  const handleSetActiveHouse = (house: THouse) => {
    setActiveHouse(house);
  };

  // const { modelPosition, rotation, scale } = useControls({
  //   modelPosition: {
  //     value: { x: 0, y: -0, z: 90 },
  //     step: 0.1,
  //     pad: 0.1,
  //     joystick: true,
  //   },
  //   rotation: {
  //     value: 138,
  //     step: 1,
  //   },
  //   scale: {
  //     value: 0.005,
  //     step: 0.001,
  //     pad: 0.002,
  //   },
  // });

  const houses: THouse[] = [
    {
      name: "Ресторан",
      id: 243,
      long: 28.69154325902519,
      lat: 47.108500886752864,
      modelUrl: "/lowpoly_house.fbx",
      modelExtension: "fbx",
      pos: {
        x: 0,
        y: 0,
        z: 90,
      },
      rotation: 180,
      scale: 0.015,
    },
    {
      name: "Здание 2",
      id: 431,
      long: 28.691943283605802,
      lat: 47.10826401864167,
      modelUrl: "/mansion-model.fbx",
      modelExtension: "fbx",
      pos: {
        x: 20,
        y: 0,
        z: 120,
      },
      rotation: 130,
      scale: 0.001,
    },
    {
      name: "Школа",
      id: 245,
      long: 28.691403250498798,
      lat: 47.107990393822064,
      modelUrl: "/lowpoly_house.fbx",
      modelExtension: "fbx",
      pos: {
        x: 0,
        y: 0,
        z: 160,
      },
      rotation: 110,
      scale: 0.01,
    },
    {
      name: "Wellnes House",
      id: 436,
      long: 28.6909772243393,
      lat: 47.107643255826964,
      modelUrl: "/mansion-model.fbx",
      modelExtension: "fbx",
      pos: {
        x: 50,
        y: 0,
        z: 100,
      },
      rotation: 130,
      scale: 0.001,
    },
    {
      name: "Kayak Canoe school",
      id: 437,
      long: 28.807621165455608,
      lat: 47.01568881536005,
      modelUrl: "/mansion-model.fbx",
      modelExtension: "fbx",
      pos: {
        x: 50,
        y: 0,
        z: 100,
      },
      rotation: 130,
      scale: 0.001,
    },
    {
      name: "Green Summer Theatre",
      id: 437,
      long: 28.819597932973213,
      lat: 47.01669885816032,
      rotation: 130,
      scale: 0.001,
    },
  ];

  const onSelectCity = useCallback(
    ({ longitude, latitude }: { longitude: number; latitude: number }) => {
      mapRef.current?.flyTo({
        center: [longitude, latitude],
        duration: 3000,
        zoom: 18,
      });
    },
    []
  );

  useEffect(() => {
    if (activeHouse) {
      onSelectCity({
        latitude: activeHouse.lat,
        longitude: activeHouse.long,
      });
    }
  }, [activeHouse, onSelectCity]);

  const getCoordinates = (
    latitude: number,
    longitude: number,
    altitude: number = 0
  ) => {
    return coordsToVector3(
      {
        latitude: latitude,
        longitude: longitude,
        altitude,
      },
      { ...position, altitude: 0 }
    );
  };

  return (
    <>
      <Map
        antialias
        ref={mapRef}
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{
          ...position,
          zoom: 18,
          bearing: 220,
          pitch: 35,
        }}
        mapStyle="mapbox://styles/madzephyr/cm2kweo56009x01qr5gfx3sli"
        style={{ width: "100vw", height: "100vh" }}
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
        >
          <Lights />

          {houses.map((house, i) => {
            const vectorCoords = getCoordinates(house.lat, house.long);

            return (
              <object3D
                key={i}
                onClick={() => handleSetActiveHouse(house)}
                position={vectorCoords}
                rotation={[0, house.rotation * MathUtils.DEG2RAD, 0]}
                scale={house.scale}
              >
                {house.modelUrl ? <ModelFBX url={house.modelUrl} /> : <></>}
              </object3D>
            );
          })}

          <Suspense>
            {!!activeHouse && (
              <Billboard
                position={getCoordinates(activeHouse.lat, activeHouse.long, 20)}
              >
                <Text fontSize={6} castShadow color="#ffffff">
                  {activeHouse.name}
                </Text>
              </Billboard>
            )}
          </Suspense>
        </Canvas>
      </Map>

      <ControlPanel buildings={houses} onClick={handleSetActiveHouse} />
    </>
  );
};

type TControlPanel = {
  onClick: (house: THouse) => void;
  buildings: THouse[];
};

function ControlPanel(props: TControlPanel) {
  const { buildings, onClick } = props;

  return (
    <div className={classes.control}>
      <h3>Управление и легенда</h3>

      {buildings.map((building, i) => {
        return (
          <p key={i} onClick={() => onClick(building)}>
            {building.name}
          </p>
        );
      })}
    </div>
  );
}

export default Page;
