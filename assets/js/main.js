$(document).ready(function () {
    AOS.init();

    $("[data-serialscrolling]").serialscrolling({
        offsetTop: -180,
    });

    $("input[name='telefone']").mask("(99) 9 9999-9999");

    $("#toTopButton").click(() => {
        $(window).scrollTop(0);
    });

    $("#menuMobile ul li a").click(() => {
        setTimeout(() => {
            $("#burger").click();
        }, 150);
    });

    let burger = $("#burger"),
        nav = $("#menuMobile"),
        slowmo = $("#slowmo");

    burger.on("click", function (e) {
        $(this).toggleClass("is-open");
        nav.toggleClass("is-open");
    });

    slowmo.on("click", function (e) {
        $(this).toggleClass("is-slowmo");
    });

    /* Onload demo - dirty timeout */
    let clickEvent = new Event("click");

    $(window).on("load", function (e) {
        slowmo[0].dispatchEvent(clickEvent);
        burger[0].dispatchEvent(clickEvent);

        setTimeout(function () {
            burger[0].dispatchEvent(clickEvent);

            setTimeout(function () {
                slowmo[0].dispatchEvent(clickEvent);
            }, 3500);
        }, 5500);
    });

    $(window).scroll(function () {
        let toTopButton = $("#toTopButton");
        let toTopIcon = $("#toTopIcon");
        var scrollY = $(this).scrollTop();
        if (scrollY > 500) {
            toTopButton.css("visibility", "visible");
            toTopIcon.css("visibility", "visible");
        } else {
            toTopButton.css("visibility", "hidden");
            toTopIcon.css("visibility", "hidden");
        }
    });

    $(".clients-slider").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        mobileFirst: true,
        autoplay: true,
        autoplaySpeed: 5000,
        dots: true,
        arrows: true,
        prevArrow:
            '<button type="button" class="slick-prev w-10"><svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m13.789 7.155c.141-.108.3-.157.456-.157.389 0 .755.306.755.749v8.501c0 .445-.367.75-.755.75-.157 0-.316-.05-.457-.159-1.554-1.203-4.199-3.252-5.498-4.258-.184-.142-.29-.36-.29-.592 0-.23.107-.449.291-.591zm-.289 7.563v-5.446l-3.522 2.719z" fill-rule="nonzero"/></svg></button>',
        nextArrow:
            '<button type="button" class="slick-next w-10"><svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m10.211 7.155c-.141-.108-.3-.157-.456-.157-.389 0-.755.306-.755.749v8.501c0 .445.367.75.755.75.157 0 .316-.05.457-.159 1.554-1.203 4.199-3.252 5.498-4.258.184-.142.29-.36.29-.592 0-.23-.107-.449-.291-.591zm.289 7.563v-5.446l3.522 2.719z" fill-rule="nonzero"/></svg></button>',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                },
            },
        ],
    });

    $("#contactForm").on("submit", (e) => {
        e.preventDefault();
        e.stopPropagation();

        const target = e.target;

        let name = $(target).find("input[name='nome']").val();
        let email = $(target).find("input[name='email']").val();
        let phone = $(target).find("input[name='telefone']").val();
        let message = $(target).find("textarea[name='mensagem']").val();
        let midia = $(target).find("input[name='midia']").val();
        let button = $(target).find("button[type='submit']");
        let recaptchaResponse = grecaptcha.getResponse();

        if (recaptchaResponse.length === 0) {
            swal({
                title: "Ops!",
                text: "Preencha o RECAPTCHA para enviar o formulário!",
                icon: "error",
                button: "Fechar",
            });
            return;
        }

        button.html("Enviando...");
        button.attr("disabled", true);

        let data = {
            name: name,
            email: email,
            phone: phone,
            message: message,
            midia: midia,
            "g-recaptcha-response": recaptchaResponse,
        };

        $.ajax({
            url: "sendForm.php",
            type: "POST",
            data: data,
            success: function (response) {
                swal({
                    title: "Tudo Certo!",
                    text: "Mensagem enviada com sucesso!",
                    icon: "success",
                    button: "Fechar",
                });
                button.html("Enviado!");
                $(target)[0].reset();
                grecaptcha.reset();
                console.log(response);
            },
        });
    });
});
