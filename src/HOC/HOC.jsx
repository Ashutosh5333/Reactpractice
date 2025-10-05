import React from "react";
import withAuthorization from "./withAuthorization";

const PrivateComponent = () => {
  return <div>This is a Private Component, only visible to Admin Users.</div>;
};

const checkPermission = (props) => {
  return props.userRole === "admin";
};

const HOC = () => {
  const PrivateComponentComponentWithAuthorization = withAuthorization(
    PrivateComponent,
    checkPermission
  );
  

  return (
    <div>
      <div className=" text-center">
        <PrivateComponentComponentWithAuthorization userRole="admin" />

        {/* <PrivateComponentComponentWithAuthorization userRole="guest" /> */}
      </div>
    </div>
  );
};

export default HOC;
