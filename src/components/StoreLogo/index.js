import React from "react";
// (2) import Link
import { Link } from "react-router-dom";

// (3) import `config`
import { config } from "../../config";

const index = () => {
  return (
    <Link to="/">
      <div className="text-red-600 font-bold text-4xl">{config.site_title}</div>
    </Link>
  );
};

export default index;
