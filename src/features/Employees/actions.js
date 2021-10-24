import debounce from "debounce-promise";

import {
  SUCCESS_FETCHING_EMPLOYEES,
  START_FETCHING_EMPLOYEES,
  ERROR_FETCHING_EMPLOYEES,
  SET_PAGE,
  SET_KEYWORD,
  PREV_PAGE,
  NEXT_PAGE,
} from "./constants";

import { getAllEmployees } from "../../api/employees";

let debouncedFetchEmployees = debounce(getAllEmployees, 1000);

export const fetchEmployees = () => {
  return async (dispatch, getState) => {
    dispatch(startFetchingEmployees());

    let perPage = getState().employees.perPage || 9;
    let currentPage = getState().employees.currentPage || 1;
    let keyword = getState().employees.keyword || "";

    const params = {
      limit: perPage,
      skip: currentPage * perPage - perPage,
      q: keyword,
    };

    try {
      let {
        data: { data, count },
      } = await debouncedFetchEmployees(params);
      dispatch(successFetchingEmployees({ data, count }));
    } catch (err) {
      dispatch(errorFetchingEmployees());
    }
  };
};

export const startFetchingEmployees = () => {
  return {
    type: START_FETCHING_EMPLOYEES,
  };
};

export const successFetchingEmployees = (payload) => {
  return {
    type: SUCCESS_FETCHING_EMPLOYEES,
    ...payload,
  };
};

export const errorFetchingEmployees = () => {
  return {
    type: ERROR_FETCHING_EMPLOYEES,
  };
};

export const setPage = (number = 1) => {
  return {
    type: SET_PAGE,
    currentPage: number,
  };
};

export const goToNextPage = () => {
  return {
    type: NEXT_PAGE,
  };
};

export const goToPrevPage = () => {
  return {
    type: PREV_PAGE,
  };
};

export const setKeyword = (keyword) => {
  return {
    type: SET_KEYWORD,
    keyword,
  };
};
