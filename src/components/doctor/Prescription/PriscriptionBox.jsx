import React, { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import MyDocument from "./MyDocument";

const PrescriptionBox = () => {
  const [prescriptionList, setPrescriptionList] = useState([]);
  const [medicineName, setMedicineName] = useState("");
  const [timesPerDay, setTimesPerDay] = useState("");
  const [days, setDays] = useState("");

  const handleAddPrescription = () => {
    if (medicineName && timesPerDay && days) {
      const prescription = {
        name: medicineName,
        times: parseInt(timesPerDay),
        days: parseInt(days),
      };
      setPrescriptionList([...prescriptionList, prescription]);
      setMedicineName("");
      setTimesPerDay("");
      setDays("");
    }
  };

  return (
    <div className="max-w-lg ml-10 p-6 bg-white rounded-md shadow-md">
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="medicineName"
        >
          Medicine Name
        </label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="medicineName"
          type="text"
          placeholder="Medicine Name"
          value={medicineName}
          onChange={(e) => setMedicineName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="timesPerDay"
        >
          Times per Day
        </label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="timesPerDay"
          type="number"
          placeholder="Times per Day"
          value={timesPerDay}
          onChange={(e) => setTimesPerDay(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="days"
        >
          Days
        </label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="days"
          type="number"
          placeholder="Days"
          value={days}
          onChange={(e) => setDays(e.target.value)}
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handleAddPrescription}
      >
        Add Prescription
      </button>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Prescription List</h2>
        <ul>
          {prescriptionList.map((prescription, index) => (
            <li key={index} className="text-gray-700">
              <span className="font-bold">{prescription.name}</span> - Times:{" "}
              {prescription.times}, Days: {prescription.days}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <PDFDownloadLink
          document={<MyDocument prescription={prescriptionList} />}
          fileName="Prescription.pdf"
        >
          {({ blob, url, loading, error }) => (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={loading}
            >
              Download PDF
            </button>
          )}
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default PrescriptionBox;
