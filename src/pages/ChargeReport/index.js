import * as React from "react";
import { LayoutOne, Table, Text, Button } from "upkit";
import { getCustomerReport } from "../../api/report";
import TopBar from "../../components/TopBar";
import { formatRupiah } from "../../utils/format-rupiah";
import { Link } from "react-router-dom";
import FaFileInvoice from "@meronex/icons/fa/FaFileInvoiceDollar";

export default function ChargeReport() {
  let [chargeReport, setChargeReport] = React.useState([]);
  let [status, setStatus] = React.useState("idle");
  //   let [page, setPage] = React.useState(1);
  //   let [limit] = React.useState(10);

  const fetchReport = React.useCallback(async () => {
    setStatus("process");

    let { data } = await getCustomerReport({ type: "month" });

    setStatus("success");
    setChargeReport(data);
  }, []);

  const columns = [
    {
      Header: "Pelanggan",
      accessor: (items) => {
        return <div>{items.customer[0].full_name}</div>;
      },
    },
    {
      Header: "Total",
      accessor: (order) => {
        return <div>{formatRupiah(order.total)}</div>;
      },
    },
    {
      Header: "Detail",
      accessor: (items) => {
        return (
          <div>
            <Link to={`/detail-charge-report/${items.customer[0]._id}`}>
              <Button color="gray" iconBefore={<FaFileInvoice />}>
                Lihat Semua Order
              </Button>
            </Link>
          </div>
        );
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
      <Text as="h3"> Laporan Charge Dosen </Text>
      <br />
      <Table
        items={chargeReport}
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
