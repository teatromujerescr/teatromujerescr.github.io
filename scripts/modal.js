// Get the modal
var modal = document.getElementById("modalInicio");
/*
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

 modal.style.display = "block";


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it

*/
const wt = new WebTour({ offset: 30, highlight: false });
const steps = [
  {
    element: "#lineaTiempo",
    content:
      "Da clic en cada año de la línea del tiempo y podrás ver en el mapa el listado de obras y montajes dirigidos por mujeres en Costa Rica",
  },
  {
    element: "#mapa",
    content:
      "Cada círculo representa un espacio escénico, según crece el tamaño, así la cantidad de montajes que han habido.",
  },
];

wt.setSteps(steps);

const openModal = () => {
  /*document.body.style.overflow = "hidden";*/
  modal.setAttribute("open", "true");
  document.addEventListener("keydown", escClose);
};

const closeModal = () => {
  /*document.body.style.overflow = "auto";*/
  modal.removeAttribute("open");
  document.removeEventListener("keydown", escClose);
  document.getElementById("modal-overlay").style.display = "none";
  wt.start();
};

const escClose = (e) => {
  if (e.keyCode == 27) {
    closeModal();
  }
};

window.onclick = function (event) {
  if (event.target == modal) {
    closeModal();
  }
};

openModal();

/* preloader*/

document.documentElement.classList.add("js");

// dom is loaded
$(window).on("load", function () {
  // fade out preloader
  $("#preloader").fadeOut("slow", function () {
    $(this).remove();
  });
});
