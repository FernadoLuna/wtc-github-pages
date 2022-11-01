import React, { useState, useEffect } from "react";
import { getFormats } from "../../../api/formats_entry";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { map } from "lodash";
import { CSVDownload } from "react-csv";
export default function ReporteES() {
  const { auth } = useAuth();
  const [registers, setregisters] = useState(null);
  const [exportData, setExportData] = useState(null);
  const [dataPrev, setDataPrev] = useState(null);
  const [desde, setDesde] = useState(null);
  const [hasta, setHasta] = useState(null);
  const [entrys, setEntrys] = useState(null);
  const { handleSubmit } = useForm();

  useEffect(() => {
    (async () => {
      const response = await getFormats(auth);
      if (response.data) {
        setregisters(response.data);
      }
    })();
  }, []);

  const Ms = (date) => {
    return new Date(date).getTime();
  };

  const onSubmit = async () => {
    const start = Ms(desde);
    const end = Ms(hasta);

    const filtrado = registers.filter((item) => {
      const date = Ms(item.attributes.fecha_inicio);
      if (date >= start && date <= end) {
        return item;
      }
    });

    filtrado.length >= 1 && setEntrys(filtrado);
  };

  const headers = [
    { label: "id", key: "id" },
    { label: "provedor", key: "provedor" },
    { label: "ubicacion inicial", key: "ubicacion_inicial" },
    { label: "reubicacion", key: "reubicacion" },
    { label: "fecha inicio", key: "fecha_inicio" },
    { label: "fecha modulacion", key: "fecha_modulacion" },
    { label: "pedimento", key: "pedimento" },
  ];

  const generateCsv = async () => {
    let dataCollection = [];
    const start = Ms(desde);
    const end = Ms(hasta);

    const response = await getFormats(auth);
    if (response.data) {
      setDataPrev(response.data);
    }

    if (dataPrev) {
      const filtrado = dataPrev.filter((item) => {
        const date = Ms(item.attributes.fecha_inicio);
        if (date >= start && date <= end) {
          return item;
        }
      });

      map(filtrado, (item) => {
        const newObject = {
          id: item.id,
          provedor: item.attributes.provedor.data
            ? item.attributes.provedor.data.attributes.nombre
            : "S/N",
          ubicacion_inicial: item.attributes.ubicacion_inicial,
          reubicacion: item.attributes.reubicacione.data
            ? item.attributes.reubicacione.data.attributes.nueva_ubicacion
            : "S/N",
          fecha_inicio: item.attributes.fecha_inicio,
          fecha_modulacion: item.attributes.fecha_modulacion,
          pedimento: item.attributes.pedimento_chronos,
        };
        dataCollection.push(newObject);
      });

      setExportData(dataCollection);
    }
  };

  return (
    <div className="col-10 offset-2">
      <div className="row">
        <h2 className="my-3 mx-2 col-12">REPORTE DE ENTRADAS/SALIDAS</h2>
        {exportData && <CSVDownload data={exportData} headers={headers} />};
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-6 mb-2">
            <label className="form-label">Desde</label>
            <input
              type="date"
              className="form-control"
              onChange={(e) => setDesde(e.target.value)}
            />
          </div>
          <div className="col-6 mb-2">
            <label className="form-label">Hasta</label>
            <input
              type="date"
              className="form-control"
              onChange={(e) => setHasta(e.target.value)}
            />
          </div>
        </div>
        <button className="btn btn-primary my-2">Generar</button>
        <p onClick={() => generateCsv()} className="btn btn-success my-3 mx-2">
          Exportar CSV
        </p>
      </form>
      {entrys && (
        <div className="row">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Provedor</th>
                <th scope="col">Ubicación Inicial</th>
                <th scope="col">Reubicacion</th>
                <th scope="col">Fecha de inicio</th>
                <th scope="col">Fecha de modulación</th>
                <th scope="col">Pedimento</th>
              </tr>
            </thead>
            <tbody>
              {map(entrys, (item) => (
                <tr key={item.id}>
                  <th scope="row">{item.id}</th>
                  <td>
                    {item.attributes.provedor.data
                      ? item.attributes.provedor.data.attributes.nombre
                      : "S/N"}
                  </td>
                  <td>{item.attributes.ubicacion_inicial}</td>
                  <td>
                    {item.attributes.reubicacione.data
                      ? item.attributes.reubicacione.data.attributes
                          .nueva_ubicacion
                      : "S/N"}
                  </td>
                  <td>{item.attributes.fecha_inicio}</td>
                  <td>{item.attributes.fecha_modulacion}</td>
                  <td>{item.attributes.pedimento_chronos}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
