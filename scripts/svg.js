 var beforePan;
var tablet = 768;

var setInteraction = () => {
  
  var eventsHandler;

        eventsHandler = {
          haltEventListeners: ['touchstart', 'touchend', 'touchmove', 'touchleave', 'touchcancel']
        , init: function(options) {
            var instance = options.instance
              , initialScale = 1
              , pannedX = 0
              , pannedY = 0

            // Init Hammer
            // Listen only for pointer and touch events
            this.hammer = Hammer(options.svgElement, {
              inputClass: Hammer.SUPPORT_POINTER_EVENTS ? Hammer.PointerEventInput : Hammer.TouchInput
            })

            // Enable pinch
            this.hammer.get('pinch').set({enable: true})

            // Handle double tap
            this.hammer.on('doubletap', function(ev){
              instance.zoomIn()
            })

            // Handle pan
            this.hammer.on('panstart panmove', function(ev){
              // On pan start reset panned variables
              if (ev.type === 'panstart') {
                pannedX = 0
                pannedY = 0
              }

              // Pan only the difference
              instance.panBy({x: ev.deltaX - pannedX, y: ev.deltaY - pannedY})
              pannedX = ev.deltaX
              pannedY = ev.deltaY
            })

            // Handle pinch
            this.hammer.on('pinchstart pinchmove', function(ev){
              // On pinch start remember initial zoom
              if (ev.type === 'pinchstart') {
                initialScale = instance.getZoom()
                instance.zoomAtPoint(initialScale * ev.scale, {x: ev.center.x, y: ev.center.y})
              }

              instance.zoomAtPoint(initialScale * ev.scale, {x: ev.center.x, y: ev.center.y})
            })

            // Prevent moving the page on some devices when panning over SVG
            options.svgElement.addEventListener('touchmove', function(e){ e.preventDefault(); });
          }

        , destroy: function(){
            this.hammer.destroy()
          }
        }
  
  let wW = $(window).width() <= tablet
  
  beforePan = function (oldPan, newPan) {
    var stopHorizontal = false,
      stopVertical = false,
      gutterWidth = 1200,
        gutterHeight = 800
    
    if (wW) {
      gutterWidth=200;
      gutterHeight = 200;
    }
      // Computed variables
      sizes = this.getSizes()
      leftLimit = 
        -((sizes.viewBox.x + sizes.viewBox.width) * sizes.realZoom) +
        gutterWidth,
      rightLimit = sizes.width - gutterWidth - sizes.viewBox.x * sizes.realZoom,
      topLimit =
        -((sizes.viewBox.y + sizes.viewBox.height) * sizes.realZoom) +
        gutterHeight,
      bottomLimit =
        sizes.height - gutterHeight - sizes.viewBox.y * sizes.realZoom;

    //console.log(`${bottomLimit} ${topLimit}`)
    
    customPan = {};
    customPan.x = Math.max(leftLimit, Math.min(rightLimit, newPan.x));
    customPan.y = Math.max(topLimit, Math.min(bottomLimit, newPan.y));

    //console.log(customPan)
    
    
    
    return customPan;
    
    
      
    
  };
 
  console.log("loaded");
  window.panzoom = svgPanZoom("#baseMapa", {
    zoomEnabled: true,
    mouseWheelZoomEnabled: false,
    controlIconsEnabled: true,
    center: false,
    fit: true,
    minZoom: 0.71,
    beforePan: beforePan,
    maxZoom: 5,
    contain: true,
    refreshRate: 'auto',
    customEventsHandler: eventsHandler
  });

  
  //magnify("baseMapa", 3);
  
  console.log("aa")
  document.getElementById("svg-pan-zoom-controls").removeAttribute("transform");
  
};

var showYear = (year) => {
  $(".activeYear").addClass("noVisible").removeClass("activeYear");
  $(".activeYearLinea").addClass("noVisible").removeClass("activeYearLinea");
  //console.log($(".activeYear"));
 // $("#_" + year + "_TEATROS").removeClass("noVisible");
  $("#_" + year + "_OBRAS_PRESENTADAS").removeClass("noVisible");
  //$("#_" + year + "_TEATROS").addClass("activeYear");
  $("#_" + year + "_OBRAS_PRESENTADAS").addClass("activeYear");
  $("#_" + year + "_encendido").removeClass("noVisible");
  $("#_" + year + "_TEATROS_l").removeClass("noVisible");
  $("#_" + year + "_encendido").addClass("activeYear");
  $("#_" + year + "_TEATROS_l").addClass("activeYearLinea");

  
};







function back2Top() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
  
}



