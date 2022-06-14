function minify(origin){
    let commentRemoved = ""
    // Avoid +-,.><[] in comment not being minified
    for(let i = 0; i < origin.length; i++) {
        if(origin[i] == "#")
            while(origin[i] != "\n") i++;
        else
            commentRemoved += origin[i];
    }
    return commentRemoved.match(/[\+\-><\[\],\.]+/g).join("")
}

// Run program function
function runCode() {
    window.toRun = true
    toggle()
    let speedSlider = $("#speed")
    let dindex = 0
    let cindex = 0
    let iindex = 0
    $("#text").attr("readonly", "")
    let code = " " + minify($("#text").val())
    let input = $("#io").val()
    $("#io").val("")
    let data = [0]
    let stack = []
    $("#data").empty()
    $("#data").append($("<div id='0'></div>").text(0))
    // tool functions
    function add() {
        data[dindex] += 1
        if(data[dindex] > 255) data[dindex] = 0;
    } 
    function sub() {
        data[dindex] -= 1
        if(data[dindex] < 0) data[dindex] = 255;
    }
    function getInput() {
        if(iindex < input.length)
            data[dindex] = input[iindex].charCodeAt();
        else
            data[dindex] = 0;
        iindex += 1
    }
    function output() {
        $("#io").val($("#io").val() + String.fromCharCode(data[dindex]))
    }
    function updatePtr(origin) { // origin is where the ptr used to be
        $("#"+origin).css({"background-color":"#888", "transform":"scale(1.0, 1.0)"})
        $("#"+dindex).css({"background-color":"#222", "transform":"scale(1.05, 1.1)"})
    }
    function toggle() {
        $("#run").toggle()
        $("#stop").toggle()
        $("#text").removeAttr("readonly")
    }
    function immRun() {
        while(cindex < code.length && window.toRun) {
            if(code[cindex] == "+") {
                add()
            } else if(code[cindex] == "-") {
                sub()
            } else if(code[cindex] == ">") {
                dindex += 1
                if(dindex >= data.length) {
                    data.push(0)
                }
            } else if(code[cindex] == "<") {
                if(dindex > 0) {
                    dindex -= 1
                }
            } else if(code[cindex] == "[") {
                if(data[dindex])
                    stack.push(cindex);
                else {
                    cindex++
                    let count = 1
                    for(; cindex < code.length && window.toRun && count; cindex++) {
                        if(code[cindex] == '[') count++;
                        else if(code[cindex] == ']') count--;
                    }
                }
            } else if(code[cindex] == "]") {
                if(data[dindex])
                    cindex = stack[stack.length - 1];
                else
                    stack.pop();
            } else if(code[cindex] == ",") {
                getInput()
            } else if(code[cindex] == ".") {
                output()
            }
            cindex++
        }
        // Update the data area in the end
        for(let i = 1; i < data.length; i++)
            $("#data").append($(`<div id=${i}></div>`).text(data[i]));
        updatePtr(0)
        toggle()
    }
    function iterLoop() {
        if(cindex < code.length) {
            if(code[cindex] == "+") {
                add()
                $("#" + dindex).text(new String(data[dindex]))
            } else if(code[cindex] == "-") {
                sub()
                $("#" + dindex).text(new String(data[dindex]))
            } else if(code[cindex] == ">") {
                dindex += 1
                if(dindex >= data.length) {
                    data.push(0)
                    $("#data").append($(`<div id=${data.length-1}></div>`).text("0"))
                }
                updatePtr(dindex-1)
            } else if(code[cindex] == "<") {
                if(dindex > 0) {
                    dindex -= 1
                }
                updatePtr(dindex+1)
            } else if(code[cindex] == "[") {
                stack.push(cindex)
            } else if(code[cindex] == "]") {
                if(data[dindex])
                    cindex = stack[stack.length - 1];
                else
                    stack.pop();
            } else if(code[cindex] == ",") {
                getInput()
            } else if(code[cindex] == ".") {
                output()
            }
            cindex += 1
            if(window.toRun) {
                setTimeout(function(){iterLoop()}, 100 - speedSlider.val())
            } else {
                toggle()
            }
        } else {
            toggle()
        }
    }
    updatePtr(0)
    if(!window.dataShown){
        // If the data area is hidden, immediately run the program
        immRun()
    } else {
        setTimeout(function(){iterLoop()}, 50)
    }
}
