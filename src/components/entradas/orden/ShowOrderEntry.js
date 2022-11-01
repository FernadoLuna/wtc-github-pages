import React, { useState, useEffect } from "react";
import { getOneOrderEntry } from "../../../api/orders_entry";
import useAuth from "../../../hooks/useAuth";
import { API_URL } from "../../../utils/constants";
import { map } from "lodash";
export default function ShowOrderEntry(props) {
  const { viewItem, setViewItem } = props;
  const [infoItem, setInfoItem] = useState(null);
  const [products, setProducts] = useState([]);
  const { auth } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getOneOrderEntry(auth, viewItem);
      if (response.data) {
        setInfoItem(response.data);
        setProducts(response.data.attributes.products);
      }
    })();
  }, [viewItem]);

  return (
    <div className="modal_info_client col-12 px-5">
      {infoItem ? (
        <div className="row">
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
                    <i>Orden : </i>
                  </b>
                </td>
                <td>{infoItem.attributes.folio}</td>
              </tr>
              <tr>
                <td>
                  <b>
                    <i>Fecha programada : </i>
                  </b>
                </td>
                <td>{infoItem.attributes.fecha_programada}</td>
              </tr>
              <tr>
                <td>
                  <b>
                    <i>Activo : </i>
                  </b>
                </td>
                <td>{infoItem.attributes.activo_fijo ? 1 : 0}</td>
              </tr>
              <tr>
                <td>
                  <b>
                    <i>Total : </i>
                  </b>
                </td>
                <td>
                  {!infoItem.attributes.total ? 0 : infoItem.attributes.total}
                </td>
              </tr>
              <tr>
                <td>
                  <b>
                    <i>Total real : </i>
                  </b>
                </td>
                <td>
                  {!infoItem.attributes.total_real
                    ? 0
                    : infoItem.attributes.total_real}
                </td>
              </tr>
              <tr>
                {infoItem.attributes.archivo_orden.data && (
                  <>
                    <td>
                      <b>
                        <i>Archivo adjunto : </i>
                      </b>
                    </td>
                    <td>
                      <a
                        className="btn btn-primary p-1 my-2"
                        target="_blank"
                        href={`${API_URL}${infoItem.attributes.archivo_orden.data.attributes.url}`}
                      >
                        Mirar archivo adjunto
                      </a>
                    </td>
                  </>
                )}
              </tr>
            </tbody>
          </table>
          {products && (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>sku</th>
                  <th>cantidad</th>
                  <th>registrados</th>
                  <th>faltante</th>
                </tr>
              </thead>
              <tbody>
                {map(products, (item) => (
                  <tr key={products.indexOf(item)}>
                    <td>{item.sku}</td>
                    <td>{item.quantity}</td>
                    <td>{item.registrados}</td>
                    <td>{item.quantity - item.registrados}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div className="row">
            <button
              className="btn btn-primary col-3"
              onClick={() => setViewItem(null)}
            >
              Regresar
            </button>
          </div>
        </div>
      ) : (
        <h2>No se puede visualizar esta información</h2>
      )}
    </div>
  );
}
