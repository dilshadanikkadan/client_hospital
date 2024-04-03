import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "white",
    paddingTop: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginBottom: 20,
    border: "none",
    borderBottom: "1px solid gray",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "blue",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "gray",
    marginBottom: 20,
  },
  details: {
    fontSize: 12,
    fontStyle: "italic",
  },
  prescription: {
    fontSize: 12,
    fontStyle: "italic",
    display: "flex",
    flexDirection: "row",
    gap: "30px",
    marginBottom: "20px",
  },
  prescriptionList: {
    marginTop: 20,
    marginLeft: 20,
  },
  listItem: {
    marginBottom: 5,
  },
});

const MyDocument = ({ prescription }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.heading}>E-CARE</Text>
        <Text style={styles.details}>Hospital Prescription List</Text>
      </View>

      {/* Prescription List */}

      <View style={styles.prescriptionList}>
        <Text style={styles.title}>Prescription List</Text>

        {prescription?.map((item, i) => (
          <View key={i} style={styles.prescription}>
            <Text>{item?.name}</Text>
            <Text>{item?.times} times </Text>
            <Text>for {item?.days} days </Text>
          </View>
        ))}

        {/* Add more medicines as needed */}
      </View>
    </Page>
  </Document>
);

export default MyDocument;
