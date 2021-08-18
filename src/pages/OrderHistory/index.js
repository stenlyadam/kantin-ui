import * as React from "react";
import { ToastContainer, toast } from "react-toastify";
import { LayoutOne, Table, Text, ButtonCircle, Button } from "upkit";
import { getOrders, deleteOrder } from "../../api/order";
import TopBar from "../../components/TopBar";
import { formatRupiah } from "../../utils/format-rupiah";
import { sumPrice } from "../../utils/sum-price";
import StatusLabel from "../../components/StatusLabel";
import { Link } from "react-router-dom";
// import FaEdit from "@meronex/icons/fa/FaEdit";
import FaTrash from "@meronex/icons/fa/FaTrash";
import FaFileInvoice from "@meronex/icons/fa/FaFileInvoiceDollar";

export default function UserOrders() {
  let [pesanan, setPesanan] = React.useState([]);
  let [count, setCount] = React.useState(0);
  let [status, setStatus] = React.useState("idle");
  let [page, setPage] = React.useState(1);
  let [limit] = React.useState(10);
  let [delstatus, setDelstatus] = React.useState(0);

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

  const notifDelete = () =>
    toast.success("Delete Success !", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const columns = [
    {
      Header: "Order ID / Status",
      id: "Status",
      accessor: (order) => {
        return (
          <div>
            #{order.order_number} <br />
            <StatusLabel status={order.status} />
          </div>
        );
      },
    },
    {
      Header: "Pelanggan",
      accessor: (item) => {
        return <div>{item.customer.full_name}</div>;
      },
    },
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
    {
      Header: "Pembayaran",
      accessor: (items) => {
        return (
          <div>
            <Link to={`/invoice/${items._id}`}>
              <Button color="gray" iconBefore={<FaFileInvoice />}>
                Invoice
              </Button>
            </Link>
          </div>
        );
      },
    },
    {
      Header: "Action",
      accessor: (items) => {
        return (
          <div>
            {/* <Link to={`/edit-customer/${items._id}`}>
                  <ButtonCircle icon={<FaEdit />} />
                </Link> */}

            <ButtonCircle
              onClick={() => {
                if (
                  window.confirm(
                    "Apakah anda yakin ingin menghapus pesanan ini ?"
                  )
                ) {
                  deleteOrder(items._id);
                  notifDelete();
                  setDelstatus(1);
                }
              }}
              icon={<FaTrash />}
            />
          </div>
        );
      },
    },
  ];

  React.useEffect(() => {
    fetchPesanan();
    setDelstatus(0);
  }, [fetchPesanan, delstatus]);

  return (
    <LayoutOne>
      <TopBar />
      <br />
      <Text as="h3"> Daftar Pesanan </Text>
      <br />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
