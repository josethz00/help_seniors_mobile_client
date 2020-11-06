function maskCep (value) {

  value = value.replace(/\D/g, "");
  value = value.replace(/^(\d{5})(\d)/, "$1-$2");
  return value;

}

function maskPhone(value) {

  value = value.replace(/\D/g, "");
  value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
  value = value.replace(/(\d)(\d{4})$/, "$1-$2");

  return value;
}

function maskNumber (value) {

  value = value.replace(/\D/g, "");
  return value;

}

export { maskCep, maskPhone, maskNumber };