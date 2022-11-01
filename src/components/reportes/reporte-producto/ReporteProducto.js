import React, { useState, useEffect } from "react";
import { getProducts, getOneProduct } from "../../../api/productos";
import useAuth from "../../../hooks/useAuth";
import ProductsOptions from "../../comun/ProductsOptions";
import { CSVLink, CSVDownload } from "react-csv";
export default function ReporteProducto() {
  const [products, setProducts] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [dataTable, setDataTable] = useState(null);
  const [dataCsv, setDataCsv] = useState(null);
  const { auth } = useAuth();
  useEffect(() => {
    (async () => {
      const response = await getProducts(auth);
      if (response.data) {
        setProducts(response.data);
      }
    })();
  }, []);

  const generateTable = async () => {
    const response = await getOneProduct(auth, selectedProduct);
    response.data && setDataTable(response.data);
  };

  const headers = [
    { label: "id", key: "id" },
    { label: "sku", key: "sku" },
    { label: "cantidad", key: "cantidad" },
    { label: "fecha registro", key: "fecha_registro" },
    { label: "provedor", key: "provedor" },
  ];

  const generateCsv = async () => {
    const response = await getOneProduct(auth, selectedProduct);
    if (response.data) {
      const dataCollection = [];
      const newObject = {
        id: response.data.id,
        sku: response.data.attributes.sku,
        cantidad: response.data.attributes.cantidad,
        fecha_registro: response.data.attributes.createdAt,
        provedor: response.data.attributes.provedor.data
          ? response.data.attributes.provedor.data.attributes.nombre
          : "S/N",
      };

      dataCollection.push(newObject);
      setDataCsv(dataCollection);
    }
  };

  const dateConvert = (string) => {
    const date = new Date(string);

    return date.toISOString().slice(0, 10);
  };

  return (
    <div className="col-10 offset-2">
      <div className="row">
        <h2 className="my-3 mx-2 col-12">REPORTE POR PRODUCTO</h2>
        {dataCsv && <CSVDownload data={dataCsv} headers={headers} />};
      </div>
      {products && (
        <form>
          <div className="row">
            <div className="col-4 mb-2">
              <select
                className="form-control"
                onChange={(e) => setSelectedProduct(e.target.value)}
              >
                <option value="null">selecciona el producto</option>
                <ProductsOptions data={products} />
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
                <th scope="col">sku</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Fecha_registro</th>
                <th scope="col">Provedor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{dataTable.id}</td>
                <td>{dataTable.attributes.sku}</td>
                <td>{dataTable.attributes.cantidad}</td>
                <td>{dateConvert(dataTable.attributes.createdAt)}</td>
                <td>
                  {dataTable.attributes.provedor.data
                    ? dataTable.attributes.provedor.data.attributes.nombre
                    : "S/N"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
