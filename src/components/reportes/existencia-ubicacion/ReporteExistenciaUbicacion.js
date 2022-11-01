import React, { useState, useEffect } from "react";
import { getProvedores } from "../../../api/provedores";
import { getReportExistPlaces } from "../../../api/reportes";
import OptionsGenerator from "../../comun/OptionsGenerator";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { map } from "lodash";
import { API_URL } from "../../../utils/constants";
import { CSVLink, CSVDownload } from "react-csv";
export default function ReporteExistenciaUbicacion() {
  const { auth } = useAuth();
  const [providers, setProviders] = useState(null);
  const [provider, setProvider] = useState(null);
  const [dataCsv, setDataCsv] = useState(null);
  const [viewData, setViewData] = useState(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useEffect(() => {
    (async () => {
      const response = await getProvedores(auth);
      if (response.data) setProviders(response.data);
    })();
  }, []);

  const headers = [
    { label: "provedor", key: "provedor" },
    { label: "ubicacion inicial", key: "ubicacion_inicial" },
    { label: "reubicacion", key: "reubicacion" },
    { label: "fecha de registro", key: "fecha_registro" },
    { label: "pedimento", key: "pedimento" },
  ];

  const onSubmit = async (data) => {
    var dataCollection = [];

    const response = await getReportExistPlaces(auth, provider);
    if (response.data) {
      map(response.data, (item) => {
        const newObject = {
          provedor: item.attributes.provedor.data.attributes.nombre,
          ubicacion_inicial: item.attributes.ubicacion_inicial,
          reubicacion: item.attributes.reubicacione.data
            ? item.attributes.reubicacione.data.attributes.nueva_ubicacion
            : "ninguna",
          fecha_registro: item.attributes.fecha_registro,
          pedimento: item.attributes.archivo_entrada.data
            ? `${API_URL}${item.attributes.archivo_entrada.data.attributes.url}`
            : "NINGUNA",
        };
        dataCollection.push(newObject);
      });
    }

    setDataCsv(dataCollection);
  };

  const dataCsvGenerate = async () => {
    var dataCollection = [];

    const response = await getReportExistPlaces(auth, provider);
    if (response.data) {
      map(response.data, (item) => {
        const newObject = {
          provedor: item.attributes.provedor.data.attributes.nombre,
          ubicacion_inicial: item.attributes.ubicacion_inicial,
          reubicacion: item.attributes.reubicacione.data
            ? item.attributes.reubicacione.data.attributes.nueva_ubicacion
            : "ninguna",
          fecha_registro: item.attributes.fecha_registro,
          pedimento: item.attributes.archivo_entrada.data
            ? `${API_URL}${item.attributes.archivo_entrada.data.attributes.url}`
            : "NINGUNA",
        };
        dataCollection.push(newObject);
      });
    }

    setViewData(dataCollection);
  };

  return (
    <div className="offset-2 col-10 ">
      <div className="row">
        <h2 className="my-3 mx-2 col-12">REPORTE DE EXISTENCIA/UBICACIÓN</h2>
        {dataCsv && <CSVDownload data={dataCsv} headers={headers} />};
      </div>
      <div className="row px-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            {providers && (
              <div className="col-8 mb-2">
                <label className="form-label">Provedor</label>
                <select
                  className="form-control"
                  onChange={(e) => setProvider(e.target.value)}
                >
                  <option value="null">Selecciona ...</option>
                  <OptionsGenerator data={providers} />
                </select>
              </div>
            )}
            <div className="col-4 mt-4">
              <input
                type="submit"
                className="btn btn-primary m-1 col-4 "
                value="Exportar"
              />
              <p
                onClick={() => dataCsvGenerate()}
                className="btn btn-primary col-4 m-1"
              >
                Generar
              </p>
            </div>
          </div>
        </form>
      </div>
      {viewData && (
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Provedor</th>
              <th scope="col">Ubicacion Inicial</th>
              <th scope="col">Reubicacion</th>
              <th scope="col">Fecha de registro</th>
              <th scope="col">Pedimento</th>
            </tr>
          </thead>
          <tbody>
            {map(viewData, (item) => (
              <tr key={item.provedor}>
                <th scope="row">{item.provedor}</th>
                <th scope="row">{item.ubicacion_inicial}</th>
                <th scope="row">{item.reubicacion}</th>
                <th scope="row">{item.fecha_registro}</th>
                <th scope="row">
                  <a
                    className="btn btn-primary"
                    href={item.pedimento}
                    target="_blank"
                  >
                    ver pedimento
                  </a>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
