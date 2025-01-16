// combineReducers.ts
export const combineReducers = (reducers: { [x: string]: (arg0: any, arg1: any) => any; }) => {
  return (state = {}, action: any) => {
    return Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reducers[key](state[key], action);
      return nextState;
    }, {});
  };
};
