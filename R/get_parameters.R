##' @title Get plan parameters
##'
##' To be used in static branching functions

##' @return
##' @author Shir Dekel
##' @export
get_parameters <- function() {
  import_data <-
    syms(c(
      "import_data_server" %>%
        rep(3),
      "import_data_local" %>%
        rep(3)
    ))

  data_directory_server <-
    c(
      here("inst", "extdata", "psychsydexp") %>%
        rep(3),
      here("inst", "extdata", "qualtrics"),
      here("inst", "extdata", "psychsydexp") %>%
        rep(2)
    )

  data_directory_server %>%
    map(create_directory)

  data_clean_test <-
    c(
      FALSE %>%
        rep(4),
      TRUE %>%
        rep(2)
    )

  prolific_filter <-
    list(
      "datetime > '2020-07-28'",
      get_prolific_filter_aggregation_3(),
      get_prolific_filter_aggregation_4(),
      NA,
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
      NA,
      NA
    )

  clean_data <-
    c(
      "clean_data_aggregation" %>%
        rep(3),
      "clean_data_alignment_2",
      "clean_data_alignment_8",
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
        "reliability_amount",
        "npv_amount"
      ),
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
        "ranking",
        "confidence",
        "forecast_mean",
        "forecast_sd"
      ),
      c(
        "allocation",
        "ranking"
      ),
      c(
        "allocation"
      )
    )

  get_plot_simulation <-
    c(
      "get_data_simulation_aggregation" %>%
        rep(3),
      "plot_point_apa",
      "plot_point_apa",
      "get_data_simulation_anecdotes"
    ) %>%
    syms()

  experiment_generator <-
    c(
      "jspsych" %>%
        rep(3),
      "qualtrics",
      "jspsych" %>%
        rep(2)
    )

  parameters <-
    tibble(
      thesis_project = get_thesis_project(),
      experiment_number = get_experiment_number(),
      experiment_generator,
      import_data,
      data_directory_server,
      data_clean_test,
      prolific_filter,
      prolific_filter_label,
      clean_data,
      iv,
      dv,
      get_plot_simulation
    ) %>%
    rowwise() %>%
    mutate_function_call(
      "plot",
      thesis_project,
      experiment_number
    ) %>%
    mutate_function_call(
      "results",
      thesis_project,
      experiment_number
    ) %>%
    mutate_function_call(
      "main",
      thesis_project,
      experiment_number
    ) %>%
    mutate(
      gamble_n = get_gamble_n(thesis_project, experiment_number),
      memo_path = get_all_memo_paths(
        thesis_project,
        experiment_number
      ),
      materials_directory = get_materials_directory(
        thesis_project,
        experiment_number
      ),
      experiment_directory = case_when(
        experiment_generator == "jspsych" ~ get_experiment_directory(
          thesis_project,
          experiment_number
        )
      ),
      post_experiment = case_when(
        experiment_generator == "jspsych" ~ execute_function_call(
          "post",
          thesis_project,
          experiment_number
          ) %>%
          list()
      ),
      columns = case_when(
        experiment_generator == "jspsych" ~ execute_function_call(
                                  "columns",
          thesis_project,
          experiment_number
          )
      ),
      condition_allocation = case_when(
        experiment_generator == "jspsych" ~ execute_function_call(
          "condition_allocation",
          thesis_project,
          experiment_number
        )
      ),
      # Will return an empty directory for qualtrics experiments
      experiment_resources_directory = get_experiment_resources_directory(
          thesis_project,
          experiment_number
      ),
      screenshot_components = case_when(
        experiment_generator == "jspsych" ~ execute_function_call(
          "screenshots",
          thesis_project,
          experiment_number
          ) %>%
          list()
      ),
      data_simulation = case_when(
        experiment_generator == "jspsych" ~ get_function_call(
          "data_simulation",
          thesis_project,
          experiment_number
        )
      )
    ) %>%
    filter(thesis_project != "anecdotes")

  return(parameters)
}
