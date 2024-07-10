import FastFetch from '../src/index.js';

async function getRandomChuckNorrisJoke() {
     interface ChuckNorrisJoke {
          value: string;
      }
      
      try {
          const response = await FastFetch.get('https://api.chucknorris.io/jokes/random');
      
          if (response.status === 200) {
              // Parse the response data assuming it's JSON
              const responseData = response.data as ChuckNorrisJoke;
              console.log('Random Chuck Norris joke:', responseData.value);
          } else {
              console.error('Failed to fetch a joke');
          }
      } catch (error) {
          console.error('Error fetching Chuck Norris joke:', (error as Error).message);
      }
}

getRandomChuckNorrisJoke();
