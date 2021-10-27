import * as React from "react";
import { LayoutOne, Text, Table, Button } from "upkit";
import {
  // getMonthlyIncome,
  // getWeeklyIncome,
  // getDailyIncome,
  getIncome,
} from "../../api/report";
import TopBar from "../../components/TopBar";
import { formatRupiah } from "../../utils/format-rupiah";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

export default function Report() {
  // const [monthlyIncomeCharge, setMonthlyIncomeCharge] = React.useState({});
  // const [monthlyIncomeCash, setMonthlyIncomeCash] = React.useState({});
  // const [weeklyIncomeCharge, setWeeklyIncomeCharge] = React.useState({});
  // const [weeklyIncomeCash, setWeeklyIncomeCash] = React.useState({});
  // const [dailyIncomeCharge, setDailyIncomeCharge] = React.useState({});
  // const [dailyIncomeCash, setDailyIncomeCash] = React.useState({});

  let [incomeReport, setIncomeReport] = React.useState([]);
  let [status, setStatus] = React.useState("idle");
  const [dateRange, setDateRange] = React.useState([null, null]);
  const [startDate, endDate] = dateRange;

  const fetchReport = React.useCallback(async () => {
    // let { data: monthlyIncomeCharge } = await getMonthlyIncome({
    //   method: "charge",
    // });
    // let { data: monthlyIncomeCash } = await getMonthlyIncome({
    //   method: "cash",
    // });
    // let { data: weeklyIncomeCharge } = await getWeeklyIncome({
    //   method: "charge",
    // });
    // let { data: weeklyIncomeCash } = await getWeeklyIncome({
    //   method: "cash",
    // });
    // let { data: dailyIncomeCharge } = await getDailyIncome({
    //   method: "charge",
    // });
    // let { data: dailyIncomeCash } = await getDailyIncome({
    //   method: "cash",
    // });
    // setMonthlyIncomeCash(monthlyIncomeCash[0]);
    // setMonthlyIncomeCharge(monthlyIncomeCharge[0]);
    // setWeeklyIncomeCash(weeklyIncomeCash[0]);
    // setWeeklyIncomeCharge(weeklyIncomeCharge[0]);
    // setDailyIncomeCash(dailyIncomeCash[0]);
    // setDailyIncomeCharge(dailyIncomeCharge[0]);
  }, []);

  const headers = [
    {
      Header: "Metode Pembayaran",
      accessor: (items) => {
        return <div>{items._id}</div>;
      },
    },
    {
      Header: "Total",
      accessor: (items) => {
        return <div>{formatRupiah(items.total)}</div>;
      },
    },
  ];

  // const itemIncomeReport = [
  //   {
  //     cash: formatRupiah(incomeReport?.total),
  //     charge: formatRupiah(monthlyIncomeCharge?.total),
  //   },
  // ];

  // const itemsMonthly = [
  //   {
  //     cash: formatRupiah(monthlyIncomeCash?.total),
  //     charge: formatRupiah(monthlyIncomeCharge?.total),
  //   },
  // ];

  // const itemsWeekly = [
  //   {
  //     cash: formatRupiah(weeklyIncomeCash?.total),
  //     charge: formatRupiah(weeklyIncomeCharge?.total),
  //   },
  // ];

  // const itemsDaily = [
  //   {
  //     cash: formatRupiah(dailyIncomeCash?.total),
  //     charge: formatRupiah(dailyIncomeCharge?.total),
  //   },
  // ];

  const handleSubmit = async () => {
    const start = moment(startDate).format("YYYY-MM-DD");
    const end = moment(endDate).format("YYYY-MM-DD");
    localStorage.setItem("startDate", start);
    localStorage.setItem("endDate", end);

    setStatus("process");

    let { data } = await getIncome({ start, end });

    setStatus("success");
    setIncomeReport(data);
  };

  const handleChange = (updated) => {
    setDateRange(updated);
  };

  React.useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  return (
    <LayoutOne>
      <TopBar />
      <br />
      <Text as="h3">
        {" "}
        Laporan Pendapatan{" "}
        {`(${moment(localStorage.getItem("startDate")).format(
          "ll"
        )} -  ${moment(localStorage.getItem("endDate")).format("ll")})`}
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
        columns={headers}
        items={incomeReport}
        showPagination={false}
        isLoading={status === "process"}
      />
      <br />
      {/* <Text as="h4"> Hari ini</Text>
      <br />
      <Table columns={headers} items={itemsDaily} showPagination={false} />
      <br />
      <Text as="h4"> Minggu ini</Text>
      <br />
      <Table columns={headers} items={itemsWeekly} showPagination={false} />
      <br />
      <Text as="h4"> Bulan ini</Text>
      <br />
      <Table columns={headers} items={itemsMonthly} showPagination={false} /> */}
    </LayoutOne>
  );
}
