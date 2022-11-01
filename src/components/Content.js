import React from "react";
import ClientesTable from "./clientes/ClientesTable";
import ContactosTable from "./clientes/contactos/ContactosTable";
import TableProvedores from "./proveedores/provedores/TableProvedores";
import TableContactsProviders from "./proveedores/contactos/TableContactsProviders";
import ProductoTerminado from "./inventario/ProductoTerminado";
import ActivosFijos from "./inventario/ActivosFijos";
import PlacesTable from "./inventario/ubicaciones/PlacesTable";
import FormatTable from "./entradas/formato/FormatTable";
import FormatTableOut from "./salidas/formato/FormatTableOut";
import TableOrdersEntry from "./entradas/orden/TableOrdersEntry";
import TableOrdersOut from "./salidas/ordenes/TableOrdersOut";
import TableReubicaciones from "./reubicaciones/TableReubicaciones";
import TableCategorias from "./categorias/TableCategorias";
import TableLigthTruck from "./montacargas/TableLigthTruck";
import TablePortals from "./portals/TablePortals";
import TableTiendas from "./tiendas/TableTiendas";
import TableLecturas from "./lecturas/TableLecturas";
import TablePedimentos from "./pedimentos/TablePedimentos";
import ReporteExistenciaUbicacion from "./reportes/existencia-ubicacion/ReporteExistenciaUbicacion";
import ReporteES from "./reportes/entrada-salida/ReporteES";
import ReporteProducto from "./reportes/reporte-producto/ReporteProducto";
import ReporteInventarioFecha from "./reportes/inventario-fecha/ReporteInventarioFecha";
import ReporteProvedores from "./reportes/reporte-provedores/ReporteProvedores";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Files from "./entradas/formato/Files";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/wtc-github-pages/build" element={<Files />} />
        <Route
          exact
          path="https://FernandoLuna.github.io/wtc-github-pages/build"
          element={<ClientesTable />}
        />
        <Route exact path="/contactos_clientes" element={<ContactosTable />} />
        <Route exact path="/provedores" element={<TableProvedores />} />
        <Route
          exact
          path="/provedores_contactos"
          element={<TableContactsProviders />}
        />
        <Route exact path="/productos" element={<ProductoTerminado />} />
        <Route exact path="/activos_fijos" element={<ActivosFijos />} />
        <Route exact path="/ubicaciones" element={<PlacesTable />} />
        <Route exact path="/formato_entrada" element={<FormatTable />} />
        <Route exact path="/ordenes_entrada" element={<TableOrdersEntry />} />
        <Route exact path="/formato_salida" element={<FormatTableOut />} />
        <Route exact path="/ordenes_salida" element={<TableOrdersOut />} />
        <Route exact path="/reubicaciones" element={<TableReubicaciones />} />
        <Route exact path="/categorias" element={<TableCategorias />} />
        <Route exact path="/montacargas" element={<TableLigthTruck />} />
        <Route exact path="/portales" element={<TablePortals />} />
        <Route exact path="/stores" element={<TableTiendas />} />
        <Route exact path="/readings" element={<TableLecturas />} />
        <Route exact path="/pediments" element={<TablePedimentos />} />
        <Route exact path="/reporte_ES" element={<ReporteES />} />
        <Route exact path="/reporte_producto" element={<ReporteProducto />} />
        <Route
          exact
          path="/reporte_provedores"
          element={<ReporteProvedores />}
        />
        <Route
          exact
          path="/reporte_inventario_fecha"
          element={<ReporteInventarioFecha />}
        />
        <Route
          exact
          path="/r-existencia-ubicacion"
          element={<ReporteExistenciaUbicacion />}
        />
      </Routes>
    </Router>
  );
}
