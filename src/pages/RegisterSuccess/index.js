import React from "react";

import { Link } from "react-router-dom";

import { LayoutOne, Card, Text, Button } from "upkit";

const RegisterSuccess = () => {
  return (
    <LayoutOne size="small">
      <Card color="white">
        <Text as="h3">Pendaftaran Berhasil</Text>
        <Text>Silahkan masuk ke aplikasi</Text>

        <br />

        <Link to="/login">
          <Button fitContainer>Masuk</Button>
        </Link>
      </Card>
    </LayoutOne>
  );
};

export default RegisterSuccess;
