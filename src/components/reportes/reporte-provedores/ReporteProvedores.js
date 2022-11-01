import React, { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import OptionsGenerator from "../../comun/OptionsGenerator";
import { getProvedores, getOneProvider } from "../../../api/provedores";
import { getFormats, getFormatsOut } from "../../../api/reportes";
import { map } from "lodash";
import { CSVLink, CSVDownload } from "react-csv";
export default function ReporteProvedores() {
  const [provedorSelected, setProvedorSelected] = useState(null);
  const [provedores, setProvedores] = useState(null);
  const [dataTable, setDataTable] = useState(null);
  const [dataCsv, setDataCsv] = useState(null);
  const { auth } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getProvedores(auth);
      response.data && setProvedores(response.data);
    })();
  }, []);

  const headers = [
    { label: "id", key: "id" },
    { label: "provedor", key: "provedor" },
    { label: "fecha_inicio", key: "fecha_inicio" },
    { label: "pedimento", key: "pedimento" },
    { label: "tipo", key: "tipo" },
  ];

  const generateTable = async () => {
    const dataTable = [];

    const response = await getOneProvider(auth, provedorSelected);
    const inputs = await getFormats(auth, provedorSelected);
    map(inputs.data, (item) => {
      item.attributes.tipo = "entrada";
      dataTable.push(item);
    });
    const outputs = await getFormatsOut(auth, provedorSelected);
    map(outputs.data, (item) => {
      item.attributes.tipo = "salida";
      dataTable.push(item);
    });
    setDataTable(dataTable);
  };

  const generateCsv = async () => {
    const dataTable = [];

    const inputs = await getFormats(auth, provedorSelected);
    map(inputs.data, (item) => {
      const newObject = {
        id: item.id,
        provedor: item.attributes.provedor.data
          ? item.attributes.provedor.data.attributes.nombre
          : "S/N",
        fecha_inicio: item.attributes.fecha_inicio,
        pedimento: item.attributes.pedimento_chronos,
        tipo: "entrada",
      };

      dataTable.push(newObject);
    });
    const outputs = await getFormatsOut(auth, provedorSelected);
    map(outputs.data, (item) => {
      const newObject = {
        id: item.id,
        provedor: item.attributes.provedor.data
          ? item.attributes.provedor.data.attributes.nombre
          : "S/N",
        fecha_inicio: item.attributes.fecha_inicio,
        pedimento: item.attributes.pedimento_chronos,
        tipo: "salida",
      };

      dataTable.push(newObject);
    });
    setDataCsv(dataTable);
  };

  return (
    <div className="col-10 offset-2">
      <div className="row">
        <h2 className="my-3 mx-2 col-12">REPORTE DE PROVEDORES</h2>
        {dataCsv && <CSVDownload data={dataCsv} headers={headers} />};
      </div>
      {provedores && (
        <form>
          <div className="row">
            <div className="col-4 mb-2">
              <select
                className="form-control"
                onChange={(e) => setProvedorSelected(e.target.value)}
              >
                <option value="null">selecciona el provedor</option>
                <OptionsGenerator data={provedores} />
              </select>
            </div>
            <div className="col-4 mb-2">
              <p className="btn btn-primary" onClick={() => generateTable()}>
                Generar Reporte
              </p>
            </div>
            <div className="col-4 mb-2">
              <p className="btn btn-success" onClick={() => generateCsv()}>
                Exportar CSV
              </p>
            </div>
          </div>
        </form>
      )}
      {dataTable && (
        <div className="row">
          <table className="table  table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Provedor</th>
                <th scope="col">Fecha_Inicio</th>
                <th scope="col">Pedimento</th>
                <th scope="col">Tipo</th>
              </tr>
            </thead>
            <tbody>
              {map(dataTable, (item = item.data) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>
                    {item.attributes.provedor.data
                      ? item.attributes.provedor.data.attributes.nombre
                      : "S/N"}
                  </td>
                  <td>{item.attributes.fecha_inicio}</td>
                  <td>{item.attributes.pedimento_chronos}</td>
                  <td>{item.attributes.tipo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
