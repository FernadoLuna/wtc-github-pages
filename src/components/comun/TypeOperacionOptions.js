import React from "react";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";

export default function TypeOperacionOptions() {
  const options = (
    <>
      <option value="directo">DIRECTO</option>
      <option value="cross_dock">CROSS DOCK</option>
      <option value="consolidado">CONSOLIDADO</option>
      <option value="ninguno">NINGUNO</option>
    </>
  );
  return options;
}
