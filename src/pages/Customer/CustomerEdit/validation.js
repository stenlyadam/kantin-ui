const rules = {
  full_name: {
    required: { value: true, message: "Nama lengkapt tidak boleh kosong." },
  },
  address: {
    required: { value: true, message: "Alamat tidak boleh kosong." },
  },
};
export { rules };
