import * as React from "react";
import { LayoutOne, Text, Table } from "upkit";
import {
  getMonthlyIncome,
  getWeeklyIncome,
  getDailyIncome,
} from "../../api/report";
import TopBar from "../../components/TopBar";
import { formatRupiah } from "../../utils/format-rupiah";

export default function Report() {
  const [monthlyIncomeCharge, setMonthlyIncomeCharge] = React.useState({});
  const [monthlyIncomeCash, setMonthlyIncomeCash] = React.useState({});
  const [weeklyIncomeCharge, setWeeklyIncomeCharge] = React.useState({});
  const [weeklyIncomeCash, setWeeklyIncomeCash] = React.useState({});
  const [dailyIncomeCharge, setDailyIncomeCharge] = React.useState({});
  const [dailyIncomeCash, setDailyIncomeCash] = React.useState({});

  const fetchReport = React.useCallback(async () => {
    let { data: monthlyIncomeCharge } = await getMonthlyIncome({
      method: "charge",
    });
    let { data: monthlyIncomeCash } = await getMonthlyIncome({
      method: "cash",
    });

    let { data: weeklyIncomeCharge } = await getWeeklyIncome({
      method: "charge",
    });
    let { data: weeklyIncomeCash } = await getWeeklyIncome({
      method: "cash",
    });

    let { data: dailyIncomeCharge } = await getDailyIncome({
      method: "charge",
    });
    let { data: dailyIncomeCash } = await getDailyIncome({
      method: "cash",
    });

    setMonthlyIncomeCash(monthlyIncomeCash[0]);
    setMonthlyIncomeCharge(monthlyIncomeCharge[0]);
    setWeeklyIncomeCash(weeklyIncomeCash[0]);
    setWeeklyIncomeCharge(weeklyIncomeCharge[0]);
    setDailyIncomeCash(dailyIncomeCash[0]);
    setDailyIncomeCharge(dailyIncomeCharge[0]);
  }, []);

  const headers = [
    {
      Header: "Pembayaran Cash",
      accessor: "cash",
    },
    {
      Header: "Pembayaran Charge",
      accessor: "charge",
    },
  ];

  const itemsMonthly = [
    {
      cash: formatRupiah(monthlyIncomeCash?.total),
      charge: formatRupiah(monthlyIncomeCharge?.total),
    },
  ];

  const itemsWeekly = [
    {
      cash: formatRupiah(weeklyIncomeCash?.total),
      charge: formatRupiah(weeklyIncomeCharge?.total),
    },
  ];

  const itemsDaily = [
    {
      cash: formatRupiah(dailyIncomeCash?.total),
      charge: formatRupiah(dailyIncomeCharge?.total),
    },
  ];

  React.useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  return (
    <LayoutOne>
      <TopBar />
      <br />
      <Text as="h3"> Laporan Pendapatan</Text>
      <br />
      <Text as="h4"> Hari ini</Text>
      <br />
      <Table columns={headers} items={itemsDaily} showPagination={false} />
      <br />
      <Text as="h4"> Minggu ini</Text>
      <br />
      <Table columns={headers} items={itemsWeekly} showPagination={false} />
      <br />
      <Text as="h4"> Bulan ini</Text>
      <br />
      <Table columns={headers} items={itemsMonthly} showPagination={false} />
    </LayoutOne>
  );
}
