import { BASE_URL, WINDOW_SIZE } from "../utils/constants";
import { fetchFromAPI } from "../utils/client";

const numberCache: number[] = [];

//mapping of number id to endpoint for third party api
const endpoints: Record<string, string> = {
  p: "primes",
  f: "fibo",
  e: "even",
  r: "rand",
};

export const getNumbers = async (id: string): Promise<{
  windowPrevState: number[];
  windowCurrState: number[];
  numbers: number[];
  avg: number;
}> => {
  if (!endpoints[id]) throw new Error("Invalid number ID");

  const url = `${BASE_URL}/${endpoints[id]}`; //third-party api call
  const responseNumbers = await fetchFromAPI(url);

  const windowPrevState = [...numberCache];

  responseNumbers.forEach((num) => {
    if (!numberCache.includes(num)) {
      numberCache.push(num);
    }
  });

  while (numberCache.length > WINDOW_SIZE) {
    numberCache.shift();
  }

  //calculation for avg
  const avg =
    numberCache.length > 0
      ? numberCache.reduce((a, b) => a + b, 0) / numberCache.length
      : 0;

  return {
    windowPrevState,
    windowCurrState: [...numberCache],
    numbers: responseNumbers,
    avg: parseFloat(avg.toFixed(2)),
  };
};
