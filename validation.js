

function Validate() {
    $('#error p').remove();
    var error = $('#error');
    var IdentNR = $('#IdentNR').val();
    var correct = true;

    if (IdentNR.length != 13 || !isNumber(IdentNR)) {
        error.append('<p>ID number does not appear to be authentic - input not a valid number</p>');
        correct = false;
    }
    // Date validate
    var tmpDate = new Date(IdentNR.substring(0, 2), IdentNR.substring(2, 4) - 1, IdentNR.substring(4, 6));
    var date_id = tmpDate.getDate();
    var month_id = tmpDate.getMonth();
    var year_id = tmpDate.getFullYear();

    var fullDate = date_id + "-" + (month_id + 1) + "-" + year_id;

    if (!((tmpDate.getYear() == IdentNR.substring(0, 2)) && (month_id == IdentNR.substring(2, 4) - 1) && (date_id == IdentNR.substring(4, 6)))) {
        error.append('<p>ID number does not appear to be authentic - date part not valid</p>');
        correct = false;
    }

    // ID
    var citzenship = parseInt(IdentNR.substring(10, 11)) == 0 ? "Yes" : "No";


    // gender
    var genderCode = IdentNR.substring(6, 10);
    var gender = parseInt(genderCode) < 5000 ? "Female" : "Male";

    
    // Luhn formula 
    var tempTotal = 0;
    var checkSum = 0;
    var multiplier = 1;
    for (var i = 0; i < 13; ++i) {
        tempTotal = parseInt(IdentNR.charAt(i)) * multiplier;
        if (tempTotal > 9) {
            tempTotal = parseInt(tempTotal.toString().charAt(0)) + parseInt(tempTotal.toString().charAt(1));
        }
        checkSum = checkSum + tempTotal;
        multiplier = (multiplier % 2 == 0) ? 1 : 2;
    }
    if ((checkSum % 10) != 0) {
        error.append('<p>ID number does not appear to be authentic - check digit is not valid</p>');
        correct = false;
    };


function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

$('#idCheck').submit(Validate);