import * as React from "react";
import { LayoutOne, Table, Text } from "upkit";
import { getDetailCustomerReport } from "../../api/report";
import TopBar from "../../components/TopBar";
import { formatRupiah } from "../../utils/format-rupiah";
import moment from "moment";
import { useRouteMatch } from "react-router-dom";

export default function DetailChargeReport() {
  let { params } = useRouteMatch();
  let [detailCustomerReport, setDetailCustomerReport] = React.useState([]);
  let [customerName, setCustomerName] = React.useState("");
  let [status, setStatus] = React.useState("idle");

  const fetchReport = React.useCallback(async () => {
    
    setStatus("process");

    const start = localStorage.getItem('startDate')
    const end = localStorage.getItem('endDate')

    let { data } = await getDetailCustomerReport(params?.customer_id, {start, end});

    setStatus("success");
    setDetailCustomerReport(data);
    setCustomerName(data[0].customer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    {
      Header: "Order ID",
      accessor: (order) => {
        return <div>#{order.orders[0].order_number}</div>;
      },
    },
    {
      Header: "Tanggal Transaksi",
      accessor: (item) => {
        return <div>{moment(item.createdAt).format("DD-MM-YYYY")}</div>;
      },
    },
    // {
    //   Header: "Items",
    //   accessor: (order) => {
    //     return (
    //       <div>
    //         {order.order.order_items.map((item) => {
    //           return (
    //             <div key={item._id}>
    //               {item.name} ({item.qty})
    //             </div>
    //           );
    //         })}
    //       </div>
    //     );
    //   },
    // },
    {
      Header: "Total",
      accessor: (order) => {
        return <div>{formatRupiah(order.total)}</div>;
      },
    },
  ];

  React.useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  return (
    <LayoutOne>
      <TopBar />
      <br />
      <Text as="h3"> Detail Laporan Charge</Text>
      <br />
      <Text as="h4">Nama Dosen : {customerName}</Text>
      <br />
      <Table
        items={detailCustomerReport}
        // totalItems={count}
        columns={columns}
        // onPageChange={(page) => setPage(page)}
        // page={page}
        isLoading={status === "process"}
        showPagination={false}
      />
    </LayoutOne>
  );
}
