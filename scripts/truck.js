(function(window){
    'use strict';
    var App = window.App || {};

        function Truck (truckId, db) {
            this.truckId = truckId;
            this.db = db;
        };

//Here order is relying on the user input to specify a key labeled emailAddress and an order key
        Truck.prototype.createOrder = function(order){
            console.log('adding order for ' + order.emailAddress);

//Here we are calling the DataStore add method and give it the key the value of the order emailAdress and assign it the object for createOrder
            return this.db.add(order.emailAddress, order);
        };

        Truck.prototype.deliverOrder = function(customerId){
            console.log('delivering order for ' + customerId);
            return this.db.remove(customerId);
        };

        //whatever is returned is input as the arg for the then function
        Truck.prototype.printOrders = function(printFn){
            return this.db.getAll()
            .then(function(orders){
                var customerArray = Object.keys(orders);

                //Need to attach this since it is lost when we go into the forEach loop, debug shows this goes to undefined after we enter the loop
                            customerArray.forEach(function(id){
                                console.log(orders[id]);
                                if (printFn){
                                    printFn(orders[id]);
                                }
                            }.bind(this));
            }.bind(this));
        };

    App.Truck = Truck;
    window.App = App;
})(window);