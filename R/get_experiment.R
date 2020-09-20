##' @title Generate experiment files
##'
##' @param randomize_order
##' @param ethics
##' @param zip
##' @param on_finish
##' @param gambles
##' @param experiment
##' @param path
##' @param thesis_project
##'
##' @return
##' @author Shir Dekel
##' @export
get_experiment <- function(gambles, path, thesis_project, experiment, randomize_order = TRUE, ethics = TRUE, zip = TRUE, on_finish = save_psychserver()) {

  welcome <-
    get_welcome()

  pre_experiment <-
    get_pre_experiment(ethics)

  if (thesis_project == "aggregation") {
    if (experiment == 2) {
      experiment_components <-
        get_experiment_components2(gambles, randomize_order)
    } else if (experiment == 3) {
      experiment_components <-
        get_experiment_components3(gambles, randomize_order)
    } else if (experiment == 4) {
      experiment_components <-
        get_experiment_components4(gambles, randomize_order)
    }
  }

  build_experiment(
    timeline = build_timeline(
      welcome,
      pre_experiment,
      experiment_components$main_experiment,
      experiment_components$post_experiment
    ),
    resources = build_resources(readd(experiment_resources)),
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
