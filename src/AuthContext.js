import React, { createContext, useContext, useReducer } from 'react';

const AuthContext = createContext();

const initialState = {
  tc: '',
  password: '',
  isAuthenticated: false,
  isPhoneVerified: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_TC':
      return { ...state, tc: action.payload };
    case 'SET_PASSWORD':
      return { ...state, password: action.payload };
    case 'SET_AUTH':
      return { ...state, isAuthenticated: true };
    case 'SET_PHONE_VERIFIED':
      return { ...state, isPhoneVerified: true };
    case 'RESET_AUTH':
      return initialState;
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
