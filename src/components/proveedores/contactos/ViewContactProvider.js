import React, { useState, useEffect } from "react";
import { getOneProviderContact } from "../../../api/provedores";
import useAuth from "../../../hooks/useAuth";
export default function ViewContactProvider(props) {
  const { setView, View } = props;
  const { auth } = useAuth();
  const [contactProvider, setContactProvider] = useState(null);
  const [providerRelation, setProviderRelation] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await getOneProviderContact(auth, View);
      setContactProvider(response.data);

      if (response.data.attributes.provedore.data) {
        setProviderRelation(response.data.attributes.provedore.data);
      }
    })();
  }, [View]);

  return (
    <div className="modal_info_client col-12 px-5">
      {contactProvider ? (
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
                    <i>nombre : </i>
                  </b>
                </td>
                <td>{contactProvider.attributes.nombre}</td>
              </tr>
              <tr>
                <td>
                  <b>
                    <i>telefono : </i>
                  </b>
                </td>
                <td>{contactProvider.attributes.telefono}</td>
              </tr>
              <tr>
                <td>
                  <b>
                    <i>extension : </i>
                  </b>
                </td>
                <td>{contactProvider.attributes.extension}</td>
              </tr>
              <tr>
                <td>
                  <b>
                    <i>correo : </i>
                  </b>
                </td>
                <td>{contactProvider.attributes.correo}</td>
              </tr>
              <tr>
                <td>
                  <b>
                    <i>departamento : </i>
                  </b>
                </td>
                <td>{contactProvider.attributes.departamento}</td>
              </tr>
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
                        <i>nombre : </i>
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
          <button
            className="btn btn-primary col-12"
            onClick={() => setView(null)}
          >
            Regresar
          </button>
        </div>
      ) : (
        <div>
          <h2>No se puede visualizar esta información</h2>
          <button
            className="btn btn-primary col-12"
            onClick={() => setView(null)}
          >
            salir
          </button>
        </div>
      )}
    </div>
  );
}
