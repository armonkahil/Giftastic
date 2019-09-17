
var array1 = [ 1 , 4 , 7 ];
Output: 4
array2 = [ 10, 5 ];
Output: 7.5
array3 = [ 1.5, 3, 2.5, 1 ]
Output: 2
var median = 0;
function average (array) {
    var sum = 0
    for (var i=0; i< array.length; i++) {
        sum += array[i];
    }
    console.log(sum/array.length);
    
}




var result = average(array1);
console.log("result", result);



average (array1)
average (array2)
average (array3)