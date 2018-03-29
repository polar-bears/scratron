export default function debounce <T extends Function> (fn: T, wait: number = 0): T {
  let timer: any

  return function (this: any) {
    let context: any = this
    let args: any = arguments

    clearTimeout(timer)

    timer = setTimeout(() => {
      fn.apply(context, args)
      context = args = null
    }, wait)
  } as any
}
