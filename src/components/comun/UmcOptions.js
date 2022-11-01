import React from "react";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";

export default function UmcOptions() {
  const options = (
    <>
      <option value="kilo"> Kilo</option>
      <option value="gramo"> Gramo</option>
      <option value="metro lineal"> Metro lineal</option>
      <option value="metro cuadrado"> Metro Cuadrado</option>
      <option value="metro cubico"> Metro cubico</option>
      <option value="pieza"> Pieza</option>
      <option value="cabeza"> Cabeza</option>
      <option value="litro"> Litro</option>
      <option value="par"> Par</option>
      <option value="kilowatt"> Kilowatt</option>
      <option value="millar"> Millar</option>
      <option value="juego"> Juego</option>
      <option value="kilowatt/hora"> Kilowatt/hora</option>
      <option value="tonelada"> Tonelada</option>
      <option value="barril"> Barril</option>
      <option value="gramo neto"> Gramo neto</option>
      <option value="decenas"> Decenas</option>
      <option value="cientos"> Cientos</option>
      <option value="docenas"> Docenas</option>
      <option value="caja"> Caja</option>
      <option value="botella"> botella</option>
    </>
  );
  return options;
}
