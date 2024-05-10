import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { JobCard } from "./JobCard";
import { Job, setJobsData, setOffset } from "../../redux/slices/jobs/jobSlice";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useGetJobsMutation } from "../../redux/slices/jobs/jobsApi";
import NoDataImg from "../../assets/no-data.png";

export interface IBody {
  limit: number;
  offset: number;
}

const NoData = () => {
  return (
    <Box>
      <img src={NoDataImg} className="no-data-img" />
      <Box fontSize={"17px"}>
        No Jobs available for this category at the moment
      </Box>
    </Box>
  );
};

export const JobSection: React.FC = () => {
  const [getJobs, { isError, isLoading }] = useGetJobsMutation();
  const { jobs, totalCount, offset } = useSelector(
    (state: RootState) => state.jobs,
    shallowEqual
  );
  const limit: number = 8;
  const dispatch = useDispatch();

  // fetch more data on scroll
  const loadData = async (body: IBody) => {
    const jobData: any = await getJobs(JSON.stringify(body));
    dispatch(
      setJobsData({
        jobs: jobData.data.jdList,
        totalCount: jobData.data.totalCount,
      })
    );
    dispatch(
      setOffset({
        offset: offset + limit,
      })
    );
    return jobData;
  };

  useEffect(() => {
    loadData({ limit, offset: 0 });
  }, []);

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      gap={"20px"}
      width={"90%"}
    >
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"center"}
        flexWrap={"wrap"}
        gap={"27px"}
        width={"100%"}
        sx={{
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        {jobs.length === 0 && !isLoading && !isError && <NoData />}
        {jobs &&
          jobs.map((job: Job, i: number) => {
            return <JobCard job={job} key={`${job.jdUid}-${i}`} />;
          })}
      </Box>
    </Box>
  );
};
