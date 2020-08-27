export const getAnagrams = (term) => {
  const api = "http://sanved.com/anagram-api?word=" + term;
  return fetch(api, {
    method: "GET",
    headers: {
      "Content-Type": "text/plain",
    },
  });
};

/*
 *   API repository here -
 *   https://github.com/sanved77/Anagram-Solver
 */
