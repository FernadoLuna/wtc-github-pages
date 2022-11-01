import React from "react";
import {
  Page,
  Text,
  Image,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import { FaPrint } from "react-icons/fa";
import Logo from "../../../Logo.png";
import { PDFDownloadLink } from "@react-pdf/renderer";

export default function PrintEntry(props) {
  const { data } = props;

  return (
    <PDFDownloadLink
      document={
        <Document>
          <Page style={styles.body}>
            <Image src={Logo} style={styles.logo} />
            <View style={styles.container1}>
              <Text style={styles.title}>Formato de entrada</Text>
              <Text>Folio : {data.attributes.folio}</Text>
              <Text>
                Fecha y Hora de registro : {data.attributes.fecha_registro} |{" "}
                {data.attributes.hora_registro}
              </Text>
              <Text>Fecha inicio : {data.attributes.fecha_inicio}</Text>
              <Text>Bol : {data.attributes.bol}</Text>
              <Text>
                Linea transportsta : {data.attributes.linea_transportista}
              </Text>
              <Text>Nombre chofer : {data.attributes.nombre_chofer}</Text>
              <Text>Placas : {data.attributes.placas}</Text>
              <Text>Caja : {data.attributes.numero_caja}</Text>
              <Text>Tractor : {data.attributes.numero_tractor}</Text>
              <Text>Numero de tractor : {data.attributes.numero_tractor}</Text>
              <Text>Carta porte : {data.attributes.carta_porte}</Text>
              <Text>Pallet :{data.attributes.pallet}</Text>
              <Text>Carton :{data.attributes.carton}</Text>
              <Text>
                Fecha y Hora de modulación : {data.attributes.fecha_modulación}{" "}
                | {data.attributes.hora_modulacion}
              </Text>
              <Text>Modulo operación :{data.attributes.modulo_operacion}</Text>
              <Text>Pedimento :{data.attributes.pedimento_chronos}</Text>
              <Text>Remesa :{data.attributes.remesa}</Text>
              <Text>Orden de compra :{data.attributes.orden_compra}</Text>
              <Text>Numero de sello : {data.attributes.numero_sello}</Text>
            </View>
            <View style={styles.container1}>
              <Text style={styles.title}>Provedor</Text>
              {data.attributes.provedor.data && (
                <>
                  <Text>
                    Nombre : {data.attributes.provedor.data.attributes.nombre}
                  </Text>
                  <Text>
                    Correo : {data.attributes.provedor.data.attributes.correo}
                  </Text>
                  <Text>
                    Teléfono :{" "}
                    {data.attributes.provedor.data.attributes.telefono}
                  </Text>
                  <Text>
                    IMMEX : {data.attributes.provedor.data.attributes.immex}
                  </Text>
                  <Text>
                    RFC : {data.attributes.provedor.data.attributes.rfc}
                  </Text>
                  <Text>
                    RFE : {data.attributes.provedor.data.attributes.rfe}
                  </Text>
                  <Text>
                    Razón social :
                    {data.attributes.provedor.data.attributes.razon_social}
                  </Text>
                  <Text>
                    Tipo Provedor :
                    {data.attributes.provedor.data.attributes.tipo_provedor}
                  </Text>
                </>
              )}
            </View>
          </Page>
        </Document>
      }
      fileName={data.attributes.folio}
    >
      {<FaPrint />}
    </PDFDownloadLink>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
    marginBottom: 5,
  },
  logo: {
    left: "5%",
  },
  container1: {
    height: "auto",
    width: "100%",
    padding: 20,
    border: 2,
    marginBottom: 20,
  },
});
