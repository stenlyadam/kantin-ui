import FaRegCheckCircle from "@meronex/icons/fa/FaRegCheckCircle";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import {
  Button,
  FormControl,
  LayoutOne,
  LayoutSidebar,
  Table,
  Text,
} from "upkit";
import { createOrder } from "../../api/order";
import SelectCustomer from "../../components/SelectCustomer";
import TopBar from "../../components/TopBar";
import { clearItems } from "../../features/Cart/actions";
import { formatRupiah } from "../../utils/format-rupiah";
import { sumPrice } from "../../utils/sum-price";
import { rules } from "./validation";

const columns = [
  {
    Header: "Nama produk",
    accessor: (item) => <div className="flex items-center">{item.name}</div>,
  },
  {
    Header: "Jumlah",
    accessor: (item) => <div>{`${item.qty} ${item.unit}`}</div>,
  },
  {
    Header: "Harga satuan",
    id: "price",
    accessor: (item) => <span> @ {formatRupiah(item.price)} </span>,
  },
  {
    Header: "Harga total",
    id: "subtotal",
    accessor: (item) => {
      return <div>{formatRupiah(item.price * item.qty)}</div>;
    },
  },
];

export default function Checkout() {
  let cart = useSelector((state) => state.cart);

  let { setValue, getValues, handleSubmit, register, errors } = useForm();

  let history = useHistory();
  let dispatch = useDispatch();

  // let [paymentMethod] = React.useState({
  //   label: "Cash",
  //   id: "cash",
  // });

  React.useEffect(() => {
    register({ name: "customer" }, rules.customer);
  }, [register]);

  async function handleCreateOrder(formHook) {
    let payload = {
      customer: formHook.customer.value,
    };

    let { data } = await createOrder(payload);

    console.log(data);
    if (data?.error) return;

    history.push("/");
    dispatch(clearItems());
  }

  const updateValue = (field, value) =>
    setValue(field, value, { shouldValidate: true, shouldDirty: true });

  if (!cart.length) {
    return <Redirect to="/" />;
  }

  return (
    <LayoutOne>
      <TopBar />
      <br />
      <Text as="h3"> Konfirmasi Pesanan </Text>
      <div>
        <br />
        <Table
          items={cart}
          columns={columns}
          perPage={cart.length}
          showPagination={false}
        />
        <br />
        <div className="text-left">
          <Text as="h4">Sub Total: {formatRupiah(sumPrice(cart))}</Text>
          <br />
          <LayoutSidebar
            sidebarPosition="left"
            sidebar={
              <div className="text-left ">
                {/* <FormControl label="Metode Bayar" color="black">
                  <Select
                    options={[
                      { label: "Cash", value: "cash" },
                      { label: "Charge", value: "charge" },
                    ]}
                    onChange={(selected) => setPaymentMethod(selected)}
                    value={paymentMethod}
                  />
                </FormControl> */}

                <FormControl
                  label="Pelanggan"
                  errorMessage={errors.customer?.message}
                  color="black"
                >
                  <SelectCustomer
                    onChange={(option) => updateValue("customer", option)}
                    value={getValues().customer}
                    ref={register(rules.customer)}
                  />
                </FormControl>
              </div>
            }
          />
          <Button
            className="p-4"
            onClick={handleSubmit(handleCreateOrder)}
            color="red"
            iconBefore={<FaRegCheckCircle />}
          >
            {" "}
            Pesan{" "}
          </Button>
        </div>
      </div>
    </LayoutOne>
  );
}
