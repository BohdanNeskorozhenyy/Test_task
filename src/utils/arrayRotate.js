import { useState, useEffect } from "react";


export const useArrayRotate = (oldArr, newArr) => {
   const [counter, setCounter] = useState(0);

   useEffect(() => {
      setCounter(0)
   }, [newArr])

   function arrayRotate(arr, newArr) {
      if (newArr.length > 0 && counter <= 4) {
         const arrCopy = [...arr];
         arrCopy.shift();
         arrCopy.push(newArr[counter]);
         setCounter(counter => ++counter);
         return [...arrCopy];
      }
      const arrCopy = [...arr];
      const firstEl = arrCopy[0];
      arrCopy.shift();
      arrCopy.push(firstEl)
      return [...arrCopy];
   }

   return {
      arrayRotate
   }

}



