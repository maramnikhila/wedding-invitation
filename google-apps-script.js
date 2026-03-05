/**
 * Wedding Invitation – RSVP to Google Sheets
 * ─────────────────────────────────────────────
 * HOW TO SET UP (one-time, ~5 minutes):
 *
 * 1. Open Google Sheets → create a new spreadsheet.
 *    Name the first sheet tab "RSVPs".
 *    Add these headers in row 1 (columns A–E):
 *      Timestamp | Name | Email | Attendance | Message
 *
 * 2. In the spreadsheet, click Extensions → Apps Script.
 *    Delete any existing code and paste ALL of this file.
 *
 * 3. Click Deploy → New deployment.
 *    - Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 *    Click Deploy and copy the Web App URL.
 *
 * 4. In index.html, replace YOUR_APPS_SCRIPT_URL_HERE
 *    with the URL you just copied.
 *
 * Done! Every RSVP will now appear as a new row in your sheet.
 */

var SHEET_NAME = 'RSVPs';

function doPost(e) {
  try {
    var data    = JSON.parse(e.postData.contents);
    var sheet   = SpreadsheetApp
                    .getActiveSpreadsheet()
                    .getSheetByName(SHEET_NAME);

    sheet.appendRow([
      data.timestamp  || new Date().toISOString(),
      data.name       || '',
      data.email      || '',
      data.attendance || '',
      data.message    || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: lets you test the URL in a browser (GET returns a status check)
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'RSVP endpoint is live' }))
    .setMimeType(ContentService.MimeType.JSON);
}
