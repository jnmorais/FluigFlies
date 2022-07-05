var array_c = ['txt_empr', 'rd_loc', 'spe', 'txt_cnpj', 'txt_lcTrb', 'cidade', 'rd_cntr', 'rd_jrnd', 'txt_cargo', 'txt_setor', 'vl_salario', 'txt_prMr', 'centro_custo', 'txt_gestorAr', 'rd_mtvCntr', 'rd_escol', 'txt_qlf_exg', 'txt_qlf_djs', 'rd_vg', 'rd_hrext', 'rd_idioma', 'rd_hrtb', 'txt_atvs', 'rd_office', 'rd_na', 'rd_pc','rd_acsRd','rd_mail']
var beforeSendValidate = function (numState, nextState) {
    //Remove a classe de estilo erro "has-error"
    // $('#txt_gestor').parent('div').removeClass('has-error');
    //Valida nome do solicitante
    for (var i = 0; i < array_c.length; i++) {
        if (isEmpty(array_c[i])) {
            $("[name$='" + array_c[i] + "']").parent('div').addClass('has-error');
        }
    }
    if($("[name$='rd_cntr']").val() == "Estágio"){
        if(isEmpty("txt_sprEst")) $("[name$='txt_sprEst']").parent('div').addClass('has-error');
        if(isEmpty("txt_ObjEst")) $("[name$='txt_ObjEst']").parent('div').addClass('has-error');
    }
    if($("[name$='rd_mtvCntr']").val() == "Substituição de colaborador" || $("[name$='rd_mtvCntr']").val() == "Promoção (Efetivação de Estagiário)"){
        if(isEmpty("txt_prSb")) $("[name$='txt_prSb']").parent('div').addClass('has-error');
    }
    if($("[name$='rd_mtvCntr']").val() == "Substituição de colaborador"){
        if(isEmpty("vlr_Sb")) $("[name$='vlr_Sb']").parent('div').addClass('has-error');
    }
    if($("[name$='rd_escol']").val() == "Ensino Superior Completo" || $("[name$='rd_escol']").val() == "Ensino Superior Incompleto"){
        if(isEmpty("txt_supDsj")) $("[name$='txt_supDsj']").parent('div').addClass('has-error');
    }
    if($("[name$='rd_hrtb']").val() == "Outros"){
        if(isEmpty("txt_hrtb")) $("[name$='txt_hrtb']").parent('div').addClass('has-error');
    }
    if($("[name$='rd_na']").val() == "Sim"){
        if(isEmpty("rd_grgRossi")) $("[name$='rd_grgRossi']").parent('div').addClass('has-error');
        if(isEmpty("rd_veic")) $("[name$='rd_veic']").parent('div').addClass('has-error');
        if(isEmpty("rd_phone")) $("[name$='rd_phone']").parent('div').addClass('has-error');
        if(isEmpty("rd_tgPg")) $("[name$='rd_tgPg']").parent('div').addClass('has-error');
        if(isEmpty("rd_crtComb")) $("[name$='rd_crtComb']").parent('div').addClass('has-error');
        if(isEmpty("rd_crtComb")) $("[name$='rd_crtComb']").parent('div').addClass('has-error');
    }
    if($("[name$='rd_pc']").val() == "Sim"){
        if(isEmpty("rd_tpPc")) $("[name$='rd_tpPc']").parent('div').addClass('has-error');
        if(isEmpty("rd_eqpRossi")) $("[name$='rd_eqpRossi']").parent('div').addClass('has-error');
    }
    if($("[name$='rd_eqpRossi']").val() == "Sim"){
        if(isEmpty("rd_empEqp")) $("[name$='rd_empEqp']").parent('div').addClass('has-error');
        if(isEmpty("rd_endEqp")) $("[name$='rd_endEqp']").parent('div').addClass('has-error');
    }
    if($("[name$='rd_acsRd']").val() == "Sim"){
        if(isEmpty("txt_acsPsts")) $("[name$='txt_acsPsts']").parent('div').addClass('has-error');
        if(isEmpty("txt_acsPstsNv")) $("[name$='txt_acsPstsNv']").parent('div').addClass('has-error');
    }
    var sistemas = 0;
    sistemas += valida_cbx(form, 'cbx_mega')
    sistemas += valida_cbx(form, 'cbx_exp')
    sistemas += valida_cbx(form, 'cbx_app')
    sistemas += valida_cbx(form, 'cbx_ads')
    sistemas += valida_cbx(form, 'cbx_cv')
    sistemas += valida_cbx(form, 'cbx_hcm')
    sistemas += valida_cbx(form, 'cbx_mtk')
    sistemas += valida_cbx(form, 'cbx_uc2b')
    if(sistemas < 1){
        if ((form.getValue('cbx_nhm') == null || form.getValue('cbx_nhm') == "")) {
            throw "Se não nenhum sistema será necessário, marque o campo <b>Nenhum sistema será utilizado</b> "+sistemas
        }
    }
}
function isEmpty(campo) {
    var valor = $("[name$='" + campo + "']").val();
    return $("[name$='" + campo + "']").val() == null || $("[name$='" + campo + "']").val() == undefined || $("[name$='" + campo + "']").val() == ''
}
function valida_cbx(form, cbx) {
    if(form.getValue(cbx) == null || form.getValue(cbx) == ""){
        return 0;
    }else{
        return +1;
    }
}