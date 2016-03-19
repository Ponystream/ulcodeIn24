$(document).ready(function () {
    $('.userPro').click(function () {
        $('.userPart').removeClass('selected');
        $('.userPro').addClass('selected');
        document.getElementById('particulier').style.display = "none";
        document.getElementById('professionnel').style.display = "block";
    });
    $('.userPart').click(function () {
        $('.userPro').removeClass('selected');
        $('.userPart').addClass('selected');
        document.getElementById('professionnel').style.display = "none";
        document.getElementById('particulier').style.display = "block";
    });
});
 