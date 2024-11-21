import React,{useEffect,useState} from 'react';
import { View, Button, Alert } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';

const logoImageBase64 = 'data:image/png;base64,...'; // Replace with the base64 of your logo image
const qrImageBase64 = 'data:image/webp;base64,...'; 
const EximLogisticsReceipt = () => {
  const [logoBase64, setLogoBase64] = useState('');
  const [qrBase64, setQRBase64] = useState('');
  useEffect(() => {
    const convertImagesToBase64 = async () => {
      try {
        // Paths to local images (adjust these paths to match where your images are stored)
        const logoPath = `${RNFS.DocumentDirectoryPath}/mypic.png`;
        const qrPath = `${RNFS.DocumentDirectoryPath}/qr.webp`;

        // Convert images to Base64
        const logoBase64Data = await RNFS.readFile(logoPath, 'base64');
        const qrBase64Data = await RNFS.readFile(qrPath, 'base64');

        // Set Base64 data to state
        setLogoBase64(logoBase64Data);
        setQRBase64(qrBase64Data);
      } catch (error) {
        Alert.alert('Error', 'Failed to load images.');
      }
    };

    convertImagesToBase64();
  }, []);

  const generatePDF = async () => {
    const htmlContent = `
      <html>
        <head>
          <style>
    body {
      font-family: "Times New Roman", Times, serif;
      padding: 10px;
      box-sizing: border-box;
      border-width: 2px;
      border-color: #000;
    }
    .block-line {
      width: 100%;
    height: 2px; /* Thickness of the line */
    border-width: 1px;/* Color of the line */
    border-color: #000;
    padding: 30px 0; 
    }
    .topsection {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    h1 {
      text-align: center;
      font-size: 16px;
      margin-bottom: 0;
      font-weight: bold;
    }
    p {
      text-align: center;
      margin-top: 0;
      font-size: 10px;
    }
    .header-section {
      width: 100%;
      margin-bottom: 10px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 10px;
    }
    td, th {
      border: 1px solid #000;
      padding: 5px;
      font-size: 10px;
    }
    .title-section {
      text-align: center;
      font-size: 16px;
      font-weight: bold;
      margin-top: 10px;
    }
    .small-text {
      font-size: 10px;
    }
    .signature-section {
      margin-top: 20px;
    }
  </style>
        </head>
       <body>
  <div class="block-line">
    <div class="topsection">
              <img src="data:image/png;base64,${logoBase64}" alt="Logo" width="100" height="100">


  
  <div>
  <h1>EXIM LOGISTICS PVT. LTD.</h1>
  <p>An ISO 9001:2015 Certified</p>
  <p>A :DCB-928-931. 9TH Floor, DLF Cybercity, Chandaka Industrial Estate, Patia</p>
  <p>Bhubaneswar-751024, Odisha, India, Phone: (0674)7107777 to 7887 (110 Lines)</p>
  <p>E-mail:info@eximlogistics.in, Website: www.eximlogistics.com</p>
  <p>CIN NO.: U630120R2006PTC06039</p>
</div>
<div>
  <img src="qr.webp" alt="Flowers in Chania" width="200" height="200">
</div>
</div>
  <div class="header-section">
    <table>
      <tr>
        <td colspan="2">CONSIGNOR NAME & ADDRESS</td>
        <td colspan="2">CONSIGNEE NAME & ADDRESS</td>
      </tr>
      <tr>
        <td colspan="2">Loading Place :</td>
        <td colspan="2">Unloading Place :</td>
      </tr>
      <tr>
        <td colspan="2">Vehicle No. :</td>
        <td colspan="2">CAUTION: This consignment will not be detained...</td>
      </tr>
      <tr>
        <td>Driver Name:</td>
        <td>Owner Name:</td>
        <td>DL No.:</td>
        <td>PAN No.:</td>
      </tr>
    </table>

    <table>
      <tr>
        <th>Package</th>
        <th>Description</th>
        <th>Loading Weight</th>
        <th>Unloading Weight</th>
        <th>Rate</th>
        <th>Total Amount</th>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </table>

    <div class="signature-section">
      <table>
        <tr>
          <td>Receiver Confirmation</td>
          <td>Seal Nos.</td>
        </tr>
        <tr>
          <td>Signature & Seal:</td>
          <td>Remark:</td>
        </tr>
      </table>
    </div>

    <div class="small-text">
      <p>GST PAYABLE BY:</p>
      <p>The consignment covered by this receipt will be delivered...</p>
    </div>
  </div>
</div>
</body>
      </html>
    `;

    try {
      // Generate PDF
      const pdfOptions = {
        html: htmlContent,
        fileName: 'Exim_Logistics_Receipt',
        directory: 'Documents',
      };
      const pdf = await RNHTMLtoPDF.convert(pdfOptions);

      // Print the generated PDF
      await RNPrint.print({ filePath: pdf.filePath });
    } catch (error) {
      Alert.alert('Error', 'Failed to generate or print the PDF');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Generate and Print Receipt" onPress={generatePDF} />
    </View>
  );
};

export default EximLogisticsReceipt;
