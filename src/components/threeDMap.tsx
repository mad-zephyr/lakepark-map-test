"use client";

import { useEffect, useRef } from "react";
import mapboxgl, { Map } from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";

const MapboxExample = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map>();

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN || "";

    if (!mapContainerRef.current) {
      return;
    }

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [28.691627605703083, 47.10887329595247],
      zoom: 16,
      pitch: 45,
      bearing: -140,
      style: "mapbox://styles/mapbox/standard",
      minZoom: 15,
      maxZoom: 18,
    });

    if (!mapRef.current) {
      return;
    }

    mapRef.current.on("style.load", () => {
      // set the light preset to be in dusk mode.

      mapRef.current?.setConfigProperty("basemap", "lightPreset", "dusk");

      // add a geojson source with a polygon to be used in the clip layer.
      mapRef.current?.addSource("eraser", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {},
              geometry: {
                coordinates: [
                  [
                    [-0.12573, 51.53222],
                    [-0.12458, 51.53219],
                    [-0.12358, 51.53492],
                    [-0.12701, 51.53391],
                    [-0.12573, 51.53222],
                  ],
                ],
                type: "Polygon",
              },
            },
          ],
        },
      });

      // add a geojson source which specifies the custom model to be used by the model layer.
      mapRef.current?.addSource("model", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {
            "model-uri":
              "https://docs.mapbox.com/mapbox-gl-js/assets/tower.glb",
          },
          geometry: {
            coordinates: [28.69302, 47.108388],
            type: "Point",
          },
        },
      });

      // add the clip layer and configure it to also remove symbols and trees.
      // `clip-layer-scope` layout property is used to specify that only models from the Mapbox Standard Style should be clipped.
      // this will prevent the newly added model from getting clipped.
      mapRef.current?.addLayer({
        id: "eraser",
        type: "clip",
        source: "eraser",
        layout: {
          // specify the layer types to be removed by this clip layer
          "clip-layer-types": ["symbol", "model"],
          "clip-layer-scope": ["basemap"],
        },
      });

      // add the model layer and specify the appropriate `slot` to ensure the symbols are rendered correctly.
      mapRef.current?.addLayer({
        id: "tower",
        type: "model",
        slot: "middle",
        source: "model",
        minzoom: 15,
        layout: {
          "model-id": ["get", "model-uri"],
        },
        paint: {
          "model-opacity": 1,
          "model-rotation": [0.0, 0.0, -15.0],
          "model-scale": [0.2, 0.2, 0.5],
          "model-color-mix-intensity": 0,
          "model-cast-shadows": true,
          "model-emissive-strength": 0.8,
        },
      });

      mapRef.current?.addSource("tower2", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {
            "model-uri": "https://tmpfiles.org/dl/14638176/house_2.glb",
          },
          geometry: {
            coordinates: [28.691668, 47.108263],
            type: "Point",
          },
        },
      });

      mapRef.current?.addLayer({
        id: "tower2",
        type: "model",
        slot: "middle",
        source: "tower2",
        minzoom: 15,
        layout: {
          "model-id": ["get", "model-uri"],
        },
        paint: {
          "model-opacity": 1,
          "model-rotation": [0.0, 0.0, -15.0],
          "model-scale": [1.4, 1.4, 1.4],
          "model-color-mix-intensity": 0,
          "model-cast-shadows": true,
          "model-emissive-strength": 0.8,
        },
      });
    });
  }, []);

  return (
    <div
      id="map"
      style={{ height: "100dvh", width: "100dvw" }}
      ref={mapContainerRef}
    />
  );
};

export default MapboxExample;
