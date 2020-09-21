##' @title Generate experiment files
##'
##' @param ethics
##' @param zip
##' @param on_finish
##' @param gambles
##' @param path
##' @param thesis_project
##' @param experiment_number
##' @param experiment_resources
##' @param experiment_components
##'
##' @return
##' @author Shir Dekel
##' @export
get_experiment <- function(gambles, path, thesis_project, experiment_number, experiment_resources, experiment_components, ethics = TRUE, zip = TRUE, on_finish = save_psychserver()) {

  welcome <-
    get_welcome()

  pre_experiment <-
    get_pre_experiment(ethics)

  build_experiment(
    timeline = build_timeline(
      welcome,
      pre_experiment,
      experiment_components$main_experiment,
      experiment_components$post_experiment
    ),
    resources = build_resources(experiment_resources),
    columns = experiment_components$columns,
    vanilla = c(
      verify_close(),
      experiment_components$condition_allocation,
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
    on_finish = on_finish
  )

  if (zip) zip_experiment(path)

}
