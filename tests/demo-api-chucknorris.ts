import FastFetch from '../src/index.js';

async function getRandomChuckNorrisJoke() {
     interface ChuckNorrisJoke {
       value: string;
     }
   
     try {
       // Usando el método específico .get
       const response1 = await FastFetch.get<ChuckNorrisJoke>('https://api.chucknorris.io/jokes/random');
       
       console.log('Response 1 con get:', response1);
       
       if (response1.status === 200) {
         console.log('Random Chuck Norris joke (get):', response1.data.value);
       } else {
         console.error('Failed to fetch a joke using get');
       }
   
       // Usando la instancia directamente
       const response2 = await FastFetch({
         method: 'GET',
         url: 'https://api.chucknorris.io/jokes/random',
       });
   
       console.log('Response 2 con instancia:', response2);
       
       if (response2.status === 200) {
        console.log('Random Chuck Norris joke (instancia):', (response2.data as ChuckNorrisJoke).value);
       } else {
         console.error('Failed to fetch a joke using instance');
       }
     } catch (error) {
       console.error('Error fetching Chuck Norris joke:', (error as Error).message);
     }
   }
   
   getRandomChuckNorrisJoke();