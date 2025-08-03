import React, { Suspense, lazy } from "react";

// import Home from './Home'
const Home = lazy(() => import("./Home"));
const About = lazy(() => import("./About"));

const Lazyoptimise = () => {

  
  return (
    <div>
      <h1> LAzyyyyy loading </h1>
      <Suspense fallback={<h1>Loading......... </h1>}>
        <h1> Every Showing Example of Lazy loading </h1>
        <Home />
      </Suspense>

      <Suspense fallback={<h1>About page Loading......... </h1>}>
        {/* <h2> About is loading .........</h2> */}
        <About />
      </Suspense>

      {/* <img  
         src='https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w300/2023/10/free-images.jpg'  
         loading={lazy} alt='Something..........'/> */}
    </div>
  );
};

export default Lazyoptimise;

{
  /* ques - 1 How do you optimise a react app ? 
    or what are the different optimization technique you have used ?
       only imporst the components dyanmically .
       Helps to reduce the bundle size .
       Working using React lazy & Suspense . */
}
