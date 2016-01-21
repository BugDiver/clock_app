var below20 = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen']
var tens = ['twenty', 'thirty', 'forty', 'fifty']
//
//    var   Clock = {
//    init : function() {
//       Clock.revertColor();
//       Clock.getAMorPM();
//       Clock.civilianTime();
//       Clock.showHours();
//       Clock.showMins();
//    },
//    revertColor : function() {
//       $("span").each(function() {
//          if ($(this).hasClass("color"))
//             $(this).removeClass("color")
//       });
//    },
//    getH : function() {
//       return new Date().getHours();
//    },
//    getM : function() {
//       return new Date().getMinutes();
//    },
//    changeColor : function(spanID) {
//       $(spanID).addClass("color");
//    },
//    getAMorPM : function() {
//       if    Clock.getH() > 11 && Clock.getH() !== 24) {
//          Clock.changeColor(pm);
//       }
//       else {
//          Clock.changeColor(am);
//       };
//    },
//    civilianTime : function() { // convert military time to civilian time
//       if    Clock.getH() > 12) {
//          var civilianTimeHour =  Clock.getH() - 12;
//          return civilianTimeHour;
//       };
//    },
//    showHours : function() { // change color of the word that corresponds to the numerical value, for the hour
//       if (typeof  Clock.civilianTime() != "undefined") {
//          var hToWord = below20[parseInt   Clock.civilianTime())-1]; // if civilianTimeHour exists, that's the numerical value for the hour we should be using
//          Clock.changeColor("#" + hToWord);
//       } else {
//          var hToWord = below20[parseInt   Clock.getH())-1];
//          Clock.changeColor("#" + hToWord); // else, go with the numerical value for the hour retrieved from new Date();
//       };
//    },
//    showMins : function() { // change color of the word that corresponds to the numerical value, for the minutes
//       if    Clock.getM() == 0) {
//          return; // if it's on the hour, don't worry about minute words
//       }
//       if    Clock.getM() < 10 && Clock.getM() > 0) {
//          var mToWord = below20   Clock.getM()-1];
//          Clock.changeColor(oh);
//          Clock.changeColor("#second-" + mToWord); // if it's a single-digit minute
//       } else if   Clock.getM() > 9 &&  Clock.getM() < 20) { // making sure minute words always come after hour words
//          if (  Clock.getM() < Clock.getH() - 12) {
//             var mToWord = below20   Clock.getM()-1];
//             Clock.changeColor("#second-" + mToWord);
//          } else {
//             var mToWord = below20   Clock.getM()-1];
//             Clock.changeColor("#" + mToWord);
//          };
//       } else { // deal with two-digit minute words by splitting the number into two
//          var mTwoDigit =   Clock.getM().toString().split('');
//          var mFirstDigit = tens[parseInt(mTwoDigit[0])-2];
//          var mSecondDigit = below20[parseInt(mTwoDigit[1])-1];
//
//          Clock.changeColor("#" + mFirstDigit);
//          Clock.changeColor("#second-" + mSecondDigit);
//       };
//    }
//    };
//    $(document).ready(function() {
//       setInterval(function() {
//          Clock.init();
//       }, 100);
//    });
//

var changeColor = function(spanID) {
   $(spanID).addClass("color");
};

var showMinutes = function(time){
   if(time.minute < 10 && time.minute > 0){
      changeColor('#second-'+below20[time.minute -1]);
   }
   else if(time.minute > 9 && time.minute < 20) {
      if(time.minute < time.hour - 12)
         changeColor("#second-" + below20[time.minute-1]);
      else
         changeColor("#" + below20[time.minute-1]);
   }
   else {
      var mTwoDigit =   time.minute.toString().split('');
      var mFirstDigit = tens[parseInt(mTwoDigit[0])-2];
      var mSecondDigit = below20[parseInt(mTwoDigit[1])-1];
      changeColor("#" + mFirstDigit);
      changeColor("#second-" + mSecondDigit);
   };
}


var showHours = function(time){
   var hToWord = (time.meridiem == 'pm') && below20[time.hour-12-1] || below20[time.hour-1];
   changeColor('#' + hToWord);
}

var showMeridiem = function(data){
   changeColor('#'+data.meridiem);
}

var revertColor = function() {
   $("span").each(function() {
      if ($(this).hasClass("color"))
         $(this).removeClass("color")
   });
};
var showTime = function(data){
   showHours(data);
   showMinutes(data);
   showMeridiem(data);
};

var updateClock = function(){
   $.get('/update',function(data){
      revertColor();
      showTime(data);
   });
}

var onLoad = function(){
   setInterval(updateClock ,1000);
}

$(document).ready(onLoad);
