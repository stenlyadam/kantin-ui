import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LayoutOne, Text, Button, Table, InputText, ButtonCircle } from "upkit";
import FaFilter from "@meronex/icons/fa/FaFilter";
import FaEdit from "@meronex/icons/fa/FaEdit";
import FaTrash from "@meronex/icons/fa/FaTrash";
import { Link } from "react-router-dom";
import TopBar from "../../../components/TopBar";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCustomers,
  setPage,
  setKeyword,
} from "../../../features/Customers/actions";

import { deleteCustomer } from "../../../api/customer";

const CustomerManagement = () => {
  let dispatch = useDispatch();
  let customers = useSelector((state) => state.customers);

  let [delstatus, setDelstatus] = React.useState(0);

  React.useEffect(() => {
    dispatch(fetchCustomers());
    setDelstatus(0);
  }, [dispatch, delstatus, customers.currentPage, customers.keyword]);

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
    { Header: "Nama Lengkap", accessor: "full_name" },
    { Header: "Alamat", accessor: "address" },
    { Header: "Nomor Telp", accessor: "phone_no" },
    {
      Header: "Action",
      accessor: (items) => {
        return (
          <div>
            {items.full_name !== "Guest" && (
              <>
                <Link to={`/edit-customer/${items._id}`}>
                  <ButtonCircle icon={<FaEdit />} />
                </Link>

                <ButtonCircle
                  onClick={() => {
                    if (window.confirm("Delete this customer ?")) {
                      deleteCustomer(items._id);
                      notifDelete();
                      setDelstatus(1);
                    }
                  }}
                  icon={<FaTrash />}
                />
              </>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <LayoutOne size="large">
      <div>
        <TopBar />
        <Text as="h3"> Manajemen Data Pelanggan </Text>
        <br />
        <Link to="/add-customer" replace>
          <Button>Tambah baru</Button>
        </Link>
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
        <div className="w-full text-center mb-5 mt-5">
          <InputText
            fullRound
            value={customers.keyword}
            placeholder="cari pelanggan"
            fitContainer
            iconAfter={<ButtonCircle icon={<FaFilter />} />}
            onChange={(e) => {
              dispatch(setKeyword(e.target.value));
            }}
          />
        </div>
        <Table
          items={customers.data}
          columns={columns}
          totalItems={customers.totalItems + 10}
          page={customers.currentPage}
          perPage={customers.perpage}
          isLoading={customers.status === "process"}
          onPageChange={(page) => dispatch(setPage(page))}
          primaryKey={"_id"}
        />
      </div>
    </LayoutOne>
  );
};

export default CustomerManagement;
