var getH = function(date) {
   return new Date(date).getHours();
};
var getM = function(date){
      return new Date(date).getMinutes();
};
var getMeridiem = function(date){
   if(getH(date) > 12)
      return 'pm';
   return 'am';
}
module.exports = function(date){
   this.currentTime = { hour: getH(date),
      minute : getM(date),
      meridiem : getMeridiem(date)
   };
}
