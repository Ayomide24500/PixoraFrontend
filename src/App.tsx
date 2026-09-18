import { RouterProvider } from "react-router-dom";
import { mainRouter } from "./routes/mainRouter";

const App = () => {
  return <RouterProvider router={mainRouter} />;
};

export default App;
