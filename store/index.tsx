import React, { createContext, ReactElement, useContext } from 'react';
import { useLocalObservable, enableStaticRendering } from 'mobx-react-lite'
import createStore, { IStore } from './rootStore';


// StoreContext.Provider内部のコンポネートはuseStore使用してデータ使用することができる
interface IProps {
    initialValue: Record<any, any>;
    children: ReactElement
}

enableStaticRendering(true);

const StoreContext = createContext({});

export const StoreProvider = ({initialValue, children}: IProps) => {
  const store: IStore = useLocalObservable(createStore(initialValue))  
  return (
      <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  )
};

export const useStore = () => {
    const store:IStore = useContext(StoreContext) as IStore;
    if (!store) {
        throw new Error('no data')
    }
    return store;
}