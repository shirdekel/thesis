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
      distribution = insert_javascript("condition.match(regex_distribution)[1]"), # Add [1] to extract capture group
      awareness = insert_javascript("condition.match(regex_awareness)[1]"),
      presentation = insert_javascript("condition.match(regex_presentation)[1]")
    ),
    vanilla = c(
      verify_close(),
      condition_allocation(),
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
    on_finish = save_psychserver()
  )

  return(experiment)
}
