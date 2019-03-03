(function (window) {
    'use strict';

    const App = window.App || {};
    const Truck = App.Truck;
    const DataStore = App.DataStore;
    const Checklist = App.Checklist;
    const Validation = App.Validation;
    const webshim = window.webshim;
    const myTruck = new Truck('blah blah I\'m a truck', new DataStore());
    const FORM_SELECTOR = '[data-coffee-order="form"]';
    const CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
    const FormHandler = App.FormHandler;
    const checklist = new Checklist(CHECKLIST_SELECTOR);
    //creating new instance of FormHandler and passing it the selector data-coffee-order="form"
    const formHandler = new FormHandler(FORM_SELECTOR);

    //implementing a submit handler which will pass the callback funtion of creatOrder to myTruck using the data that was created
    formHandler.addSubmitHandler(function (data) {
        myTruck.createOrder.call(myTruck, data),
            checklist.addRow.call(checklist, data);
    });

    formHandler.addInputHandler(function (email) {
            return Validation.validateEmail(email);
        },
        function (coffee, caf) {
            return Validation.validateCoffee(coffee, caf);
        });

    checklist.addChecklistHandler();

    formHandler.addSliderHandler(function(coffee, caf){
        return Validation.validateCoffee(coffee, caf);
    });

    console.log(formHandler)

        webshim.polyfill('forms forms-ext');
        webshim.setOptions('forms', {addValidators: true, lazyCustomMessages: true});


    //letting your instance of myTruck be available globally in the window scope
    window.myTruck = myTruck;
})(window)