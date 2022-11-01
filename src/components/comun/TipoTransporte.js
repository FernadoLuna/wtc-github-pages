import React from "react";

export default function TipoTransporte() {
  const options = (
    <>
      <option value="camioneta_3_1/2"> Camioneta 3 1/2</option>
      <option value="rabon"> Rabon</option>
      <option value="torthon"> Torthon</option>
      <option value="contenedor_20´"> Contenedor 20´</option>
      <option value="contenedor_40´"> Contenedor 40´</option>
      <option value="caja_seca_ 40´"> Caja seca 40´</option>
      <option value="caja_seca_ 48´"> Caja seca 48´</option>
      <option value="caja_seca_ 53´"> Caja seca 53´</option>
      <option value="otros"> Otros</option>
    </>
  );
  return options;
}
