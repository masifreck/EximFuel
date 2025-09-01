import {ElBase64} from '../components/Elbase';

export const ConsignorHTML = (data, qrData, type) => {
  console.log('qr data ON consignee html', qrData);
  return `
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
      justify-content: space-evenly;
      margin-bottom: 0px;
    }
    .qr{
      margin-right: 2px;
      flex:1;
      align-item:right;
    }
    h1 {
      text-align: center;
      font-size: 18px;
      margin-bottom: 0;
      font-weight: bold;
      margin-bottom: 7px;
    }
    p {
      text-align: center;
      margin-top: 0px;
      font-size: 9px;
      margin-block-end: 0.1em;
    }
    h6 {
      align-self: center;
      margin-top: -8px;
      margin-left: 30px;
      font-size: 12px;
      margin-bottom: 2px;
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
      font-size: 10px;
      width: 100%;
      margin-top: -10px;
    }  
h4  {
      text-align: left;
      margin-top: -10px;
      font-size: 10px;
      width: 100%;
      margin-block-end: 0.9em;
      font-weight: lighter;
    }
    .insurancecontainer{
    flex:1;
      display: grid;
      justify-content: center;
      align-items: center;
      justify-self: center;
      border-right: 1px solid black;
    }
    .center {
      text-align: left;
      font-weight: bold;
      font-size: 10px;
      border-bottom: 1px solid #000;
      margin-top: 0px;
    }
    .secondblock {
      display: flex;
      flex-direction: row;
      gap: 5px;
      justify-content: space-between;
      border-collapse: collapse;
      border-top: 1px solid #000;
border-bottom: 1px solid #000;

      padding: 10px;
      padding-top: 0px;
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
      padding: 2px;
      font-size: 9px;
    }
    th {
      border: 1px solid #000;
      padding: 2px;
      font-size: 9px;
    } 
    .tbbg {
      background-color: #a09e9e;
    }
    .itgbg {
      height: 20px;
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
      margin-top: 20px;
    }
    .signtext{
      font-weight: bold;
      width: 80%;
    }
    .signature-section {
      margin-top: 20px;
    }
    .systemgen{
      font-size: 10px;
      font-weight: bolder;
      text-align: center;
      margin-top: 1px;
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
  margin-top: 0px;
  margin-left: 10px;
  width:150px;
}
.exim {
  flex:4;
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
  font-size: 10px;
  font-weight: bold;
  margin-left: 20px;
  text-align: left;
}
.gsttextcontainer{
  width: 95%;
  margin-top:-10px;
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
  font-size: 12px;
  font-weight: bold;
  margin-left:10px;
  margin-top:2px;
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

      <div style="flex:1 margin-left:10px">
  <img src="${ElBase64}" alt="Flowers in Chania" width="90" height="90" margin-left="20">
 
</div>

  <div class="exim">
  <h1 style="margin-top:-3px;">EXIM LOGISTICS PVT. LTD.</h1>
  <p>A :DCB-928-931. 9TH Floor, DLF Cybercity, Chandaka Industrial Estate, Patia</p>
  <p>Bhubaneswar-751024, Odisha, India, Phone: (0674) 6637777 to 7887 (110 Lines)</p>
  <p>E-mail:info@eximlogistics.in, Website: www.eximlogistics.com</p>
  <p>CHA Licence No.: 07/2012, Transport Regd. No.: 02/2015</p>
    <p class="challantype">${type}</p>
</div>

<div class="qr">
<img style="margin-left:50px;" src="data:image/png;base64,${qrData}" alt="QR Code" width="80" height="80" >
 <p class="challan">Challan No.:${data.ChallanNo}</p>
</div>

</div>

<div class="secondblock" >
<div style="display: grid; grid-template-columns: auto 1fr; gap: 10px; row-gap: 0px; border-right: 1px solid black; padding-right:5px;
padding-top:15px; flex:1;">
  <h4 style="font-weight: bold; margin-block-end: 0.9em;width: 100px;">Cosinor :</h4>
  <h4 style="margin-block-end: 0.9em;">${
    data?.ConsignorName ? data.ConsignorName : ''
  }</h4>

  <h4 style="font-weight: bold; margin-block-end: 0.9em;">Loading Place:</h4>
  <h4 style="margin-block-end: 0.9em;">${
    data?.LoadingPoint ? data.LoadingPoint : ''
  }</h4>

   <h4 style=" font-weight: bold;margin-block-end: 0.9em; width: 100px; margin-top:10px;">Consignee :</h4>
  <h4 style="margin-block-end: 0.9em;margin-top:10px;">${
    data?.ConsigneeName ? data.ConsigneeName : ''
  }</h4>

  <h4 style= "font-weight: bold;margin-block-end: 0.9em;">Unloading Place:</h4>
  <h4 style="margin-block-end: 0.9em;">${data.UnloadingPoint}</h4>

</div>

<div style="display: grid; grid-template-columns: auto 1fr; gap: 10px; row-gap: 0px; border-right: 1px solid black; padding-top:15px; flex:1;" >
 <h4 style="font-weight: bold; margin-block-end: 0.9em;">Vehicle No:</h4>
  <h4 style="margin-block-end: 0.9em;">${
    data?.VehicleNo ? data.VehicleNo : ''
  }</h4>

  <h4 style="font-weight: bold; margin-block-end: 0.9em;">Engine No:</h4>
  <h4 style="margin-block-end: 0.9em;">${
    data?.EngineNo ? data.EngineNo : ''
  }</h4>

  <h4 style="font-weight: bold; margin-block-end: 0.9em;">Chassis No:</h4>
  <h4 style="margin-block-end: 0.9em;">${
    data?.ChassisNo ? data.ChassisNo : ''
  }</h4>

  <h4 style="font-weight: bold; margin-block-end: 0.9em;">Puc Validity:</h4>
  <h4 style="margin-block-end: 0.9em;">${
    data?.PucValidity ? data.PucValidity : ''
  }</h4>

  <h4 style="font-weight: bold; margin-block-end: 0.9em;">Insurance V:</h4>
  <h4 style="margin-block-end: 0.9em;">${
    data?.InsuranceValidity ? data.InsuranceValidity : ''
  }</h4>
    <h4 style="font-weight: bold; margin-block-end: 0.9em;">Unload Contact:</h4>
  <h4 style="margin-block-end: 0.9em;">${
    data?.UnloadingContact
  }</h4>
</div>

<div style="display: grid; grid-template-columns: auto 1fr; gap: 10px; row-gap: 0px; padding-top:15px; flex:1;">

  <h4 style=" font-weight: bold;margin-block-end: 0.9em;">STO NO.:</h4>
  <h4 style="margin-block-end: 0.9em;">${data?.STONo ? data.STONo : ''}</h4>

  <h4 style="font-weight: bold;margin-block-end: 0.9em;">Loading Date:</h4>
  <h4 style="margin-block-end: 0.9em;">${data?.LoadDate? data.LoadDate.split('T')[0] : ''}</h4>

  <h4 style="font-weight: bold;margin-block-end: 0.9em;">Invoice No.:</h4>
  <h4 style="margin-block-end: 0.9em;">${data.ClientInvoiceNo1} </h4>

  <h4 style="font-weight: bold;margin-block-end: 0.9em;">DEL No:</h4>
  <h4 style="margin-block-end: 0.9em;">${data.DelNo}</h4>

    <h4 style="font-weight: bold; width:70%;">EwayBillNo </h4>
          <h4 style="margin-block-end: 0.9em;">${data?.EwayBillNo1  }</h4>
            <h4 style="font-weight: bold; width:70%;">E-Valdity Upto :</h4>
          <h4 style="margin-block-end: 0.9em;">${ data?.EValidity? data.EValidity.split('T')[0] : ''}</h4>

</div>

 
        
  

</div>


<h5 class="caution">CAUTION: <span>This consignement will not be detained diverted, re-round or rebooked without Consignee Banks written Permission. 
  It will be delivered at the destination.</span></h5>

  <div class="thirdblock">
    <div class="insurancecontainer">
      <h4 class="marginleft" style="margin-top: 2px;">INSURANCE</h4>
      <h4 style="padding-left: 5px;">The Customer has stated that:
      </h4>
      <h4 style="padding-left: 5px;">>he has not insured <span class="or">   OR</span></h4>
      
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
    <div style="flex:1; display: grid; grid-template-columns: auto 1fr; gap: 10px; row-gap: 0px;  margin-right:auto;">
      <h4 style="font-weight: bold; margin-block-end: 0.9em; margin-top: 2px;">Driver Name:</h4>
      <h4 style="margin-block-end: 0.9em; margin-top: 2px;">${
        data.DriverName
      }</h4>
    
      <h4 style="font-weight: bold; margin-block-end: 0.9em;">D.L No.:</h4>
      <h4 style="margin-block-end: 0.9em;">${data?.DriverLicenseNo}</h4>
    
      <h4 style="font-weight: bold; margin-block-end: 0.9em;">Mobile No.:</h4>
      <h4 style="margin-block-end: 0.9em;">${data?.DriverContact}</h4>
    
      <h4 style="font-weight: bold; margin-block-end: 0.9em;">Address:</h4>
      <h4 style="margin-block-end: 0.9em;">${
        data?.DriverAddress +
        ' ' +
        data?.DriverStateName +
        ' ' +
        data?.DriverPincode
      }</h4>
    
      <h4 style="font-weight: bold; margin-block-end: 0.9em;">Adhar No.:</h4>
      <h4 style="margin-block-end: 0.9em;">${data?.DriverAadharNo}</h4>
    </div>
    
    <div style="flex:1; display: grid; grid-template-columns: auto 1fr; gap: 10px; row-gap: 0px; border-left: 1px solid black; margin-right:auto; padding-left:10px">
      <h4 style="font-weight: bold; margin-block-end: 0.9em; margin-top: 2px;">Owner Name:</h4>
      <h4 style="margin-block-end: 0.9em; margin-top: 2px;">${
        data.OwnerName
      }</h4>
    
      <h4 style="font-weight: bold; margin-block-end: 0.9em;">PAN No.:</h4>
      <h4 style="margin-block-end: 0.9em;">${data?.OwnerPanNo}</h4>
    
      <h4 style="font-weight: bold; margin-block-end: 0.9em;">Mobile No.:</h4>
      <h4 style="margin-block-end: 0.9em;">${data?.OwnerContactNo}</h4>
    
      <h4 style="font-weight: bold; margin-block-end: 0.9em;">Address:</h4>
      <h4 style="margin-block-end: 0.9em;">${
        data?.OnwerAddress +
        ' ' +
        data?.OwnerStateName +
        ' ' +
        data?.OwnerPincode
      }</h4>
    
      <h4 style="font-weight: bold; margin-block-end: 0.9em;">Adhar No.:</h4>
      <h4 style="margin-block-end: 0.9em;">${data?.OwnerAadharNo}</h4>
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
        <td>${data?.LoadType}</td>
        <td>${data?.MaterialName}</td>
        <td>${data?.GrossWt}</td>
        <td>${data?.TareWt}</</td>
        <td>${data?.NetWt}</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <!-- Total Materials Value row that spans from Loading to Unloading columns -->
        <td colspan="8">Total Materials Value:  ${data?.MaterialValues}</td>
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
  <div class="lastblockdiv" style="flex: 2; border-right: 1px solid #000;">
      <!-- Centered Heading -->
      <p class="center" style="text-align: center; font-weight: bold; margin-top:2px;">
          RECEIVER CONFIRMATION
      </p>

      <!-- Table Content with Bottom Lines -->
      <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #000;">
          <h4 style="font-weight: bold; margin: 1px 0; padding-left: 5px;">NO. of Bags:</h4>
          <h4 style="margin: 1px 0; padding-left: 5px;"></h4>
      </div>

      <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #000;">
          <h4 style="font-weight: bold; margin: 1px 0; padding-left: 5px;">Receiving Wt:</h4>
          <h4 style="margin: 1px 0; padding-left: 5px;"></h4>
      </div>

      <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #000;">
          <h4 style="font-weight: bold; margin: 1px 0; padding-left: 5px;">Receiving Dt.:</h4>
          <h4 style="margin: 1px 0; padding-left: 5px;"></h4>
      </div>

      <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #000;">
          <h4 style="font-weight: bold; margin: 1px 0; padding-left: 5px;">Remarks:</h4>
          <h4 style="margin: 1px 0; padding-left: 5px;"></h4>
      </div>

      <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #000;">
          <h4 style="font-weight: bold; margin: 1px 0; padding-left: 5px;">Name of Receiving Person:</h4>
          <h4 style="margin: 1px 0; padding-left: 5px;"></h4>
      </div>

      <div style="display: flex; justify-content: space-between;">
          <h4 style="font-weight: bold; margin: 1px 0; padding-left: 5px;">GRN No.:</h4>
          <h4 style="margin: 1px 0; padding-left: 5px;"></h4>
      </div>

    
  </div>
  
  <!-- Right Block -->
  <div class="lastblockdiv" style="flex: 1;">
    
   
      <div style="display: flex; justify-content: space-between;">
        <h4 style="font-weight: bold; margin: 1px 0; padding-left: 5px;">GPS No.</h4>
        <h4 style="margin: 1px;margin-top:3px; padding-left: 5px;">${
          data?.GPSNo ? data.GPSNo : ''
        }</h4>
    </div>
    <div style="display: flex; justify-content: space-between;">
      <h4 style="font-weight: bold; margin: 5px 0; padding-left: 5px;"></h4>
      <h4 style="margin: 5px 0; padding-left: 5px;"></h4>
  </div>

   <div style="display: flex; justify-content: space-between;">
          <h4 style="font-weight: bold; margin: 1px 0; padding-left: 5px;">Remarks:</h4>
          <h4 style="margin: 1px 0; padding-left: 5px;">${
            data?.Remarks ? data.Remarks : ''
          }</</h4>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <h4 style="font-weight: bold; margin: 5px 0; padding-left: 5px ;">Seal:</h4>
        <h4 style="margin: 5px 0; padding-left: 5px;">${
          data?.SealNo ? data.SealNo : ''
        }</h4>
    </div>
   
  </div>
</div>

<div class="notediv">
<div>
<h3>Note:</h3>
</div>
<div class="notediv2">
  <p class="note">
    1.Carriers is not responsible for Leakage & Breakage  2.Weight tolerrance is allowed.........% on loaded weight
      3.We have carefully read the terms and conditions of the back here of & undertake to abide by the terms & condition
  </p>
  <p class="note">
   
  </p>
  <p class="note">
  
  </p>
  
</div>

</div>


    

    <div class="small-text">
     
      <div class="gsttextcontainer" >
        <p class="gstheading">GST PAYABLE BY:  (Consignee <span>     Consignor</span>)</p>
        
        <p style="font-size:8px;text-align: justify;" class="gsttext">The Consignment Covered by this set of Special Lorry receipt from shall be stored at the 
          Destination under the control of the Transport Operator and shall be delivered to or the order
          of the Consignee Bank whose name is mentioned in the Lorry receipt. It will under no of circumstances be delivered to anyone without the written authority from the Consignee Bank 
          or its order enclosed on the Consignee copy or on a separate letter of Authority
        </p>
      
      </div>
 
    
    </div>
    
    <div style="display:flex; flex-drirection:row; justify-content:center; gap:10px;padding:5px; ">
    <div style="text-align: justify; width:100%"; >
    <p style="font-size:8px;text-align: justify;">TERMS AND CONDITIONS

Goods are accepted and carried under the terms and conditions.</p>
  <p style="font-size:7px;text-align: justify;">
01. Subject to order of the company's proper business policy and good will of the company. Anybody carrying, selling, or purchasing if in the name of company, in any form, for the purpose of making profit, without the written consent of the company's board would attract criminal proceedings as per Law of the Country.
</p>
  <p style="font-size:7px;text-align: justify;">
02. The freight is for the whole consignment. No part load or part payment will be considered for payment and the Balance Payment would be forfeited by the company.
</p>
  <p style="font-size:7px;text-align: justify;">
03. The freight is accepted for the transport by air, road and rail entirely at the risk and responsibilities of the Consignor.
</p>
  <p style="font-size:7px;text-align: justify;">
04. The company will not receive or carry goods banned by Law. Transportation of Explosives, inflammable and chemical hazardous items should have proper Permission / Licence from the Government and Way Bill. This type of goods should be properly packed and loaded by proper persons with proper instruments. Weight / measurements of all goods / parcels of goods should be intimated to the company beforehand, so that proper vehicle with necessary carrying licence could be arranged by the company. And if due to any wrong information and concealment of facts by the Consignor, the company suffers from any penalty, loss, damage or confiscation of goods from the State as per the demand of the company, the decision of the Company in this regard is final and binding on the Consignor.
</p>
  <p style="font-size:7px;text-align: justify;">
05. The company will not be responsible for any loss or damage to the goods arising out of the Act of God, unexpected and unforeseen circumstances, riots, emergencies, riot and civil commotion, theft, robbery, fire, accident and any kind of accident whatsoever.
</p>
  <p style="font-size:7px;text-align: justify;">
06. All the material loading by the transporter company is always being done in the presence of the owner / driver owner's representative(s) / company's employee(s) appointed by the owner / driver (owner's representative), unanimously certified by the owner / driver (owners representative). In case the said materials found damaged / contaminated / pilferage / mixed with other goods / less amount of materials / less weight of goods / less quantity of goods as per laboratory report / manual comparison to the loading point weight mineral, found with more moisture than the loading point analyzed moisture,
 then the entire loading of the losses including fine, penalty with statutory levy / taxes / GST over the losses as applicable by different central / state govt. agencies / bodies / department and offices from the driver / owner will have to be compensated by the driver / owner from his own account during the period, such losses / damages will be finalized with the appointment of 3rd party surveyor (if satisfied by the owner / driver) and till the period such losses / damages to be paid / compensated by the owner / driver owner's representative(s) in full with the Company's Headquarter (Company) / Branch office (Company) / Sub-Branch office (Company) or 3rd party, the company can take any legal action against the owner / driver (owner's representative) of the vehicle as deemed
  fit in that case to recover the loss. Delay payment of losses includes legal/bank interest.
 </p>

    </div>

    <div style="text-align: justify; width:100%";>
 <p style="font-size:7px;text-align: justify;">
     then the entire loading of the losses including fine, penalty with statutory levy / taxes / GST over the losses as applicable by different central / state govt. agencies / bodies / department and offices from the driver / owner will have to be compensated by the driver / owner from his own account during the period, such losses / damages will be finalized with the appointment of 3rd party surveyor (if satisfied by the owner / driver) and till the period such losses / damages to be paid / compensated by the owner / driver owner's representative(s) in full with the Company's Headquarter (Company) / Branch office (Company) / Sub-Branch office (Company) or 3rd party, the company can take any legal action against the owner / driver (owner's representative) of the vehicle as deemed
  fit in that case to recover the loss. Delay payment of losses includes legal/bank interest.</p>
    <p style="font-size:7px;text-align: justify;">07. During and on timely required E-Way Bill of the loaded materials shall exclusively done by the driver of the vehicle failing which if the vehicle enters into any kind of violations regarding E-Way Bill, the loss caused out of the same reason shall be borne by the driver.
</p>
<p style="font-size:7px;text-align: justify;">
08. The company reserve the right to itself for cancellation of transport, detention and delay delivery at the destination.
</p>
<p style="font-size:7px;text-align: justify;">
09. All cases regarding the consignment would be settled only at Bhubaneswar, subject to the company rules, regulations and that is final and binding on the consignor.
</p>
<p style="font-size:7px;text-align: justify;">
10. Perishable goods are accepted at Consignor's risk.
</p>
<p style="font-size:7px;text-align: justify;">
11. The employees and the agents of the company are not authorised to alter the above Terms and Conditions in any case.
</p>
<p style="font-size:7px;text-align: justify;">
12. All the charges applicable / collected by the agencies of the Government, on the way should be paid by the consignee.
</p>
<p style="font-size:7px;text-align: justify;">
13. The company is not responsible for any leakage and breakage of the goods, whatever the cause may be.
</p>
<p style="font-size:7px;text-align: justify;">
DECLARATION

I <b>${+' ' + data?.DriverName + ''}</b> driver of the Vehicle No. <b> ${
    +' ' + data?.VehicleNo + ' '
  } </b> valid DL No.<b> ${
    ' ' + data?.DriverLicenseNo + ' '
  }</b> do here by declare that I have read and understood the above mentioned Terms and Condition properly and again hereby promising to be abided myself with all the terms and condition.
</p>
<div style="display: flex; flex-direction:row; width:100%; justify-content:space-evenly; margin-top:50px">
    <div >
<p class="signtext">Signature of Driver</p>
     </div>
     <div >
<p class="signtext">For EXIM LOGISTICS PVT. LTD</p>
     </div>
</div>
    </div>
    </div>
  </div>
</body>
      </html>
    `;
};
