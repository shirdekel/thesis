##' @title Get experiment 3
##'
##' @param gambles
##' @param randomize_order
##' @param path
##'
##' @return
##' @author Shir Dekel
##' @export
get_experiment3 <- function(gambles, randomize_order = TRUE, path = here("inst", "jspsych", "experiment3"), pre_experiment = TRUE) {

  projects_experiment3 <-
    get_projects_experiment3(gambles)

  timeline <-
    list(
      get_welcome(),
      get_main_experiment3(projects_experiment3, randomize_order),
      get_post_experiment3()
    )

  if(pre_experiment) {
    timeline <-
      timeline %>%
      append(
        list(get_pre_experiment()),
        after = 1
      )
  }

  experiment3 <- build_experiment(
    timeline = build_timeline(timeline) %>%
      flatten(),
    resources = build_resources(readd(experiment_resources)),
    columns = insert_property(
      subject = insert_javascript("jsPsych.randomization.randomID(15)"),
      experiment = "aggregation_exp3",
      sample = "prolific",
      similarity = insert_javascript("similarity_condition"),
      distribution = insert_javascript("'absent'"),
      awareness = insert_javascript("'naive'"),
      presentation = insert_javascript("'separate'"),
      project_variation = insert_javascript("project_variation_condition"),
      PROLIFIC_PID = insert_javascript("urlvar.PROLIFIC_PID"),
      STUDY_ID = insert_javascript("urlvar.STUDY_ID"),
      SESSION_ID = insert_javascript("urlvar.SESSION_ID")
    ),
    vanilla = c(
      verify_close(),
      condition_allocation_experiment3(),
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

  return(experiment3)
}
