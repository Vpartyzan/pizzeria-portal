import Axios from 'axios';
import { api } from '../settings';

/* selectors */
export const getAll = ({allOrders}) => allOrders.data;
export const getLoadingState = ({allOrders}) => allOrders.loading;

/* action name creator */
const reducerName = 'allOrders';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_ORDER_SUCCESS = createActionName('FETCH_ORDER_SUCCESS');
const FETCH_BOOKING_SUCCESS = createActionName('FETCH_BOOKING_SUCCESS');
const FETCH_EVENT_SUCCESS = createActionName('FETCH_EVENT_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchOrderSuccess = payload => ({ payload, type: FETCH_ORDER_SUCCESS });
export const fetchBookingSuccess = payload => ({ payload, type: FETCH_BOOKING_SUCCESS });
export const fetchEventSuccess = payload => ({ payload, type: FETCH_EVENT_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });

/* thunk creators */
export const fetchOrderFromAPI = () => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());

    Axios
      .get(`${api.url}/api/${api.order}`)
      .then(res => {
        dispatch(fetchOrderSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

export const fetchBookingFromAPI = () => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());
    
    Axios
      .get(`${api.url}/api/${api.booking}`)
      .then(res => {
        dispatch(fetchBookingSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

export const fetchEventFromAPI = () => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());
    
    Axios
      .get(`${api.url}/api/${api.event}`)
      .then(res => {
        dispatch(fetchEventSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

/* reducer */
export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_ORDER_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: {
          ...statePart.data,
          order: action.payload,
        },
      };
    }
    case FETCH_BOOKING_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: {
          ...statePart.data,
          booking: action.payload,
        },
      };
    }
    case FETCH_EVENT_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: {
          ...statePart.data,
          event: action.payload,
        },
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    default:
      return statePart;
  }
}