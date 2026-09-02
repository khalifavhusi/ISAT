/* =========================================================
   PACKAGE ALLOCATION JAVASCRIPT
   Handles package storage, saving, updating, deleting and display.
   ========================================================= */

const KEY='visionOfLovePackages';
const form=document.getElementById('packageForm');
const table=document.getElementById('packageTable');
function get(){return JSON.parse(localStorage.getItem(KEY)||'[]')}
function save(x){localStorage.setItem(KEY,JSON.stringify(x))}
function render(){const rows=get();table.innerHTML=rows.length?rows.map(r=>`<tr><td>${r.id}</td><td>${r.name}</td><td>${r.type}</td><td>${r.quantity}</td><td>${r.status}</td></tr>`).join(''):'<tr><td colspan="5">No records to display</td></tr>'}
form.addEventListener('submit',e=>{
 e.preventDefault();const rows=get();
 const r={id:packageId.value.trim(),name:packageName.value.trim(),type:packageType.value,quantity:quantity.value,status:status.value};
 const i=rows.findIndex(x=>x.id===r.id);if(i>=0)rows[i]=r;else rows.push(r);save(rows);render();form.reset();
});
updatePackage.onclick=()=>form.requestSubmit();
deletePackage.onclick=()=>{save(get().filter(r=>r.id!==packageId.value.trim()));render()};
clearPackage.onclick=()=>form.reset();
render();