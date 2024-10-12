import { Item } from '@/lib/client';
import { ReactNode } from '@tanstack/react-router';
import { createContext, useContext, useReducer } from 'react';

type ItemDetails = Item & { category: string };

type SET_ITEM_LIST = { type: 'SET_ITEM_LIST'; payload: 'list' };
type SET_ITEM_FORM = { type: 'SET_ITEM_FORM'; payload: 'form' };
type SET_ITEM_DETAILS = {
  type: 'SET_ITEM_DETAILS';
  payload: { menu: 'details'; item: ItemDetails };
};
type MenuAction = SET_ITEM_DETAILS | SET_ITEM_FORM | SET_ITEM_LIST;

interface MenuState {
  menu: 'list' | 'form' | 'details';
  item?: ItemDetails;
}

const reducer = (state: MenuState, action: MenuAction): MenuState => {
  switch (action.type) {
    case 'SET_ITEM_LIST':
      return {
        ...state,
        menu: action.payload,
      };
    case 'SET_ITEM_DETAILS':
      return {
        ...state,
        ...action.payload,
      };
    case 'SET_ITEM_FORM':
      return {
        ...state,
        menu: action.payload,
      };
    default:
      return state;
  }
};

const SidebarContext = createContext<
  | {
      state: MenuState;
      setSidebarItemList: () => void;
      setSidebarItemForm: () => void;
      setSidebarItemDetails: (item: ItemDetails) => void;
    }
  | undefined
>(undefined);

const initialState: MenuState = {
  menu: 'list',
};

export function SidebarContextProvider(props: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function setSidebarItemList() {
    dispatch({ type: 'SET_ITEM_LIST', payload: 'list' });
  }
  function setSidebarItemForm() {
    dispatch({ type: 'SET_ITEM_FORM', payload: 'form' });
  }

  function setSidebarItemDetails(item: ItemDetails) {
    dispatch({
      type: 'SET_ITEM_DETAILS',
      payload: {
        item,
        menu: 'details',
      },
    });
  }

  return (
    <SidebarContext.Provider
      value={{
        state,
        setSidebarItemDetails,
        setSidebarItemForm,
        setSidebarItemList,
      }}
    >
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
