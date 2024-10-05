import { ReactNode } from '@tanstack/react-router';
import { createContext, useContext, useReducer } from 'react';

interface UserState {
  firstName: string;
  lastName: string;
  email: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: UserState | null;
}

type LOGGED_IN_ACTION = { type: 'SET_LOGGED_IN'; payload: UserState };
type LOGGED_OUT_ACTION = { type: 'SET_LOGGED_OUT' };
type AuthAction = LOGGED_IN_ACTION | LOGGED_OUT_ACTION;

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const reducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_LOGGED_IN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case 'SET_LOGGED_OUT':
      return {
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

export interface AuthContext {
  isAuthenticated: boolean;
  user: UserState | null;
  login: (user: UserState) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContext | undefined>(undefined);

export function AuthContextProvider(props: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function login(profile: UserState) {
    dispatch({
      type: 'SET_LOGGED_IN',
      payload: profile,
    });
  }

  function logout() {
    dispatch({
      type: 'SET_LOGGED_OUT',
    });
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        login,
        logout,
        user: state.user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within a AuthContextProvider');
  }
  return context;
}
