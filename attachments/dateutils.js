var DateUtils = {
  months : [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ],
  
  monthToText : function(nbr){
    if (nbr && (nbr > 0 &&  nbr <= this.months.length)) {
      return this.months[nbr - 1];
    } else {
      return undefined;
    }
  }
}