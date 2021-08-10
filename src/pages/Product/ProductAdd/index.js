import React from "react";
import { LayoutOne, InputText, FormControl, Button, Text } from "upkit";
import TopBar from "../../../components/TopBar";

import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { rules } from "./validation";
import SelectCategory from "../../../components/SelectCategory";

import { createProduct } from "../../../api/product";

const ProductAdd = () => {
  let history = useHistory();
  let { handleSubmit, register, errors, setValue, watch, getValues } =
    useForm();

  const [image, setImage] = React.useState({ preview: "", raw: "" });

  watch();

  React.useEffect(() => {
    register({ name: "category" }, rules.category);
  }, [register]);

  const updateValue = (field, value) =>
    setValue(field, value, { shouldValidate: true, shouldDirty: true });

  const onChangeHandler = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const onSubmit = async (formHook) => {
    let payload = new FormData();

    payload.append("image", image.raw);
    payload.append("name", formHook.nama_produk);
    payload.append("price", formHook.price);
    payload.append("stock", formHook.stok);
    payload.append("unit", formHook.unit);
    payload.append("category", formHook.category.label);

    let { data } = await createProduct(payload);

    if (data.error) return;

    history.push("/manajemen-produk");
  };

  return (
    <LayoutOne>
      <TopBar />
      <br />
      <Text as="h3">Tambah Produk</Text>
      <br />
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl
            label="Nama Produk"
            errorMessage={errors.nama_produk?.message}
            color="black"
          >
            <InputText
              placeholder="Nama Produk"
              fitContainer
              name="nama_produk"
              ref={register(rules.nama_produk)}
            />
          </FormControl>

          <FormControl
            label="Harga"
            errorMessage={errors.price?.message}
            color="black"
          >
            <InputText
              placeholder="Harga"
              fitContainer
              name="price"
              ref={register(rules.price)}
            />
          </FormControl>

          <FormControl
            label="Stok"
            errorMessage={errors.stok?.message}
            color="black"
          >
            <InputText
              placeholder="Stok"
              fitContainer
              name="stok"
              ref={register(rules.stok)}
            />
          </FormControl>

          <FormControl
            label="Unit"
            errorMessage={errors.unit?.message}
            color="black"
          >
            <InputText
              placeholder="Unit"
              fitContainer
              name="unit"
              ref={register(rules.unit)}
            />
          </FormControl>

          <FormControl
            label="Kategori"
            errorMessage={errors.category?.message}
            color="black"
          >
            <SelectCategory
              onChange={(option) => updateValue("category", option)}
              value={getValues().category}
              ref={register(rules.category)}
            />
          </FormControl>

          <FormControl
            label="Gambar Produk"
            errorMessage={errors.image?.message}
            color="black"
          >
            <input
              type="file"
              name="image"
              required
              ref={register(rules.image)}
              onChange={onChangeHandler}
            />
          </FormControl>
          <label htmlFor="upload-button">
            {image.preview ? (
              <img src={image.preview} alt="dummy" width="300" height="300" />
            ) : (
              <>
                <span className="fa-stack fa-2x mt-3 mb-2">
                  <i className="fas fa-circle fa-stack-2x" />
                  <i className="fas fa-store fa-stack-1x fa-inverse" />
                </span>
                <h5 className="text-left">Upload your photo</h5>
              </>
            )}
          </label>
          <br />

          <Button fitContainer>Simpan</Button>
        </form>
      </div>
    </LayoutOne>
  );
};

export default ProductAdd;
