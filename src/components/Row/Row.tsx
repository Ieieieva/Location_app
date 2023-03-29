import { ListChildComponentProps } from "react-window";
import { Location } from "../../pages/ListOfAllLocations/ListOfAllLocations";
import "./Row.scss";

export const Row = ({ index, style, data }: ListChildComponentProps<Location[]>) => {
  const location = data[index];

  return (
    <div style={style} className="row__container">
      <span>{location.name}</span>
      <div className="row__coordinates">
        <span>{location.latitude}</span>
        <span>{location.longitude}</span>
      </div>
    </div>
  );
};
