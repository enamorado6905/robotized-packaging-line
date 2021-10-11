const { format } = require("morgan");

/**
 * @constant stdin process event
 * @constant arrayInput array string
 * @constant boxes all boxes
 */
console.info("Write a Number");
let stdin = process.openStdin();
let arrayInput: Array<any> = [];
let boxes = 1;
stdin.addListener("data", function (data) {
   if (!isNumeric(data.toString().trim())) {
      console.error("character not allowed");
      return;
   }
   packagingLine(data.toString().trim());
});

/**
 *
 * @param value
 * @returns true if value is number
 */
function isNumeric(value: any): boolean {
   for (let i = 0, len = value.length; i < len; i++) {
      if (!(!isNaN(parseInt(value[i])) && isFinite(parseInt(value[i])))) {
         return false;
      }
   }
   return true;
}
/**
 *
 * @param value
 * @returns array type number
 */
function array(value: any): Array<number> {
   let array: Array<number> = [];
   for (let i = 0, len = value.length; i < len; i++) {
      array.push(parseInt(value[i]));
   }
   return array;
}
/**
 *
 * @returns less number in the array and its position
 */
function minNumber(): { min: number; post: number } {
   let min = arrayInput[0];
   let post = 0;
   for (var i = 0; i < arrayInput.length; i++) {
      if (arrayInput[i] < min) {
         min = arrayInput[i];
         post = i;
      }
   }
   return { min, post };
}
/**
 *
 * @returns
 */
function orderArray(param: Array<number>): Array<number> {
   let array: Array<any> = [];
   do {
      array.push(minNumber().min);
      param.splice(minNumber().post, 1);
   } while (param.length > 0);
   return array;
}
/**
 *
 * @param param
 * @returns
 */
function clearArray(param: Array<number>): string {
   let newArray = param.toString().split(",").join("");
   return newArray;
}
/**
 *
 * @param param
 * @returns array with |
 */
function addItem(param: Array<number>): Array<number> {
   let array: Array<any> = [];
   let add: any = param[0];
   let cont = 0;
   for (const i of param) {
      if (add <= 10) {
         array.push(i);
      } else {
         add = i;
         boxes += 1;
         array.push("|");
         array.push(i);
      }
      cont += 1;
      add += param[cont];
   }
   return array;
}
/**
 *
 * @param value
 */
function packagingLine(value: Array<number>) {
   arrayInput = array(value.toString().trim());
   arrayInput = orderArray(arrayInput);
   arrayInput = addItem(arrayInput);
   const all = clearArray(arrayInput);
   console.log("Optimized robot:" + " " + all + "=>" + " " + boxes + " " + "used boxes");
}
