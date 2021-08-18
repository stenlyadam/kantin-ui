import FaArrowRight from "@meronex/icons/fa/FaArrowRight";
import FaFileInvoice from "@meronex/icons/fa/FaFileInvoice";
// import FaHome from "@meronex/icons/fa/FaHome";
import FaDatabase from "@meronex/icons/fa/FaDatabase";
import * as React from "react";
import { Link } from "react-router-dom";
import { Card, LayoutOne, Responsive, Text } from "upkit";
import TopBar from "../../components/TopBar";
import FaUser from "@meronex/icons/fa/FaUser";
import FaChartBar from "@meronex/icons/fa/FaChartBar";
import FaCashRegister from "@meronex/icons/fa/FaCashRegister";
import FaListOl from "@meronex/icons/fa/FaListOl";

const IconWrapper = ({ children }) => {
  return (
    <div className="text-white text-5xl flex justify-center mb-5">
      {children}
    </div>
  );
};

const menus = [
  {
    label: "Buat Pesanan",
    icon: (
      <IconWrapper>
        <FaCashRegister />
      </IconWrapper>
    ),
    url: "/",
  },
  {
    label: "Daftar Pesanan",
    icon: (
      <IconWrapper>
        <FaListOl />
      </IconWrapper>
    ),
    url: "/history",
  },
  {
    label: "Manajemen Produk",
    icon: (
      <IconWrapper>
        <FaDatabase />
      </IconWrapper>
    ),
    url: "/manajemen-produk",
  },
  {
    label: "Pelanggan",
    icon: (
      <IconWrapper>
        <FaUser />
      </IconWrapper>
    ),
    url: "/manajemen-pelanggan",
  },
  {
    label: "Laporan",
    icon: (
      <IconWrapper>
        <FaChartBar />
      </IconWrapper>
    ),
    url: "/report",
  },
  {
    label: "Laporan Charge",
    icon: (
      <IconWrapper>
        <FaFileInvoice />
      </IconWrapper>
    ),
    url: "/charge-report",
  },
  {
    label: "Logout",
    icon: (
      <IconWrapper>
        <FaArrowRight />
      </IconWrapper>
    ),
    url: "/logout",
  },
];

export default function UserAccount() {
  return (
    <LayoutOne>
      <TopBar />
      <Text as="h3">Akun Anda </Text>
      <br />

      <Responsive desktop={4} tablet={4} mobile={2}>
        {menus.map((menu, index) => {
          return (
            <div key={index} className="px-2 pb-2">
              <Link to={menu.url}>
                <Card
                  header={menu.icon}
                  body={
                    <div className="text-center font-bold text-white">
                      {menu.label}
                    </div>
                  }
                />
              </Link>
            </div>
          );
        })}
      </Responsive>
    </LayoutOne>
  );
}
