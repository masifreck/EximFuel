
import { ElBase64 } from "../components/Elbase";
export const FuelSlip =(data)=>{ 
    return`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <title>Challan</title>
<style>
 body {
      font-family: "Times New Roman", Times, serif;
      padding: 0px;
      box-sizing: border-box;
      border-width: 2px;
      border-color: #000;
      height: 100%;
      width: 90%;
        margin-left: auto;
        margin-right: auto;
    }
    .maincontainer {
      width: 100%;
    height: 100%; /* Thickness of the line */
    border-width: 1px;/* Color of the line */
    border-color: #000;
    padding: 20px 0; 
    border: 1px solid #000;
    padding-top: 5px;
    width: 100%;
    
    }
    .topcontainer{
        display: flex;
        flex-direction: row;
        gap: 10px;
        align-items: center;
        padding-left: 5px;
        padding-right: 20px;
    }
    .logo{
        width: 100px;
        margin-bottom: 60px;
    }
    h1{
        font-size: 20px;
        margin-bottom: -10px;
    }
    .exim{
        width: 100%;
        align-items: center;
        text-align: center;
    }
    .justify{
        text-align: center;
        margin-block-end: 1em;
        margin-bottom: -10px;
        font-size: 10px;
    }
        .text{
        font-size:12px}
    .eximtext{
        margin-block-end: 1em;
        margin-bottom: -10px;
        font-size: 10px;
    }
    .freightmemo{
        background: #898686;
        text-align: center;
        width: 30%;
        border-radius: 5px;padding: 5px;
         margin-left: auto;
        margin-right: auto;
        
    }
    .secondcontainer{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center; 
        padding-right: 80px;
        padding-left: 10px;
    }
    mainbody{
        padding: 10px;
    }
    .lastcontainer{
        display: flex;
        flex-direction: row;
        padding: 10px;
        justify-content: space-between;

    }
    .sign{
        font-weight: bold;
        font-size: 11px;
    }
    .bottom{
        border-top: 1px solid #000;
        padding-left: 10px;
    }
    .notetext{
        font-size: 11px;
    }
  
    </style>
      </head>
      <body></body>
<div class="maincontainer">
    <div class="topcontainer">
        <div class="logo">
        <img src="${ElBase64}" alt="Flowers in Chania" width="70" height="70">
    </div>
        <div class="exim">
        <h1>EXIM LOGISTICS PVT. LTD.</h1>
        <p class="justify">A :DCB-928-931. 9TH Floor, DLF Cybercity, Chandaka </p>
        <p class="justify">Industrial Estate, Patia Bhubaneswar-751024, Odisha, India</p>
       <p class="justify">Phone: (0674)7107777 to 7887 (110 Lines)</p>
        <p class="eximtext">E-mail:info@eximlogistics.in, Website: www.eximlogistics.com</p>
        <p style="font-weight: bold;" class="eximtext">CIN NO.: U630120R2006PTC06039</p>
        <p class="freightmemo">Fuel Slip</p>
      </div>
    </div>
<div class="secondcontainer">
    <div>
<p class="text" style="margin-block-end: 0em; margin-top: 20px;font-weight: bold;">Challan No: ${data.ChallanNo}</p>
    </div>
    <div>

<p class="text" style="margin-block-end: 0em; margin-top: 0px; font-weight: bold;">Slip No.</p>
<p class="text" style="margin-block-end: 0em; margin-top: 0px; font-weight: bold;">Load Date.: ${data.LoadDate}</p>
    </div>
</div>
<div class="mainbody" style="display: grid; grid-template-columns: auto 1fr; gap: 10px; padding: 10px; row-gap: 0px;">
    <p  class="text" style="font-weight: bold; margin-block-end: 0em;">1. Vehicle No.:</p>
    <p  class="text" style="margin-block-end: 0em;">${data.VehicleNo}</p>
  
    <p  class="text" style="font-weight: bold; margin-block-end: 0em;">2. Sector:</p>
    <p  class="text" style="margin-block-end: 0em;"></p>
  
    <p  class="text"  class="eximtext" style="font-weight: bold; margin-block-end: 0em;">3. Amount:</p>
    <p  class="text" style="margin-block-end: 0em;"></p>
    <p  class="text"  class="eximtext" style="font-weight: bold; margin-block-end: 0em;">4. Pump:</p>
    <p  class="text" style="margin-block-end: 0em;">${data.PumpName}</p>
  </div>
  <div class="lastcontainer">
<div>
    <p class="sign">Supervisor Sign</p>
</div>
<div>
    <p class="sign">Driver Sign.</p>
</div>
<div>
    <p class="sign">Pump Auth. Sign.</p>
    <p style="text-align: center;" class="sign">& Seal</p>
</div>

  </div>

</div>
</body>
      </html>
    `};
  