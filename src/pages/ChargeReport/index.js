import * as React from "react";
import { LayoutOne, Table, Text, Button } from "upkit";
import { getCustomerReport } from "../../api/report";
import TopBar from "../../components/TopBar";
import { formatRupiah } from "../../utils/format-rupiah";
import { Link } from "react-router-dom";
import FaFileInvoice from "@meronex/icons/fa/FaFileInvoiceDollar";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'


export default function ChargeReport() {
  let [chargeReport, setChargeReport] = React.useState([]);
  let [status, setStatus] = React.useState("idle");
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  //   let [page, setPage] = React.useState(1);
  //   let [limit] = React.useState(10);

  const fetchReport = React.useCallback(async () => {
    // setStatus("process");

    // let { data } = await getCustomerReport({ type: "month" });
    
    // setStatus("success");
    // setChargeReport(data);
  }, []);

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

  React.useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  const handleSubmit = async() => {
    // console.log("start ", moment(startDate).format('L'))
    // console.log('end ', moment(endDate).format('L'))

    const start =  moment(startDate).format('YYYY-MM-DD')
    const end = moment(endDate).format('YYYY-MM-DD')

    console.log({start, end})
    setStatus("process");

    let { data } = await getCustomerReport({ type: "month", start, end });
    
    setStatus("success");
    setChargeReport(data);
  }

  return (
    <LayoutOne>
      <TopBar />
      <br />
      <Text as="h3"> Laporan Charge Dosen </Text>
      <br />
      <p>Tanggal Mulai: </p>
      <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
      <p>Tanggal Akhir: </p>
      <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
      
      <br/>
      <button onClick={handleSubmit}>Lihat Laporan</button>
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
