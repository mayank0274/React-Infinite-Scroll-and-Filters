import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { JobSection } from "./components/jobs/JobSection";
import { Box } from "@mui/material";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Box display={"flex"} justifyContent={"center"} width={"100%"}>
              <JobSection />
            </Box>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
