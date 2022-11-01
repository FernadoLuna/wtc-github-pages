import React, { useState, useEffect } from "react";
import styles from "../../utils/styles.css";
import * as bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import useAuth from "../../hooks/useAuth";

import { getOneCliente } from "../../api/clientes";
export default function ClienteView(props) {
  const { setViewClient, viewClient } = props;
  const [cliente, setCliente] = useState(null);
  const { auth } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getOneCliente(auth, viewClient);
      setCliente(response.data);
    })();
  }, [viewClient]);

  return (
    <div className="modal_info_client" style={{ width: "100%" }}>
      {!cliente ? (
        <h1>cargando</h1>
      ) : (
        <div>
          <table className="table_content_client">
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
                    <i>nombre : </i>
                  </b>
                </td>
                <td>{cliente.attributes.nombre}</td>
              </tr>
              <tr>
                <td>
                  <b>
                    <i>razón social : </i>
                  </b>
                </td>
                <td>{cliente.attributes.razon_social}</td>
              </tr>
              <tr>
                <td>
                  <b>
                    <i>estado : </i>
                  </b>
                </td>
                <td>{cliente.attributes.estados}</td>
              </tr>
              <tr>
                <td>
                  <b>
                    <i>colonia : </i>
                  </b>
                </td>
                <td>{cliente.attributes.colonia}</td>
              </tr>
              <tr>
                <td>
                  <b>
                    <i>calle : </i>
                  </b>
                </td>
                <td>{cliente.attributes.calle}</td>
              </tr>
              <tr>
                <td>
                  <b>
                    <i>cp : </i>
                  </b>
                </td>
                <td>{cliente.attributes.codigo_postal}</td>
              </tr>
              <tr>
                <td>
                  <b>
                    <i>num ext : </i>
                  </b>
                </td>
                <td>{cliente.attributes.num_ext}</td>
              </tr>
              <tr>
                <td>
                  <b>
                    <i>num int : </i>
                  </b>
                </td>
                <td>{cliente.attributes.num_int}</td>
              </tr>
              <tr>
                <td>
                  <b>
                    <i>teléfono : </i>
                  </b>
                </td>
                <td>{cliente.attributes.telefono}</td>
              </tr>
              <tr>
                <td>
                  <b>
                    <i>correo : </i>
                  </b>
                </td>
                <td>{cliente.attributes.correo}</td>
              </tr>
              <tr>
                <td>
                  <b>
                    <i>nombre contacto : </i>
                  </b>
                </td>
                <td>{cliente.attributes.nombre_contacto}</td>
              </tr>
            </tbody>
          </table>
          <button
            className="btn btn-primary col-12"
            onClick={() => setViewClient(null)}
          >
            Regresar
          </button>
        </div>
      )}
    </div>
  );
}
