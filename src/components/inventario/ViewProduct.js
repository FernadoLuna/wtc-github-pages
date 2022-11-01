import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { getOneProduct } from "../../api/productos";
export default function ViewProduct(props) {
  const { viewItem, setViewItem } = props;
  const [product, setProduct] = useState(null);
  const { auth } = useAuth();
  const [providerRelation, setProviderRelation] = useState(null);
  useEffect(() => {
    (async () => {
      const response = await getOneProduct(auth, viewItem);
      if (response.data) {
        setProduct(response.data);
      }

      if (response.data.attributes.provedor.data) {
        setProviderRelation(response.data.attributes.provedor.data);
      }
    })();
  }, [viewItem]);

  return (
    <div className="modal_info_client_large col-12 px-5">
      {product ? (
        <div>
          <strong>Datos de contacto</strong>
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
                <td>{product.attributes.sku}</td>
              </tr>
              <tr>
                <td>
                  <b>
                    <i>Descripcion : </i>
                  </b>
                </td>
                <td>{product.attributes.descripcion}</td>
              </tr>
              <tr>
                <td>
                  <b>
                    <i>Politica Almacen : </i>
                  </b>
                </td>
                <td>{product.attributes.politica_almacen}</td>
              </tr>
              <tr>
                <td>
                  <b>
                    <i>Cantidad : </i>
                  </b>
                </td>
                <td>{product.attributes.cantidad}</td>
              </tr>
              <tr>
                <td>
                  <b>
                    <i>Costo : </i>
                  </b>
                </td>
                <td>{product.attributes.costo}</td>
              </tr>
              <tr>
                <td>
                  <b>
                    <i>Activo Fijo : </i>
                  </b>
                </td>
                <td>{product.attributes.activo_fijo === true ? "si" : "no"}</td>
              </tr>
              {product.attributes.activo_fijo && (
                <>
                  <tr>
                    <td>
                      <b>
                        <i>Marca: </i>
                      </b>
                    </td>
                    <td>{product.attributes.marca}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>
                        <i>Modelo : </i>
                      </b>
                    </td>
                    <td>{product.attributes.modelo}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>
                        <i>Serie : </i>
                      </b>
                    </td>
                    <td>{product.attributes.serie}</td>
                  </tr>
                </>
              )}
              <tr>
                <td className="pt-5">
                  <strong>Datos de cliente asociado</strong>
                </td>
              </tr>
            </tbody>
          </table>
          {/*DATOS DE CLIENTE ASOCIADO*/}
          {providerRelation ? (
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
                        <i>Nombre de provedor : </i>
                      </b>
                    </td>
                    <td>{providerRelation.attributes.nombre}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>
                        <i>razón social : </i>
                      </b>
                    </td>
                    <td>{providerRelation.attributes.razon_social}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>
                        <i>estado : </i>
                      </b>
                    </td>
                    <td>{providerRelation.attributes.estado}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>
                        <i>colonia : </i>
                      </b>
                    </td>
                    <td>{providerRelation.attributes.colonia}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>
                        <i>calle : </i>
                      </b>
                    </td>
                    <td>{providerRelation.attributes.calle}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>
                        <i>cp : </i>
                      </b>
                    </td>
                    <td>{providerRelation.attributes.codigo_postal}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>
                        <i>num ext : </i>
                      </b>
                    </td>
                    <td>{providerRelation.attributes.num_ext}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>
                        <i>num int : </i>
                      </b>
                    </td>
                    <td>{providerRelation.attributes.num_int}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>
                        <i>teléfono : </i>
                      </b>
                    </td>
                    <td>{providerRelation.attributes.telefono}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>
                        <i>correo : </i>
                      </b>
                    </td>
                    <td>{providerRelation.attributes.correo}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>
                        <i>nombre contacto : </i>
                      </b>
                    </td>
                    <td>{providerRelation.attributes.nombre_contacto}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <h2>no hay provedor asociado</h2>
          )}
          {product.attributes.categoria.data ? (
            <div className="mt-5">
              <strong>Datos de categoria</strong>
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
                        <i>Nombre: </i>
                      </b>
                    </td>
                    <td>
                      {product.attributes.categoria.data.attributes.nombre}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>
                        <i>Descripcion: </i>
                      </b>
                    </td>
                    <td>
                      {product.attributes.categoria.data.attributes.descripcion}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <h4>no hay categoria asociada</h4>
          )}

          <button
            className="btn btn-primary col-12"
            onClick={() => setViewItem(null)}
          >
            Regresar
          </button>
        </div>
      ) : (
        <div>
          <h2>No se puede visualizar esta información</h2>
          <button
            className="btn btn-primary col-12"
            onClick={() => setViewItem(null)}
          >
            Regresar
          </button>
        </div>
      )}
    </div>
  );
}
