import { ElBase64 } from "../components/Elbase";

export const ConsignorHTML = (data, qrData)=>{
console.log('qr data ON consignee html',qrData)
  return`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <title>Challan</title>
         <style>
    body {
      font-family: "Times New Roman", Times, serif;
      padding: 10px;
      box-sizing: border-box;
      border-width: 2px;
      border-color: #000;
      height: 100%;
      width: 95%;
      margin-top:20px;
      margin-bottom:auto;
      margin-right:auto;
      margin-left:auto;
    }
    .block-line {
      width: 100%;
    height: 100%; /* Thickness of the line */
    border-width: 1px;/* Color of the line */
    border-color: #000;
    padding: 20px 0; 
    border: 1px solid #000;
    padding-top: 5px;
    
    }
    .topsection {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-bottom: 0px;
    }
    .qr{
      margin-right: 2px;
    }
    h1 {
      text-align: center;
      font-size: 20px;
      margin-bottom: 0;
      font-weight: bold;
      margin-bottom: 7px;
    }
    p {
      text-align: center;
      margin-top: -6px;
      font-size: 10px;
      margin-block-end: 0.5em;
    }
    h6 {
      align-self: center;
      margin-top: -8px;
      margin-left: 30px;
      font-size: 14px;
      margin-bottom: 4px;
    }
    .caution
{
  margin-top: 3px;
  font-size: 8px;
  margin-bottom: 3px;
  margin-left: 10px;
}  
h5 {
      text-align: left;
      font-size: 11px;
      width: 100%;
      margin-top: -10px;
    }  
h4  {
      text-align: left;
      margin-top: -10px;
      font-size: 11px;
      width: 100%;
      margin-block-end: 0.9em;
      font-weight: lighter;
    }
    .insurancecontainer{
      display: grid;
      justify-content: center;
      align-items: center;
      justify-self: center;
      border-right: 1px solid black;
    }
    .center {
      text-align: left;
      font-weight: bold;
      font-size: 12px;
      border-bottom: 1px solid #000;
      margin-top: 0px;
    }
    .secondblock {
      display: flex;
      flex-direction: row;
      gap: 20px;
      justify-content: space-between;
      border-collapse: collapse;
      border-top: 1px solid #000;
border-bottom: 1px solid #000;

      padding: 10px;
      padding-top: 20px;
      padding-bottom: 0px;
      margin-bottom: 5px;
    }
    .thirdblock {
      display: flex;
      flex-direction: row;
      gap: 4px;
      justify-content: space-between;
      border-collapse: collapse;
      border-top: 1px solid #000;
    }
    .lastblock {
      display: flex;
      flex-direction: row;
      justify-content: left;
      border-collapse: collapse;
     
border-bottom: 1px solid #000;
      padding-bottom: 0000px;
      margin-bottom: 0px;
      
    }
    .lastblockdiv {
      width: 100%;
    }
    .marginleft{
      margin-left: 17%;
    }
    .header-section {
      width: 100%;
      margin-bottom: 10px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 0px;
    }
    td{
      margin-top: -10px;
      border: 1px solid #000;
      padding: 5px;
      font-size: 10px;
    }
    th {
      border: 1px solid #000;
      padding: 5px;
      font-size: 10px;
    } 
    .tbbg {
      background-color: #a09e9e;
    }
    .itgbg {
      height: 50px;
    }
    .title-section {
      text-align: center;
      font-size: 16px;
      font-weight: bold;
      margin-top: 10px;
    }
    .small-text {
      font-size: 10px;
      text-align: left;
      display: flex;
      flex-direction: row;
      gap: 20px;
      justify-content: space-between;
    }
    .sign{
      width: 20%;
      margin-top: 40px;
    }
    .signtext{
      font-weight: bold;
      width: 80%;
    }
    .signature-section {
      margin-top: 20px;
    }
    .systemgen{
      font-size: 12px;
      font-weight: bolder;
      text-align: center;
      margin-top: 10px;
    }
    .insuranceblockdiv{
      display: flex;
      flex-direction: row;
      gap: 10px;
      justify-content: center;
      align-items: center;
      margin-bottom: -5px;
    }
    .checkbox {
    width: 15px;
    height: 8px;
    border: 1px solid black;
    border-radius: 4px;       
    display: inline-block;
    margin-bottom: 15px;
    margin-top: -10px;
    margin-left: 5px;
  }
  .bold-text {
      font-weight: 100;
    }
    h2{
      font-size: 12px;
    }
    h4 .or {
      margin-left: 20px;
font-size: 12px;
font-weight: bold;
    }
.challan {
 font-size: 12px;
  font-weight: bold;
  margin-top: 20px;
  margin-left: 10px;
  width:150px;
}
.exim {
  margin-right: 20px;
}
.notediv{
  display: flex;
  flex-direction: row;
justify-content: safe;
gap: 10px;
padding-left: 10px;
}
.remarks{
  margin-top: 30px;
}
.note{
  align-self: flex-start;
  font-size: 10px;
  text-align: left;
}
.notediv2{
  width: 100%;
  display: block;
  margin-top: 10px;
  align-items: flex-start;
}
.gstheading{
  font-size: 11px;
  font-weight: bold;
  margin-left: 20px;
  text-align: left;
}
.gsttextcontainer{
  width: 50%;
}
.gsttext{
  font-size: 9px;
  text-align: justify;
  padding-left: 10px;
  width: 100%;
}
.licence{
  text-align: left;
  font-size: 12px;
  font-family: bold;
  margin-left: 10px;
}
.signcontainer{
  width: 20%;
}
   .challantype {
  font-size: 16px;
  font-weight: bold;
  margin:auto;
  margin-top:20px;
  width:150px;
}
@media print {
            * {
                -webkit-print-color-adjust: exact; /* For Safari */
                color-adjust: exact; /* For modern browsers */
            }
          }
  </style>
      </head>
      <body></body>
  <div class="block-line">
    <div class="topsection">
      <div>
     
  <img src="${ElBase64}" alt="Flowers in Chania" width="100" height="100">
  
   <p class="challan">Challan No.:${data.ChallanNo}</p>
</div>
  <div class="exim">
  <h1>EXIM LOGISTICS PVT. LTD.</h1>
  
  <p>A :DCB-928-931. 9TH Floor, DLF Cybercity, Chandaka Industrial Estate, Patia</p>
  <p>Bhubaneswar-751024, Odisha, India, Phone: (0674) 7107777 to 7887 (110 Lines)</p>
  <p>E-mail:info@eximlogistics.in, Website: www.eximlogistics.com</p>
  <p>CIN NO.: U630120R2006PTC06039</p>
   <p class="challantype">CONSIGNOR COPY</p>
</div>
<div class="qr">
<img src="data:image/png;base64,${qrData}" alt="QR Code" width="150" height="150" >
</div>
</div>
<div class="secondblock" >
<div style="display: grid; grid-template-columns: auto 1fr; gap: 10px; row-gap: 0px;">
  <h4 style="font-weight: bold; margin-block-end: 0.9em;width: 100px;">Cosinor Name & Address:</h4>
  <h4 style="margin-block-end: 0.9em;">${data.ConsignorName}</h4>

  <h4 style="font-weight: bold; margin-block-end: 0.9em;">Loading Place:</h4>
  <h4 style="margin-block-end: 0.9em;">${data.LoadingPoint}</h4>

  <h4 style="font-weight: bold; margin-block-end: 0.9em;">Vehicle No:</h4>
  <h4 style="margin-block-end: 0.9em;">${data.VehicleNo}</h4>

  <h4 style="font-weight: bold; margin-block-end: 0.9em;">Engine No:</h4>
  <h4 style="margin-block-end: 0.9em;"></h4>

  <h4 style="font-weight: bold; margin-block-end: 0.9em;">Chassis No:</h4>
  <h4 style="margin-block-end: 0.9em;"></h4>
</div>

<div style="display: grid; grid-template-columns: auto 1fr; gap: 10px; row-gap: 0px;">
  <h4 style=" font-weight: bold;margin-block-end: 0.9em; width: 100px;">Consignee Name & Address:</h4>
  <h4 style="margin-block-end: 0.9em;">${data.ConsigneeName}</h4>

  <h4 style= "font-weight: bold;margin-block-end: 0.9em;">Unloading Place:</h4>
  <h4 style="margin-block-end: 0.9em;">${data.UnloadingPoint}</h4>

  <h4 style=" font-weight: bold;margin-block-end: 0.9em;">STO NO.:</h4>
  <h4 style="margin-block-end: 0.9em;">123456790</h4>

  <h4 style="font-weight: bold;margin-block-end: 0.9em;">Loading Date:</h4>
  <h4 style="margin-block-end: 0.9em;">${data.LoadDate}</h4>

  <h4 style="font-weight: bold;margin-block-end: 0.9em;">Invoice No.:</h4>
  <h4 style="margin-block-end: 0.9em;">${data.ClientInvoiceNo1} ${data.ClientInvoiceNo2} ${data.ClientInvoiceNo3}</h4>

  <h4 style="font-weight: bold;margin-block-end: 0.9em;">DEL No:</h4>
  <h4 style="margin-block-end: 0.9em;">${data.DelNo}</h4>

  
</div>
</div>


<h5 class="caution">CAUTION: <span>This consignement will not be detained diverted, re-round or rebooked without Consignee Banks written Permission. 
  It will be delivered at the destination.</span></h5>
  <div class="thirdblock">
    <div class="insurancecontainer">
      <h4 class="marginleft" style="margin-top: 0px;">INSURANCE</h4>
      <h4 style="padding-left: 5px;">The Customer has stated that:
      </h4>
      <h4 class="marginleft">he has not insured <span class="or">   OR</span></h4>
      
      <h4 style="padding-left: 5px;">he has insured the Consignment</h4>
      <div class="insuranceblockdiv">
<div class="checkbox" ></div>
<h5 >Company.........................................</h5>
      </div>
      <div class="insuranceblockdiv">
        <div class="checkbox"></div>
        <h5>Policy No................Date...........</h5>
              </div>
              <div class="insuranceblockdiv">
                <div class="checkbox"></div>
                <h5>Amount...................Date................</h5>
                      </div>
    </div>
    <div style="display: grid; grid-template-columns: auto 1fr; gap: 10px; row-gap: 0px;  margin-right:auto;">
      <h4 style="font-weight: bold; margin-block-end: 0.9em; margin-top: 0px;">Driver Name:</h4>
      <h4 style="margin-block-end: 0.9em; margin-top: 0px;">${data.DriverName}</h4>
    
      <h4 style="font-weight: bold; margin-block-end: 0.9em;">D.L No.:</h4>
      <h4 style="margin-block-end: 0.9em;"></h4>
    
      <h4 style="font-weight: bold; margin-block-end: 0.9em;">Mobile No.:</h4>
      <h4 style="margin-block-end: 0.9em;"></h4>
    
      <h4 style="font-weight: bold; margin-block-end: 0.9em;">Voter ID No.:</h4>
      <h4 style="margin-block-end: 0.9em;"></h4>
    
      <h4 style="font-weight: bold; margin-block-end: 0.9em;">Address:</h4>
      <h4 style="margin-block-end: 0.9em;"></h4>
    
      <h4 style="font-weight: bold; margin-block-end: 0.9em;">Adhar No.:</h4>
      <h4 style="margin-block-end: 0.9em;"></h4>
    </div>
    
    <div style="display: grid; grid-template-columns: auto 1fr; gap: 10px; row-gap: 0px; border-left: 1px solid black; margin-right:auto; padding-left:10px">
      <h4 style="font-weight: bold; margin-block-end: 0.9em; margin-top: 0px;">Owner Name:</h4>
      <h4 style="margin-block-end: 0.9em; margin-top: 0px;">${data.OwnerName}</h4>
    
      <h4 style="font-weight: bold; margin-block-end: 0.9em;">PAN No.:</h4>
      <h4 style="margin-block-end: 0.9em;"></h4>
    
      <h4 style="font-weight: bold; margin-block-end: 0.9em;">Mobile No.:</h4>
      <h4 style="margin-block-end: 0.9em;"></h4>
    
      <h4 style="font-weight: bold; margin-block-end: 0.9em;">Address:</h4>
      <h4 style="margin-block-end: 0.9em;"></h4>
    
      <h4 style="font-weight: bold; margin-block-end: 0.9em;">Adhar No.:</h4>
      <h4 style="margin-block-end: 0.9em;"></h4>
    </div>
    
  </div>
 

  <table>
    <tr class="tbbg">
        <th rowspan="2">Package</th>
        <th rowspan="2">Description (Said to Contain)</th>
        <th colspan="3">Loading (Weight SWA)</th>
        <th colspan="3">Unloading (Weight SWA)</th>
        <th rowspan="2">Rate</th>
        <th rowspan="2">Total Amount</th>
    </tr>
    <tr class="tbbg">
        <th>Gross Wt</th>
        <th>Tare Wt</th>
        <th>Net Wt</th>
        <th>Gross Wt</th>
        <th>Tare Wt</th>
        <th>Net Wt</th>
    </tr>
    <tr class="itgbg">
        <td>${data.LoadType}</td>
        <td>${data.MaterialName}</td>
        <td>${data.GrossWt}</td>
        <td>${data.TareWt}</</td>
        <td>${data.NetWt}</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <!-- Total Materials Value row that spans from Loading to Unloading columns -->
        <td colspan="8">Total Materials Value:  ${data.MaterialValues}</td>
        <td>Advance </td>
        <td></td>
    </tr>
    <tr>
        <!-- Balance row aligned with Rate column -->
        <td colspan="8"></td>
        <td>Balance</td>
        <td></td>
    </tr>
</table>

<div class="lastblock" style="display: flex; justify-content: space-between; align-items: flex-start;">
    
  <!-- Left Block -->
  <div class="lastblockdiv" style="flex: 1; border-right: 1px solid #000;">
      <!-- Centered Heading -->
      <p class="center" style="text-align: center; font-weight: bold; ">
          RECEIVER CONFIRMATION
      </p>

      <!-- Table Content with Bottom Lines -->
      <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #000;">
          <h4 style="font-weight: bold; margin: 2px 0; padding-left: 5px;">NO. of Bags:</h4>
          <h4 style="margin: 5px 0; padding-left: 5px;"></h4>
      </div>

      <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #000;">
          <h4 style="font-weight: bold; margin: 5px 0; padding-left: 5px;">Receiving Wt:</h4>
          <h4 style="margin: 5px 0; padding-left: 5px;"></h4>
      </div>

      <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #000;">
          <h4 style="font-weight: bold; margin: 5px 0; padding-left: 5px;">Receiving Dt.:</h4>
          <h4 style="margin: 5px 0; padding-left: 5px;"></h4>
      </div>

      <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #000;">
          <h4 style="font-weight: bold; margin: 5px 0; padding-left: 5px;">Remarks:</h4>
          <h4 style="margin: 5px 0; padding-left: 5px;"></h4>
      </div>

      <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #000;">
          <h4 style="font-weight: bold; margin: 5px 0; padding-left: 5px;">Name of Receiving Person:</h4>
          <h4 style="margin: 5px 0; padding-left: 5px;"></h4>
      </div>

      <div style="display: flex; justify-content: space-between;">
          <h4 style="font-weight: bold; margin: 5px 0; padding-left: 5px;">GRN No.:</h4>
          <h4 style="margin: 5px 0; padding-left: 5px;"></h4>
      </div>

    
  </div>
  
  <!-- Right Block -->
  <div class="lastblockdiv" style="flex: 1;">
      <p class="center" style="text-align: center; font-weight: bold;">
          SEAL NOS.
      </p>
    
      <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #000; margin-top: -7px;">
          <h4 style="font-weight: bold; margin: 2px 0; padding-left: 5px;">EwayBillNo:</h4>
          <h4 style="margin: 5px 0; padding-left: 5px;">${data.EwayBillNo1} ${data.EwayBillNo2} ${data.EwayBillNo3}</h4>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <h4 style="font-weight: bold; margin: 5px 0; padding-left: 5px;"GPS No.></h4>
        <h4 style="margin: 5px 0; padding-left: 5px;">${data.GPSNo}</h4>
    </div>
    <div style="display: flex; justify-content: space-between;">
      <h4 style="font-weight: bold; margin: 5px 0; padding-left: 5px;"></h4>
      <h4 style="margin: 5px 0; padding-left: 5px;"></h4>
  </div>
  <div style="display: flex; justify-content: space-between;">
    <h4 style="font-weight: bold; margin: 5px 0; padding-left: 5px;"></h4>
    <h4 style="margin: 5px 0; padding-left: 5px;"></h4>
</div>
<div style="display: flex; justify-content: space-between;">
  <h4 style="font-weight: bold; margin: 5px 0; padding-left: 5px;"></h4>
  <h4 style="margin: 5px 0; padding-left: 5px;"></h4>
</div>
<div style="display: flex; justify-content: space-between;">
  <h4 style="font-weight: bold; margin: 5px 0; padding-left: 5px;"></h4>
  <h4 style="margin: 5px 0; padding-left: 5px;"></h4>
</div>
<div style="display: flex; justify-content: space-between;">
  <h4 style="font-weight: bold; margin: 5px 0; padding-left: 5px;"></h4>
  <h4 style="margin: 5px 0; padding-left: 5px;"></h4>
</div>
<div style="display: flex; justify-content: space-between;">
  <h4 style="font-weight: bold; margin: 5px 0; padding-left: 5px;"></h4>
  <h4 style="margin: 5px 0; padding-left: 5px;"></h4>
</div>
      <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #000; margin-top: 2px;">
        <h4 style="font-weight: bold; margin: 5px 0; padding-left: 5px ;">Signature & Seal:</h4>
        <h4 style="margin: 5px 0; padding-left: 5px;"></h4>
    </div>
      <div style="display: flex; justify-content: space-between;">
          <h4 style="font-weight: bold; margin: 5px 0; padding-left: 5px;">Remarks:</h4>
          <h4 style="margin: 5px 0; padding-left: 5px;">${data.Remarks}</</h4>
      </div>
  </div>
</div>

<div class="notediv">
<div>
<h3>Note:</h3>
</div>
<div class="notediv2">
  <p class="note">
    1.Carriers is not responsible for Leakage & Breakage
  </p>
  <p class="note">
    2.Weight tolerrance is allowed.........% on loaded weight
  </p>
  <p class="note">
    3.We have carefully read the terms and conditions of the back here of & undertake to abide by the terms & condition
  </p>
  
</div>

</div>


    

    <div class="small-text">
     
      <div class="gsttextcontainer" >
        <p class="gstheading">GST PAYABLE BY:  (Consignee <span>     Consignor</span>)</p>
        
        <p class="gsttext">The Consignment Covered by this set of Special Lorry receipt from shall be stored at the 
          Destination under the control of the Transport Operator and shall be delivered to or the order
          of the Consignee Bank whose name is mentioned in the Lorry receipt. It will under no of circumstances be delivered to anyone without the written authority from the Consignee Bank 
          or its order enclosed on the Consignee copy or on a separate letter of Authority
        </p>
      <p class="licence">CHA Licence No.: 07/2012, Transport Regd. No.: 02/2015</p>
      </div>
     <div class="sign">
<p class="signtext">Signature of Driver</p>
     </div>
     <div class="sign">
<p class="signtext">For EXIM LOGISTICS PVT. LTD</p>
     </div>
    
    </div>
    <p class="systemgen">**SYSTEM GENERATED**</p>
  </div>
</body>
      </html>
    `};
  