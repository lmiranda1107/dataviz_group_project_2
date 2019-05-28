type = ['','info','success','warning','danger'];


demo = {
    initPickColor: function(){
        $('.pick-class-label').click(function(){
            var new_class = $(this).attr('new-class');
            var old_class = $('#display-buttons').attr('data-class');
            var display_div = $('#display-buttons');
            if(display_div.length) {
            var display_buttons = display_div.find('.btn');
            display_buttons.removeClass(old_class);
            display_buttons.addClass(new_class);
            display_div.attr('data-class', new_class);
            }
        });
    },

    checkScrollForTransparentNavbar: debounce(function() {
            $navbar = $('.navbar[color-on-scroll]');
            scroll_distance = $navbar.attr('color-on-scroll') || 500;

            if($(document).scrollTop() > scroll_distance ) {
                if(transparent) {
                    transparent = false;
                    $('.navbar[color-on-scroll]').removeClass('navbar-transparent');
                    $('.navbar[color-on-scroll]').addClass('navbar-default');
                }
            } else {
                if( !transparent ) {
                    transparent = true;
                    $('.navbar[color-on-scroll]').addClass('navbar-transparent');
                    $('.navbar[color-on-scroll]').removeClass('navbar-default');
                }
            }
    }, 17),

    // initDocChartist: function(){
    //     var dataSales = {
    //       labels: ['9:00AM', '12:00AM', '3:00PM', '6:00PM', '9:00PM', '12:00PM', '3:00AM', '6:00AM'],
    //       series: [
    //         [287, 385, 490, 492, 554, 586, 698, 695, 752, 788, 846, 944],
    //         [67, 152, 143, 240, 287, 335, 435, 437, 539, 542, 544, 647],
    //         [23, 113, 67, 108, 190, 239, 307, 308, 439, 410, 410, 509]
    //       ]
    //     };

    //     var optionsSales = {
    //       lineSmooth: false,
    //       low: 0,
    //       high: 800,
    //       showArea: true,
    //       height: "245px",
    //       axisX: {
    //         showGrid: false,
    //       },
    //       lineSmooth: Chartist.Interpolation.simple({
    //         divisor: 3
    //       }),
    //       showLine: false,
    //       showPoint: false,
    //     };

    //     var responsiveSales = [
    //       ['screen and (max-width: 640px)', {
    //         axisX: {
    //           labelInterpolationFnc: function (value) {
    //             return value[0];
    //           }
    //         }
    //       }]
    //     ];

    //     Chartist.Line('#chartHours', dataSales, optionsSales, responsiveSales);


    //     var data = {
    //       labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    //       series: [
    //         [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
    //         [412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636, 695]
    //       ]
    //     };

    //     var options = {
    //         seriesBarDistance: 10,
    //         axisX: {
    //             showGrid: false
    //         },
    //         height: "245px"
    //     };

    //     var responsiveOptions = [
    //       ['screen and (max-width: 640px)', {
    //         seriesBarDistance: 5,
    //         axisX: {
    //           labelInterpolationFnc: function (value) {
    //             return value[0];
    //           }
    //         }
    //       }]
    //     ];

    //     Chartist.Bar('#chartActivity', data, options, responsiveOptions);

    //     var dataPreferences = {
    //         series: [
    //             [25, 30, 20, 25]
    //         ]
    //     };

    //     var optionsPreferences = {
    //         donut: true,
    //         donutWidth: 40,
    //         startAngle: 0,
    //         total: 100,
    //         showLabel: false,
    //         axisX: {
    //             showGrid: false
    //         }
    //     };

    //     Chartist.Pie('#chartPreferences', dataPreferences, optionsPreferences);
    //     const obj = {
    //       labels: ['62%','32%','6%'],
    //       series: [62, 32, 6]
    //     }
    //     Chartist.Pie('#chartPreferences', obj);
    // },

    initChartist: async function(){

        const response = await fetch("/chartdata", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          }
        })

        //Organ Name
        const responseData = await response.json()
        
        let labels = []
        let series = []
        let organTypes = {}
        let organTypesPercentage = {}
        let total = 0
        let statesAbrev = {}

        responseData.data.forEach( _dataColumn => {

          typeof organTypes[_dataColumn.organ_transplantation_type] !== "undefined"
            ? organTypes[_dataColumn.organ_transplantation_type] = organTypes[_dataColumn.organ_transplantation_type] + 1
            : organTypes[_dataColumn.organ_transplantation_type] = 1

          total ++

          typeof statesAbrev[_dataColumn.state_abbreviation] !== "undefined"
            ? statesAbrev[_dataColumn.state_abbreviation] = statesAbrev[_dataColumn.state_abbreviation] + 1
            : statesAbrev[_dataColumn.state_abbreviation] = 1

        })

        for( key in organTypes ){

          if(organTypes.hasOwnProperty(key)){
            const percentage = ( organTypes[key] * 100 ) / total
            organTypesPercentage[key] = percentage
            labels.push(`${percentage.toFixed(0)}%`)

            series.push({
              value: parseInt(percentage.toFixed(0)),
              name: key,
              className: `pie-chart-${key.replace(" ", "-")}`,
              meta: `Meta One-${key}`
            })
          }
        }


        // var dataSales = {
        //   labels: ['9:00AM', '12:00AM', '3:00PM', '6:00PM', '9:00PM', '12:00PM', '3:00AM', '6:00AM'],
        //   series: [
        //     [287, 385, 490, 492, 554, 586, 698, 695, 752, 788, 846, 944],
        //     [67, 152, 143, 240, 287, 335, 435, 437, 539, 542, 544, 647],
        //     [23, 113, 67, 108, 190, 239, 307, 308, 439, 410, 410, 509]
        //   ]
        // };

        // var optionsSales = {
        //   lineSmooth: false,
        //   low: 0,
        //   high: 800,
        //   showArea: true,
        //   height: "245px",
        //   axisX: {
        //     showGrid: false,
        //   },
        //   lineSmooth: Chartist.Interpolation.simple({
        //     divisor: 3
        //   }),
        //   showLine: false,
        //   showPoint: false,
        // };

        // var responsiveSales = [
        //   ['screen and (max-width: 640px)', {
        //     axisX: {
        //       labelInterpolationFnc: function (value) {
        //         return value[0];
        //       }
        //     }
        //   }]
        // ];

        // Chartist.Line('#chartHours', dataSales, optionsSales, responsiveSales);

        //Bar plot using state abbreviations
        var data = {
          labels: Object.keys(statesAbrev),
          series: [
            Object.values(statesAbrev),
          ]
        };

        var options = {
            seriesBarDistance: 10,
            axisX: {
                showGrid: false
            },
            height: "245px"
        };

        var responsiveOptions = [
          ['screen and (max-width: 640px)', {
            seriesBarDistance: 5,
            axisX: {
              labelInterpolationFnc: function (value) {
                return value[0];
              }
            }
          }]
        ];

        Chartist.Bar('#chartActivity', data, options, responsiveOptions);

        // var dataPreferences = {
        //     series: [
        //         [25, 30, 20, 25]
        //     ]
        // };

        // var optionsPreferences = {
        //     donut: true,
        //     donutWidth: 40,
        //     startAngle: 0,
        //     total: 100,
        //     showLabel: false,
        //     axisX: {
        //         showGrid: false
        //     }
        // };

        Chartist.Pie('#chartPreferences', dataPreferences, optionsPreferences);

        Chartist.Pie('#chartPreferences', {
          series: series
        });
    },

    initGoogleMaps: async function(){

      const response = await fetch("/chartdata", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      })

      //Organ Name
      const responseData = await response.json()
      const { data } = responseData


      var myLatlng = new google.maps.LatLng(data[0]["geocoding__primary_y_coordinate"], data[0]["geocoding__primary_x_coordinate"]);
      var mapOptions = {
        zoom: 6,
        center: myLatlng,
        scrollwheel: false, //we disable de scroll over the map, it is a really annoying when you scroll through page
        styles: [{"featureType":"water","stylers":[{"saturation":43},{"lightness":-11},{"hue":"#0088ff"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"hue":"#ff0000"},{"saturation":-100},{"lightness":99}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#808080"},{"lightness":54}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#ece2d9"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#ccdca1"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#767676"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#b8cb93"}]},{"featureType":"poi.park","stylers":[{"visibility":"on"}]},{"featureType":"poi.sports_complex","stylers":[{"visibility":"on"}]},{"featureType":"poi.medical","stylers":[{"visibility":"on"}]},{"featureType":"poi.business","stylers":[{"visibility":"simplified"}]}]

      }
      var map = new google.maps.Map(document.getElementById("map"), mapOptions);
      var infowindow = new google.maps.InfoWindow();

      var marker, i;

      for (i = 0; i < data.length; i++) {  
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(data[i]["geocoding__primary_y_coordinate"], data[i]["geocoding__primary_x_coordinate"]),
          map: map
        });
        
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
          console.log(data[i])
          return function() {
            infowindow.setContent(`A ${data[i]["organ_transplantation_type"]} transplant was done in ${data[i]["county"]}, ${data[i]["state"]} `);
            infowindow.open(map, marker);
          }
        })(marker, i));
      }
  },

	showNotification: function(from, align){
    	color = Math.floor((Math.random() * 4) + 1);

    	$.notify({
        	icon: "pe-7s-gift",
        	message: "Welcome to <b>Light Bootstrap Dashboard</b> - a beautiful freebie for every web developer."

        },{
            type: type[color],
            timer: 4000,
            placement: {
                from: from,
                align: align
            }
        });
	}


}
