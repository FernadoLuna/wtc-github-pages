import React, { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import { getOnePlace } from "../../../api/ubicaciones";
export default function ViewPlace(props) {
  const { viewPlace, setViewPlace } = props;
  const { auth } = useAuth();
  const [place, setPlace] = useState(null);
  const [almacen, setAlmacen] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await getOnePlace(auth, viewPlace);
      if (response.data) {
        setPlace(response.data);
      }

      if (response.data.attributes.almacen.data) {
        setAlmacen(response.data.attributes.almacen.data);
      }
    })();
  }, []);

  return (
    <div className="modal_info_client col-12 ">
      {place && (
        <>
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
                    <i>Sku : </i>
                  </b>
                </td>
                <td>{place.attributes.nombre}</td>
              </tr>
              <tr>
                <td>
                  <b>
                    <i>Epc : </i>
                  </b>
                </td>
                <td>{place.attributes.epc}</td>
              </tr>
              {almacen ? (
                <>
                  <tr>
                    <td>
                      <h6>información de almacen</h6>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>
                        <i>Nombre : </i>
                      </b>
                    </td>
                    <td>{almacen.attributes.nombre}</td>
                  </tr>

                  <tr>
                    <td>
                      <b>
                        <i>Estado : </i>
                      </b>
                    </td>
                    <td>{almacen.attributes.estado}</td>
                  </tr>

                  <tr>
                    <td>
                      <b>
                        <i>Colonia : </i>
                      </b>
                    </td>
                    <td>{almacen.attributes.colonia}</td>
                  </tr>

                  <tr>
                    <td>
                      <b>
                        <i>Calle : </i>
                      </b>
                    </td>
                    <td>{almacen.attributes.calle}</td>
                  </tr>

                  <tr>
                    <td>
                      <b>
                        <i>Codigo Postal : </i>
                      </b>
                    </td>
                    <td>{almacen.attributes.codigo_postal}</td>
                  </tr>

                  <tr>
                    <td>
                      <b>
                        <i>Numero exterior : </i>
                      </b>
                    </td>
                    <td>{almacen.attributes.num_ext}</td>
                  </tr>
                </>
              ) : (
                <tr>
                  <td>
                    <h3>no información de almacen</h3>
                  </td>
                </tr>
              )}
              <tr>
                <td>
                  <button
                    onClick={() => setViewPlace(false)}
                    className="btn btn-primary btn_table"
                  >
                    Regresar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
