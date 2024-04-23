import React, { useEffect,use, useState } from "react";
import "./App.css";
import AutoFillForm from "./Autofill/AutoFillform";
import PdfForm from "./Pdfextract/PdfForm";
// import pdf from 'pdf-parse';
import Papa from 'papaparse';
import pdfjsLib from 'pdfjs-dist';


// const convertPDFToJSON = async (file) => {
//   const dataBuffer = await file.arrayBuffer();
//   const pdfData = await pdf(dataBuffer);

//   const text = pdfData.text;
//   const parsedData = Papa.parse(text, {
//     header: true,
//     skipEmptyLines: true,
//   });

//   return parsedData.data;
// };

const convertPDFToJSON = async (file) => {
  const fileReader = new FileReader();

  return new Promise((resolve, reject) => {
    fileReader.onload = async () => {
      try {
        const typedArray = new Uint8Array(fileReader.result);
        const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
        const text = await extractTextFromPDF(pdf);
        const parsedData = Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
        });
        resolve(parsedData.data);
      } catch (error) {
        reject(error);
      }
    };

    fileReader.onerror = (error) => {
      reject(error);
    };

    fileReader.readAsArrayBuffer(file);
  });
};

const extractTextFromPDF = async (pdf) => {
  let text = '';
  const numPages = pdf.numPages;

  for (let i = 1; i <= numPages; i++) {
    const page = await pdf.getPage(i);
    const pageText = await page.getTextContent();
    pageText.items.forEach((item) => {
      text += item.str + ' ';
    });
  }

  return text;
};

function App() {
  const [data, SetData] = useState([])
  
  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    try {
      const jsonData = await convertPDFToJSON(file);
      console.log('Converted to JSON:', jsonData);
    } catch (error) {
      console.error('Error converting PDF to JSON:', error);
    }
  };

  

  return (
    <>
         <h2> hello </h2>  
       
        {/* <PdfForm/> */}

        <input type="file" onChange={handleFileChange} />
    </>
  );
}

export default App;
