import {
  START_FETCHING_CUSTOMER,
  ERROR_FETCHING_CUSTOMER,
  SUCCESS_FETCHING_CUSTOMER,
  SET_PAGE,
  SET_KEYWORD,
  NEXT_PAGE,
  PREV_PAGE,
} from "./constants";

const statuslist = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

const initialState = {
  data: [],
  currentPage: 1,
  totalItems: -1,
  perPage: 6,
  keyword: "",
  status: statuslist.idle,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case START_FETCHING_CUSTOMER:
      return { ...state, status: statuslist.process, data: [] };

    case SUCCESS_FETCHING_CUSTOMER:
      return {
        ...state,
        data: action.data,
        totalItems: action.count,
        status: statuslist.success,
      };

    case ERROR_FETCHING_CUSTOMER:
      return { ...state, status: statuslist.error };

    case SET_PAGE:
      return { ...state, currentPage: action.currentPage };

    case SET_KEYWORD:
      return { ...state, keyword: action.keyword };

    case NEXT_PAGE:
      return { ...state, currentPage: state.currentPage + 1 };

    case PREV_PAGE:
      return { ...state, currentPage: state.currentPage - 1 };

    default:
      return state;
  }
}
