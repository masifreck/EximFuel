import { useRoute } from '@react-navigation/native';
import React, { useRef, useEffect, useState } from 'react';
import QRCode from 'react-native-qrcode-svg';
import { FuelSlip } from '../screens/FuelSlip';
import { FreightMemo } from '../screens/FeightMemo';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';
import Share from 'react-native-share';
import { Alert, Text, View, Platform } from 'react-native';
import { textColor } from './constant';
import { ConsignorHTML } from '../screens/ConsignorHTML';
import RNFS from 'react-native-fs';

export const QRCodeGenerator = () => {
  const [qrData, setQrData] = useState('');
  const svgRef = useRef(null);
  const route = useRoute();
  const { qrValue, fetchedData, selectedPrint, action } = route.params;
//  console.log('action type', fetchedData);
const [filePath ,setfilePath ]=useState('')
  const getDataURL = () => {
    if (svgRef.current) {
      svgRef.current.toDataURL(callback);
    }
  };

  const callback = (dataURL) => {
    setQrData(dataURL);
  };

  useEffect(() => {
    getDataURL();
  }, []);

  useEffect(() => {
    if (qrData && fetchedData && Object.keys(fetchedData).length > 0) {
      handleViewButtonPress();
    }
  }, [qrData, fetchedData]);

  const buildHTML = () => {
    switch (selectedPrint) {
      case '1':
        return `
          ${ConsignorHTML(fetchedData, qrData, 'Book Copy')} 
          <div style="page-break-after: always;"></div>
          <div style="margin-top: 20px;">${ConsignorHTML(fetchedData, qrData, 'Consignor Copy')}</div>
          <div style="page-break-after: always;"></div>
          <div style="margin-top: 20px;">${ConsignorHTML(fetchedData, qrData, 'Consignee Copy')}</div>
          <div style="page-break-after: always;"></div>
          <div style="margin-top: 20px;">${ConsignorHTML(fetchedData, qrData, 'Driver Copy')}</div>
        `;
      case '2':
        return `${FreightMemo(fetchedData, qrData)}`;
      case '3':
        return `${FuelSlip(fetchedData, qrData)}`;
      case '4':
        return `${ConsignorHTML(fetchedData, qrData, 'Book Copy')}`;
      case '5':
        return `${ConsignorHTML(fetchedData, qrData, 'Driver Copy')}`;
      case '6':
        return `${ConsignorHTML(fetchedData, qrData, 'Consignee Copy')}`;
      case '7':
        return `${ConsignorHTML(fetchedData, qrData, 'Consignor Copy')}`;
      case '8':
        return `
          ${FuelSlip(fetchedData, qrData)}
          <div style="margin-top: 20px;">${FreightMemo(fetchedData, qrData)}</div>
        `;
      default:
        Alert.alert('Error', 'Invalid selection');
        return '';
    }
  };

  const handleViewButtonPress = async () => {
    try {
      const htmlToPrint = buildHTML();
      if (!htmlToPrint) {
        Alert.alert('Error', 'No HTML content to print or share.');
        return;
      }
      // Convert HTML to PDF
      const { filePath }  = await RNHTMLtoPDF.convert({
        html: htmlToPrint,
        fileName: `Challan_${fetchedData.ChallanNo}`,
        directory: 'Documents',
      });
setfilePath(filePath)
      console.log('PDF generated at:', filePath);
      
      if (action === 'print') {
        // ---- PRINT PDF ----
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

      } else if (action === 'share') {
        // ---- SHARE PDF ----
  try {
    const cachePath = `${RNFS.CachesDirectoryPath}/Challan.pdf`;

    // Copy file to cache
    await RNFS.copyFile(filePath, cachePath);

    const finalPath = `file://${cachePath}`;
    console.log("Cache share path:", finalPath);

    const shareOptions = {
      title: 'Share Challan',
      url: finalPath,
      type: 'application/pdf',
      message: `Here is your PDF file for Challan No. ${fetchedData.ChallanNo}`,
      subject: 'Challan PDF',
    };

    await Share.open(shareOptions);
  } catch (err) {
    console.error("Share error:", err);
    Alert.alert("Error", `Sharing failed: ${err.message}`);
  }
};
    
    } catch (error) {
      Alert.alert('Error', `Failed to generate or process PDF. ${error}`);
      console.error('PDF generation/processing error:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {qrValue ? (
        <>
          <QRCode
            value={qrValue}
            getRef={(c) => (svgRef.current = c)}
          />
          <Text style={{ color: textColor, marginTop: 20, fontSize: 16 }}>
            Generating PDF...
          </Text>
        </>
      ) : (
        <Text>QR code data not available</Text>
      )}
    </View>
  );
};
