import "./App.css";

import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route  } from "react-router-dom";

import Homepage, {loader as HomepageLoader} from "./pages/Homepage";
import Layout from "./components/Layout";
import Country, {loader as CountryLoader} from "./pages/Country";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements( 
      <Route path="/rest-countries-api-with-color-theme-switcher" element={<Layout />}>
        <Route index element={<Homepage />} loader={HomepageLoader}  />
        <Route path=":country"element={<Country />} loader={CountryLoader}  />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
