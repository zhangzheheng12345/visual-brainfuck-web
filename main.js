window.toRun = true
window.dataShown = true
window.codeBeforeMinified = ""
const cookieName = "zhangzheheng12345-visual-bf-web-code"
$("#stop").hide()

let text = $.cookie(cookieName)
if(text) {
    $("#text").val(text)
}

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
function clearCode() {
    $("#text").val("")
    $.removeCookie(cookieName) // The cookie will also be cleared
}
function saveCode() {
    $.cookie(cookieName, $("#text").val(), {expires:365})
}
function minifyButton() {
    window.codeBeforeMinified = $("#text").val()
    $("#text").val(minify($("#text").val()))
}
