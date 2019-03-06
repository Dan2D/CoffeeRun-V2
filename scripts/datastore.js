(function(window){
    'use strict';
//assign the app namespace to the window or if not created yet, create empty object
var App = window.App || {};
var Promise = window.Promise;

function DataStore () {
    console.log('Running Datastore...');
//creating an empty object to store all our data
    this.data = {};

    function promiseResolvedWith (value){
    var promise = new Promise(function(resolve,reject){
        resolve(value);
    });
    return promise;
};

//Creating methods for DataStore using the object properties key and value pairs
    DataStore.prototype.add = function (key, value){
        this.data[key] = value;
       return promiseResolvedWith(null);
    };

    DataStore.prototype.get = function(key) {
        return promiseResolvedWith (this.data[key]);
};


    DataStore.prototype.getAll = function(){
        return promiseResolvedWith(this.data);
    };

    DataStore.prototype.remove = function(key){
        delete this.data[key];
        return promiseResolvedWith(null);
    };

}

//Assigning the DataStore method to the App namespace
App.DataStore = DataStore;
//This is only to say if the App did not exist and assigned it to an empty object, you would now assign the App property to your newly defined App
window.App = App;
})(window);