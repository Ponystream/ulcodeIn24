$(document).ready(function () {
    $('.userPro').click(function () {
        $('.userPart').removeClass('selected');
        $('.userPro').addClass('selected');
        document.getElementById('particulier').style.display = "none";
        document.getElementById('professionnel').style.display = "block";
        // console.log("pro");
        // console.log($(this).attr());
    });
    $('.userPart').click(function () {
        $('.userPro').removeClass('selected');
        $('.userPart').addClass('selected');
        document.getElementById('professionnel').style.display = "none";
        document.getElementById('particulier').style.display = "block";
        // console.log("par");
        // console.log($(this).attr());

    });
});
