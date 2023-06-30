// To minimize Brainfuck code
export function minimize(origin: string) {
  let commentRemoved = ''
  // Avoid +-,.><[] in comment not being minified
  for (let i = 0; i < origin.length; i++) {
    if (origin[i] == '#') while (origin[i] != '\n') i++
    else commentRemoved += origin[i]
  }
  let res = commentRemoved.match(/[\+\-><\[\],\.]+/g)
  return res === null ? '' : (res as Array<string>).join('')
}
