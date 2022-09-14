// TABELA FEEDBACKS
var i = 1;
$("#add_feedback").click(function () {
    $('#feedback_' + i).html("<td><textarea name='ptsFrts_" + i + "' id='ptsFrts_" + i + "' class='form-control' rows='1'></textarea></td><td><textarea name='exptsFrts_" + i + "' id='ex_" + i + "' class='form-control' rows='1'></textarea></td><td><textarea name='ptsDev_" + i + "' id='ptsDev_" + i + "' class='form-control' rows='1'></textarea></td><td><textarea name='exPtsDev_" + i + "' id='exPtsDev_" + i + "' class='form-control' rows='1'></textarea></td>");
    $('#tbl_feedback').append('<tr id="feedback_' + (i + 1) + '"></tr>');
    i++;
});
$("#del_feedback").click(function () {
    if (i > 1) {
        $("#feedback_" + (i - 1)).html('');
        i--;
    }
});
// TABELA PLANO DE AÇÔES
var x = 1;
$("#add_placoes").click(function () {
    $('#placoes_' + x).html("<td><textarea name='aspect_" + x + "' id='aspect_" + x + "' class='form-control' rows='1'></textarea></td><td><textarea name='cmfzr_" + x + "' id='cmfzr_" + x + "' class='form-control' rows='1'></textarea></td><td><textarea name='status_" + x + "' id='status_" + x + "' class='form-control' rows='1'></textarea></td><td><textarea name='pvrst_" + x + "' id='pvrst_" + x + "' class='form-control' rows='1'></textarea></td><td><textarea name='rzld_" + x + "' id='rzld_" + x + "' class='form-control' rows='1'></textarea></td><td><textarea name='obs_" + x + "' id='obs_" + x + "' class='form-control' rows='1'></textarea></td>");
    $('#tbl_placoes').append('<tr id="placoes_' + (x + 1) + '"></tr>');
    x++;
});
$("#del_placoes").click(function () {
    if (x > 1) {
        $("#placoes_" + (x - 1)).html('');
        x--;
    }
});