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
      subject = insert_javascript("jsPsych.randomization.randomID(15)"),
      experiment = "aggregation_exp2",
      sample = "prolific",
      distribution = insert_javascript("'absent'"), # Add [1] to extract capture group
      awareness = insert_javascript("'naive'"),
      presentation = insert_javascript("'separate'"),
      similarity = insert_javascript("'high'"),
      project_variation = str_c(1:10, collapse = ", ") %>%
        str_c("jsPsych.randomization.sampleWithReplacement([", ., "], 1)") %>%
      insert_javascript()
    ),
    vanilla = c(
      verify_close(),
      # condition_allocation(),
      check_other()
    ),
    path = here("inst", "jspsych"),
    experiment_title = "Business decision-making",
    experiment_width = 750,
    preload_images = here("inst", "experiment_resources") %>%
      list.files() %>%
      str_extract("(.*.png)") %>%
      na.omit() %>%
      insert_resource(),
    on_finish = save_locally()
  )

  return(experiment)
}
