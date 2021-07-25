import * as React from "react";
import {
  LayoutOne,
  Text,
  Table,
  Button,
  //   Select,
  //   FormControl,
  LayoutSidebar,
} from "upkit";
import { useSelector, useDispatch } from "react-redux";

import TopBar from "../../components/TopBar";

import { formatRupiah } from "../../utils/format-rupiah";
import { sumPrice } from "../../utils/sum-price";

import FaRegCheckCircle from "@meronex/icons/fa/FaRegCheckCircle";

import { createOrder } from "../../api/order";

import { useHistory, Redirect } from "react-router-dom";
import { clearItems } from "../../features/Cart/actions";

const columns = [
  {
    Header: "Nama produk",
    accessor: (item) => <div className="flex items-center">{item.name}</div>,
  },
  {
    Header: "Jumlah",
    accessor: "qty",
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

  let history = useHistory();
  let dispatch = useDispatch();

  //   let [selected, setSelected] = React.useState({ label: "Cash", id: "cash" });

  async function handleCreateOrder() {
    let payload = {
      delivery_fee: 10000,
    };

    console.log(payload);

    let { data } = await createOrder(payload);

    if (data?.error) return;

    history.push("/");
    dispatch(clearItems());
  }

  if (!cart.length) {
    return <Redirect to="/" />;
  }

  return (
    <LayoutOne>
      <TopBar />
      <Text as="h3"> Checkout </Text>
      <div>
        <br /> <br />
        <Table
          items={cart}
          columns={columns}
          perPage={cart.length}
          showPagination={false}
        />
        <br />
        <div className="text-right">
          <Text as="h4">Subtotal: {formatRupiah(sumPrice(cart))}</Text>
          <br />
          <LayoutSidebar
            sidebarPosition="right"
            sidebar={
              <div className="text-left ">
                {/* <FormControl label="Metode Bayar" color="black">
                  <Select
                    options={[
                      { label: "Cash", value: "cash" },
                      { label: "Charge", value: "charge" },
                    ]}
                    onChange={(selected) => setSelected(selected)}
                    value={selected}
                  />
                </FormControl> */}
              </div>
            }
          />
          <Button
            className="p-4"
            onClick={handleCreateOrder}
            color="red"
            iconBefore={<FaRegCheckCircle />}
          >
            {" "}
            Bayar{" "}
          </Button>
        </div>
      </div>
    </LayoutOne>
  );
}
