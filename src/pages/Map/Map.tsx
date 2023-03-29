import "./Map.scss";
import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Location } from "../ListOfAllLocations/ListOfAllLocations";
import axios from "axios";

export const Map = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [showPolyline, setShowPolyline] = useState(false);
  const [buttonName, setButtonName] = useState("Show");
  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  useEffect(() => {
    axios
      .get<Location[]>("http://localhost:3000/locations")
      .then(({ data }) => {
        setLocations(data);
      });
  }, []);

  const handleAddLocation = () => {
    axios
      .post("http://localhost:3000/locations", { name, latitude, longitude })
      .then(({ data }) => {
        setLocations((oldList) => [...oldList, data]);
        alert("Location added");
        setName("");
        setLatitude(0);
        setLongitude(0);
      });
  };

  const handleDeleteLocation = (id: number) => {
    axios
      .delete<Location>(`http://localhost:3000/locations/${id}`)
      .then((res) => {
        alert("Location deleted");
        const filteredLocations = locations.filter(
          (location) => location.id !== id
        );
        setLocations(filteredLocations);
      });
  };

  return (
    <section className="map-view__container">
      <div className="cta__container">
        <button
          className="button"
          onClick={() => {
            setShowPolyline(!showPolyline);
            setButtonName(buttonName === "Show" ? "Hide" : "Show");
          }}
        >
          {buttonName} polyline
        </button>

        <form
          className="cta__form"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <label className="cta__form--label">
            State:
            <input
              className="cta__form--input"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label className="cta__form--label">
            Latitude:
            <input
              className="cta__form--input"
              type="number"
              required
              value={latitude}
              onChange={(e) => setLatitude(Number(e.target.value))}
            />
          </label>
          <label className="cta__form--label">
            Longitude:
            <input
              className="cta__form--input"
              type="number"
              required
              value={longitude}
              onChange={(e) => setLongitude(Number(e.target.value))}
            />
          </label>

          <button className="button" onClick={handleAddLocation}>
            Add location
          </button>
        </form>
      </div>

      <MapContainer
        className="map__container"
        center={[56.946285, 24.105078]}
        zoom={7}
        style={{ height: "500px", width: "800px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          minZoom={1}
        />

        {locations.map((location) => (
          <Marker
            key={location.id}
            position={[location.latitude, location.longitude]}
          >
            <Popup>
              <strong>{location.name}</strong>
              <br />
              lat: {location.latitude}
              <br />
              long: {location.longitude}
              <br />
              <button onClick={() => handleDeleteLocation(location.id)}>
                delete
              </button>
            </Popup>
          </Marker>
        ))}

        {showPolyline ? (
          <Polyline
            positions={locations.map((location) => [
              location.latitude,
              location.longitude,
            ])}
          />
        ) : (
          <></>
        )}
      </MapContainer>
    </section>
  );
};
