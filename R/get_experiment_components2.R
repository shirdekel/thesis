##' @title Generate experiment components for Experiment 2

##' @param gambles
##'
##' @param randomize_order
##'
##' @return
##' @author Shir Dekel
##' @export
get_experiment_components2 <- function(gambles, randomize_order) {

  projects_experiment <-
    get_projects_experiment2(gambles)

  main_experiment <-
    get_main_experiment2(projects_experiment, randomize_order)

  post_experiment <-
    get_post_experiment2()

  columns <-
    insert_property(
      subject = insert_javascript("jsPsych.randomization.randomID(15)"),
      experiment = "aggregation_exp2",
      sample = "prolific",
      awareness = insert_javascript("awareness_condition"),
      presentation = insert_javascript("presentation_condition"),
      distribution = insert_javascript("distribution_condition")
    )

  condition_allocation <-
    condition_allocation_experiment2()

  experiment_components2 <-
    lst(
      projects_experiment,
      main_experiment,
      post_experiment,
      columns,
      condition_allocation
    )

  return(experiment_components2)
}
