import React, { useEffect, useState } from "react";
import routes from "../dashboardRoutes";

const Content = ({ selectedTab }) => {
  return (
    <>
      {routes.map((item) => {
        if (item.tag === selectedTab) {
          return <item.component />;
        }
      })}
    </>
  );
};

export default Content;
