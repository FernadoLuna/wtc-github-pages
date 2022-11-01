import React from "react";

export default function ServicesAddedOptions() {
  const options = (
    <>
      <option value="paletizado">PALETIZADO</option>
      <option value="reacomodo">REACOMODO</option>
      <option value="previo">PREVIO</option>
      <option value="previo_exausitivo">PREVIO EXAUSITIVO</option>
      <option value="servicio_extraordinario">SERVICIO EXTRAORDINARIO</option>
      <option value="etiquetado">ETIQUETADO</option>
      <option value="emplayado">EMPLAYADO</option>
      <option value="traspaleo">TRANSPALEO</option>
      <option value="ninguno">Ninguno</option>
    </>
  );
  return options;
}
