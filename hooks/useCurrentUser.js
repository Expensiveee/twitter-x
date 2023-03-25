"use client";
import useSWR from "swr";

import fetcher from "@libs/fetcher";

const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSWR("current", fetcher);

  return {
    data,
    isLoading: isLoading,
    isError: error,
    mutate,
  };
};

export default useCurrentUser;
