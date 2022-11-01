import React, { useState } from "react";
import { getProducts } from "../../../api/productos";
import useAuth from "../../../hooks/useAuth";
import { CSVLink, CSVDownload } from "react-csv";
import { map } from "lodash";
export default function ReporteInventarioFecha() {
  const [desde, setDesde] = useState(null);
  const [hasta, setHasta] = useState(null);
  const [dataTable, setDataTable] = useState(null);
  const [dataCsv, setDataCsv] = useState(null);
  const { auth } = useAuth();

  const headers = [
    { label: "id", key: "id" },
    { label: "sku", key: "sku" },
    { label: "cantidad", key: "cantidad" },
    { label: "provedor", key: "provedor" },
    { label: "ubicacion inicial", key: "ubicacion_inicial" },
    { label: "reubicacion", key: "reubicacion" },
  ];

  const Ms = (date) => {
    return new Date(date).getTime();
  };

  const generateTable = async () => {
    const start = new Date(desde).getTime();
    const end = new Date(hasta).getTime();
    const response = await getProducts(auth);
    if (response.data) {
      const filter = response.data.filter((item) => {
        const fecha = Ms(item.attributes.createdAt);
        if (fecha >= start && fecha <= end) {
          return item;
        }
      });

      setDataTable(filter);
    }
  };

  const generateCsv = async () => {
    const dataCollection = [];
    const start = new Date(desde).getTime();
    const end = new Date(hasta).getTime();
    const response = await getProducts(auth);
    if (response.data) {
      const filter = response.data.filter((item) => {
        const fecha = Ms(item.attributes.createdAt);
        if (fecha >= start && fecha <= end) {
          return item;
        }
      });

      map(filter, (item) => {
        const newObject = {
          id: item.id,
          sku: item.attributes.sku,
          cantidad: item.attributes.cantidad,
          provedor: item.attributes.provedor.data
            ? item.attributes.provedor.data.attributes.nombre
            : "S/N",
          ubicacion_inicial: "S/N",
          reubicacion: "S/N",
        };

        dataCollection.push(newObject);
      });

      setDataCsv(dataCollection);
    }
  };

  return (
    <div className="col-10 offset-2">
      <div className="row">
        <h2 className="my-3 mx-2 col-12">REPORTE DE INVENTARIO POR FECHA</h2>
        {dataCsv && <CSVDownload data={dataCsv} headers={headers} />};
      </div>
      <form>
        <div className="row">
          <div className="col-4 mb-2">
            <label className="form-label">Desde</label>
            <input
              type="date"
              className="form-control"
              onChange={(e) => setDesde(e.target.value)}
            />
          </div>
          <div className="col-4 mb-2">
            <label className="form-label">Hasta</label>
            <input
              type="date"
              className="form-control"
              onChange={(e) => setHasta(e.target.value)}
            />
          </div>
          <div className="col-2 mt-4">
            <p className="btn btn-primary" onClick={() => generateTable()}>
              Generar Reporte
            </p>
          </div>
          <div className="col-2 mt-4">
            <p className="btn btn-success" onClick={() => generateCsv()}>
              Exportar CSV
            </p>
          </div>
        </div>
      </form>
      <div className="row">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">SKU</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Provedor</th>
              <th scope="col">Ubicación Inicial</th>
              <th scope="col">Reubicacion</th>
            </tr>
          </thead>
          <tbody>
            {map(dataTable, (item) => (
              <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>{item.attributes.sku}</td>
                <td>{item.attributes.cantidad}</td>
                <td>
                  {item.attributes.provedor.data
                    ? item.attributes.provedor.data.attributes.nombre
                    : "S/N"}
                </td>
                <td>{item.attributes.ubicacion_inicio}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
