##' @title Generate experiment components for Experiment 3
##'
##' @param gambles
##' @param randomize_order
##'
##' @return
##' @author Shir Dekel
##' @export
get_experiment_components3 <- function(gambles, randomize_order) {

  projects_experiment <-
    get_projects_experiment3(gambles)

  main_experiment <-
    get_main_experiment3(projects_experiment, randomize_order)

  post_experiment <-
    get_post_experiment3()

  columns = insert_property(
    subject = insert_javascript("jsPsych.randomization.randomID(15)"),
    thesis_project = "aggregation",
    experiment = "experiment3",
    sample = "prolific",
    similarity = insert_javascript("similarity_condition"),
    distribution = "absent",
    awareness = "naive",
    presentation = "separate",
    project_variation = insert_javascript("project_variation_condition"),
    PROLIFIC_PID = insert_javascript("urlvar.PROLIFIC_PID"),
    STUDY_ID = insert_javascript("urlvar.STUDY_ID"),
    SESSION_ID = insert_javascript("urlvar.SESSION_ID")
  )

  condition_allocation <-
    condition_allocation_experiment3()

  experiment_components3 <-
    lst(
      projects_experiment,
      main_experiment,
      post_experiment,
      columns,
      condition_allocation
    )

  return(experiment_components3)
}
