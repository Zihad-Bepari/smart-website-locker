let sites = {}; 

function init() {
  chrome.storage.local.get(["sites"], (data) => {
    sites = data.sites || {};
    render();
  });
}

init();

document.getElementById("add").onclick = () => {
  const siteInput = document.getElementById("site");
  const passInput = document.getElementById("pass");
  
  const site = siteInput.value.trim();
  const pass = passInput.value.trim();

  if (!site || !pass) return;

  sites[site] = pass;
  
  render();

  chrome.storage.local.set({ sites });

  siteInput.value = "";
  passInput.value = "";
};

function removeSite(siteName) {
  delete sites[siteName]; 
  
  render(); 
  
  chrome.storage.local.set({ sites }); 
}

document.getElementById("saveGlobal").onclick = () => {
  const globalPassword = document.getElementById("globalPass").value;
  chrome.storage.local.set({ globalPassword });
};

function render() {
  const list = document.getElementById("list");
  list.innerHTML = "";

  Object.keys(sites).forEach(site => {
    const li = document.createElement("li");
    li.style.display = "flex";
    li.style.alignItems = "center"; 
    li.style.position = "relative"; 
    li.style.marginBottom = "10px"; 
    li.style.marginTop = "0px";    
    li.style.padding = "0 10px";    
    li.style.minHeight = "50px";    

    const span = document.createElement("span");
    span.innerText = site;
    span.style.flex = "1";
    span.style.textAlign = "left";
    span.style.fontSize = "18px";   
    span.style.fontWeight = "500";
    span.style.color = "white";      
    span.style.margin = "0";          

    const delBtn = document.createElement("button");
    delBtn.innerText = "Remove";
    delBtn.style.position = "absolute";
    delBtn.style.right = "10px";      
    delBtn.style.width = "90px";     
    delBtn.style.height = "32px";     
    delBtn.style.fontSize = "14px";
    delBtn.style.cursor = "pointer";
    delBtn.style.borderRadius = "5px"; 
    delBtn.style.backgroundColor = "#cf301b"; 
    delBtn.style.color = "white";
    delBtn.style.border = "none";
    delBtn.style.marginTop = "0";      
    delBtn.style.marginBottom = "0";   
    
    delBtn.onclick = () => removeSite(site);

    li.appendChild(span);
    li.appendChild(delBtn);
    list.appendChild(li);
});
}