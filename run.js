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

const bfFileName = "zhangzheheng12345-visual-bf-web-code"

const menu = Vue.createApp({
    data() {
        return {
            menuHidden: true
        }
    },
    methods: {
        toggleMenu() {
            this.menuHidden = !this.menuHidden
        }
    }
})
menu.mount("#topBar")

const app = Vue.createApp({
    data() {
        return {
            data: [0],
            ptr: 0,
            speed: 100,
            toRun: false,
            minified: false,
            io: "",
            codes: `# This program will output "Hello world!"
# '#' declares a single line comment
+++++ +++
[
    >++++
    [
        >++
        >+++
        >+++
        >+
        <<<<-
    ]
    >+
    >+
    >-
    >>+
    [<]
    <-
]
>>.
>---.
+++++ ++..+++.
>>.
<-.
<.
+++.----- -.----- ---.
>>+.
>++.`, // Defaultcode in textarea
            textareaReadonly: false,
            dataHidden: false
        }
    },
    created() {
        if (window.localStorage.getItem(bfFileName))
            this.codes = window.localStorage.getItem(bfFileName);
    },
    methods: {
        // Run program function
        runCode() {
            // Initailizing context
            let ctx = this
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
            if (!window.dataShown) {
                // If the data area is hidden, immediately run the program
                immRun()
            } else {
                setTimeout(function () { iterLoop() }, 50)
            }
        },
        minifyButton() {
            window.codeBeforeMinified = this.codes
            this.codes = minify(this.codes)
            this.minified = true
        },
        revert() {
            this.codes = window.codeBeforeMinified
            this.minified = false
        },
        saveCode() {
            window.localStorage.setItem(bfFileName, this.codes)
            this.minified = false
        },
        clearCode() {
            this.codes = ""
            window.localStorage.removeItem(bfFileName) // The storage will also be cleared
        },
        toggleData() {
            this.dataHidden = !this.dataHidden
        }
    }
})
app.mount("#mainBox")
