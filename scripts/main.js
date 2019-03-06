(function (window) {
    'use strict';

    const App = window.App || {};
    const Truck = App.Truck;
    const SERVER_SELECTOR = 'http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders';
    const RemoteDataStore = App.RemoteDataStore;
    const DataStore = App.DataStore;
    const Checklist = App.Checklist;
    const Validation = App.Validation;
    const webshim = window.webshim;
    const myTruck = new Truck('blah blah I\'m a truck', new RemoteDataStore(SERVER_SELECTOR));
    // const myTruck = new Truck('abc-123', new DataStore());
    const FORM_SELECTOR = '[data-coffee-order="form"]';
    const CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
    const FormHandler = App.FormHandler;
    const checklist = new Checklist(CHECKLIST_SELECTOR);
    //creating new instance of FormHandler and passing it the selector data-coffee-order="form"
    const formHandler = new FormHandler(FORM_SELECTOR);

    //implementing a submit handler which will pass the callback funtion of creatOrder to myTruck using the data that was created
    formHandler.addSubmitHandler(function (data) {
           return myTruck.createOrder.call(myTruck, data)
                .then(function () {
                    checklist.addRow.call(checklist, data)
                },
                function(){
                    alert('Something went wrong...');
                });
        }
        // ,
        // function (data) {
        //     return Validation.validateEmailUse.call(myTruck, data)
        // }
        );

    formHandler.addInputHandler(function (email) {
            return Validation.validateEmail(email);
        },
        function (coffee, caf) {
            return Validation.validateCoffee(coffee, caf);
        });

    checklist.addChecklistHandler(myTruck.deliverOrder.bind(myTruck));

    formHandler.addSliderHandler(function (coffee, caf) {
        return Validation.validateCoffee(coffee, caf);
    });

    myTruck.printOrders(checklist.addRow.bind(checklist));

    console.log(formHandler)

    webshim.polyfill('forms forms-ext');
    webshim.setOptions('forms', {
        addValidators: true,
        lazyCustomMessages: true
    });


    //letting your instance of myTruck be available globally in the window scope
    window.myTruck = myTruck;
})(window)