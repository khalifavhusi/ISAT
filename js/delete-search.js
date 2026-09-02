/* =========================================================
   DELETE / SEARCH JAVASCRIPT
   Handles Family ID searching and record deletion.
   ========================================================= */

let current=null;
const KEY='visionOfLoveFamilies';
const get=()=>JSON.parse(localStorage.getItem(KEY)||'[]');
const show=(r)=>{
 current=r;
 foundFamilyId.textContent=r?.familyId||'-';
 foundName.textContent=r?.name||'-';
 foundSurname.textContent=r?.surname||'-';
 foundMembers.textContent=r?.members||'-';
 foundPackage.textContent=r?.package||'-';
 foundDate.textContent=r?.collectionDate||'-';
};
searchButton.onclick=()=>{
 const id=searchId.value.trim();
 show(get().find(r=>r.familyId===id)||null);
};
deleteButton.onclick=()=>{
 if(!current)return;
 localStorage.setItem(KEY,JSON.stringify(get().filter(r=>r.familyId!==current.familyId)));
 show(null);
};
clearSearch.onclick=()=>{searchId.value='';show(null)};
