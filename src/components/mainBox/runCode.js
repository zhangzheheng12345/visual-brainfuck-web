import { minify } from "./minifyCode"

export function runCode(ctx, callback) {
    // Initailizing context
    if (ctx.toRun === false) {
        ctx.cindex = 0
        ctx.iindex = 0
        ctx.stack = []
        ctx.data = [0]
        ctx.ptr = 0
    }
    ctx.toRun = true
    ctx.toPause = false
    ctx.textareaReadonly = true
    let code = minify(ctx.codes)
    ctx.IorO = false
    ctx.out = ""
    // tool functions
    function getInput() {
        if (ctx.iindex < ctx.in.length)
            ctx.data[ctx.ptr] = ctx.in[ctx.iindex].charCodeAt();
        else
            ctx.data[ctx.ptr] = 0;
        ctx.iindex += 1
    }
    function output() {
        ctx.out += String.fromCharCode(ctx.data[ctx.ptr])
    }
    function runSingleCmd() {
        if (code[ctx.cindex] == "+") {
            ctx.data[ctx.ptr] += 1
            if (ctx.data[ctx.ptr] > 255) ctx.data[ctx.ptr] = 0;
        } else if (code[ctx.cindex] == "-") {
            ctx.data[ctx.ptr] -= 1
            if (ctx.data[ctx.ptr] < 0) ctx.data[ctx.ptr] = 255;
        } else if (code[ctx.cindex] == ">") {
            ctx.ptr += 1
            if (ctx.ptr >= ctx.data.length) {
                ctx.data.push(0)
            }
        } else if (code[ctx.cindex] == "<") {
            if (ctx.ptr > 0) {
                ctx.ptr -= 1
            }
        } else if (code[ctx.cindex] == "[") {
            if (ctx.data[ctx.ptr])
                ctx.stack.push(ctx.cindex);
            else {
                ctx.cindex++
                let count = 1
                for (; ctx.cindex < code.length && ctx.toRun && count; ctx.cindex++) {
                    if (code[ctx.cindex] == '[') count++;
                    else if (code[ctx.cindex] == ']') count--;
                }
            }
        } else if (code[ctx.cindex] == "]") {
            if (ctx.data[ctx.ptr])
                ctx.cindex = ctx.stack[ctx.stack.length - 1];
            else
                ctx.stack.pop();
        } else if (code[ctx.cindex] == ",") {
            getInput()
        } else if (code[ctx.cindex] == ".") {
            output()
        }
        ctx.cindex++
    }
    // Run without delay
    function immRun() {
        while (ctx.cindex < code.length && ctx.toRun && !ctx.toPause) {
            runSingleCmd()
        }
        callback()
    }
    function iterLoop() {
        if (ctx.cindex < code.length) {
            runSingleCmd()
            if (ctx.toRun && !ctx.toPause) {
                setTimeout(function () { iterLoop() }, 300 - ctx.speed)
            }
        } else {
            callback()
        }
    }
    if (ctx.dataHidden) {
        // If the data area is hidden, immediately run the program
        immRun()
    } else {
        setTimeout(function () { iterLoop() }, 50)
    }
}