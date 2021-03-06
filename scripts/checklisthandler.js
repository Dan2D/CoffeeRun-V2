(function(window){
'use strict';
var App = window.App || {};
var $ = window.jQuery;
var click = 0;

function Checklist(selector){
    if(!selector){
        throw new Error('Selector is not defined');
    }

//Refers to the element property of the object this refers to, which is the selector
    this.$element = $(selector);
    if (this.$element.length === 0){
        throw new Error('No selector provided');
    }
}
    Checklist.prototype.addChecklistHandler = function(fn){
//The handler is applied to the full div which holds all checkboxes, so any box is clicked handler fires (event bubbling)
//b/c the handle is assigned to the div, even though a sub node of div is clicked, through bubbling it works its way up to the div parent



        this.$element.off().on('click', function(event){
            let email = event.target.value;
            $('#modalConfirm').modal('toggle');
            //.off() is necessary b/c it kept adding event listeners for each click, so I had to remove the previous one before going forward
                        $('#modalConfirm button').off().on('click', function(e){
                            let modalBtn = e.target.innerText

                            if (modalBtn.indexOf('Deliver') !== -1){
                                //then wasn't acting as a function unless given a promise object from datastore
                                let deliver = fn(email);
                                deliver.then(function(){removeRow(email)})
                                 }
                            else if(modalBtn.indexOf('Edit') !== -1){
                                edit(event);
                            }
                            else{
                                $(event.target).prop('checked', false);
                            }
                            $('#modalConfirm').modal('toggle');
                        });
        });

        
           function orderFill (order){
            $("#emailInput").val(order.emailAddress);
            $("#coffeeOrder").val(order.coffee);
            $('[value="'+order.size+'"]')[0].checked = true;
            $("#flavor").val(order.flavor);
            $("#strengthLevel").val(order.strength);
           };

        function edit(event){
            $(event.target).prop('checked', false).parent().css('opacity', 0.4);
            // $(event.target).parent()
            let email = event.target.value;
            //since order is being given a promise object we can pass it into a then chain as an arg to get the value, the then will fire sync, but won't do anything
            //once the promise has been fulfilled then will execute again, this time with a correct value for result
            let order =  myTruck.db.get(email)
            order.then(result => {orderFill(result)})
            console.log('sync moving forward');
            };
            
        


//         this.$element.on('click', function(event){
//             $('#modalConfirm').modal('toggle');
// //.off() is necessary b/c it kept adding event listeners for each click, so I had to remove the previous one before going forward
//             $('#modalConfirm button').off().on('click', function(e){
//                 if (e.target.innerText === 'Yes'){
//                     removeRow(event);
//                 }
//                 else{
//                     let check = event.target;
//                     check.checked = false;
//                 }
//                 $('#modalConfirm').modal('toggle');
//             })
//         })


//         this.$element.on('dblclick', function(e){
//             let email = e.target.querySelector('input').value;
//             let order = myTruck.db.get(email);

//             $("#emailInput").val(order.emailAddress);
//             $("#coffeeOrder").val(order.coffee);
//             $('[value="'+order.size+'"]')[0].checked = true;
//             $("#flavor").val(order.flavor);
//             $("#strengthLevel").val(order.strength);
//         })



        function removeRow(email){
            $('[value="' + email + '"]').closest('[data-coffee-order="checkbox"]').remove();
        };

    }


    function Row (coffeeOrder){
    //need to use $() to create elements
        let div = $('<div></div>', { 'data-coffee-order': 'checkbox', 'class': 'checkbox'});
        let label = $('<label></label>');
        let input = $('<input></input>', {type: 'checkbox', 'value': coffeeOrder.emailAddress})
        let data = ' ';

        data = ' ' + coffeeOrder.emailAddress + ' ' + coffeeOrder.size + ' ' + coffeeOrder.flavor + ' ' + coffeeOrder.coffee + ' [' + coffeeOrder.strength + 'x]';

        // Object.keys(coffeeOrder).forEach(function(item){
        //     if( item === 'strength'){
        //         data += '[' + coffeeOrder[item] + 'x]'
        //     }
        //     //skips if flavor not specified, gets rid of extra space
        //     else if (!coffeeOrder[item]){}
        //     else{ data += coffeeOrder[item] + ' '; }
        // });
        console.log(data);
        label.append(input);
        label.append(data);
        div.append(label);
        this.$element = div;
        }

        Checklist.prototype.addRow = function (coffeeOrder){
            let rowElement = new Row(coffeeOrder);
            let orderCheck = $('[value="' + coffeeOrder.emailAddress + '"]')
            if (orderCheck.length){
                let editOrder = rowElement.$element.text();
                orderCheck[0].nextSibling.nodeValue = editOrder;
            }
            else {
            this.$element.append(rowElement.$element);
            }
        };



App.Checklist = Checklist;
window.App = App;
})(window);