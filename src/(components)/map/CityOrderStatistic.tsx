"use client";
import { NextPage } from "next";
import React from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { CountryOrderStatisticProps } from "@/types/type";
import {
  FeatureCollection,
  Feature,
  Polygon,
  GeoJsonProperties,
} from "geojson";

const countryGeoJson: FeatureCollection<Polygon, GeoJsonProperties> = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { name: "United States" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-95.7129, 37.0902],
            [-75.7129, 37.0902],
            [-75.7129, 50.0902],
            [-95.7129, 50.0902],
            [-95.7129, 37.0902],
          ],
        ],
      },
    },
  ],
};

const getColor = (statistic: number) => {
  return "#9A55FF";
};

const style = (feature: Feature<Polygon, GeoJsonProperties>) => {
  const countryName = feature?.properties?.name;
  const statistic = 10;
  return {
    fillColor: getColor(statistic),
    weight: 2,
    opacity: 1,
    color: "white",
    dashArray: "3",
    fillOpacity: 0.7,
  };
};

const CountryOrderStatistic: NextPage<CountryOrderStatisticProps> = ({
  width,
  height,
}) => {
  return (
    <div>
      <MapContainer center={[20, 0]} zoom={2} style={{ height, width }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <GeoJSON data={countryGeoJson} />
      </MapContainer>
    </div>
  );
};

export default CountryOrderStatistic;
