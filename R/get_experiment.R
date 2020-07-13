##' @title Generate experiment file

##' @param ... trials to build
##'
##' @return
##' @author Shir Dekel
##' @export
get_experiment <- function(...) {

  experiment <- build_experiment(
    timeline = build_timeline(...),
    resources = build_resources(here("images")),
    columns = insert_property(experiment = "aggregation_exp2",
                              sample = "prolific",
                              condition_distribution = insert_javascript("jsPsych.randomization.sampleWithoutReplacement(['present', 'absent'], 1)"),
                              condition_awareness = insert_javascript("jsPsych.randomization.sampleWithoutReplacement(['aware', 'naive'], 1)"),
                              condition_presentation = insert_javascript("jsPsych.randomization.sampleWithoutReplacement(['joint', 'separate'], 1)")),
    path = here("inst", "jspsych"),
    on_finish = save_locally()
  )

  return(experiment)

}
