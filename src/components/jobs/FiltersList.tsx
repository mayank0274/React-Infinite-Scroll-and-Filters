import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useGetJobsMutation } from "../../redux/slices/jobs/jobsApi";
import {
  EXPERIENCE_OPTIONS,
  LOCATION_OPTIONS,
  MIN_PAY_OPTIONS,
  ROLES_OPTIONS,
} from "../../constants/constants";
import { Box } from "@mui/material";
import { IBody } from "./JobSection";
import { Filters } from "./Filters";
import { filterKeys } from "../../redux/slices/jobs/jobSlice";

export const FiltersList: React.FC = () => {
  const [getJobs, {}] = useGetJobsMutation();
  const { filters } = useSelector(
    (state: RootState) => state.jobs,
    shallowEqual
  );
  const { Experience, Location, Roles, Min_Pay, Company_Name } = filterKeys;

  // fetch more data on scroll
  const loadData = async (body: IBody) => {
    const jobData = await getJobs(JSON.stringify(body));
    return jobData;
  };

  return (
    <Box
      display={"flex"}
      flexWrap={"wrap"}
      gap={"20px"}
      width={"95%"}
      sx={{
        gap: { xs: "2px", sm: "5px", md: "10px", lg: "15px" },
        justifyContent: { xs: "center", sm: "center", md: "normal" },
        flexDirection: { xs: "column", sm: "row" },
        width: { xs: "70%", sm: "95%" },
      }}
    >
      <Filters
        filterOptions={ROLES_OPTIONS}
        label={"Roles"}
        filterData={filters[Roles]}
        filterKey={Roles}
        loadData={loadData}
        key={"roles"}
        allowMultipleValues={true}
      />
      <Filters
        filterOptions={MIN_PAY_OPTIONS}
        label={"Min. Base Pay"}
        filterData={filters[Min_Pay]}
        filterKey={Min_Pay}
        loadData={loadData}
        allowMultipleValues={false}
        key={"base_pay"}
      />
      <Filters
        filterOptions={EXPERIENCE_OPTIONS}
        label={"Experience"}
        allowMultipleValues={false}
        filterData={filters[Experience]}
        filterKey={Experience}
        key={"experience"}
        loadData={loadData}
      />
      <Filters
        filterOptions={LOCATION_OPTIONS}
        label={"Location"}
        filterData={filters[Location]}
        filterKey={Location}
        key={"location"}
        loadData={loadData}
      />
      <Filters
        filterOptions={["Search compnay name to filter data"]}
        label={"Enter company name"}
        filterData={filters[Company_Name]}
        filterKey={Company_Name}
        key={"company_name"}
        loadData={loadData}
      />
    </Box>
  );
};
