import { Job, filterKeys } from "../redux/slices/jobs/jobSlice";

export const applyExperienceFilter = (filter: string[], data: Job[]) => {
  const filteredData = data.filter((elem: Job) => {
    if (elem.minExp) {
      return elem.minExp <= parseInt(filter[0]);
    }
  });
  return filteredData;
};

export const applyLocationFilter = (filter: string[], data: Job[]) => {
  const filteredData = data.filter((elem: Job) => {
    if (elem.location === "remote" || elem.location === "hybrid") {
      return filter.includes(elem.location);
    } else {
      return filter.includes("in-office");
    }
  });
  return filteredData;
};

export const applyRolesFilter = (filter: string[], data: Job[]) => {
  const filteredData = data.filter((elem: Job) => {
    return filter.includes(elem.jobRole.toLowerCase());
  });
  return filteredData;
};

export const applyMinPayFilter = (filter: string[], data: Job[]) => {
  const minPay = filter[0].slice(filter[0].indexOf("$") + 1, filter[0].length);

  const filteredData = data.filter((elem: Job) => {
    let pay = 0;
    if (minPay.includes("+") && elem.minJdSalary) {
      pay = parseInt(minPay.slice(0, minPay.length - 1));

      return elem.minJdSalary >= pay;
    }

    pay = parseInt(minPay);

    return elem.minJdSalary && elem.minJdSalary <= pay;
  });
  return filteredData;
};

export const applyCompanyNameFilter = (filter: string[], data: Job[]) => {
  const filteredData = data.filter((elem: Job) => {
    return filter[0].toLowerCase().includes(elem.companyName.toLowerCase());
  });
  return filteredData;
};

export const applyFilters = (
  filters: { [key in filterKeys]: string[] },
  data: Job[]
) => {
  const { Experience, Location, Roles, Min_Pay, Company_Name } = filters;

  let filterData: Job[] = [];
  if (Experience.length > 0) {
    filterData = applyExperienceFilter(Experience, data);
  }

  if (Location.length > 0) {
    filterData = applyLocationFilter(
      Location,
      filterData.length > 0 ? filterData : data
    );
  }

  if (Roles.length > 0) {
    filterData = applyRolesFilter(
      Roles,
      filterData.length > 0 ? filterData : data
    );
  }

  if (Min_Pay.length > 0) {
    filterData = applyMinPayFilter(
      Min_Pay,
      filterData.length > 0 ? filterData : data
    );
  }

  if (Company_Name.length > 0) {
    filterData = applyCompanyNameFilter(
      Company_Name,
      filterData.length > 0 ? filterData : data
    );
  }
  return [...new Map(filterData.map((item) => [item["jdUid"], item])).values()];
};
