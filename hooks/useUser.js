import useSWR from "swr";

import fetcher from "@libs/fetcher";

const useUser = (username) => {
  const { data, error, isLoading, mutate } = useSWR(
    username ? `user/${username}` : null,
    fetcher
  );

  return {
    data,
    isLoading: isLoading,
    isError: error,
    mutate,
  };
};

export default useUser;
