// Color steps for the gradient
var gradientSteps = {
    '0%': '#8dc7d2',
    '33%': '#d8b26d',
    '100%': '#f3766d'
  };
  var gradientDirection = 'v'; // Either Horizontal (h) or Vertical (v)
   // Change it to 'h' to see a horizontal gradient
  
  // Initializing Chart
  // Just some data and c3 options
  var traffic = c3.generate({
    bindto: '#traffic-chart',
    padding: {
      left: 12,
      right: 12
    },
      size: {
          width: 320,
          height: 100
      },
      data: {
          columns: [
        ['data', 50, 70, 70, 42, 50, 80, 90, 90, 52, 22, 20, 52, 48, 42, 54, 20, 19, 24, 40, 82, 78, 52, 51, 62, 62]
       ],
          types: {
              data: 'spline'
          }
      },
      axis: {
          y: {
              show: false
          },
          x: {
              show: false
          }
      },
      legend: {
          show: false
      },
      tooltip: {
          show: false
      },
      point: {
          show: false
      }
  });
  
  // Just some interval to view "live" data
  var dataInt = true;
  setInterval(function() {
    if (dataInt) {
      traffic.load({
        columns: [['data', 32, 52, 60, 44, 52, 78, 92, 90, 54, 18, 8, 50, 52, 50, 54, 24, 20, 26, 44, 84, 78, 52, 55, 62, 62]]
      });
      dataInt = false;
    } else {
      traffic.load({
        columns: [['data', 50, 70, 70, 42, 50, 80, 90, 90, 52, 22, 20, 52, 48, 42, 54, 20, 19, 24, 40, 82, 78, 52, 51, 62, 62]]
      });
      dataInt = true;
    }
  }, 1600);
  
  
  // Create element for the SVG
  function svgElement(element, attr) {
    el = $(document.createElementNS('http://www.w3.org/2000/svg', element));
    return el.attr(attr);
  }
  
  if (gradientDirection == 'v') {
    var x2 = '0%';
    var y1 = '100%';
  } else if (gradientDirection == 'h') {
    var x2 = '100%';
    var y1 = '0%';
  }
  
  // Create a linearGradient and add it to the C3 SVG Chart
  var grad = svgElement('linearGradient', {id: 'bgGradient', x1: '0%', x2: x2, y1: y1, y2: '0%'}).appendTo('#traffic-chart svg defs');
  
  // Add each step to the gradient
  $.each(gradientSteps, function(offset, color){
    svgElement('stop', {'style':'stop-color:'+gradientSteps[offset], 'offset': offset}).appendTo('#traffic-chart svg defs #bgGradient');
  });
   