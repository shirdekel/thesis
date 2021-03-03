##' @title Return a javascript function to save data via a script on the psych webserver
##'
##' But to download to file, rather than database.
##'
##' Because of issues on the server.

##' @return
##' @author Shir Dekel
##' @export
save_psychserver_file <- function() {
    insert_javascript(
        "function() {
      safe_to_close_window = true; // turn off verifyClose()
      var xhr = new XMLHttpRequest();
      xhr.open('POST', 'SaveToFile.aspx');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = function () {
        if (xhr.status == 200) {
          var response = JSON.parse(xhr.responseText);
          console.log(response.success);
        }
      };
      xhr.send(jsPsych.data.get().csv()); // .csv() for file format
      setTimeout('location.replace(\"https://app.prolific.co/submissions/complete?cc=8256C4AC\");', 10000);
    }"
    )
}
