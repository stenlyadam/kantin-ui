import * as React from "react";
import { useSelector } from "react-redux";
// (2) import Link
import { Link } from "react-router-dom";

// (3) import `config`
import { config } from "../../config";

const StoreLogo = () => {
  let auth = useSelector((state) => state.auth);
  return (
    <Link to={auth.user ? "/account" : "/login"}>
      <div className="text-red-600 font-bold text-4xl">{config.site_title}</div>
    </Link>
  );
};

export default StoreLogo;
