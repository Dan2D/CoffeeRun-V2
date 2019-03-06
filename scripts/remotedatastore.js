(function(window){
    'use strict';
    const App = window.App || {};
    var $ = window.jQuery;
    var Promise = window.Promise;

    function RemoteDataStore (url){
        if(!url){
            throw new Error ('No remote url given!');
        }
        this.serverUrl = url;
    }


    function promiseResolvedWith (value){
        var promise = new Promise(function(resolve,reject){
            resolve(value);
        });
        return promise;
    };

// key arg is kept, to be identical to offline datastore method, but is not used
//only need val for posting to remote data server
    RemoteDataStore.prototype.add = function(key,val){

//post knows 3 things 1. who to talk to, 2. what to tell them, 3. what to do with the response
        return $.post(this.serverUrl, val, function(serverResponse){
            console.log(serverResponse);
        });
    }

    RemoteDataStore.prototype.getAll = function (){
        return $.get(this.serverUrl, function(serverResponse){
            console.log(serverResponse);
        })
    }
//Have to label async functions with async and then tell the immediateley within that async function what to wait for using 'await'
    RemoteDataStore.prototype.get = async function(key, cb){
        let serverResponse = '';
        try {
            serverResponse = await $.ajax({
            url: this.serverUrl + '/' + key,
            type: 'GET',
            datatype: 'json',
            async: true
        })
    }

    catch (error){
        return false;
    }
    //    return $.get(this.serverUrl + '/' + key, function(serverResponse){
    //         console.log(serverResponse);
    //         cb(serverResponse);
    //     });
    
    return promiseResolvedWith(serverResponse);
    };

//using ajax method since jQ doesn't provide easy method for delete, get uses .ajax as well, just behind the scenes
    RemoteDataStore.prototype.remove = function(key){
        return $.ajax(this.serverUrl + '/' + key, {
            type: 'delete'
        });
    };


    App.RemoteDataStore = RemoteDataStore;
    window.App = App;
})(window);