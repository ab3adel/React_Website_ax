export function maybeCall(maybeFunc, ...args) {
   if (typeof maybeFunc === 'function') {
      return maybeFunc(...args)
   } 
      return maybeFunc
   
}
