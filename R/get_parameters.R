##' @title Get plan parameters
##'
##' To be used in static branching functions

##' @return
##' @author Shir Dekel
##' @export
get_parameters <- function() {
  if (all(getOption("contrasts") != c("contr.sum", "contr.poly"))) {
    set_sum_contrasts()
  }

  import_data <-
    syms(c(
      "import_data_local",
      "import_data_server" %>%
        rep(3),
      "import_data_local" %>%
        rep(7),
      "import_data_server",
      "import_data_anecdotes_1",
      "import_data_local_anecdotes_2"
    ))

  data_directory_server <-
    c(
      file.path("inst", "extdata", "aggregation", "experiment1"),
      file.path("inst", "extdata", "psychsydexp") %>%
        rep(3),
      file.path("inst", "extdata", "alignment", "experiment1"),
      file.path("inst", "extdata", "alignment", "experiment2"),
      file.path("inst", "extdata", "alignment", "experiment3"),
      file.path("inst", "extdata", "alignment", "experiment4"),
      file.path("inst", "extdata", "alignment", "experiment5"),
      file.path("inst", "extdata", "alignment", "experiment6"),
      file.path("inst", "extdata", "alignment", "experiment7"),
      file.path("inst", "extdata", "psychsydexp"),
      file.path("inst", "extdata", "anecdotes", "experiment1"),
      file.path("inst", "extdata", "anecdotes", "experiment2")
    )

  data_directory_server %>%
    map(create_directory)

  data_clean_test <-
    c(
      FALSE %>%
        rep(14)
    )

  prolific_filter <-
    list(
      NA,
      "datetime > '2020-07-28'",
      get_prolific_filter_aggregation_3(),
      get_prolific_filter_aggregation_4(),
      NA,
      NA,
      NA,
      NA,
      NA,
      NA,
      NA,
      get_prolific_filter_alignment_8(),
      "datetime > '2020-07-28'",
      get_prolific_filter_anecdotes_2()
    )

  prolific_filter_label <-
    list(
      NA,
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
      NA,
      NA,
      NA,
      NA,
      NA,
      list(
        "incorrect_input_id",
        NA,
        "high_explicit",
        "high_implicit",
        "low_implicit"
      ),
      NA,
      list(
        NA,
        "anecdote_only",
        "combined"
      )
    )

  clean_data <-
    c(
      "clean_data_aggregation_1",
      "clean_data_aggregation" %>%
        rep(3),
      "clean_data_alignment_1",
      "clean_data_alignment_2",
      "clean_data_alignment_3",
      "clean_data_alignment_4",
      "clean_data_alignment_5",
      "clean_data_alignment_6",
      "clean_data_alignment_7",
      "clean_data_alignment_8",
      "clean_data_anecdotes_1",
      "clean_data_anecdotes_2"
    ) %>%
    syms()

  iv <-
    list(
      c(
        "alignment",
        "awareness",
        "presentation"
      ),
      c(
        "awareness",
        "distribution",
        "presentation"
      ),
      "similarity",
      "awareness",
      c(
        "alignment",
        "reliability_amount"
      ),
      c(
        "alignment",
        "reliability_amount",
        "npv_amount"
      ),
      c(
        "alignment",
        "reliability_amount"
      ),
      c(
        "alignment",
        "reliability_amount"
      ),
      c(
        "alignment",
        "reliability_amount"
      ),
      c(
        "hint",
        "variance"
      ),
      c(
        "reliability_type",
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
        "alignment"
      ),
      c(
        "anecdote_between",
        "similarity",
        "valence"
      )
    )

  dv <-
    list(
      c(
        "proportion"
      ),
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
        "confidence",
        "max_min_difference"
      ),
      c(
        "allocation",
        "ranking",
        "confidence",
        "forecast_mean",
        "forecast_sd"
      ),
      c(
        "ranking",
        "allocation",
        "confidence",
        "npv_allocation_correlation",
        "max_min_difference"
      ),
      c(
        "forecast_mean",
        "forecast_sd"
      ),
      c(
        "forecast_mean",
        "forecast_sd"
      ),
      c(
        "ranking",
        "allocation",
        "max_min_difference"
      ),
      c(
        "allocation",
        "ranking"
      ),
      c(
        "allocation",
        "ranking"
      ),
      c(
        "allocation"
      ),
      c(
        "allocation"
      )
    )

  experiment_generator <-
    c(
      "jspsych",
      "jaysire" %>%
        rep(3),
      "qualtrics" %>%
        rep(7),
      "jaysire",
      "jspsych",
      "jaysire"
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
      dv
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
      get_main = case_when(
        experiment_generator == "jaysire" ~ get_function_call(
          "main",
          thesis_project,
          experiment_number
        ),
        TRUE ~ sym("placeholder") %>%
          list()
      ),
      experiment_directory = case_when(
        experiment_generator == "jaysire" ~ get_experiment_directory(
          thesis_project,
          experiment_number
        )
      ),
      post_experiment = execute_function_call_if_else(
        "post",
        experiment_generator,
        thesis_project,
        experiment_number
      ),
      columns = execute_function_call_if_else(
        "columns",
        experiment_generator,
        thesis_project,
        experiment_number
      ),
      condition_allocation = execute_function_call_if_else(
        "condition_allocation",
        experiment_generator,
        thesis_project,
        experiment_number
      ),
      screenshot_components = execute_function_call_if_else(
        "screenshots",
        experiment_generator,
        thesis_project,
        experiment_number
      ),
      experiment_resources_directory = get_experiment_resources_directory(
        thesis_project,
        experiment_number
      ),
      get_data_simulation = case_when(
        (thesis_project == "alignment" &
          experiment_number == 8) |
          (thesis_project == "anecdotes" &
            experiment_number == 2) ~ get_function_call(
          "data_simulation",
          thesis_project,
          experiment_number
        ),
        TRUE ~ sym("placeholder") %>%
          list()
      ),
      get_power_table = case_when(
        (thesis_project == "alignment" &
          experiment_number == 8) |
          (thesis_project == "anecdotes" &
            experiment_number == 2) ~ get_function_call(
          "power_table",
          thesis_project,
          experiment_number
        ),
        TRUE ~ sym("placeholder") %>%
          list()
      ),
      get_power = case_when(
        (thesis_project == "alignment" &
          experiment_number == 8) |
          (thesis_project == "anecdotes" &
            experiment_number == 2) ~ get_function_call(
          "power",
          thesis_project,
          experiment_number
        ),
        TRUE ~ sym("placeholder") %>%
          list()
      ),
      get_plot_simulation = case_when(
        (thesis_project == "alignment" &
          experiment_number == 8) |
          (thesis_project == "anecdotes" &
            experiment_number == 2) ~ get_function_call(
          "plot_simulation",
          thesis_project,
          experiment_number
        ),
        TRUE ~ sym("placeholder") %>%
          list()
      ),
      filter_data_raw = case_when(
        experiment_generator %in% c("jaysire", "jspsych") ~
        sym("filter_data_raw_jspsych") %>%
          list(),
        TRUE ~ sym("filter_data_raw_qualtrics") %>%
          list()
      )
    )
  return(parameters)
}
