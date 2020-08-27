##' @title Generate experiment file

##' @return
##' @author Shir Dekel
##' @export
get_experiment2 <- function(gambles) {

  projects_experiment2 <-
    get_projects_experiment2(gambles)

  experiment2 <- build_experiment(
    timeline = build_timeline(
      get_welcome(),
      get_pre_experiment(),
      get_main_experiment2(projects_experiment2),
      get_post_experiment2()
    ),
    resources = build_resources(here("inst", "experiment_resources")),
    columns = insert_property(
      subject = insert_javascript("jsPsych.randomization.randomID(15)"),
      experiment = "aggregation_exp2",
      sample = "prolific",
      awareness = insert_javascript("awareness_condition"),
      presentation = insert_javascript("presentation_condition"),
      distribution = insert_javascript("distribution_condition")
    ),
    vanilla = c(
      verify_close(),
      condition_allocation_experiment2(),
      check_other()
    ),
    path = here("inst", "jspsych", "experiment2"),
    experiment_title = "Business decision-making",
    experiment_width = 750,
    preload_images = here("inst", "experiment_resources") %>%
      list.files() %>%
      str_extract("(.*.png)") %>%
      na.omit() %>%
      insert_resource(),
    on_finish = save_psychserver()
  )

  return(experiment2)
}
