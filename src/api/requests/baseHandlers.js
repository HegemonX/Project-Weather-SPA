export const handleError = error => {
  if (!error) return null;

  if (error.response) {
    const { data, status } = error.response;
    return {
      error,
      data: data,
      status: status,
      errorMessage: "Bad request"
    };
  }
  if (error.request) {
    return {
      errorMessage: "No answer",
      data: error.request
    };
  }
  return {
    errorMessage: "Internal error"
  };
};
export const handleOK = response => {
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error(`Error code: ${response.status}`);
  }
};
