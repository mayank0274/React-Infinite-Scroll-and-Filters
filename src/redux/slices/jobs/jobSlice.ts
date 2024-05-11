import { createSlice } from "@reduxjs/toolkit/react";
import { applyFilters } from "../../../utlis/filters";

export enum filterKeys {
  Experience = "Experience",
  Roles = "Roles",
  Employee_Count = "Employee_Count",
  Location = "Location",
  Min_Pay = "Min_Pay",
  Company_Name = "Company_Name",
}

export interface JobsList {
  jobs: Job[];
  totalCount: number;
  offset: number;
  prevData: Job[];
  filters: { [key in filterKeys]: string[] };
}

export interface Job {
  companyName: string;
  jdLink: string;
  jdUid: string;
  jobDetailsFromCompany: string;
  jobRole: string;
  location: string;
  logoUrl: string;
  maxExp: number | null;
  maxJdSalary: number;
  minExp: number | null;
  minJdSalary: number | null;
  salaryCurrencyCode: SalaryCurrencyCode;
}

export enum SalaryCurrencyCode {
  Usd = "USD",
}

const initialState: JobsList = {
  jobs: [],
  totalCount: 0,
  offset: 0,
  prevData: [],
  filters: {
    [filterKeys.Experience]: [],
    [filterKeys.Employee_Count]: [],
    [filterKeys.Location]: [],
    [filterKeys.Roles]: [],
    [filterKeys.Min_Pay]: [],
    [filterKeys.Company_Name]: [],
  },
};

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setJobsData(state, action) {
      state.prevData = state.jobs;
      state.jobs = [
        ...new Map(
          action.payload?.jobs.map((item: Job) => [item["jdUid"], item])
        ).values(), // sometimes same job present in prevData and come from res to avoid duplicate key error
      ] as Job[];
      state.totalCount = action.payload?.totalCount;
    },

    setOffset(state, action) {
      state.offset = action.payload.offset;
    },
    setFilters(state, action) {
      state.filters = action.payload.filters;
    },
    setFilteredData(state, action) {
      const data = applyFilters(state.filters, action.payload.jobs);
      state.jobs = data;
      state.prevData = data;
    },
  },
});

export const { setJobsData, setOffset, setFilteredData, setFilters } =
  jobSlice.actions;
export default jobSlice;
