import { createContext, useContext, useState, type ReactNode } from 'react';

type ChargeInfo = {
  priceId: string;
  unitAmount: number;
  currency: string;
};

type CustomerInfo = {
  customerId: string;
};

type TShoppingContext = {
  chargeInfo: ChargeInfo | null;
  setChargeInfo: (data: ChargeInfo | null | undefined) => void;
  customerInfo: CustomerInfo | null;
  setCustomerInfo: (data: CustomerInfo | null | undefined) => void;
  clearShoppingContents: () => void;
};

const ShoppingContext = createContext<TShoppingContext | null>(null);

export function ShoppingContextProvider({ children }: { children: ReactNode }) {
  const [shoppingContents, setShoppingContents] =
    useState<TShoppingContext | null>(null);

  const setChargeInfo = (data: ChargeInfo | null | undefined) => {
    setShoppingContents(
      (prev) =>
        ({
          ...prev,
          chargeInfo: data,
        }) as TShoppingContext
    );
  };

  const setCustomerInfo = (data: CustomerInfo | null | undefined) => {
    setShoppingContents(
      (prev) =>
        ({
          ...prev,
          customerInfo: data,
        }) as TShoppingContext
    );
  };

  const clearShoppingContents = () => {
    setShoppingContents(null);
  };

  return (
    <ShoppingContext.Provider
      value={{
        chargeInfo: shoppingContents?.chargeInfo || null,
        setChargeInfo,
        customerInfo: shoppingContents?.customerInfo || null,
        setCustomerInfo,
        clearShoppingContents,
      }}>
      {children}
    </ShoppingContext.Provider>
  );
}

export function useShoppingContext() {
  const context = useContext(ShoppingContext);
  if (!context) {
    throw new Error(
      'useShoppingContext must be used within ShoppingContextProvider'
    );
  }
  return context;
}
