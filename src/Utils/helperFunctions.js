/* eslint-disable no-param-reassign */

/**
 * Given an array of objects, group the objects by the first letter of the object's first name
 * @param arr - the array of objects to be grouped
 * @returns An array of objects. Each object has a property called group which is the first letter of
 * the first name of the person. The value of the group property is another object with a property
 * called children which is an array of all the people with that first letter.
 */
export function groupingByFirstLetter(arr) {
   const dataGrouped = arr.reduce((r, e) => {
      const group = e.first_name[0].toUpperCase()
      if (!r[group]) r[group] = { group, children: [e] }
      else r[group].children.push(e)

      return r
   }, {})
   return Object.values(dataGrouped)
}

/**
 * If the date is today, return 'today'. If the date is yesterday, return 'yesterday'. Otherwise,
 * return the date.
 * @param date - the date you want to format
 */
export function formatedDate(date) {
   let today = new Date()
   const dd = String(today.getDate()).padStart(2, '0')
   const mm = String(today.getMonth() + 1).padStart(2, '0') // January is 0!
   const yyyy = today.getFullYear()
   today = `${yyyy}-${mm}-${dd}`
   const yesterday = `${yyyy}-${mm}-${dd - 1}`

   if (date === today) {
      return 'Oggi'
   }
   if (date === yesterday) {
      return 'Ieri'
   }
   return date
}
