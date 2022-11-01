import React, { useState, useEffect } from "react";
import { getOneContact } from "../../../api/contactos";
import useAuth from "../../../hooks/useAuth";
import "bootstrap/dist/css/bootstrap.min.css";
import * as bootstrap from "bootstrap";
export default function ViewContact(props) {
  const { setViewContact, viewContact } = props;
  const [contact, setContact] = useState(null);
  const [clientRelation, setClientRelation] = useState(null);
  const { auth } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getOneContact(auth, viewContact);
      setContact(response.data);
      if (response.data.attributes.cliente.data != null) {
        setClientRelation(response.data.attributes.cliente.data);
      }
    })();
  }, [viewContact]);

  return (
    <div className="modal_info_client col-12">
      {contact ? (
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
                <td>{contact.attributes.nombre}</td>
              </tr>
              <tr>
                <td>
                  <b>
                    <i>telefono : </i>
                  </b>
                </td>
                <td>{contact.attributes.telefono}</td>
              </tr>
              <tr>
                <td>
                  <b>
                    <i>extension : </i>
                  </b>
                </td>
                <td>{contact.attributes.extension}</td>
              </tr>
              <tr>
                <td>
                  <b>
                    <i>correo : </i>
                  </b>
                </td>
                <td>{contact.attributes.correo}</td>
              </tr>
              <tr>
                <td>
                  <b>
                    <i>departamento : </i>
                  </b>
                </td>
                <td>{contact.attributes.departamento}</td>
              </tr>
              <tr>
                <td className="pt-5">
                  <strong>Datos de cliente asociado</strong>
                </td>
              </tr>
            </tbody>
          </table>
          {/*DATOS DE CLIENTE ASOCIADO*/}
          {clientRelation ? (
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
                    <td>{clientRelation.attributes.nombre}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>
                        <i>razón social : </i>
                      </b>
                    </td>
                    <td>{clientRelation.attributes.razon_social}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>
                        <i>estado : </i>
                      </b>
                    </td>
                    <td>{clientRelation.attributes.estados}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>
                        <i>colonia : </i>
                      </b>
                    </td>
                    <td>{clientRelation.attributes.colonia}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>
                        <i>calle : </i>
                      </b>
                    </td>
                    <td>{clientRelation.attributes.calle}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>
                        <i>cp : </i>
                      </b>
                    </td>
                    <td>{clientRelation.attributes.codigo_postal}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>
                        <i>num ext : </i>
                      </b>
                    </td>
                    <td>{clientRelation.attributes.num_ext}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>
                        <i>num int : </i>
                      </b>
                    </td>
                    <td>{clientRelation.attributes.num_int}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>
                        <i>teléfono : </i>
                      </b>
                    </td>
                    <td>{clientRelation.attributes.telefono}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>
                        <i>correo : </i>
                      </b>
                    </td>
                    <td>{clientRelation.attributes.correo}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>
                        <i>nombre contacto : </i>
                      </b>
                    </td>
                    <td>{clientRelation.attributes.nombre_contacto}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <h2>no hay cliente asociado</h2>
          )}
          <button
            className="btn btn-primary col-12"
            onClick={() => setViewContact(null)}
          >
            Regresar
          </button>
        </div>
      ) : (
        <h2>No se puede visualizar esta información</h2>
      )}
    </div>
  );
}
