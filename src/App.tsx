import { BrowserRouter } from "react-router-dom";
import { useLoadProfile } from "./hooks/useLoadProfile";
import AppRoutes from "./routes/AppRoutes";

function App() {
  useLoadProfile();

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
