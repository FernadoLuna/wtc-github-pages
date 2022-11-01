import React, { useState } from "react";
import { removeTokenApi } from "../api/token";
export default function Aside(props) {
  const { logout } = props;

  const logOut = () => {
    logout();
  };

  return (
    <div className=" p-3 text-bg-dark sidebar_col col-2">
      <a
        href="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <svg className="bi pe-none me-2" width={40} height={32}>
          <use xlinkHref="#bootstrap" />
        </svg>
        <span className="fs-4">Sidebar</span>
      </a>
      <hr />
      <ul className="list-unstyled ps-0 ul_idenfifer">
        <li className="mb-1 ">
          <button
            className="btn btn-toggle d-inline-flex align-items-center rounded border-0 "
            data-bs-toggle="collapse"
            data-bs-target="#home-collapse"
            aria-expanded="false"
          >
            Clientes
          </button>
          <div className="collapse" id="home-collapse" style={{}}>
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small ">
              <li>
                <a className="dropdown-item" href="/clientes">
                  clientes
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="/contactos_clientes">
                  contactos
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li className="mb-1">
          <button
            className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#dashboard-collapse"
            aria-expanded="false"
          >
            Provedores
          </button>
          <div className="collapse" id="dashboard-collapse" style={{}}>
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                <a className="dropdown-item" href="/provedores">
                  proveedores
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="/provedores_contactos">
                  contactos
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li className="mb-1">
          <button
            className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#orders-collapse"
            aria-expanded="false"
          >
            Inventario
          </button>
          <div className="collapse" id="orders-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                <a className="dropdown-item" href="/productos">
                  Productos
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="/activos_fijos">
                  Activos fijos
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="/ubicaciones">
                  Ubicaciones
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li className="mb-1">
          <button
            className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#entrys-collapse"
            aria-expanded="false"
          >
            Entradas
          </button>
          <div className="collapse" id="entrys-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                <a className="dropdown-item" href="/formato_entrada">
                  Formato
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="/ordenes_entrada">
                  Ordenes
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li className="mb-1">
          <button
            className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#outs-collapse"
            aria-expanded="false"
          >
            Salidas
          </button>
          <div className="collapse" id="outs-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                <a className="dropdown-item" href="/formato_salida">
                  Formato
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="/ordenes_salida">
                  Ordenes
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li className="mb-1">
          <button
            className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#reubicaciones"
            aria-expanded="false"
          >
            Reubicaciones
          </button>
          <div className="collapse" id="reubicaciones">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                <a className="dropdown-item" href="/reubicaciones">
                  Reubicaciones
                </a>
              </li>
            </ul>
          </div>
        </li>

        <li className="mb-1">
          <button
            className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#reportes"
            aria-expanded="false"
          >
            Reportes
          </button>
          <div className="collapse" id="reportes">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                <a className="dropdown-item" href="/r-existencia-ubicacion">
                  Existencia/Ubicacion
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="/reporte_Es">
                  Entradas/Salidas
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="/reporte_producto">
                  Reporte por producto
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="/reporte_inventario_fecha">
                  Reporte Inventario por fecha
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="/reporte_provedores">
                  Reporte de Provedores
                </a>
              </li>
            </ul>
          </div>
        </li>

        <li className="mb-1">
          <button
            className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#categorias"
            aria-expanded="false"
          >
            Categorias
          </button>
          <div className="collapse" id="categorias">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                <a className="dropdown-item" href="/categorias">
                  Categorias
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li className="mb-1">
          <button
            className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#montacargas"
            aria-expanded="false"
          >
            Montacargas
          </button>
          <div className="collapse" id="montacargas">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                <a className="dropdown-item" href="/montacargas">
                  Montacargas
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li className="mb-1">
          <button
            className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#portales"
            aria-expanded="false"
          >
            Portales
          </button>
          <div className="collapse" id="portales">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                <a className="dropdown-item" href="/portales">
                  Portales
                </a>
              </li>
            </ul>
          </div>
        </li>

        <li className="mb-1">
          <button
            className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#lecturas"
            aria-expanded="false"
          >
            Lecturas
          </button>
          <div className="collapse" id="lecturas">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                <a className="dropdown-item" href="/readings">
                  Lecturas
                </a>
              </li>
            </ul>
          </div>
        </li>

        <li className="mb-1">
          <button
            className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#tiendas"
            aria-expanded="false"
          >
            Tiendas
          </button>
          <div className="collapse" id="tiendas">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                <a className="dropdown-item" href="/stores">
                  Tiendas
                </a>
              </li>
            </ul>
          </div>
        </li>

        <li className="mb-1">
          <button
            className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#pedimentos"
            aria-expanded="false"
          >
            Pedimentos
          </button>
          <div className="collapse" id="pedimentos">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                <a className="dropdown-item" href="/pediments">
                  Pedimentos
                </a>
              </li>
            </ul>
          </div>
        </li>

        <li className="border-top my-3" />
        <li className="mb-1">
          <button
            className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#account-collapse"
            aria-expanded="false"
            onClick={logOut}
          >
            Salir
          </button>
        </li>
      </ul>
    </div>
  );
}
