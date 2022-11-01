import React from "react";
import { API_URL } from "../../utils/constants";
export default function ViewLigthTruck(props) {
  const { setViewItem, viewItem } = props;

  return (
    <div className="modal_info_client col-12 px-5">
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
                <i>Nombre : </i>
              </b>
            </td>
            <td>{viewItem.attributes.nombre}</td>
          </tr>
          <tr>
            <td>
              <b>
                <i>Epc : </i>
              </b>
            </td>
            <td>{viewItem.attributes.epc}</td>
          </tr>
          {viewItem.attributes.imagen.data && (
            <tr>
              <td>
                <b>
                  <i>Imagen : </i>
                </b>
              </td>
              <td>
                <img
                  src={`${API_URL}${viewItem.attributes.imagen.data.attributes.url}`}
                  height="150px"
                />
              </td>
            </tr>
          )}

          <tr>
            <td>
              <button
                className="btn btn-primary"
                onClick={() => setViewItem(null)}
              >
                Regresar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
