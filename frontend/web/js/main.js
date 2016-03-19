$(document).ready(function () {
    $('.userPro').click(function () {
        $('.userPart').removeClass('selected');
        $('.userPro').addClass('selected');
        $('#professionnel').show();
        $('#particulier').hide();
    });
    $('.userPart').click(function () {
        $('.userPro').removeClass('selected');
        $('.userPart').addClass('selected');
        $('#professionnel').hide();
        $('#particulier').show();
    });
});
 