##' @title Get experiment 3
##' @param gambles
##'
##' @return
##' @author Shir Dekel
##' @export
get_experiment3 <- function(gambles) {

  projects_experiment3 <-
    get_projects_experiment3(gambles)

  experiment3 <- build_experiment(
    timeline = build_timeline(
      # get_pre_experiment(),
      get_main_experiment3(projects_experiment3),
      get_post_experiment3()
    ),
    resources = build_resources(here("inst", "experiment_resources")),
    columns = insert_property(
      subject = insert_javascript("jsPsych.randomization.randomID(15)"),
      experiment = "aggregation_exp3",
      sample = "prolific",
      similarity = insert_javascript("similarity_condition"),
      distribution = insert_javascript("'absent'"),
      awareness = insert_javascript("'naive'"),
      presentation = insert_javascript("'separate'"),
      project_variation = insert_javascript("project_variation_condition")
    ),
    vanilla = c(
      verify_close(),
      condition_allocation_experiment3(),
      check_other()
    ),
    path = here("inst", "jspsych", "experiment3"),
    experiment_title = "Business decision-making",
    experiment_width = 750,
    preload_images = here("inst", "experiment_resources") %>%
      list.files() %>%
      str_extract("(.*.png)") %>%
      na.omit() %>%
      insert_resource(),
    on_finish = save_locally()
  )

  return(experiment3)
}
