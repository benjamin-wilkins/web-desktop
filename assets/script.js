var desktop_icons = [
  {
    "page": "welcome.html",
    "name": "Welcome",
    "icon": "info-circle-fill",
    "width": "350",
    "height": "200"
  },
  {
    "page": "clock.html",
    "name": "Clock",
    "icon": "clock-fill",
    "width": "400",
    "height": "450"
  }
];

desktop = document.getElementById("desktop");

for (n=0; n<desktop_icons.length; n++) {
  button = `
  <button type="button" class="btn btn-outline-dark m-4" onclick="windowButton('${desktop_icons[n]["page"]}', '${desktop_icons[n]["width"]}', '${desktop_icons[n]["height"]}')">
    <i class="bi-${desktop_icons[n]["icon"]}" style="font-size: 3rem"></i>
    <br>
    ${desktop_icons[n]["name"]}
  </button>
  `;
  desktop.innerHTML += button;
};

i = 0;

windowButton("welcome.html", "350", "200");

function windowButton(name, width, height) {
  createWindow(i, name, width, height);
  i++;
};

function bringToTop(num) {
  for (n=0; n<i; n++) {
    document.getElementById(`window${n}`).style.zIndex = 100;
  };
  document.getElementById(`window${num}`).style.zIndex = 105;
};

function createWindow(id, name, width, height) {
  var window_container = document.createElement("div")
  var draggable_window = `
  <div id="window${id}" style="position: absolute; width: ${width}px; height: ${height}px; left: 50%; top: 50%; transform: translateX(-50%) translateY(-50%)" class="shadow rounded alert alert-dismissible fade show bg-white" onclick="bringToTop(${i})">
    <button type="button" class="close" aria-label="Close" data-dismiss="alert">
        <span aria-hidden="true">&times;</span>
      </button>
    <div id="window${id}header" style="cursor: move" class="bg-dark rounded text-center">
      <span class="text-light">Window 1</span>
    </div>
    <iframe id="iframe${id}" style="height: calc(${height}px-2rem); width:100%" src="/web-desktop/windows/${name}"></iframe>
  </div>
  `;
  
  window_container.innerHTML += draggable_window;
  desktop.appendChild(window_container)
  document.getElementById(`iframe${id}`).onload = function(){
    document.getElementById(`window${id}header`).innerHTML = `<span class="text-light">${document.getElementById("iframe"+id).contentDocument.title}</span>`
  };
  dragElement(document.getElementById(`window${id}`));

  for (n=0; n<id; n++) {
    dragElement(document.getElementById(`window${n}`));
  };
};

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  };

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  };

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  };

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  };
};
