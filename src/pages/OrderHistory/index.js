import * as React from "react";
import { LayoutOne, Table, Text } from "upkit";
import { getOrders } from "../../api/order";
import TopBar from "../../components/TopBar";
import { formatRupiah } from "../../utils/format-rupiah";
import { sumPrice } from "../../utils/sum-price";

const columns = [
  {
    Header: "Items",
    accessor: (order) => {
      return (
        <div>
          {order.order_items.map((item) => {
            return (
              <div key={item._id}>
                {item.name} ({item.qty})
              </div>
            );
          })}
        </div>
      );
    },
  },
  {
    Header: "Total",
    accessor: (order) => {
      return (
        <div>
          {formatRupiah(sumPrice(order.order_items) + order.delivery_fee)}
        </div>
      );
    },
  },
];

export default function UserOrders() {
  let [pesanan, setPesanan] = React.useState([]);
  let [count, setCount] = React.useState(0);
  let [status, setStatus] = React.useState("idle");
  let [page, setPage] = React.useState(1);
  let [limit] = React.useState(10);

  const fetchPesanan = React.useCallback(async () => {
    setStatus("process");

    let { data } = await getOrders({ limit, page });

    if (data.error) {
      setStatus("error");
      return;
    }

    setStatus("success");
    setPesanan(data.data);
    setCount(data.count);
  }, [page, limit]);

  React.useEffect(() => {
    fetchPesanan();
  }, [fetchPesanan]);

  return (
    <LayoutOne>
      <TopBar />
      <Text as="h3"> Riwayat Pemesanan </Text>
      <br />

      <Table
        items={pesanan}
        totalItems={count}
        columns={columns}
        onPageChange={(page) => setPage(page)}
        page={page}
        isLoading={status === "process"}
      />
    </LayoutOne>
  );
}
