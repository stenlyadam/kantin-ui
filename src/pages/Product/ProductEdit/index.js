import React from "react";
import { config } from "../../../config";
import BounceLoader from "react-spinners/BounceLoader";
import { LayoutOne, InputText, FormControl, Button, Text } from "upkit";
import TopBar from "../../../components/TopBar";
import { useForm } from "react-hook-form";
import { useHistory, useRouteMatch } from "react-router-dom";
import { rules } from "./validation";
import SelectCategory from "../../../components/SelectCategory";

import { getProductsId, updateProduct } from "../../../api/product";

const ProductEdit = () => {
  let [product, setProduct] = React.useState(null);
  let [error, setError] = React.useState("");
  let [status, setStatus] = React.useState("process");
  let { params } = useRouteMatch();

  let history = useHistory();
  let { handleSubmit, register, errors, setValue, watch, getValues } =
    useForm();

  const [image, setImage] = React.useState({ preview: "", raw: "" });

  watch();

  React.useEffect(() => {
    getProductsId(params?.product_id)
      .then(({ data }) => {
        if (data?.error) {
          setError(data.message || "Terjadi kesalahan yang tidak diketahui");
        }

        setProduct(data);
        setValue("nama_produk", data.name);
        setValue("price", data.price);
        setValue("unit", data.unit);
        setValue("category", {
          label: data.category.name,
          value: data.category._id,
        });
      })
      .finally(() => setStatus("idle"));

    register({ name: "nama_produk" }, rules.nama_produk);
    register({ name: "price" }, rules.price);
    register({ name: "category" }, rules.category);
    register({ name: "unit" }, rules.unit);
  }, [params, register, setValue]);

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
    payload.append("unit", formHook.unit);
    payload.append("category", formHook.category.label);

    let { data } = await updateProduct(payload, product._id);

    if (data.error) return;

    history.push("/manajemen-produk");
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
      <Text as="h3">Edit Produk</Text>
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
              value={getValues().nama_produk}
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
              value={getValues().price}
              ref={register(rules.price)}
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
              value={getValues().unit}
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
              ref={register(rules.image)}
              onChange={onChangeHandler}
            />
          </FormControl>
          <label htmlFor="upload-button">
            {product?.image_url && !image.preview ? (
              <img
                src={`${config.api_host}/upload/${product.image_url}`}
                alt="dummy"
                width="300"
                height="300"
              />
            ) : image.preview ? (
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

export default ProductEdit;
