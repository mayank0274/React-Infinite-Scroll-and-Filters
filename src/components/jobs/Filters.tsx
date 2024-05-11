import React, { useEffect, useState } from "react";
import { CloseIcon } from "../../icons/CloseIcon";
import { DropDownIcon } from "../../icons/DropDownIcon";
import { Box } from "@mui/material";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import {
  filterKeys,
  setFilters,
  setOffset,
} from "../../redux/slices/jobs/jobSlice";
import { debounce } from "../../utlis/debounce";

interface Props {
  label: string;
  filterOptions: string[];
  allowMultipleValues?: boolean;
  filterData?: string[];
  filterKey: string;
}

export const Filters: React.FC<Props> = ({
  label,
  filterOptions,
  allowMultipleValues,
  filterKey,
}) => {
  const [isFocued, setIsFocused] = useState(false);
  const [options, setOptions] = useState<string[]>(filterOptions);
  const [selectedValues, setSelectedvalues] = useState<string[]>([]);
  const { filters } = useSelector((state: any) => state.jobs, shallowEqual);
  const dispatch = useDispatch();

  // remove selected value
  const removeSelectedValue = (value: string): void => {
    const filterArr = selectedValues.filter((elem: string) => {
      return elem != value;
    });

    setSelectedvalues(filterArr);
  };

  // clear selected values
  const clearSelectedValues = (): void => {
    setSelectedvalues([]);
    dispatch(
      setOffset({
        offset: 0,
      })
    );
  };

  // add selection
  const addSelection = (value: string): void => {
    if (selectedValues.includes(value.toLowerCase())) {
      return;
    }

    if (allowMultipleValues) {
      setSelectedvalues([...selectedValues, value.toLowerCase()]);
    } else {
      setSelectedvalues([value.toLowerCase()]);
    }
    // setIsFocused(false);
  };

  // search values
  const searchValues = (query: string): void => {
    if (query === "") {
      setOptions(filterOptions);
      return;
    }
    const filterArr = options.filter((elem: string) => {
      return elem.toLowerCase().includes(query.toLowerCase());
    });

    setOptions(filterArr);
  };

  // set filters in state
  useEffect(() => {
    dispatch(
      setFilters({
        filters: { ...filters, [filterKey]: [...selectedValues] },
      })
    );

    // set offset to 0 to fetch data from starting
    dispatch(
      setOffset({
        offset: 0,
      })
    );
  }, [selectedValues]);

  return (
    <div className="filter">
      <label
        htmlFor={label}
        className={`filter-label ${
          selectedValues.length > 0 || isFocued ? "filter-focused" : ""
        }`}
      >
        {label}
      </label>

      <div className="filter-wrapper flex">
        {!(filterKeys.Company_Name === filterKey) && (
          <div className="selectedValues-container flex">
            {selectedValues.length > 0 &&
              selectedValues.map((value: string) => {
                return (
                  <div className="flex selectedValues" key={value}>
                    <p>{value}</p>
                    <CloseIcon
                      width="18px"
                      height="18px"
                      className="filter-close-icon"
                      handlerFn={() => {
                        removeSelectedValue(value);
                      }}
                    />
                  </div>
                );
              })}
          </div>
        )}
        <input
          type="search"
          className="filter-search"
          placeholder={label}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          onChange={
            // if company name set it to filter
            filterKeys.Company_Name === filterKey
              ? debounce((e: React.ChangeEvent<HTMLInputElement>) => {
                  setSelectedvalues([e.target.value]);
                })
              : // otherwise search from options
                (e: React.ChangeEvent<HTMLInputElement>) => {
                  searchValues(e.target.value);
                }
          }
        />
        <Box
          display={"flex"}
          alignItems={"center"}
          borderLeft={"2px solid #d9d9d9"}
          padding={"3px"}
          width={"max-content"}
        >
          {selectedValues.length > 0 && (
            <CloseIcon
              height="25px"
              width="25px"
              color="#d9d9d9"
              handlerFn={() => {
                clearSelectedValues();
              }}
            />
          )}

          <DropDownIcon
            width="30px"
            height="30px"
            color="#d9d9d9"
            handlerFn={() => {
              setIsFocused(true);
            }}
          />
        </Box>
      </div>

      {options.length > 0 && (
        <div
          className={`filter-options-wrapper ${
            isFocued && "show-filter-options"
          }`}
        >
          {options.map((value: string) => {
            if (!selectedValues.includes(value)) {
              return (
                <p
                  className={`filter-options ${
                    filterKeys.Company_Name === filterKey && "disabled"
                  }`}
                  key={value}
                  onClick={() => {
                    addSelection(value);
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                  }}
                >
                  {value}
                </p>
              );
            }
          })}
        </div>
      )}
    </div>
  );
};
