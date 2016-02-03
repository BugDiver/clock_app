var getH = function(time) {
   return time.slice(-11,-9);
};
var getM = function(time){
      return time.slice(-8,-6);
};
var getS = function(time){
   return new Date().getSeconds();
}
var getMeridiem = function(time){

   return time.slice(-2);
}
module.exports = function(offset){
   var time = new Date().toLocaleString('en-US',{timezoneOffset : offset});
   this.currentTime = { hour: getH(time),
      minute : getM(time),
      meridiem : getMeridiem(time)
   };
}
