const items = [
  {id:1,name:"Spotify App",version:"1.0.0",size:"50 MB",category:"apps",icon:"♫",rating:"4.8",updated:true,info:"Music App",desc:"Music app information.",url:"#"},
  {id:2,name:"Video Player",version:"2.1.0",size:"40 MB",category:"apps",icon:"▶",rating:"4.7",updated:true,info:"Video App",desc:"Video player information.",url:"#"},
  {id:3,name:"Photo Editor",version:"1.2.0",size:"35 MB",category:"apps",icon:"✿",rating:"4.6",updated:true,info:"Photo Editor",desc:"Photo editor information.",url:"#"},
  {id:4,name:"Messenger",version:"3.0.0",size:"25 MB",category:"apps",icon:"✉",rating:"4.5",updated:false,info:"Messaging App",desc:"Messaging app information.",url:"#"},
  {id:5,name:"Racing Game",version:"1.0.0",size:"150 MB",category:"games",icon:"🏎",rating:"4.9",updated:true,info:"Racing Game",desc:"Racing game information.",url:"#"},
  {id:6,name:"Puzzle Game",version:"2.0.0",size:"80 MB",category:"games",icon:"🎮",rating:"4.7",updated:false,info:"Puzzle Game",desc:"Puzzle game information.",url:"#"}
];

let current = items[0];

function appCard(x) {
  return `
    <article class="app" onclick="openItem(${x.id})">
      <div class="art">
        <span class="ribbon">${x.updated ? "UPDATED" : "NEW"}</span>
        ${x.icon}
      </div>
      <h3>${x.name}</h3>
      <div class="meta">${x.version} · ${x.size}</div>
      <div class="stars">★★★★★ <span style="color:#aeb5c2">${x.rating}</span></div>
      <div class="tiny">${x.category.toUpperCase()}</div><br>
    </article>`;
}

function render() {
  const input = document.getElementById("q");
  const q = input ? input.value.toLowerCase() : "";

  const filtered = items.filter(x =>
    (x.name + " " + x.category).toLowerCase().includes(q)
  );

  document.getElementById("homeGrid").innerHTML =
    filtered.filter(x => x.updated).map(appCard).join("");

  document.getElementById("appsGrid").innerHTML =
    filtered.filter(x => x.category === "apps").map(appCard).join("");

  document.getElementById("gamesGrid").innerHTML =
    filtered.filter(x => x.category === "games").map(appCard).join("");

  document.getElementById("trendIcons").innerHTML =
    filtered.slice(0, 6).map(x => `
      <div class="mini" onclick="openItem(${x.id})">
        <div class="ico">${x.icon}</div>
        ${x.name}
      </div>`).join("");
}

function show(id) {
  document.querySelectorAll(".view").forEach(el =>
    el.classList.remove("active")
  );

  document.getElementById(id).classList.add("active");

  document.querySelectorAll(".bottom button").forEach(btn =>
    btn.classList.toggle("active", btn.dataset.view === id)
  );

  window.scrollTo(0, 0);
}

function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.style.display =
    menu.style.display === "none" ? "block" : "none";
}

function openItem(id) {
  current = items.find(x => x.id === id);

  document.getElementById("dtitle").textContent = current.name;
  document.getElementById("dsub").textContent =
    current.version + " · " + current.size;
  document.getElementById("dart").textContent = current.icon;
  document.getElementById("dinfo").textContent = current.info;
  document.getElementById("ddesc").textContent = current.desc;

  document.getElementById("specs").innerHTML = `
    <h3>APP INFO</h3>
    <div class="pair"><span>Version</span><b>${current.version}</b></div>
    <div class="pair"><span>Size</span><b>${current.size}</b></div>
    <div class="pair"><span>Category</span><b>${current.category}</b></div>`;

  document.getElementById("dltitle").textContent =
    current.name + " — Download Links";

  document.getElementById("dlurl").href = current.url;

  show("detail");
}

function checkUrl(event) {
  if (!current.url || current.url === "https://github.com/CHIGIMODS/chigi-mods-site/releases/download/V1.0.0.0/CpCutUltra2027_28.2.0_CHIGI.MODS.APK.com.apk") {
    event.preventDefault();
    alert("Is app ka asli download link abhi add nahi hua hai.");
    return false;
  }
  return true;
}

document.getElementById("q").addEventListener("input", render);

render();
