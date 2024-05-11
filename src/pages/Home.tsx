import React from "react";
import { JobSection } from "../components/jobs/JobSection";
import { Box } from "@mui/material";

export const Home: React.FC = () => {
  return (
    <Box display={"flex"} justifyContent={"center"} width={"100%"}>
      <JobSection />
    </Box>
  );
};
