import { SET_CELLS, SET_EXTRACTED } from "../actions/actions";

const initialState = {
  content: [],
  extracted: []
};

const CellsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CELLS:
      return {
        ...state,
        content: action.payload
      };

    case SET_EXTRACTED:
      return {
        ...state,
        extracted: action.payload
      };

    default:
      return state;
  }
};

export default CellsReducer;
