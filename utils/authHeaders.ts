export const getAuthHeaders = (token: string) => {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
  };
};
