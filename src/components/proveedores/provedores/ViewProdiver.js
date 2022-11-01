import React, { useState, useEffect } from "react";
import styles from "../../../utils/styles.css";
import { getOneProvider } from "../../../api/provedores";
import useAuth from "../../../hooks/useAuth";
export default function ViewProdiver(props) {
  const { setViewProvider, viewProvider } = props;
  const [provider, setProvider] = useState(null);
  const { auth } = useAuth();
  useEffect(() => {
    (async () => {
      const response = await getOneProvider(auth, viewProvider);
      setProvider(response.data);
    })();
  }, [viewProvider]);

  return (
    <div className="modal_info_client col-12">
      <div>
        {provider ? (
          <table className="table_content_client ">
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
                <td>{provider.attributes.nombre}</td>
              </tr>
              <tr>
                <td>
                  <b>
                    <i>razón social : </i>
                  </b>
                </td>
                <td>{provider.attributes.razon_social}</td>
              </tr>
              <tr>
                <td>
                  <b>
                    <i>estado : </i>
                  </b>
                </td>
                <td>{provider.attributes.estado}</td>
              </tr>
              <tr>
                <td>
                  <b>
                    <i>colonia : </i>
                  </b>
                </td>
                <td>{provider.attributes.colonia}</td>
              </tr>
              <tr>
                <td>
                  <b>
                    <i>calle : </i>
                  </b>
                </td>
                <td>{provider.attributes.calle}</td>
              </tr>
              <tr>
                <td>
                  <b>
                    <i>cp : </i>
                  </b>
                </td>
                <td>{provider.attributes.codigo_postal}</td>
              </tr>
              <tr>
                <td>
                  <b>
                    <i>num ext : </i>
                  </b>
                </td>
                <td>{provider.attributes.num_ext}</td>
              </tr>
              <tr>
                <td>
                  <b>
                    <i>num int : </i>
                  </b>
                </td>
                <td>{provider.attributes.num_int}</td>
              </tr>
              <tr>
                <td>
                  <b>
                    <i>teléfono : </i>
                  </b>
                </td>
                <td>{provider.attributes.telefono}</td>
              </tr>
              <tr>
                <td>
                  <b>
                    <i>correo : </i>
                  </b>
                </td>
                <td>{provider.attributes.correo}</td>
              </tr>
              <tr>
                <td>
                  <b>
                    <i>nombre contacto : </i>
                  </b>
                </td>
                <td>{provider.attributes.nombre_contacto}</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <h2>no hay datos</h2>
        )}
        <button
          className="btn btn-primary col-12"
          onClick={() => setViewProvider(null)}
        >
          Regresar
        </button>
      </div>
    </div>
  );
}
