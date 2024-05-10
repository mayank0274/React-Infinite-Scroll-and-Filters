import { createSlice } from "@reduxjs/toolkit/react";

export interface JobsList {
  jobs: Job[];
  totalCount: number;
  offset: number;
  prevData: Job[];
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
};

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setJobsData(state, action) {
      state.prevData = state.jobs;
      state.jobs = action.payload?.jobs;
      state.totalCount = action.payload?.totalCount;
    },

    setOffset(state, action) {
      state.offset = action.payload.offset;
    },
  },
});

export const { setJobsData, setOffset } = jobSlice.actions;
export default jobSlice;
