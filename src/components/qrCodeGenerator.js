import { useRoute } from '@react-navigation/native';
import React, { useRef, useEffect, useState } from 'react';
import QRCode from 'react-native-qrcode-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  const [signatureUrl, setSignatureUrl] = useState('');
  const [filePath, setFilePath] = useState('');
  const svgRef = useRef(null);
  const route = useRoute();
  const { qrValue, fetchedData, selectedPrint, action } = route.params;

  // ---- 1. FETCH SIGNATURE FROM ASYNCSTORAGE ----
  useEffect(() => {
    const getSignature = async () => {
      try {
        const sign = await AsyncStorage.getItem('Sign');
        if (sign) {
          setSignatureUrl(`https://exim.tranzol.com/Upload/${sign}`);
          console.log('sign_url',`https://exim.tranzol.com/Upload/${sign}`)
        } else {
          console.warn('Signature not found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error fetching Sign from AsyncStorage:', error);
      }
    };
    getSignature();
  }, []);

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
    if (qrData && fetchedData && Object.keys(fetchedData).length > 0 && signatureUrl) {
      handleViewButtonPress();
    }
  }, [qrData, fetchedData, signatureUrl]);

  // ---- 2. BUILD HTML WITH SIGNATURE URL ----
  const buildHTML = () => {
    switch (selectedPrint) {
      case '1':
        return `
          ${ConsignorHTML(fetchedData, qrData, 'Book Copy', signatureUrl)} 
          <div style="page-break-after: always;"></div>
          <div style="margin-top: 20px;">${ConsignorHTML(fetchedData, qrData, 'Consignor Copy', signatureUrl)}</div>
          <div style="page-break-after: always;"></div>
          <div style="margin-top: 20px;">${ConsignorHTML(fetchedData, qrData, 'Consignee Copy', signatureUrl)}</div>
          <div style="page-break-after: always;"></div>
          <div style="margin-top: 20px;">${ConsignorHTML(fetchedData, qrData, 'Driver Copy', signatureUrl)}</div>
        `;
      case '2':
        return `${FreightMemo(fetchedData, qrData, signatureUrl)}`;
      case '3':
        return `${FuelSlip(fetchedData, qrData, signatureUrl)}`;
      case '4':
        return `${ConsignorHTML(fetchedData, qrData, 'Book Copy', signatureUrl)}`;
      case '5':
        return `${ConsignorHTML(fetchedData, qrData, 'Driver Copy', signatureUrl)}`;
      case '6':
        return `${ConsignorHTML(fetchedData, qrData, 'Consignee Copy', signatureUrl)}`;
      case '7':
        return `${ConsignorHTML(fetchedData, qrData, 'Consignor Copy', signatureUrl)}`;
      case '8':
        return `
          ${FuelSlip(fetchedData, qrData, signatureUrl)}
          <div style="margin-top: 20px;">${FreightMemo(fetchedData, qrData, signatureUrl)}</div>
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

      const { filePath } = await RNHTMLtoPDF.convert({
        html: htmlToPrint,
        fileName: `Challan_${fetchedData.ChallanNo}`,
        directory: 'Documents',
      });

      setFilePath(filePath);
      console.log('PDF generated at:', filePath);

      if (action === 'print') {
        if (Platform.OS === 'ios') {
          await RNPrint.print({ filePath });
        } else {
          await RNPrint.print({ filePath, jobName: 'Challan' });
        }
      } else if (action === 'share') {
        try {
          const cachePath = `${RNFS.CachesDirectoryPath}/Challan.pdf`;
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
      }
    } catch (error) {
      Alert.alert('Error', `Failed to generate or process PDF. ${error}`);
      console.error('PDF generation/processing error:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {qrValue ? (
        <>
          <QRCode value={qrValue} getRef={(c) => (svgRef.current = c)} />
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
