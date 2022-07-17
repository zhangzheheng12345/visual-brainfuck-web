import { minify } from "./minifyCode"

export function runCode(ctx) {
    // Initailizing context
    ctx.toRun = true
    ctx.data = [0]
    ctx.ptr = 0
    let cindex = 0
    let iindex = 0
    let stack = []
    // Initializing data area
    ctx.textareaReadonly = true
    let code = minify(ctx.codes)
    let input = ctx.io
    ctx.io = ""
    // tool functions
    function getInput() {
        if (iindex < input.length)
            ctx.data[ctx.ptr] = input[iindex].charCodeAt();
        else
            ctx.data[ctx.ptr] = 0;
        iindex += 1
    }
    function output() {
        ctx.io += String.fromCharCode(ctx.data[ctx.ptr])
    }
    function toggle() {
        ctx.toRun = !ctx.toRun
        ctx.textareaReadonly = !ctx.textareaReadonly
    }
    function runSingleCmd() {
        if (code[cindex] == "+") {
            ctx.data[ctx.ptr] += 1
            if (ctx.data[ctx.ptr] > 255) ctx.data[ctx.ptr] = 0;
        } else if (code[cindex] == "-") {
            ctx.data[ctx.ptr] -= 1
            if (ctx.data[ctx.ptr] < 0) ctx.data[ctx.ptr] = 255;
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
                for (; cindex < code.length && ctx.toRun && count; cindex++) {
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
    // Run without delay
    function immRun() {
        while (cindex < code.length && ctx.toRun) {
            runSingleCmd()
        }
        toggle()
    }
    function iterLoop() {
        if (cindex < code.length) {
            runSingleCmd()
            if (ctx.toRun) {
                setTimeout(function () { iterLoop() }, 300 - ctx.speed)
            }
        } else {
            toggle()
        }
    }
    if (ctx.dataHidden) {
        // If the data area is hidden, immediately run the program
        immRun()
    } else {
        setTimeout(function () { iterLoop() }, 50)
    }
}