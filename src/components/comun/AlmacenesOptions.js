import React, { useState, useEffect } from "react";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";

export default function AlmacenesOptions(props) {
  const { data } = props;

  const htmlOptions = () => {
    let html = "";
    if (data) {
      data.forEach((element) => {
        let option =
          `<option value="${element.id}">${element.attributes.nombre}` +
          `</option>`;

        html += option;
      });
    }
    return html;
  };

  const options = htmlOptions();

  return <>{ReactHtmlParser(options)}</>;
}
