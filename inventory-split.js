// add menu button when spreadsheet opens
function onOpen() {
  var spreadsheet = SpreadsheetApp.getActive();
  var menuItems = [
    {name: 'Shop Between Stores', functionName: 'shop'}
  ];
  spreadsheet.addMenu('Shop', menuItems);
}
  

function shop(){

  // open a dialogue box that asks what percentage of toys they want to keep in Asheville
  var ui = SpreadsheetApp.getUi(); 
  var result = ui.prompt(
      'What percentage of toys would you like to keep in Asheville?',
      'Please enter as a decimal, i.e. for 40% enter 0.4:',
      ui.ButtonSet.OK_CANCEL);

  // Process their response
  var button = result.getSelectedButton();
  if (button == ui.Button.OK) {
    var toAvl = result.getResponseText();
    var toHvl = 1 - toAvl;
    ui.alert('Cool beans, shopping now!');
  } else {
    ui.alert('Fiddlesticks! I can\'t shop unless you give me a percentage!');
  }
  
  
  // collect data from the Asheville sheet
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("avl");
  var startRow = 6;// star at row 6 because rows 1-5 is headers
  var lastRow = sheet.getLastRow();// find the last row
  
// grab the column with the UPC code
  var range = sheet.getRange(6,3,lastRow+1-startRow);
  var numRows = range.getNumRows();
  var Code= range.getValues();

  //grab the description 
  var range= sheet.getRange(6,4,numRows);
  var Description = range.getValues();
  
  // grab bin location
  var range = sheet.getRange (6,5,numRows);
  var avlBin = range.getValues();
  
  // grab on hand quantity
  var range = sheet.getRange(6,6,numRows);
  var avlOnHand = range.getValues();
  
  // now grab Hendersonville's Bin Location and On Hand Quantity! (Description and UPC Code are the same at both stores, so no reason to grab those twice!)
  
var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("hvl");
  
  var range = sheet.getRange (6,5,numRows);
  var hvlBin = range.getValues();
  
  var range = sheet.getRange(6,6,numRows);
  var hvlOnHand = range.getValues();
  
  // create a document for the shopping list that Asheville will pull for Hendersonville
  var avlToHvl = DocumentApp.create("From Asheville to Hendersonville");
  var today = new Date();
  avlToHvl.getBody().appendParagraph(today);
  avlToHvl.appendParagraph("Hi Asheville! Here's a list of stuff to pull for Hendersonville:");
        
 //create a document for the list that Hendersonville will pull for Asheville
 var hvlToAvl = DocumentApp.create("From Hendersonville to Asheville"); 
 hvlToAvl.getBody().appendParagraph(today);
 hvlToAvl.appendParagraph("Hi Hendersonville! Here's a list of stuff to pull for Asheville:");

  
 // Loop through the data
 for (i=0; i<= numRows; i++){
   var CodeValue = Code[i];
   var DescriptionValue = Description[i];
   var avlBinValue = avlBin[i];
   var avlOnHandValue = Math.floor(avlOnHand[i]);
   var hvlBinValue = hvlBin[i];
   var hvlOnHandValue = Math.floor(hvlOnHand[i]);

   // if Asheville has more of a given item than Hendersonville:
   if (avlOnHandValue > hvlOnHandValue){
     var total =  avlOnHandValue + hvlOnHandValue;
     var send = avlOnHandValue - (total * toAvl) // THIS PERCENTAGE CAN CHANGE! (for example, if you want avl to get 40% of the inventory, change to 0.4
      if (send < 0){
       hvlToAvl.appendListItem((send * -1) + "   " + DescriptionValue +"    " + CodeValue +"    " + hvlBinValue);
     } else {
       avlToHvl.appendListItem(send + "    " + DescriptionValue +"    " + CodeValue +"    " + avlBinValue)}
   
  // if Hendersonville has more of a given item than Asheville
   } else if (hvlOnHandValue > avlOnHandValue) {
       var total = avlOnHandValue + hvlOnHandValue
       var send = hvlOnHandValue - (total * toHvl) // THIS PERCENTAGE CAN ALSO CHANGE!
       if (send < 0){
       avlToHvl.appendListItem((send * -1) + "   " + DescriptionValue +"    " + CodeValue +"    " + avlBinValue);
     } else {
     hvlToAvl.appendListItem(send + "    " + DescriptionValue +"    " + CodeValue +"    " + avlBinValue) ;       
  
   
   }
}
   }
 }
