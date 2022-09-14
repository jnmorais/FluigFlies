$(document).ready(function () {
    if(ATV >= 39 || ATV == "null"){
        $("#headerForm").find("input, textarea").attr("readonly", true)
    }
    if(ATV >= 59 || ATV == "null"){
        $("#headerForm").find("input, textarea").attr("readonly", true)
        $("#avl_colab").find("input, textarea").attr("readonly", true)
        $("#avl_gestor").find("input, textarea").attr("readonly", true)
        
        $("#avl_gestor").attr('onclick', 'return false')
        $("#avl_colab").attr('onclick', 'return false')
    }
});