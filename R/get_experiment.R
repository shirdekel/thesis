##' @title Generate experiment files
##'
##' @param ethics
##' @param zip
##' @param on_finish
##' @param gambles
##' @param thesis_project
##' @param experiment_number
##' @param experiment_resources
##' @param sample
##' @param experiment_label
##' @param thesis_project_label
##' @param main
##' @param post_experiment
##' @param condition_allocation_columns
##' @param condition_allocation
##' @param experiment_directory
##'
##' @return
##' @author Shir Dekel
##' @export
get_experiment <- function(gambles, experiment_directory, thesis_project, experiment_number, experiment_resources, main, post_experiment, columns, condition_allocation, ethics = TRUE, zip = TRUE, on_finish = save_psychserver()) {
  if (is.na(main)) return(NA)
  welcome <-
    get_welcome()

  pre_experiment <-
    get_pre_experiment(ethics, experiment_resources)

  build_experiment(
    timeline = build_timeline(
      welcome,
      ## pre_experiment,
      main,
      post_experiment
    ),
    resources = build_resources(experiment_resources),
    columns = columns,
    vanilla = c(
      verify_close(),
      condition_allocation,
      check_other()
    ),
    path = experiment_directory,
    experiment_title = "Business decision-making",
    experiment_width = 750,
    preload_images = experiment_resources %>%
      list.files() %>%
      str_extract("(.*.png)") %>%
      na.omit() %>%
      insert_resource(),
    on_finish = on_finish
  )

  if (zip) zip_experiment(experiment_directory)
}
