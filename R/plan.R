the_plan <-
  drake_plan(
    restricted_values = get_restricted_values(
      get_prob_positive_seq(),
      get_outcome_positive_seq()
    ),
    gambles = get_gambles(restricted_values, 10),
    restricted_values_20 = get_restricted_values(
      get_prob_positive_seq(),
      seq(from = 100, to = 200, by = 5)
    ),
    gambles_20 = get_gambles(restricted_values_20, 20),
    gambles_plot = plot_gambles(gambles, file_name = "distribution"),
    gambles_plot_20 = plot_gambles(gambles_20, file_name = "distribution_20"),
    experiment2 = target({
      get_experiment2(gambles)
      file_out(!!here("inst", "jspsych", "experiment2", "experiment", "experiment.js"))
    }),
    experiment3 = target({
      get_experiment3(gambles)
      file_out(!!here("inst", "jspsych", "experiment3", "experiment", "experiment.js"))
    }),
    data_directory_local = target(
      here("inst", "jspsych", "experiment3", "data"),
      format = "file"
    ),
    data_raw_local = import_data_local(data_directory_local),
    data_directory_server = target(
      here("inst", "extdata", "psychsydexp"),
      format = "file"
    ),
    data_raw_server = import_data_server(data_directory_server),
    data = clean_data(data_raw_server),
    data_effects = split_data(data),
    descriptives = get_descriptives(data),
    choice_binary_plot = plot_choice(
      data_effects,
      choice,
      "Mean choice of project acceptance"
    ),
    choice_proportion_plot = plot_choice(
      data_effects,
      proportion,
      "Mean proportion of project acceptance"
    ),
    awareness_trials_plot = plot_awareness_trials(data),
    portfolio_number_plot = plot_choice(
      data_effects,
      portfolio_number,
      "Mean number of project acceptance"
    ),
    portfolio_binary_plot = plot_choice(
      data_effects,
      portfolio_binary,
      "Mean choice of complete project portfolio acceptance"
    ),
    project_number_plot = plot_project_number(data),
    gamble_values_plot = plot_gamble_values(data),
    results_choice = get_results_glmer(data_effects, "choice"),
    results_proportion = get_results_ttest(data_effects, "proportion"),
    results_portfolio_binary = get_results_glmer(data_effects, "portfolio_binary"),
    results_portfolio_number = get_results_ttest(data_effects, "portfolio_number"),
    trials_plot = plot_trials(data),
    experiment4 = target({
      get_experiment4(gambles_20)
      file_out(!!here("inst", "jspsych", "experiment4", "experiment", "experiment.js"))
    }),
    # file_paths_experiment3 = target(
    #   here("inst", "jspsych", "experiment3", "experiment"),
    #   format = "file"
    # ),
    screenshots3 = get_screenshots_experiment3(),
    screenshots4 = get_screenshots_experiment4(),
    memo_materials_experiment3 = target(
      command = {
        render(knitr_in(!!here(
          "doc",
          "aggregation_materials_experiment3",
          "aggregation_materials_experiment3.Rmd"
        )))
        file_out(!!here(
          "doc",
          "aggregation_materials_experiment3",
          "aggregation_materials_experiment3.pdf"
        ))
      }
    ),
    memo_materials_experiment4 = target(
      command = {
        render(knitr_in(!!here(
          "doc",
          "aggregation_materials_experiment4",
          "aggregation_materials_experiment4.Rmd"
        )))
        file_out(!!here(
          "doc",
          "aggregation_materials_experiment4",
          "aggregation_materials_experiment4.pdf"
        ))
      }
    ),
  )
