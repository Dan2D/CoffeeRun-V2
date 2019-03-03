(function(window){
    'use strict';
//assign the app namespace to the window or if not created yet, create empty object
var App = window.App || {};

function DataStore () {
    console.log('Running Datastore...');
//creating an empty object to store all our data
    this.data = {};
    
//Creating methods for DataStore using the object properties key and value pairs
    DataStore.prototype.add = function (key, value){
        this.data[key] = value;
    };

    DataStore.prototype.get = function(key) {
        return this.data[key];
    };

    DataStore.prototype.getAll = function(){
        return this.data;
    };

    DataStore.prototype.remove = function(key){
        delete this.data[key];
    };

}

//Assigning the DataStore method to the App namespace
App.DataStore = DataStore;
//This is only to say if the App did not exist and assigned it to an empty object, you would now assign the App property to your newly defined App
window.App = App;
})(window);