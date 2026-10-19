// Replace sample entries with apps/files you are authorized to share.
// Put your real download URL in the `url` field.
const items = [
 {id:1,name:"Sample Music App",version:"1.0.0",size:"—",category:"apps",icon:"♫",rating:"4.8",updated:true,description:"Add a short description of this app here.",url:"#"},
 {id:2,name:"Sample Video App",version:"2.1.0",size:"—",category:"apps",icon:"▶",rating:"4.7",updated:true,description:"Add app details, features, and compatibility information.",url:"#"},
 {id:3,name:"Sample Utility",version:"1.2.0",size:"—",category:"apps",icon:"⚙",rating:"4.6",updated:false,description:"Describe what this utility does.",url:"#"},
 {id:4,name:"Sample Game",version:"1.0.2",size:"—",category:"games",icon:"🎮",rating:"4.9",updated:true,description:"Add game details and supported devices.",url:"#"}
];
const $=id=>document.getElementById(id);
let activeFilter="all", selected=null;
function card(item){return `<article class="card" data-id="${item.id}" onclick="openDetail(${item.id})"><div class="ribbon">${item.updated?"UPDATED":item.category.toUpperCase()}</div><div class="appicon">${item.icon}</div><h3>${item.name}</h3><div class="meta">${item.version} · ${item.size}</div><div class="stars">★★★★★ <span class="meta">${item.rating}</span></div><div class="meta"><span class="tag">${item.category.toUpperCase()}</span></div></article>`}
function render(){
 const q=$("search").value.toLowerCase().trim();
 const filtered=items.filter(x=>(activeFilter==="all"||activeFilter==="updated"&&x.updated||activeFilter===x.category)&&(`${x.name} ${x.description}`.toLowerCase().includes(q)));
 $("trending").innerHTML=filtered.slice(0,4).map(card).join("")||"<p class='muted'>No matching apps.</p>";
 $("recent").innerHTML=filtered.filter(x=>x.updated).map(card).join("")||"<p class='muted'>No recently updated apps.</p>";
 $("appsGrid").innerHTML=filtered.filter(x=>x.category==="apps").map(card).join("")||"<p class='muted'>No apps found.</p>";
 $("gamesGrid").innerHTML=filtered.filter(x=>x.category==="games").map(card).join("")||"<p class='muted'>No games found.</p>";
}
function showPage(name){
 document.querySelectorAll("main.page").forEach(p=>p.classList.remove("active"));
 const page=$(name+"Page")||$("homePage"); page.classList.add("active");
 document.querySelectorAll(".bottomnav button").forEach(b=>b.classList.toggle("active",b.dataset.page===name));
 $("menu").classList.remove("open"); window.scrollTo({top:0,behavior:"smooth"});
}
function openDetail(id){
 selected=items.find(x=>x.id===id); if(!selected)return;
 $("detail").innerHTML=`<div class="detail-head"><div class="appicon">${selected.icon}</div><span class="tag">${selected.category.toUpperCase()}</span><h1>${selected.name}</h1><div class="stars">★★★★★ ${selected.rating}</div><p class="muted">${selected.description}</p><div class="btnrow"><button class="btn green" onclick="openDownload()">Download Now</button><button class="btn blue" onclick="openDownload()">Download App</button></div></div><div class="info"><h3>APP INFO</h3><div class="info-row"><span>App name</span><b>${selected.name}</b></div><div class="info-row"><span>Version</span><b>${selected.version}</b></div><div class="info-row"><span>Size</span><b>${selected.size}</b></div><div class="info-row"><span>Category</span><b>${selected.category}</b></div><div class="info-row"><span>Requirements</span><b>Check app publisher</b></div></div><h3 class="section-title">DESCRIPTION</h3><div class="notice">${selected.description}</div>`;
 showPage("detail");
}
function openDownload(){
 if(!selected)return;
 $("downloadTitle").textContent=selected.name+" — Download";
 $("downloadLink").href=selected.url||"#";
 $("downloadLink").onclick=function(e){if(!selected.url||selected.url==="#"){e.preventDefault();alert("Add a real authorized download URL in script.js first.");}};
 showPage("download");
}
$("search").addEventListener("input",render);
document.querySelectorAll(".chip").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".chip").forEach(c=>c.classList.remove("active"));b.classList.add("active");activeFilter=b.dataset.filter;render();}));
document.querySelectorAll(".bottomnav button").forEach(b=>b.addEventListener("click",()=>showPage(b.dataset.page)));
$("menuBtn").addEventListener("click",()=>$("menu").classList.toggle("open"));
$("year").textContent=new Date().getFullYear();render();
