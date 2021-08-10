import debounce from "debounce-promise";

import {
  SUCCESS_FETCHING_CUSTOMER,
  START_FETCHING_CUSTOMER,
  ERROR_FETCHING_CUSTOMER,
  SET_PAGE,
  SET_KEYWORD,
  PREV_PAGE,
  NEXT_PAGE,
} from "./constants";

import { getCustomers } from "../../api/customer";

let debouncedFetchCustomers = debounce(getCustomers, 1000);

export const fetchCustomers = () => {
  return async (dispatch, getState) => {
    dispatch(startFetchingCustomers());

    let perPage = getState().customers.perPage || 9;
    let currentPage = getState().customers.currentPage || 1;
    let keyword = getState().customers.keyword || "";

    const params = {
      limit: perPage,
      skip: currentPage * perPage - perPage,
      q: keyword,
    };

    try {
      let {
        data: { data, count },
      } = await debouncedFetchCustomers(params);
      dispatch(successFetchingCustomers({ data, count }));
    } catch (err) {
      dispatch(errorFetchingCustomers());
    }
  };
};

export const startFetchingCustomers = () => {
  return {
    type: START_FETCHING_CUSTOMER,
  };
};

export const successFetchingCustomers = (payload) => {
  return {
    type: SUCCESS_FETCHING_CUSTOMER,
    ...payload,
  };
};

export const errorFetchingCustomers = () => {
  return {
    type: ERROR_FETCHING_CUSTOMER,
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
