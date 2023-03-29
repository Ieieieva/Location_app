import "./ListOfAllLocations.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { FixedSizeList } from "react-window";
import { Row } from "../../components/Row/Row";

export interface Location {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export const ListOfAllLocations = () => {
  const [location, setLocation] = useState<Location[]>([]);

  useEffect(() => {
    axios
      .get<Location[]>("http://localhost:3000/locations")
      .then(({ data }) => {
        console.log(data);
        setLocation(data);
      });
  }, []);

  return (
    <div className="list__container">
      <h1 className="list__heading">LOCATIONS</h1>

      <div className="list__head">
        <span>State</span>
        <div className="list__head--coordinates">
          <span>Latitude</span>
          <span>Longitude</span>
        </div>
      </div>

      <FixedSizeList
        className="list"
        height={450}
        itemCount={location.length}
        itemSize={60}
        width={600}
        itemData={location}
      >
        {Row}
      </FixedSizeList>
    </div>
  );
};
