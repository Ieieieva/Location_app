import { Route, Routes } from "react-router-dom";
import { Layout } from "./pages/Layout/Layout";
import { ListOfAllLocations } from "./pages/ListOfAllLocations/ListOfAllLocations";
import { Map } from "./pages/Map/Map";
import { NoPage } from "./pages/NoPage/NoPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ListOfAllLocations />} />
        <Route path="map" element={<Map />} />
        <Route path="*" element={<NoPage />} />
      </Route>
    </Routes>
  );
};

export default App;
