$(document).ready(function () {
    let defaultDomain = '@interconstrutora.com.br';
    let input = $("#emailColab");
    let typed = "";
    input.click(function () {
        $(this).get(0).setSelectionRange(0, 0);
    })
    input.keydown(function (e) {
        // @ is keycode 192
        if (e.keyCode === 192) {
            // the user has typed @ and you can assume that they want a different domain
            input.val(typed.substring(0, typed.length - 1));
        } else {
            // store the email the user has typed so far, minnus default domain
            typed = input.val().replace(defaultDomain, '');
        }
    })
});