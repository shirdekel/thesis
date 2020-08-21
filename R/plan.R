the_plan <-
  drake_plan(
    restricted_values = get_restricted_values(),
    gambles = get_gambles(restricted_values),
    gambles_plot = plot_gambles(gambles),
    projects_short = get_projects_short(gambles),
    experiment3 = target({
      get_experiment3(gambles)
      file_out(!!here("inst", "jspsych", "experiment3", "experiment", "experiment.js"))
    }),
    data_directory_local = target(
      here("inst", "jspsych", "data"),
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
    memo_materials = target(
      command = {
        render(knitr_in(!!here(
          "doc",
          "aggregation_exp2_materials",
          "aggregation_exp2_materials.Rmd"
        )))
        file_out(!!here(
          "doc",
          "aggregation_exp2_materials",
          "aggregation_exp2_materials.pdf"
        ))
      }
    ),
    memo_summary = target(
      command = {
        render(knitr_in(!!here(
          "doc",
          "aggregation_exp2_summary",
          "aggregation_exp2_summary.Rmd"
        )))
        file_out(!!here(
          "doc",
          "aggregation_exp2_summary",
          "aggregation_exp2_summary.pdf"
        ))
      }
    ),
    memo_projects_long = target(
      command = {
        render(knitr_in(!!here(
          "doc",
          "aggregation_exp2_projects_long",
          "aggregation_exp2_projects_long.Rmd"
        )))
        file_out(!!here(
          "doc",
          "aggregation_exp2_projects_long",
          "aggregation_exp2_projects_long.pdf"
        ))
      }
    )
  )
