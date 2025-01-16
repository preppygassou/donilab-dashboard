import React, { createContext, useCallback, useContext, useMemo, useReducer, useRef } from 'react';
import { combineReducers } from './combineReducers';
import { authReducer, authInitialState,AuthState, userDetailsReducer, userUpdateProfileReducer, userUpdateReducer, userListReducer, userDeleteReducer, profileState, ProfileState } from './auth/reducer';


const initialState = {
  auth: authInitialState,
  userDetails:profileState,
  userUpdateProfile:{error:'',loading:false},
  userList:[]
};

const rootReducer = combineReducers({
  auth: authReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userUpdate: userUpdateReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
});


export type StoreState = {
  auth:AuthState
  userDetails:ProfileState
  userList:any[]
}

const StoreContext = createContext<{
  state: StoreState;
  dispatch: React.Dispatch<any>;
  getState: () => any;
}>({
  state: initialState,
  dispatch: () => null, // placeholder function
  getState: () => initialState // default getState returning initial state
});



export const StoreProvider: React.FC<{ children: React.ReactNode}>= ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  const stateRef = useRef<any>(initialState);

  // Update stateRef on state changes
  stateRef.current = state;

  const enhancedDispatch = useCallback((action: (arg0: (action: any) => void, arg1: () => any) => void) => {
    if (typeof action === 'function') {
      action(enhancedDispatch, () => stateRef.current);
    } else {
      dispatch(action);
    }
  }, [dispatch]);

  const getState = useCallback(() => stateRef.current, []);

  const providerValue = useMemo(() => ({
    state, dispatch: enhancedDispatch, getState
  }), [state,enhancedDispatch,getState]);

  return (
    <StoreContext.Provider value={providerValue}>
      {children}
    </StoreContext.Provider>
  );
};


export const useStore = () => {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error('useStore Hook must be used within the editor Provider')
  }
  return context
}

