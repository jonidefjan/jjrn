import { createContext, useContext, useState } from "react";

export const NumbersContext = createContext({
  numbers: [],
  addNumber: (number) => {},
  removeNumber: (number) => {},
});

export const NumbersProvider = ({ children }) => {
  const [numbers, setNumbers] = useState([]);

  const addNumber = (number) => {
    const index = numbers.indexOf(number);

    if (index > -1) {
      setNumbers(numbers.filter((item) => item !== number));
    } else {
      setNumbers((prevState) => [...prevState, number]);
    }
  };

  const removeNumber = (number) => {
    setNumbers(numbers.filter((n) => n !== number));
  };

  const value = {
    numbers,
    addNumber,
    removeNumber,
  };

  return (
    <NumbersContext.Provider value={value}>{children}</NumbersContext.Provider>
  );
};

export const useNumbersContext = () => {
  const ctx = useContext(NumbersContext);

  if (ctx === undefined) {
    throw Error(
      "useNumbersContext must be inside a Provider and it must have a value defined."
    );
  }

  return ctx;
};
