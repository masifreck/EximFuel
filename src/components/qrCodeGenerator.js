import { useRoute } from '@react-navigation/native';
import React, { useRef, useEffect, useState } from 'react';
import QRCode from 'react-native-qrcode-svg';
import { HTMLContent } from '../screens/HTMLContent';
import { ConsigneeHTML } from '../screens/ConsigneeHTML';
import { ConsignorHTML } from '../screens/ConsignorHTML';
import { DriverHTML } from '../screens/DriverHTML';
import { FuelSlip } from '../screens/FuelSlip';
import { FreightMemo } from '../screens/FeightMemo';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';
import { Text,View } from 'react-native';
export const QRCodeGenerator = ({data}) => {

  const [qrData,setQrData]=useState('')
  const svgRef = useRef(null);
  const route = useRoute();
  const { qrValue, fetchedData, selectedPrint } = route.params;
  
  console.log('QR Value:', qrValue);
  console.log('Fetched Data:', fetchedData);
  console.log('Selected Print:', selectedPrint);
  

  const getDataURL = () => {
    if (svgRef.current) {
      svgRef.current.toDataURL(callback);
    }
  };

  const callback = (dataURL) => {
    console.log('QR DATA ON QR PAGE',dataURL);
    setQrData(dataURL)
  };

  useEffect(() => {
    getDataURL();
  }, []); // Runs only once when the component mounts

  useEffect(() => {
    if (qrData && fetchedData && Object.keys(fetchedData).length > 0) {
      handleViewButtonPress();
    }
  }, [qrData, fetchedData]);

  const handleViewButtonPress = async () => {
    try {
      let htmlToPrint = '';
  
      if (selectedPrint === '1') {
        htmlToPrint = `
          ${HTMLContent(fetchedData, qrData)} 
          <div style="page-break-after: always;"></div>
          <div style="margin-top: 20px;">${ConsignorHTML(fetchedData, qrData)}</div>
          
          <div style="page-break-after: always;"></div>
          <div style="margin-top: 20px;">${ConsigneeHTML(fetchedData, qrData)}</div>
          
          <div style="page-break-after: always;"></div> 
          <div style="margin-top: 20px;">${DriverHTML(fetchedData, qrData)}</div>
        `;
      } else if (selectedPrint === '2') {
        htmlToPrint = `${FreightMemo(fetchedData)}`;
      } else if (selectedPrint === '3') {
        htmlToPrint = `${FuelSlip(fetchedData)}`;
      } else if (selectedPrint === '4') {
        htmlToPrint = `${HTMLContent(fetchedData, qrData)}`;
      } else if (selectedPrint === '5') {
        htmlToPrint = `${DriverHTML(fetchedData, qrData)}`;
      } else if (selectedPrint === '6') {
        htmlToPrint = `${ConsigneeHTML(fetchedData, qrData)}`;
      } else if (selectedPrint === '7') {
        htmlToPrint = `${ConsignorHTML(fetchedData, qrData)}`;
      } else if (selectedPrint === '8') {
        htmlToPrint = `
          ${FuelSlip(fetchedData)}
          <div style="margin-top: 20px;">${FreightMemo(fetchedData)}</div>
        `;
      } else {
        seterrorMessage('Invalid selection');
        setShowAlert(true);
        return;
      }
  
      // Convert the selected HTML content to PDF
      const { filePath } = await RNHTMLtoPDF.convert({
        html: htmlToPrint,
        fileName: `challan.pdf`,
        directory: 'Documents',
      });
  
      // Print the generated PDF
      if (Platform.OS === 'ios') {
        await RNPrint.print({
          filePath: filePath,
        });
      } else {
        await RNPrint.print({
          filePath: filePath,
          jobName: 'Challan',
        });
      }
    } catch (error) {
      console.log('Error printing PDF: ', error);
      seterrorMessage('Error printing PDF');
      setShowAlert(true);
    }
  };
  
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <>
        {qrValue ? (
          <QRCode
            value={qrValue}
            getRef={(c) => (svgRef.current = c)} // Set reference to svgRef
          />
        ) : (
          <Text>QR code data not available</Text>
        )}
      </>
      </View>
    );
  
};
