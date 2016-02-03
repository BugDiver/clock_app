var getH = function(time) {
   return time.slice(-11,-9);
};
var getM = function(time){
      return time.slice(-8,-6);
};
var getMeridiem = function(time){
   return time.slice(-2).toLowerCase();
}
module.exports = function(time){
   this.currentTime = { hour: +getH(time),
      minute : +getM(time),
      meridiem : getMeridiem(time)
   };
}
