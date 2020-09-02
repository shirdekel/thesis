##' @title Get experiment 4
##' @param gambles
##' @return
##' @author Shir Dekel
##' @export
get_experiment4 <- function(gambles, randomize_order = TRUE, path = here("inst", "jspsych", "experiment4"), ethics = TRUE) {

  projects_experiment4 <-
    get_projects_experiment4(gambles)

  experiment4 <- build_experiment(
    timeline = build_timeline(
      get_welcome(),
      get_pre_experiment(ethics),
      get_main_experiment4(projects_experiment4, randomize_order),
      get_post_experiment4()
    ),
    resources = build_resources(readd(experiment_resources)),
    columns = insert_property(
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
    ),
    vanilla = c(
      verify_close(),
      condition_allocation_experiment4(),
      check_other()
    ),
    path = path,
    experiment_title = "Business decision-making",
    experiment_width = 750,
    preload_images = here("inst", "experiment_resources") %>%
      list.files() %>%
      str_extract("(.*.png)") %>%
      na.omit() %>%
      insert_resource(),
    on_finish = save_locally()
  )

  return(experiment4)
}
