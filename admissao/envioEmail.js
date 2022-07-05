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

        // if(email != "" && assunto != "" && message != ""){
            var data = {
                "assunto": assunto,
                "email": email,
                "message": message
            }
            const options = {
                method: 'POST',
                headers: {"Access-Control-Allow-Origin": "*", "Content-Type": "application/json" },
                body: JSON.stringify(data)
            };
            fetch('https://experterp.com.br/inter/apiFluig/sendMail.php', options)
                .then(response => response.json())
                .then(response => console.log(response))
                .catch(err => console.error(err));
        // }else{
            // alert("Preencha os campos!")
        // }
    });
});	