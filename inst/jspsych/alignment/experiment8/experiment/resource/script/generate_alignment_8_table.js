function generate_alignment_8_table(project_details, row_names, header_row) {

    // 1. Shuffle the five vectors (columns)
    // From https://www.jspsych.org/core_library/jspsych-randomization/#shuffle-an-array
    var array_shuffled = jsPsych.randomization.shuffle(project_details); 

    // 2. Add row name vector to the end of the array
    // From https://stackoverflow.com/a/6195753/13945974
    array_shuffled.unshift(row_names);

    // 3. Transpose so that the rows are now columns
    // From https://stackoverflow.com/a/17428705/13945974
    // var array_transposed = array_shuffled[0].map((_, colIndex) => array_shuffled.map(row => row[colIndex]));
    var array_transposed = array_shuffled[0].map(function (_, colIndex) {
        return array_shuffled.map(function (row) {
            return row[colIndex];
        });
    });
    // 4. Add header name vector
    array_transposed.unshift(header_row);

    // 5. Convert the new array of 6x6 into an HTML table
    // From https://stackoverflow.com/a/15164796/13945974
    // The other one (https://stackoverflow.com/a/15164958/13945974) didn't work
    function makeTableHTML(myArray) {
        var result = "<table border=1>";
        for(var i=0; i<myArray.length; i++) {
            result += "<tr>";
            for(var j=0; j<myArray[i].length; j++){
                result += "<td>"+myArray[i][j]+"</td>";
            }
            result += "</tr>";
        }
        result += "</table>";

        return result;
    }
    var table = makeTableHTML(array_transposed);
    return table
}
