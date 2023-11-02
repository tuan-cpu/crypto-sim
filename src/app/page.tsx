"use client";
declare global {
  interface Window {
    ethereum: {
      on: any;
      request: (request: {
        method: string;
        params?: Array<any>;
      }) => Promise<any>;
    };
  }
}

const Home = () =>{
  return(
    <main>Home</main>
  )
}

export default Home;
