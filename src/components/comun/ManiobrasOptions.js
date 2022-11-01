import React from "react";

export default function ManiobrasOptions() {
  const options = (
    <>
      <option value="descarga">DESCARGA</option>
      <option value="carga">CARGA</option>
      <option value="almacenaje">ALMACENAJE</option>
      <option value="validación">VALIDACIÓN</option>
      <option value="ninguno">ninguno</option>
    </>
  );
  return options;
}
