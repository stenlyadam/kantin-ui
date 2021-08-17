import * as React from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { LayoutOne, Text, Table, FormControl, Select, Button } from "upkit";
import BounceLoader from "react-spinners/BounceLoader";

import TopBar from "../../components/TopBar";
import StatusLabel from "../../components/StatusLabel";
import { formatRupiah } from "../../utils/format-rupiah";
import { getInvoiceByOrderId, updateInvoice } from "../../api/invoice";
import moment from "moment";

export default function Invoice() {
  let { params } = useRouteMatch();
  let history = useHistory();
  let [invoice, setInvoice] = React.useState(null);
  let [error, setError] = React.useState("");
  let [status, setStatus] = React.useState("process");
  let [paymentMethod, setPaymentMethod] = React.useState({
    label: "Cash",
    value: "cash",
  });

  React.useState(() => {
    getInvoiceByOrderId(params?.order_id)
      .then(({ data }) => {
        if (data?.error) {
          setError(data.message || "Terjadi kesalahan yang tidak diketahui");
        }

        setInvoice(data);
      })
      .finally(() => setStatus("idle"));
  }, []);

  if (error.length) {
    return (
      <LayoutOne>
        <TopBar />
        <Text as="h3">Terjadi Kesalahan</Text>
        {error}
      </LayoutOne>
    );
  }

  if (status === "process") {
    return (
      <LayoutOne>
        <div className="text-center py-10">
          <div className="inline-block">
            <BounceLoader color="red" />
          </div>
        </div>
      </LayoutOne>
    );
  }
  const handleSubmit = async (order_id) => {
    let payload = new FormData();

    payload.append("payment_status", "paid");
    payload.append("payment_method", paymentMethod.value);

    let { data } = await updateInvoice(payload, order_id);

    if (data.error) return;

    history.push("/history");
  };

  return (
    <LayoutOne>
      <TopBar />
      <br />
      <Text as="h3"> Invoice </Text>
      <br />

      <Table
        showPagination={false}
        items={[
          {
            label: "Status",
            value: <StatusLabel status={invoice?.payment_status} />,
          },
          { label: "Order ID", value: "#" + invoice?.order?.order_number },
          {
            label: "Tanggal",
            value: moment(invoice?.createdAt).format("DD/MM/YYYY"),
          },
          { label: "Total bayar", value: formatRupiah(invoice?.total) },
          {
            label: "Pelanggan",
            value: (
              <div>
                <b>{invoice?.customer?.full_name} </b> <br />
              </div>
            ),
          },
          {
            label: "Pembayaran",
            value: (
              <div>
                {invoice?.payment_status !== "paid" && (
                  <div className="pb-10">
                    {invoice?.customer?.full_name !== "Guest" && (
                      <FormControl label="Metode Bayar" color="black">
                        <Select
                          options={[
                            { label: "Cash", value: "cash" },
                            { label: "Charge", value: "charge" },
                          ]}
                          onChange={(selected) => setPaymentMethod(selected)}
                          value={paymentMethod}
                        />
                      </FormControl>
                    )}

                    <Button
                      className="p-4"
                      onClick={() => handleSubmit(invoice.order?._id)}
                      color="red"
                    >
                      {" "}
                      Bayar{" "}
                    </Button>
                  </div>
                )}
                {invoice?.payment_status === "paid" && (
                  <div>
                    <b>{invoice?.payment_method} </b> <br />
                  </div>
                )}
              </div>
            ),
          },
        ]}
        columns={[
          { Header: "Invoice", accessor: "label" },
          { Header: "", accessor: "value" },
        ]}
      />
    </LayoutOne>
  );
}
