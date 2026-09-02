/* =========================================================
   FAMILY RECORDS JAVASCRIPT
   Handles family record storage, automatic Family IDs and display.
   ========================================================= */

/* =========================================================
   STORAGE KEY AND FORM ELEMENTS
   ========================================================= */
const KEY = "visionOfLoveFamilies";
const form = document.getElementById("familyForm");
const table = document.getElementById("familyTable");
const familyIdInput = document.getElementById("familyId");
const packageSelect = document.getElementById("package");
const membersInput = document.getElementById("members");

/* =========================================================
   GET SAVED FAMILY RECORDS
   ========================================================= */
function getFamilies() {
  return JSON.parse(localStorage.getItem(KEY) || "[]");
}

/* =========================================================
   SAVE FAMILY RECORDS
   ========================================================= */
function saveFamilies(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

/* =========================================================
   GENERATE THE NEXT FAMILY ID
   IDs start with C001- followed by a number.
   Example: C001-1, C001-2, C001-3.
   ========================================================= */
function generateFamilyId() {
  const records = getFamilies();
  let highestNumber = 0;

  records.forEach(record => {
    const match = String(record.familyId || "").match(/^C001-(\d+)$/);
    if (match) highestNumber = Math.max(highestNumber, Number(match[1]));
  });

  return `C001-${highestNumber + 1}`;
}

/* =========================================================
   SET A NEW AUTOMATIC FAMILY ID
   ========================================================= */
function setNewFamilyId() {
  familyIdInput.value = generateFamilyId();
}

/* =========================================================
   DISPLAY FAMILY RECORDS
   ========================================================= */
function render() {
  const rows = getFamilies();

  table.innerHTML = rows.length
    ? rows.map(record => `
        <tr>
          <td>${record.familyId}</td>
          <td>${record.name}</td>
          <td>${record.surname}</td>
          <td>${record.members}</td>
          <td>${record.package}</td>
          <td>${record.collectionDate}</td>
        </tr>
      `).join("")
    : '<tr><td colspan="6">No records to display</td></tr>';
}

/* =========================================================
   SAVE FAMILY RECORD
   Family members can be entered manually by the user.
   ========================================================= */
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const records = getFamilies();

  const record = {
    familyId: familyIdInput.value,
    name: document.getElementById("name").value.trim(),
    surname: document.getElementById("surname").value.trim(),
    members: membersInput.value,
    email: document.getElementById("email").value.trim(),
    telephone: document.getElementById("telephone").value.trim(),
    package: packageSelect.value,
    collectionDate: document.getElementById("collectionDate").value
  };

  const existingIndex = records.findIndex(item => item.familyId === record.familyId);

  if (existingIndex >= 0) {
    records[existingIndex] = record;
  } else {
    records.push(record);
  }

  saveFamilies(records);
  render();
  form.reset();
  setNewFamilyId();
});

/* =========================================================
   UPDATE FAMILY RECORD
   Submits the current form values.
   ========================================================= */
document.getElementById("updateFamily").addEventListener("click", function () {
  form.requestSubmit();
});

/* =========================================================
   CLEAR FAMILY FORM
   Clears the fields and creates the next Family ID.
   ========================================================= */
document.getElementById("clearFamily").addEventListener("click", function () {
  form.reset();
  setNewFamilyId();
});

/* =========================================================
   INITIAL PAGE SETUP
   ========================================================= */
setNewFamilyId();
render();
