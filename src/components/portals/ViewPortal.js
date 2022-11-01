import React from "react";

export default function ViewPortal(props) {
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
          {viewItem.attributes.almacen.data && (
            <>
              <tr>
                <td>
                  <b>
                    <i>Nombre almacen: </i>
                  </b>
                </td>
                <td>{viewItem.attributes.almacen.data.attributes.nombre}</td>
              </tr>
              <tr>
                <td>
                  <b>
                    <i>Estado: </i>
                  </b>
                </td>
                <td>{viewItem.attributes.almacen.data.attributes.estado}</td>
              </tr>
              <tr>
                <td>
                  <b>
                    <i>Colonia: </i>
                  </b>
                </td>
                <td>{viewItem.attributes.almacen.data.attributes.colonia}</td>
              </tr>
              <tr>
                <td>
                  <b>
                    <i>Calle: </i>
                  </b>
                </td>
                <td>{viewItem.attributes.almacen.data.attributes.calle}</td>
              </tr>
              <tr>
                <td>
                  <b>
                    <i>CP: </i>
                  </b>
                </td>
                <td>
                  {viewItem.attributes.almacen.data.attributes.codigo_postal}
                </td>
              </tr>
              <tr>
                <td>
                  <b>
                    <i>Num_ext: </i>
                  </b>
                </td>
                <td>{viewItem.attributes.almacen.data.attributes.num_ext}</td>
              </tr>
            </>
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
