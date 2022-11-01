import React from "react";

export default function ViewStore(props) {
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
                <i>Token : </i>
              </b>
            </td>
            <td>{viewItem.attributes.token}</td>
          </tr>
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
