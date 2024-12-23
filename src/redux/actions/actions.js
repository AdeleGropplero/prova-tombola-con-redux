export const SET_CELLS = "SET_CELLS";
export const SET_EXTRACTED = "SET_EXTRACTED";

export const setCells = (cells) => ({ type: SET_CELLS, payload: cells });

export const setExtracted = (num) => ({ type: SET_EXTRACTED, payload: num });
