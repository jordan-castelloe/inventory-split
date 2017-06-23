# Inventory Split for Dancing Bear Toys

This script is bound to a Google Sheet. Here's how it works:

1. A staff member from each store runs an On Hand report in Microsoft RMS and uploads the report to a google sheet
  * The reports should be for *everything* in a given category or department, even items out of stock
  * The reports from each store should be formatted exactly the same
2. The staff member clicks "Shop" on the top menu
3. A dialogue box pops up and asks what percentage of inventory they want to keep in Asheville
  * This ratio is based off sales reports in RMS and will vary seasonally and by department/ category
  * For example, if Asheville did 60% of total Lego sales in March last year, they could split Lego 60-40 to Asheville
4. This script finds inventory discrepancies and calculates how many of each item should be transferred between the two stores to achieve the ratio from Step 3.
5. Finally, the script generates two time-stamped Google Docs (one for each store) with a list of inventory to transfer.

A copy of the spreadsheet can be found [here](https://docs.google.com/spreadsheets/d/1kU6wKpYn0l8k5ZF0U13fvMRD8POlyH21zfVFXZeVwp4/edit?usp=sharing) for reference.

