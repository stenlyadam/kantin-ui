import * as React from "react";
import { LayoutOne, Table, Text, Button } from "upkit";
import { getCustomerReport } from "../../api/report";
import TopBar from "../../components/TopBar";
import { formatRupiah } from "../../utils/format-rupiah";
import { Link } from "react-router-dom";
import FaFileInvoice from "@meronex/icons/fa/FaFileInvoiceDollar";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

export default function ChargeReport() {
  let [chargeReport, setChargeReport] = React.useState([]);
  let [status, setStatus] = React.useState("idle");

  const [dateRange, setDateRange] = React.useState([null, null]);
  const [startDate, endDate] = dateRange;

  const fetchReport = React.useCallback(async () => {
    const start = localStorage.getItem("startDate");
    const end = localStorage.getItem("endDate");
    setStatus("process");

    let { data } = await getCustomerReport({ start, end });

    setStatus("success");
    setChargeReport(data);
  }, []);

  React.useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  const columns = [
    {
      Header: "Pelanggan",
      accessor: (items) => {
        return <div>{items._id}</div>;
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
            <Link to={`/detail-charge-report/${items._id}`}>
              <Button color="gray" iconBefore={<FaFileInvoice />}>
                Lihat Semua Order
              </Button>
            </Link>
          </div>
        );
      },
    },
  ];

  const handleSubmit = async () => {
    const start = moment(startDate).format("YYYY-MM-DD");
    const end = moment(endDate).format("YYYY-MM-DD");
    localStorage.setItem("startDate", start);
    localStorage.setItem("endDate", end);

    setStatus("process");

    let { data } = await getCustomerReport({ start, end });

    setStatus("success");
    setChargeReport(data);
  };

  const handleChange = (updated) => {
    setDateRange(updated);
  };

  return (
    <LayoutOne>
      <TopBar />
      <br />
      <Text as="h3">
        {" "}
        Laporan Charge{" "}
        {`(${moment(localStorage.getItem("startDate")).format("ll")} -  ${moment(
          localStorage.getItem("endDate")
        ).format("ll")})`}
      </Text>
      <br />
      <div className="w-1/3">
        <DatePicker
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          onChange={handleChange}
          isClearable={true}
          className="shadow appearance-none border rounded w-full mb-3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />

        <Button onClick={handleSubmit}>Lihat Laporan</Button>
      </div>
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
