import React, { useEffect } from "react";
import { Box, Button, Modal } from "@mui/material";
import { JobCard } from "./JobCard";
import { Job } from "../../redux/slices/jobs/jobSlice";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useGetJobsMutation } from "../../redux/slices/jobs/jobsApi";
import NoDataImg from "../../assets/no-data.png";
import { InfiniteScroll } from "../utlis/InfiniteScroll";
import { FiltersList } from "./FiltersList";
import { CloseIcon } from "../../icons/CloseIcon";

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
  const { jobs, totalCount } = useSelector(
    (state: RootState) => state.jobs,
    shallowEqual
  );
  const limit: number = 8;

  // fetch more data on scroll
  const loadData = async (body: IBody) => {
    const jobData: any = await getJobs(JSON.stringify(body));
    return jobData;
  };

  useEffect(() => {
    loadData({ limit, offset: 0 });
  }, []);

  const [openFilterModal, setOpenFilterModal] = React.useState(false);
  const handleOpenFilterMenu = () => setOpenFilterModal(true);
  const handleCloseFilterMenu = () => setOpenFilterModal(false);

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
        alignSelf={"flex-start"}
        sx={{ display: { xs: "block", sm: "none" } }}
      >
        {" "}
        <button className="open-filters btn" onClick={handleOpenFilterMenu}>
          Open Filters
        </button>
      </Box>
      <Box width={"95%"}>
        <Box
          sx={{ display: { xs: "none", sm: "flex", md: "flex" } }}
          width={"100%"}
        >
          <FiltersList />
        </Box>
        <div>
          <Modal open={openFilterModal} onClose={handleCloseFilterMenu}>
            <Box
              bgcolor={"#fff"}
              height={"100%"}
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              padding={"20px"}
            >
              <CloseIcon
                width="30px"
                height="30px"
                handlerFn={() => {
                  handleCloseFilterMenu();
                }}
                className="modal-close"
              />
              <FiltersList />
            </Box>
          </Modal>
        </div>
      </Box>
      <InfiniteScroll
        limit={limit}
        hasMore={jobs?.length <= totalCount}
        loadData={loadData}
        isLoading={isLoading}
        isError={isError}
      >
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"center"}
          flexWrap={"wrap"}
          gap={"27px"}
          width={"100%"}
        >
          {jobs.length === 0 && !isLoading && !isError && <NoData />}
          {jobs &&
            jobs.map((job: Job, i: number) => {
              return <JobCard job={job} key={`${job.jdUid}-${i}`} />;
            })}
        </Box>
      </InfiniteScroll>
    </Box>
  );
};
