import React from "react";
import { LayoutOne, InputText, FormControl, Button, Text } from "upkit";
import TopBar from "../../../components/TopBar";

import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { rules } from "./validation";
import { createCustomer } from "../../../api/customer";

const CustomerAdd = () => {
  let history = useHistory();
  let { handleSubmit, register, errors, watch } = useForm();

  watch();

  const onSubmit = async (formHook) => {
    let payload = new FormData();

    payload.append("full_name", formHook.full_name);
    payload.append("address", formHook.address);
    payload.append("phone_no", formHook.phone_no);

    let { data } = await createCustomer(payload);

    if (data.error) return;

    history.push("/manajemen-pelanggan");
  };

  return (
    <LayoutOne>
      <TopBar />
      <br />
      <Text as="h3">Tambah Pelanggan</Text>
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

export default CustomerAdd;
