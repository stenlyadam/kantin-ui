import React from "react";
import { number, oneOfType, string, func, shape } from "prop-types";
import { Select } from "upkit";
import axios from "axios";
import { config } from "../../config";

const SelectCustomer = ({ value, onChange, customer }) => {
  let [customers, setCustomers] = React.useState([]);
  let [isFetching, setIsFetching] = React.useState(false);

  React.useEffect(() => {
    setIsFetching(true);

    axios
      .get(`${config.api_host}/api/unklab-employees`)
      .then(({ data }) => {
        if (!data.error) {
          setCustomers(data);
        }
      })
      .finally((_) => setIsFetching(false));
  }, []);

  return (
    <Select
      options={customers.map((customer) => ({
        label: customer.Nama,
        value: customer.Nama,
      }))}
      value={value}
      onChange={onChange}
      isLoading={isFetching}
      sDisabled={isFetching || !customers.length}
    />
  );
};

SelectCustomer.propTypes = {
  onChange: func,
  value: shape({ label: string, value: oneOfType([string, number]) }),
};

export default SelectCustomer;
