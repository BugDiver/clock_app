var below20 = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen']
var tens = ['twenty', 'thirty', 'forty', 'fifty']

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
   $.get('update',{date : new Date().toLocaleTimeString()} ,function(data){
      revertColor();
      showTime(data);
   });
}

var onLoad = function(){
   setInterval(updateClock ,1000);
}

$(document).ready(onLoad);
