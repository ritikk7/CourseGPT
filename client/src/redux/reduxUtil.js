export function handleRequestError(error){
  throw error.response?.data?.error ? error.response.data.error : error.message;
}
