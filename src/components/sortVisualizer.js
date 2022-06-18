import React, { useEffect, useState } from "react";
import classes from './sortVisualizer.module.css';
import { getInsertionSortAnimation, getMergeSortAnimations, getSelectionSortAnimation } from "../algorithms/Sorting";
// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 210;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';
const SortVisualizer = () =>{
    const [arr, setArr] = useState([]);
const generateArray = () => {
    setArr([]);
    for (let i = 0; i<NUMBER_OF_ARRAY_BARS; i++){
        setArr(prev => [...prev , Math.floor(Math.random() * (730 - 5 + 1) + 5)]);
    }
};
const mergeSort = () => {
    const animations = getMergeSortAnimations(arr);
    console.log(animations);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName(classes['array-bar']);
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
};
const selectionSort = () => {
    const animations = getSelectionSortAnimation(arr);
    console.log(animations);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName(classes['array-bar']);
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          console.log(animations[i]);
          const [barOneIdx, barTwoIdx] = animations[i];
          const heightOne = arrayBars[barTwoIdx].style.height;
          console.log(heightOne);
          const heightTwo = arrayBars[barOneIdx].style.height;
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          barOneStyle.height = heightOne;
          barTwoStyle.height = heightTwo;
        }, i * ANIMATION_SPEED_MS);
      }
    }
};
const InsertionSort = () => {
  const animations = getInsertionSortAnimation(arr);
  console.log(animations);
  for (let i = 0; i < animations.length; i++) {
    const arrayBars = document.getElementsByClassName(classes['array-bar']);
    const isColorChange = i % 3 !== 2;
    if (isColorChange) {
      const [barOneIdx, barTwoIdx] = animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;
      const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
      setTimeout(() => {
        barOneStyle.backgroundColor = color;
        barTwoStyle.backgroundColor = color;
      }, i * ANIMATION_SPEED_MS);
    } else {
      setTimeout(() => {
        console.log(animations[i]);
        const [barOneIdx, heightOne] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        barOneStyle.height = `${heightOne}px`;
      }, i * ANIMATION_SPEED_MS);
    }
  }
};
console.log(arr);
useEffect(() => {
    generateArray();
},[]);
    return <React.Fragment> <div className={classes['array-container']}>
        {arr.map((value, idx)=>{
           return <div className={classes['array-bar']} key={idx} style={{backgroundColor:PRIMARY_COLOR, height:`${value}px`}}></div>
        })}
        <div><button onClick={generateArray}>Generate New Array</button>
        <button onClick={mergeSort}>Merge Sort</button>
        <button onClick={selectionSort}>Selection Sort</button>
        <button onClick={InsertionSort}>Insertion Sort</button>
         </div>   </div>
    </React.Fragment>
};

export default SortVisualizer;