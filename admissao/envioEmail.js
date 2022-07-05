$(document).ready(function () {
    $('#ti_assunto').on('input', function () {
        var input = $(this);
        var is_assunto = input.val();
        if (is_assunto) { input.removeClass("invalid").addClass("valid"); }
        else { input.removeClass("valid").addClass("invalid"); }
    });

    // <!--Email must be an email -->
    $('#ti_email').on('input', function () {
        var input = $(this);
        var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        var is_email = re.test(input.val());
        if (is_email) { input.removeClass("invalid").addClass("valid"); }
        else { input.removeClass("valid").addClass("invalid"); }
    });

    // <!--Message can't be blank -->
    $('#ti_message').keyup(function (event) {
        var input = $(this);
        var message = $(this).val();
        console.log(message);
        if (message) { input.removeClass("invalid").addClass("valid"); }
        else { input.removeClass("valid").addClass("invalid"); }
    });

    // <!-- After Form Submitted Validation-->
    $("#ti_submit button").click(function (event) {
        var assunto = $("#ti_assunto").val()
        var email = $("#ti_email").val()
        var message = $("#ti_message").val()
        var email = {
            "assunto": assunto,
            "email": email,
            "message": message
        }
        $.ajax({
            type: "POST",
            url: "https://experterp.com.br/inter/apiFluig/sendMail.php",
            data: JSON.stringify(email),
            dataType: "dataType",
            success: function (response) {
                alert("Email enviado!")
            },
            error: function (response) {
                alert("Email não enviado!")
            }
        });
    });
});	