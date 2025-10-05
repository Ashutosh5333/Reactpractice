import React, { useEffect, useState } from "react";
import HOC from "./HOC/HOC";
import SocketApp from "./SocketFrontend/SocketApp";

const App = () => {
  return (
    <>
      <h2 className="text-center text-red-700"> hello </h2>
      <SocketApp />
    </>
  );
};

export default App;
