function minify(origin) {
    let commentRemoved = ""
    // Avoid +-,.><[] in comment not being minified
    for (let i = 0; i < origin.length; i++) {
        if (origin[i] == "#")
            while (origin[i] != "\n") i++;
        else
            commentRemoved += origin[i];
    }
    return commentRemoved.match(/[\+\-><\[\],\.]+/g).join("")
}

const app = Vue.createApp({
    data() {
        return {
            data: [0],
            ptr: 0
        }
    },
    methods: {
        // Run program function
        runCode() {
            // Initailizing context
            window.toRun = true
            let ctx = this
            ctx.data = [0]
            ctx.ptr = 0
            let cindex = 0
            let iindex = 0
            let stack = []
            // Initializing data area
            // TODO: Remove all the jQuery operations
            toggle()
            let speedSlider = $("#speed")
            $("#text").attr("readonly", "")
            let code = " " + minify($("#text").val())
            let input = $("#io").val()
            $("#io").val("")
            // tool functions
            function add() {
                ctx.data[ctx.ptr] += 1
                if (ctx.data[ctx.ptr] > 255) ctx.data[ctx.ptr] = 0;
            }
            function sub() {
                ctx.data[ctx.ptr] -= 1
                if (ctx.data[ctx.ptr] < 0) ctx.data[ctx.ptr] = 255;
            }
            function getInput() {
                if (iindex < input.length)
                    ctx.data[ctx.ptr] = input[iindex].charCodeAt();
                else
                    ctx.data[ctx.ptr] = 0;
                iindex += 1
            }
            function output() {
                $("#io").val($("#io").val() + String.fromCharCode(ctx.data[ctx.ptr]))
            }
            function toggle() {
                $("#run").toggle()
                $("#stop").toggle()
                $("#text").removeAttr("readonly")
            }
            // Run without delay
            function immRun() {
                while (cindex < code.length && window.toRun) {
                    if (code[cindex] == "+") {
                        add()
                    } else if (code[cindex] == "-") {
                        sub()
                    } else if (code[cindex] == ">") {
                        ctx.ptr += 1
                        if (ctx.ptr >= ctx.data.length) {
                            ctx.data.push(0)
                        }
                    } else if (code[cindex] == "<") {
                        if (ctx.ptr > 0) {
                            ctx.ptr -= 1
                        }
                    } else if (code[cindex] == "[") {
                        if (ctx.data[ctx.ptr])
                            stack.push(cindex);
                        else {
                            cindex++
                            let count = 1
                            for (; cindex < code.length && window.toRun && count; cindex++) {
                                if (code[cindex] == '[') count++;
                                else if (code[cindex] == ']') count--;
                            }
                        }
                    } else if (code[cindex] == "]") {
                        if (ctx.data[ctx.ptr])
                            cindex = stack[stack.length - 1];
                        else
                            stack.pop();
                    } else if (code[cindex] == ",") {
                        getInput()
                    } else if (code[cindex] == ".") {
                        output()
                    }
                    cindex++
                }
                toggle()
            }
            function iterLoop() {
                if (cindex < code.length) {
                    if (code[cindex] == "+") {
                        add()
                    } else if (code[cindex] == "-") {
                        sub()
                    } else if (code[cindex] == ">") {
                        ctx.ptr += 1
                        if (ctx.ptr >= ctx.data.length) {
                            ctx.data.push(0)
                        }
                    } else if (code[cindex] == "<") {
                        if (ctx.ptr > 0) {
                            ctx.ptr -= 1
                        }
                    } else if (code[cindex] == "[") {
                        stack.push(cindex)
                    } else if (code[cindex] == "]") {
                        if (ctx.data[ctx.ptr])
                            cindex = stack[stack.length - 1];
                        else
                            stack.pop();
                    } else if (code[cindex] == ",") {
                        getInput()
                    } else if (code[cindex] == ".") {
                        output()
                    }
                    cindex += 1
                    if (window.toRun) {
                        setTimeout(function () { iterLoop() }, 100 - speedSlider.val())
                    } else {
                        toggle()
                    }
                } else {
                    toggle()
                }
            }
            if (!window.dataShown) {
                // If the data area is hidden, immediately run the program
                immRun()
            } else {
                setTimeout(function () { iterLoop() }, 50)
            }
        }
    }
})
app.mount("#mainBox")
