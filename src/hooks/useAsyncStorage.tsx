import React, { createContext, ReactNode, useContext, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

type AsyncStorageContextData = {
  getItem: () => Promise<LoginDataProps[] | []>
  setItem: (data: FormData[]) => Promise<void>
}

type AsyncStorageProvider = {
  children: ReactNode;
}

interface FormData {
  title: string;
  email: string;
  password: string;
}

interface LoginDataProps {
  id: string;
  title: string;
  email: string;
  password: string;
};

const AsyncStorageContext = createContext<AsyncStorageContextData>({} as AsyncStorageContextData);

const key = '@passmanager:logins';

export function AsyncStorageProvider ({children}: AsyncStorageProvider) {

  async function getItem () : Promise<LoginDataProps[] | []> {
    const response = await AsyncStorage.getItem(key);

    if (!response) {
      return [];
    }

    const data = JSON.parse(response) as LoginDataProps[];
    return data;
  }

  async function setItem (data: FormData[]) {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  }

  return (
    <AsyncStorageContext.Provider value={{ getItem, setItem }}>
      {children}
    </AsyncStorageContext.Provider>
  )
}

export const useAsyncStorage = () => useContext(AsyncStorageContext);