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
    columns = insert_property(
      experiment = "aggregation_exp2",
      sample = "prolific",
      distribution = insert_javascript("jsPsych.randomization.sampleWithoutReplacement(['present', 'absent'], 1)"),
      awareness = insert_javascript("awareness_presentation.match(regex_awareness)"),
      presentation = insert_javascript("awareness_presentation.match(regex_presentation)")
    ),
    vanilla = c(
      "awareness_presentation = jsPsych.randomization.sampleWithoutReplacement(['aware_separate', 'naive_joint', 'naive_separate'], 1)[0]",
      "regex_awareness = /.*(?=_)/",
      "regex_presentation = /(?<=_).*/"
    ),
    path = here("inst", "jspsych"),
    on_finish = save_locally()
  )

  return(experiment)
}
