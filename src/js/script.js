'use strict'

$(document).ready(function(){
    $('.carousel__inner').slick({
        dots: true,
        speed: 1200,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="img/prevArrow.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="img/nextArrow.png"></button>'
    });
});