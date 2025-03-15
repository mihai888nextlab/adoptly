import useSWR from "swr";
import { User } from "../lib/models/user";
import { createContext, useContext, useState } from "react";
import { ReactNode } from "react";

const StateContext = createContext({
  user: {} as User | null,
  loading: false,
  setSecondaryLoading: (loading: boolean) => {},
});

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const StateProvider = ({ children }: { children: ReactNode }) => {
  const { data: user, error, isLoading } = useSWR("/api/user", fetcher);

  const [secondaryLoading, setSecondaryLoading] = useState(false);

  return (
    <StateContext.Provider
      value={{
        user,
        loading: isLoading || secondaryLoading,
        setSecondaryLoading,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

// Custom hook to use the context
export const useSharedState = () => useContext(StateContext);
