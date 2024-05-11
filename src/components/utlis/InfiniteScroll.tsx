import React, { useEffect, useRef, useState, useCallback } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  setFilteredData,
  setJobsData,
  setOffset,
} from "../../redux/slices/jobs/jobSlice";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { IBody } from "../jobs/JobSection";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { RootState } from "../../redux/store";

type Props = {
  children: any;
  limit: number;
  hasMore: boolean;
  loadData: (body: IBody) => Promise<
    | {
        data: any;
      }
    | {
        error: FetchBaseQueryError | SerializedError;
      }
  >;
  isLoading: boolean;
  isError: boolean;
};

export const InfiniteScroll: React.FC<Props> = ({
  children,
  limit,
  hasMore,
  loadData,
  isLoading,
  isError,
}) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const [isMore, setIsMore] = useState<boolean>(hasMore);
  const dispatch = useDispatch();
  const { offset, prevData, jobs, filters } = useSelector(
    (state: RootState) => state.jobs,
    shallowEqual
  );
  const { Experience, Employee_Count, Location, Roles, Min_Pay, Company_Name } =
    filters;
  const isFilterApplied =
    Experience?.length ||
    Employee_Count?.length ||
    Location?.length ||
    Roles?.length ||
    Min_Pay.length ||
    Company_Name.length;

  // fetch more data fn on scroll
  const getJobsData = useCallback(async () => {
    const body = {
      limit: limit,
      offset: offset,
    };
    const job: any = await loadData(body);

    if (job.data) {
      if (isFilterApplied) {
        dispatch(
          setFilteredData({
            jobs: [...prevData, ...job.data.jdList],
          })
        );
      } else {
        dispatch(
          setJobsData({
            jobs: [...prevData, ...job.data.jdList],
            totalCount: job.data.totalCount,
          })
        );
      }
    }

    dispatch(
      setOffset({
        offset: offset + 8,
      })
    );
  }, [offset, filters]);

  // add intersection observer on loader
  useEffect(() => {
    if (offset == 0) {
      getJobsData();
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];

      if (target.isIntersecting && isMore) {
        getJobsData();
      }
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [getJobsData]);

  // if error occured stop sending request
  useEffect(() => {
    if (isError) {
      setIsMore(false);
    }
  }, [isError]);

  // if no data found acc. to applied filter
  useEffect(() => {
    // offset > 48 means  => contninuous 6 req but not data found
    if (jobs.length === 0 && offset > 48 && isFilterApplied) {
      setIsMore(false);
    }
  }, [offset]);

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      {children}
      <Box
        ref={loaderRef}
        sx={{ display: "flex" }}
        justifyContent={"center"}
        marginTop={"10px"}
      >
        <CircularProgress
          style={{
            visibility: isLoading ? "visible" : "hidden",
          }}
        />
        {!hasMore && !isLoading && !isError && (
          <Box fontSize={"17px"}>Looks like you reach end of page</Box>
        )}

        {isError && (
          <Box color={"red"} textAlign={"center"} fontSize={"18px"}>
            {" "}
            Some error occured while fetching data
            <button className="retry-btn" onClick={getJobsData}>
              Click here to retry
            </button>
          </Box>
        )}
      </Box>
    </div>
  );
};
