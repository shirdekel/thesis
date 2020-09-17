##' @title Return a javascript function to save data via a script on the psych webserver

##' @return
##' @author Shir Dekel
##' @export
save_psychserver <- function() {

  insert_javascript(
    "function() {
      safe_to_close_window = true; // turn off verifyClose()
      var xhr = new XMLHttpRequest();
      xhr.open('POST', 'SaveToDatabase.aspx'); // change 'write_data.php' to point to php script.
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = function () {
        if (xhr.status == 200) {
          var response = JSON.parse(xhr.responseText);
          console.log(response.success);
        }
      };
      xhr.send(jsPsych.data.get().json());
      setTimeout('location.replace(\"https://app.prolific.co/submissions/complete?cc=8256C4AC\");', 8000);
    }"
  )

}
