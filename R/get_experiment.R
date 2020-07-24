##' @title Generate experiment file

##' @param ... trials to build
##'
##' @return
##' @author Shir Dekel
##' @export
get_experiment <- function(...) {
  experiment <- build_experiment(
    timeline = build_timeline(...),
    resources = build_resources(here("inst", "experiment_resources")),
    columns = insert_property(
      experiment = "aggregation_exp2",
      sample = "prolific",
      distribution = insert_javascript("condition.match(regex_distribution)[1]"), # Add [1] to extract capture group
      awareness = insert_javascript("condition.match(regex_awareness)[1]"),
      presentation = insert_javascript("condition.match(regex_presentation)[1]")
    ),
    vanilla = c(
      "condition = jsPsych.randomization.sampleWithoutReplacement(['naive_joint_absent', 'naive_separate_absent', 'naive_separate_present'], 1)[0]",
      "regex_awareness = /(.*)_.*_.*/",
      "regex_presentation = /.*_(.*)_.*/",
      "regex_distribution = /.*_.*_(.*)") %>%
    coffee_compile(bare = T) %>%
      c("function checkOther(val, id){
 var element=document.getElementById(id);
 if(val=='Other')
   element.style.display='block';
 else
   element.style.display='none';
}"),
    path = here("inst", "jspsych"),
    experiment_title = "Business decision-making",
    on_close = insert_javascript(" function(){
    event.preventDefault();
    event.returnValue = '';
  }"),
    experiment_width = 750,
    preload_images = here("inst", "experiment_resources") %>%
      list.files() %>%
      str_extract("(.*.png)") %>%
      na.omit() %>%
      insert_resource(),
    on_finish = insert_javascript("
    function() {
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
    }")
  )

  return(experiment)
}



