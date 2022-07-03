window.toRun = true
window.dataShown = true
window.codeBeforeMinified = ""

function toggleData() { // Show | Hide the data area
    window.dataShown = !window.dataShown
    if(window.dataShown) {
        $("#dataHiddenReminder").fadeToggle("fast", function() {
            $("#data").slideToggle("fast")
        })
        $("#showData").css("transform", "rotate(90deg)")
    } else {
        $("#data").slideToggle("fast", function() {
            $("#dataHiddenReminder").fadeToggle("fast")
        })
        $("#showData").css("transform", "rotate(0deg)")
    }
}

function toggleMenu() {
    $("#menu").slideToggle("fast");
}
