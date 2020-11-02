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
      "alignment",
      "anecdotes"
    )

  experiment_number <-
    c(
      2,
      3,
      4,
      8,
      2
    )

  gamble_n <-
    c(
      10 %>%
        rep(2),
      20,
      NA,
      NA
    )

  get_plot <-
    syms(str_c(
      "get_plot",
      thesis_project,
      experiment_number,
      sep = "_"
    ))

  get_results <-
    syms(
      str_c(
        "get_results_experiment",
        c(experiment_number[1:3])
      ) %>%
        c("get_results_alignment", "get_results_anecdotes")
    )

  import_data <-
    syms(c(
      "import_data_server" %>%
        rep(3),
      "import_data_local" %>%
        rep(2)
    ))

  data_directory_server <-
    c(
      here("inst", "extdata", "psychsydexp") %>%
        rep(5)
    )

  data_clean_test <-
    c(
      FALSE %>%
        rep(3),
      TRUE %>%
        rep(2)
    )

  prolific_filter <-
    list(
      "datetime > '2020-07-28'",
      get_prolific_filter_aggregation_3(),
      get_prolific_filter_aggregation_4(),
      "datetime > '2020-07-28'",
      "datetime > '2020-07-28'"
    )

  prolific_filter_label <-
    list(
      NA,
      list(
        NA,
        "similarity_high",
        "similarity_low",
        "similarity_low_2",
        "similarity_high_2"
      ),
      list(
        NA,
        "awareness_naive",
        "awareness_aware"
      ),
      NA,
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
      get_screenshots_alignment_8(),
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
      get_post_alignment_8(),
      get_post_alignment_8()
    )

  condition_allocation <-
    list(
      condition_allocation_experiment2(),
      condition_allocation_experiment3(),
      condition_allocation_experiment4(),
      condition_allocation_alignment_8(),
      condition_allocation_alignment_8()
    )

  experiment_resources_directory <-
    get_experiment_resources_directory(thesis_project, experiment_number)

  clean_data <-
    c(
      "clean_data_aggregation" %>%
        rep(3),
      "clean_data_alignment",
      "clean_data_anecdotes"
    ) %>%
    syms()

  iv <-
    list(
      c(
        "awareness",
        "distribution",
        "presentation"
      ),
      "similarity",
      "awareness",
      c(
        "alignment",
        "reliability_type",
        "reliability_amount",
        "npv_amount"
      ),
      c(
        "anecdote",
        "alignment",
        "valence"
      )
    )

  dv <-
    list(
      c(
        "choice",
        "proportion",
        "portfolio_binary",
        "portfolio_number"
      ),
      c(
        "choice",
        "proportion",
        "portfolio_binary",
        "portfolio_number",
        "project_expectation"
      ),
      c(
        "choice",
        "proportion",
        "portfolio_binary",
        "portfolio_number",
        "project_expectation"
      ),
      c(
        "allocation",
        "ranking"
      ),
      c(
        "allocation"
      )
    )

  get_data_simulation <-
    c(
      "get_data_simulation_aggregation" %>%
        rep(3),
      "get_data_simulation_alignment",
      "get_data_simulation_anecdotes"
    ) %>%
    syms()

  get_plot_simulation <-
    c(
      "get_data_simulation_aggregation" %>%
        rep(3),
      "plot_point_apa",
      "get_data_simulation_anecdotes"
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
      experiment_resources_directory,
      clean_data,
      iv,
      dv,
      get_data_simulation,
      get_plot_simulation
    ) %>%
    filter(thesis_project != "anecdotes")

  return(parameters)
}
