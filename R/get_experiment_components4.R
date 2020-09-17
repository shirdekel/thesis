##' @title Generate experiment components for Experiment 4
##'
##' @param randomize_order
##' @param gambles
##'
##' @return
##' @author Shir Dekel
##' @export
get_experiment_components4 <- function(gambles, randomize_order) {

  projects_experiment <-
    get_projects_experiment4(gambles)

  main_experiment <-
    get_main_experiment4(projects_experiment, randomize_order)

  post_experiment <-
    get_post_experiment4()

  columns <- insert_property(
    subject = insert_javascript("jsPsych.randomization.randomID(15)"),
    thesis_project = "aggregation",
    experiment = "experiment4",
    sample = "prolific",
    similarity = "low",
    distribution = "absent",
    awareness = insert_javascript("awareness_condition"),
    presentation = "separate",
    project_variation = insert_javascript("project_variation_condition"),
    current_project_choice_order = insert_javascript("1"),
    PROLIFIC_PID = insert_javascript("urlvar.PROLIFIC_PID"),
    STUDY_ID = insert_javascript("urlvar.STUDY_ID"),
    SESSION_ID = insert_javascript("urlvar.SESSION_ID")
  )


  condition_allocation <-
    condition_allocation_experiment4()

  experiment_components4 <-
    lst(
      projects_experiment,
      main_experiment,
      post_experiment,
      columns,
      condition_allocation
    )

  return(experiment_components4)
}
