import { Box, Link, styled } from "@mui/material";
import React from "react";
import { ClockIcon } from "../../icons/ClockIcon";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { Job } from "../../redux/slices/jobs/jobSlice";

type Props = {
  job: Job;
};

const StyledBadge = styled(Badge)(() => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",

    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "40%",
      height: "40%",
      borderRadius: "50%",
      border: "1px solid currentColor",
      content: '""',
    },
  },
}));

const ButtonAvatar = () => {
  return (
    <Stack direction="row" spacing={0.5} position={"relative"}>
      <div className="avatar-group-overlay"></div>
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        variant="dot"
      >
        <Avatar
          alt="Remy Sharp"
          src="/static/images/avatar/1.jpg"
          sx={{ width: 24, height: 24 }}
        />
      </StyledBadge>
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        variant="dot"
      >
        <Avatar
          alt="Remy Sharp"
          src="/static/images/avatar/1.jpg"
          sx={{ width: 24, height: 24 }}
        />
      </StyledBadge>
    </Stack>
  );
};

export const JobCard: React.FC<Props> = ({ job }) => {
  const {
    jdLink,
    jobDetailsFromCompany,
    jobRole,
    maxJdSalary,
    minExp,
    minJdSalary,
    location,
    logoUrl,
    companyName,
  } = job;
  return (
    <Box id="job-card" padding={"10px"}>
      <Box id="time-posted">
        <ClockIcon width="16px" height="16px" color="#ff7724" />
        <p>Posted 10 days ago</p>
      </Box>

      <Box display={"flex"} gap={"15px"}>
        <img src={logoUrl} id="company-logo" />
        <Box>
          <p className="company-title">{companyName}</p>
          <p className="position">{jobRole}</p>
          <p className="location">{location ? location : "Not mentioned"}</p>
        </Box>
      </Box>

      <Box fontSize={"15px"}>
        Estimated Salary : {minJdSalary ? ` $${minJdSalary} - ` : ""}
        {maxJdSalary ? `$${maxJdSalary}` : "Not disclosed"} ✅
      </Box>

      <Box>
        <h2 className="about-company-heading">About Company</h2>
        <p className="company-description">{jobDetailsFromCompany}</p>
      </Box>

      <Box className="read-more-overlay">
        <Box className="read-more">
          <Link href={jdLink} fontSize={"16px"}>
            View more
          </Link>
        </Box>

        <Box className="m">
          <Box className="job-experience">
            <p className="experience-title">Minimum Experience</p>
            <p className="experience-value">
              {minExp ? `${minExp} years` : "Not mentioned"}
            </p>
          </Box>

          <Box className="button-container">
            <button className="btn btn-primary"> ⚡ Easy Apply</button>
            <button className="btn btn-secondary">
              <ButtonAvatar />
              <p> Unlock referal </p>
            </button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
