import React, { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import { getOneFormatOut } from "../../../api/formats_out";
export default function ViewFormatOut(props) {
  const { viewFormat, setViewFormat } = props;
  const [format, setFormat] = useState(null);
  const { auth } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getOneFormatOut(auth, viewFormat);
      if (response.data) {
        setFormat(response.data);
      }
    })();
  }, [viewFormat]);

  const dateConvert = (string) => {
    const date = new Date(string);

    return date.toISOString().slice(0, 10);
  };

  return (
    <div className="modal_info_client col-12 px-5 py-5">
      {format ? (
        <>
          <table className="table_content_client_large">
            <thead>
              <tr>
                <th>Criterio</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <b>
                    <i>ID : </i>
                  </b>
                </td>
                <td>{format.id}</td>
              </tr>
              <tr>
                <td>
                  <b>
                    <i>Fecha registro : </i>
                  </b>
                </td>
                <td>{format.attributes.fecha_registro}</td>
              </tr>
              <tr>
                <td>
                  <b>
                    <i>Hora registro : </i>
                  </b>
                </td>
                <td>{format.attributes.hora_registro}</td>
              </tr>
              <tr>
                <td>
                  <b>
                    <i>Fecha Inicio : </i>
                  </b>
                </td>
                <td>{dateConvert(format.attributes.fecha_inicio)}</td>
              </tr>
              <tr>
                <td>
                  <b>
                    <i>Bol : </i>
                  </b>
                </td>
                <td>{format.attributes.bol}</td>
              </tr>
              <tr>
                <td>
                  <b>
                    <i>Linea transportista : </i>
                  </b>
                </td>
                <td>{format.attributes.linea_transportista}</td>
              </tr>
              <tr>
                <td>
                  <b>
                    <i>Nombre de chofer : </i>
                  </b>
                </td>
                <td>{format.attributes.nombre_chofer}</td>
              </tr>
              <tr>
                <td>
                  <b>
                    <i>Placas : </i>
                  </b>
                </td>
                <td>{format.attributes.placas}</td>
              </tr>
              <tr>
                <td>
                  <b>
                    <i>Caja : </i>
                  </b>
                </td>
                <td>{format.attributes.numero_caja}</td>
              </tr>
              <tr>
                <td>
                  <b>
                    <i>Tractor : </i>
                  </b>
                </td>
                <td>{format.attributes.numero_tractor}</td>
              </tr>

              <tr>
                <td>
                  <b>
                    <i>Carta porte : </i>
                  </b>
                </td>
                <td>{format.attributes.carta_porte}</td>
              </tr>
              <tr>
                <td>
                  <b>
                    <i>Linea transportista : </i>
                  </b>
                </td>
                <td>{format.attributes.linea_transportista}</td>
              </tr>
              <tr>
                <td>
                  <b>
                    <i>Nombre chofer : </i>
                  </b>
                </td>
                <td>{format.attributes.nombre_chofer}</td>
              </tr>
              <tr>
                <td>
                  <b>
                    <i>Pallet : </i>
                  </b>
                </td>
                <td>{format.attributes.pallet}</td>
              </tr>
              <tr>
                <td>
                  <b>
                    <i>Cartón : </i>
                  </b>
                </td>
                <td>{format.attributes.carton}</td>
              </tr>
              <tr>
                <td>
                  <b>
                    <i>Fecha modulación : </i>
                  </b>
                </td>
                <td>{format.attributes.fecha_modulacion}</td>
              </tr>
              <tr>
                <td>
                  <b>
                    <i>Hora modulación : </i>
                  </b>
                </td>
                <td>{format.attributes.hora_modulacion}</td>
              </tr>
              <tr>
                <td>
                  <b>
                    <i>Modulo operación : </i>
                  </b>
                </td>
                <td>{format.attributes.modulo_operacion}</td>
              </tr>
              <tr>
                <td>
                  <b>
                    <i>Pedimento : </i>
                  </b>
                </td>
                <td>{format.attributes.pedimento_chronos}</td>
              </tr>

              <tr>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => setViewFormat(null)}
                  >
                    Regresar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </>
      ) : (
        <h3>No se puede acceder a esta información</h3>
      )}
    </div>
  );
}
