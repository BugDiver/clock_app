var getH = function() {
      return new Date().getHours();
};
var getM = function(){
      return new Date().getMinutes();
};
var getS = function(){
   return new Date().getSeconds();
}
var getMeridiem = function(){
   if(getH() > 12)
      return 'pm';
   return 'am';
}
module.exports = function(){
   this.currentTime = { hour: getH(),
      minute : getM(),
      meridiem : getMeridiem()
   };
}
