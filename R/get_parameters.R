##' @title Get plan parameters
##'
##' To be used in static branching functions

##' @return
##' @author Shir Dekel
##' @export
get_parameters <- function() {
  thesis_project <-
    c(
      c("aggregation") %>%
        rep(3),
      "alignment"
    )

  experiment_number <-
    c(
      2,
      3,
      4,
      8
    )

  gamble_n <-
    c(
      10 %>%
        rep(2),
      20,
      NA
    )

  get_plot <-
    syms(str_c("get_plot_experiment", c(experiment_number[1:3], 4)))

  get_results <-
    syms(str_c("get_results_experiment", c(experiment_number[1:3], 4)))

  import_data <-
    syms(c(
      "import_data_server" %>%
        rep(3),
      "import_data_local"
    ))

  data_directory_server <-
    c(
      here("inst", "extdata", "psychsydexp") %>%
        rep(4)
    )

  data_clean_test <-
    c(
      FALSE %>%
        rep(3),
      TRUE
    )

  prolific_filter <-
    list(
      "datetime > '2020-07-28'",
      get_prolific_filter_aggregation_3(),
      get_prolific_filter_aggregation_4(),
      "datetime > '2020-07-28'"
    )

  prolific_filter_label <-
    list(
      NA,
      list(
        NA,
        "similarity_low",
        "similarity_high"
      ),
      list(
        NA,
        "awareness_naive",
        "awareness_aware"
      ),
      NA
    )

  experiment_directory <-
    get_experiment_directory(thesis_project, experiment_number)

  get_main <-
    syms(
      str_c(
        "get",
        "main",
        thesis_project,
        experiment_number,
        sep = "_"
      )
    )

  screenshot_components <-
    list(
      get_screenshots_experiment2(),
      get_screenshots_experiment3(),
      get_screenshots_experiment4(),
      get_screenshots_alignment_8()
    )

  materials_directory <-
    get_materials_directory(thesis_project, experiment_number)

  memo_path <-
    get_all_memo_paths(thesis_project, experiment_number)

  columns <-
    get_columns(thesis_project, experiment_number)

  post_experiment <-
    list(
      get_post_experiment2(),
      get_post_experiment3(),
      get_post_experiment4(),
      get_post_alignment_8()
    )

  condition_allocation <-
    list(
      condition_allocation_experiment2(),
      condition_allocation_experiment3(),
      condition_allocation_experiment4(),
      condition_allocation_alignment_8()
    )

  experiment_resources_directory <-
    here(
      "inst",
      "experiment_resources",
      thesis_project,
      str_c(
        "experiment",
        experiment_number
      )
    )

  clean_data <-
    c(
      "clean_data_aggregation" %>%
        rep(3),
      "clean_data_alignment"
    ) %>%
    syms()
  parameters <-
    tibble(
      thesis_project,
      experiment_number,
      gamble_n,
      get_plot,
      get_results,
      import_data,
      data_directory_server,
      data_clean_test,
      prolific_filter,
      prolific_filter_label,
      experiment_directory,
      get_main,
      screenshot_components,
      memo_path,
      materials_directory,
      columns,
      post_experiment,
      condition_allocation,
      experiment_resources_directory
    )

  return(parameters)
}
