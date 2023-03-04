// To minimize Brainfuck code
export function minimize(origin) {
  let commentRemoved = ''
  // Avoid +-,.><[] in comment not being minified
  for (let i = 0; i < origin.length; i++) {
    if (origin[i] == '#') while (origin[i] != '\n') i++
    else commentRemoved += origin[i]
  }
  return commentRemoved.match(/[\+\-><\[\],\.]+/g).join('')
}
