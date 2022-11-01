import React from "react";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";
export default function UsersOptions(props) {
  const { data } = props;

  const htmlOptions = () => {
    let html = "";
    if (data) {
      data.forEach((element) => {
        let option =
          `<option value="${element.id}">${element.username}` + `</option>`;

        html += option;
      });
    }
    return html;
  };

  const options = htmlOptions();

  return <>{ReactHtmlParser(options)}</>;
}
