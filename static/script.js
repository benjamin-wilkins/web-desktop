var windows = ["/templates/welcome.html"];

desktop = document.getElementById("desktop");

for (let i=0; i<windows.length; i++) {
  var window_container = `
  <div id="window${i}" style="position: absolute; width: 350px; height: 200px" class="shadow rounded alert alert-dismissible fade show bg-white">
    <button type="button" class="close" aria-label="Close" data-dismiss="alert">
        <span aria-hidden="true">&times;</span>
      </button>
    <div id="window${i}header" style="cursor: move" class="bg-dark rounded text-center">
      <span class="text-light">Window 1</span>
    </div>
    <iframe id="iframe${i}" style="height: calc(350px-2rem); width:100%" src="${windows[i]}"></iframe>
  </div>
  `;
  
  desktop.innerHTML += window_container;
  document.getElementById(`iframe${i}`).onload = function(){
    document.getElementById(`window${i}header`).innerHTML = `<span class="text-light">${document.getElementById("iframe"+i).contentDocument.title}</span>`
  };
  dragElement(document.getElementById(`window${i}`));
};

function dragElement(elmnt) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (document.getElementById(elmnt.id + "header")) {
          // if present, the header is where you move the DIV from:
          document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
        } else {
          // otherwise, move the DIV from anywhere inside the DIV:
          elmnt.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
          e = e || window.event;
          e.preventDefault();
          // get the mouse cursor position at startup:
          pos3 = e.clientX;
          pos4 = e.clientY;
          document.onmouseup = closeDragElement;
          // call a function whenever the cursor moves:
          document.onmousemove = elementDrag;
        }

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
        }

        function closeDragElement() {
          // stop moving when mouse button is released:
          document.onmouseup = null;
          document.onmousemove = null;
        }
      }
