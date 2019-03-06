(function (window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;


    function FormHandler(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }

        //finding matching element in the Dom under the selector arg and assigning it to $formElement
        this.$formElement = $(selector);
        if (this.$formElement.length === 0) {
            throw new Error('No form element selected');
        }
        let message = '';

        FormHandler.prototype.addSliderHandler = function (fn) {
            $("#strengthLevel").on('input', function () {

                var slider = $("#strengthLevel");
                var sliderPos = slider.val() / slider[0].max;
                var actualPos = (sliderPos * (slider[0].clientWidth - 45));
                let sliderNum = $(".sliderVal");
                sliderNum[0].innerText = slider.val();
                sliderNum.css("visibility", "visible");
                sliderNum.css("left", actualPos);
            })
            $("#strengthLevel").on('mouseup', function (event) {
                $(".sliderVal").css("visibility", "hidden");
                let caf = $("#strengthLevel").val();
                let coffee = $("#coffeeOrder").val();
                let result = fn(coffee, caf);
                if (result === 'no decaf') {
                    message = 'There\'s too much caffeine in your coffee for decaf!';
                } else {
                    message = '';
                    let coffee = $("#coffeeOrder")[0];
                    validCheck(coffee, message);
                }
                validCheck(this, message);
            });
        };

        function validCheck(input, message) {
            if (message.length > 1) {
                $(input).addClass('invalid');
            } 
            else {
                $(input).removeClass('invalid');
            }

            $(input).setCustomValidity(message);
        };


        FormHandler.prototype.addInputHandler = function (fnEmail, fnCoffee) {

            this.$formElement.on('input', '[name="emailAddress"]', function (event) {
                $("#emailInput")[0].setCustomValidity("");
                let email = this.value;

                if (!fnEmail(email)) {
                    message = 'This is not a valid email.';
                } else {
                    message = '';
                }

                validCheck(this, message);
            });

            this.$formElement.on('input', '[name="coffee"]', function (event) {
                let caf = $("#strengthLevel").val();
                let coffee = this.value;
                let result = fnCoffee(coffee, caf);
                if (result == false) {
                    message = 'Your coffee order must be at least 5 characters long';
                } else if (result === 'no decaf') {
                    message = 'There\'s too much caffeine in your coffee for decaf!';
                } else {
                    message = '';
                    let strength = $("#strengthLevel")[0];
                    validCheck(strength, message);
                }

                validCheck(this, message);
            });
        };


        FormHandler.prototype.addSubmitHandler = function (fn, fn2) {
            this.$formElement.on('submit', function (event) {
                event.preventDefault();
                
                //SerializeArray is a jquery method that takes objects from the form and turns them into an array of objects
                var data = $(this).serializeArray();
                data.forEach(function (item) {
                    data[item.name] = item.value;
                    console.log(item.name + ' is ' + item.value);
                });

                console.log(data);
                // fn2(data)
                // .then(function(x){
                //     if (x.serverResponse !== "null"){
                //         return;
                //     }
                // },
                // function(){
                //     alert('email already has order...');
                // });
                // if (!fn2(data)){
                //     message = 'This email already has an order!';
                //     let email = $("#emailInput")[0];
                //     validCheck(email, message);
                //     // email.reportValidity();
                //     return;
                // }
                fn(data)
                //When you register a callback with .then, it has a new scope, so you have to bind this to keep it
                .then(function() {
                    $('[value="'+data.emailAddress+'"]').parent().css('opacity', 1);
                    $('#form').trigger('reset');
                    this[0].focus();
                }.bind(this));

            });
        };

    };




    App.FormHandler = FormHandler;
    window.App = App;
})(window);