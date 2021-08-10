import React from "react";
import { useForm } from "react-hook-form";
import { useHistory, useRouteMatch } from "react-router-dom";
import BounceLoader from "react-spinners/BounceLoader";
import { Button, FormControl, InputText, LayoutOne, Text } from "upkit";
import { getCustomersId, updateCustomer } from "../../../api/customer";
import TopBar from "../../../components/TopBar";
import { rules } from "./validation";

const CustomerEdit = () => {
  let [customer, setCustomer] = React.useState(null);
  let [error, setError] = React.useState("");
  let [status, setStatus] = React.useState("process");
  let { params } = useRouteMatch();

  let history = useHistory();
  let { handleSubmit, register, errors, setValue, watch, getValues } =
    useForm();

  watch();

  React.useEffect(() => {
    getCustomersId(params?.customer_id)
      .then(({ data }) => {
        if (data?.error) {
          setError(data.message || "Terjadi kesalahan yang tidak diketahui");
        }

        setCustomer(data);
        setValue("full_name", data.full_name);
        setValue("address", data.address);
        setValue("phone_no", data.phone_no);
      })
      .finally(() => setStatus("idle"));

    register({ name: "full_name" }, rules.full_name);
    register({ name: "address" }, rules.address);
    register({ name: "phone_no" }, rules.phone_no);
  }, [params, register, setValue]);

  const onSubmit = async (formHook) => {
    let payload = new FormData();

    payload.append("full_name", formHook.full_name);
    payload.append("address", formHook.address);
    payload.append("phone_no", formHook.phone_no);

    let { data } = await updateCustomer(payload, customer._id);

    if (data.error) return;

    history.push("/manajemen-pelanggan");
  };

  if (error.length) {
    return (
      <LayoutOne>
        <TopBar />
        <Text as="h3"> Terjadi Kesalahan </Text>
        {error}
      </LayoutOne>
    );
  }

  if (status === "process") {
    return (
      <LayoutOne>
        <div className="text-center py-10">
          <div className="inline-block">
            <BounceLoader color="red" />
          </div>
        </div>
      </LayoutOne>
    );
  }

  return (
    <LayoutOne>
      <TopBar />
      <br />
      <Text as="h3">Edit Data Pelanggan</Text>
      <br />
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl
            label="Nama Lengkap"
            errorMessage={errors.full_name?.message}
            color="black"
          >
            <InputText
              placeholder="Nama Lengkap"
              fitContainer
              name="full_name"
              value={getValues().full_name}
              ref={register(rules.full_name)}
            />
          </FormControl>

          <FormControl
            label="Alamat"
            errorMessage={errors.address?.message}
            color="black"
          >
            <InputText
              placeholder="Alamat"
              fitContainer
              name="address"
              value={getValues().address}
              ref={register(rules.address)}
            />
          </FormControl>

          <FormControl
            label="Nomor Telp"
            errorMessage={errors.phone_no?.message}
            color="black"
          >
            <InputText
              placeholder="Nomor Telp"
              fitContainer
              name="phone_no"
              value={getValues().phone_no}
              ref={register(rules.phone_no)}
            />
          </FormControl>
          <br />
          <Button fitContainer>Simpan</Button>
        </form>
      </div>
    </LayoutOne>
  );
};

export default CustomerEdit;
