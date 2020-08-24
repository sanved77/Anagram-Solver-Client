export const getAnagrams = (term) => {
  const proxy = "";
  const api = "http://sanved.com/anagram-api?word=" + term;
  return fetch(proxy + api, {
    method: "GET",
    headers: {
      "Content-Type": "text/plain",
    },
  });
};
