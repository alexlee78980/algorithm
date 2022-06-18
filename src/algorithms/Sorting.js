export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const arrayTwo = [...array];
    mergeSortHelper(array, 0, array.length - 1, arrayTwo, animations);
    return animations;
  }
  
  function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
  }
  
  function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      animations.push([i, j]);
      animations.push([i, j]);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {
      animations.push([i, i]);
      animations.push([i, i]);
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      animations.push([j, j]);
      animations.push([j, j]);
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }






export function getSelectionSortAnimation(array) {
    const animations = [];
    if (array.length <= 1) return array;
    selectionSort(array, array.length, animations);
    return animations;
  }

  function swap(arr,xp, yp, animations)
{
    var temp = arr[xp];
    animations.push([xp, yp]);
    animations.push([xp, yp]);
    animations.push([xp, yp]);
    arr[xp] = arr[yp];
    arr[yp] = temp;
}

function selectionSort(arr,  n, animations)
{
    var i, j, min_idx;
 
    // One by one move boundary of unsorted subarray
    for (i = 0; i < n-1; i++)
    {
        min_idx = i;
        for (j = i + 1; j < n; j++){
        if (arr[j] < arr[min_idx])
                min_idx = j;
        }    
            swap(arr,min_idx, i, animations);
        
    }
}

export function getInsertionSortAnimation(arr){
    const animations = [];
    insertionSort(arr, arr.length, animations);
    return animations

}
function insertionSort(arr, n, animations) 
{ 
    let i, key, j; 
    for (i = 1; i < n; i++)
    { 
        key = arr[i]; 
        j = i - 1; 
   
        /* Move elements of arr[0..i-1], that are 
        greater than key, to one position ahead 
        of their current position */
        while (j >= 0 && arr[j] > key)
        {   
            animations.push([j+1, j]);
            animations.push([j+1, j]);
            animations.push([j+1, arr[j]]);
            arr[j + 1] = arr[j]; 
            j = j - 1; 
        }
        animations.push([j+1, i]);
        animations.push([j+1, i]);
        animations.push([j+1, key]); 
        arr[j + 1] = key; 
    } 
} 
   