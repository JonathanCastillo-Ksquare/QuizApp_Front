import { createContext, useState, useContext } from 'react';
import React from 'react';

import { userData } from '../Mock';

type Props = {
  children: JSX.Element;
};

interface DataContextType {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  difficulty: string;
  setDifficulty: React.Dispatch<React.SetStateAction<string>>;
  globalScore: number;
  setGlobalScore: React.Dispatch<React.SetStateAction<number>>;
}

let DataContext = createContext<DataContextType>({} as DataContextType);

export function DataContextProvider({ children }: Props) {

  // State variables
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [globalScore, setGlobalScore] = useState(userData.globalScore)

  // Values that will be availables in the context
  let value = {
    category,
    setCategory,
    difficulty,
    setDifficulty,
    globalScore,
    setGlobalScore
  }

  return <DataContext.Provider value={value} > {children} </DataContext.Provider>
}

// Custom hook to use the data of the context
export function useDataContext() {
  return useContext(DataContext);
}