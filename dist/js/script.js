'use strict'

$(document).ready(function(){
    $('.carousel__inner').slick({
        dots: true,
        speed: 1200,
        prevArrow: '<button type="button" class="slick-prev"><img src="img/prevArrow.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="img/nextArrow.png"></button>'
    });

    // Catalog поведение карточек товаров

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleClass(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
    
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__text').eq(i).toggleClass('catalog-item__text_active');
            })
        })
    }

    toggleClass('.catalog-item__link');
    toggleClass('.catalog-item__back');

    //Modal

    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    });

    $('.btn_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());/* получаем заголовок и записываем его в модальное окно */
            $('.overlay, #order').fadeIn('slow'); /* показываем модальное окно */
        })
    });


    function validateForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста введите свое имя",
                    minlength: jQuery.validator.format("Ввевдите хотябы {0} символа")
                },
                phone: "Пожалуйста введите свой номер телефона",
                email: {
                    required: "Пожалуйста введите свою почту",
                    email: "Неправильно введен адрес почты"
                }
            }
        });
    }

    validateForms('#consultation form');
    validateForms('#order form');
    validateForms('#consultation-form');


    $('input[name=phone]').mask('+7 (999) 999-99-99');

    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: 'mailer/smart.php',
            data: $(this).serialize()
        }).done(function() {
            $(this).find('input').val('');

            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

    //Smooth scroll and pageup

    $(window).scroll(function() {
        if($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    // Animation

    new WOW().init();


});