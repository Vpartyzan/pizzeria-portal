import Axios from 'axios';
import { api } from '../settings';

/* selectors */
export const getAll = ({tables}) => tables.data;
export const getLoadingState = ({tables}) => tables.loading;

/* action name creator */
const reducerName = 'tables';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const FETCH_UPDATE_STATUS = createActionName('FETCH_UPDATE_STATUS');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const fetchUpdateStatus = (id, status, order) => ({ id, status, order, type: FETCH_UPDATE_STATUS });

/* thunk creators */
export const fetchFromAPI = () => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());

    Axios
      .get(`${api.url}/api/${api.tables}`)
      .then(res => {        
        dispatch(fetchSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

export const fetchStatusUpdate = (id, newStatus, newOrder) => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());

    Axios
      .get(`${api.url}/api/${api.tables}`)
      .then(() => {
        dispatch(fetchUpdateStatus(id, newStatus, newOrder));
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
    case FETCH_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
      };
    }
    case FETCH_UPDATE_STATUS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: statePart.data.map( val => (val.id === action.id && val.order === action.order)     
          ?  {...val, status: action.status}
          : (val.id === action.id && val.order !== action.order) 
            ? {...val, status: action.status, order: action.order}
            : val
        ),
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