(function(window){
'use strict';
var App = window.App || {};

var Validation = {
    validateEmail: function(email){
        return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email));
    },
    validateCoffee: function(coffee, caf){
        let minLength = 5;
        if(coffee.length > minLength){
            if(coffee.toLowerCase().indexOf('decaf') !== -1 && caf > 20){
                return 'no decaf';
            }
            return true;
        }

       else{return false;}
       
    }
    // ,
    // validateEmailUse: function(order){
    //     return myTruck.db.get(order.emailAddress);
    //     if (x.responseText !== "null"){
    //         return false;
    //     }
    //     else {return true;}
    // }
};

App.Validation = Validation;
window.App = App;
})(window)