import { ReactNode } from '@tanstack/react-router';
import { createContext, Dispatch, useContext, useReducer } from 'react';

type MenuType = 'list' | 'form' | 'details';

interface MenuState {
  type: MenuType;
}

type MenuAction = { type: 'SET_MENU_TYPE'; payload: MenuType };

const initialState: MenuState = {
  type: 'list',
};

const reducer = (state: MenuState, action: MenuAction): MenuState => {
  switch (action.type) {
    case 'SET_MENU_TYPE':
      return {
        ...state,
        type: action.payload,
      };
    default:
      return state;
  }
};

const SidebarContext = createContext<
  | {
      menu: MenuState;
      dispatch: Dispatch<MenuAction>;
    }
  | undefined
>(undefined);

export function SidebarContextProvider(props: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <SidebarContext.Provider value={{ menu: state, dispatch }}>
      {props.children}
    </SidebarContext.Provider>
  );
}

export function useSidebarMenu() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error(
      'useSidebarMenu must be used within a SidebarContextProvider'
    );
  }
  return context;
}
