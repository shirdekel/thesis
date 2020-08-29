values <-
  get_values()

old_seed <-
  get_old_seed()

the_plan <-
  drake_plan(
    restricted_values = target(
      get_restricted_values(experiment),
      transform = map(experiment = !!values$experiment),
      seed = old_seed$restricted_values
    ),
    gambles = target(
      get_gambles(restricted_values, gamble_n),
      transform = map(
        restricted_values,
        gamble_n = !!values$gamble_n,
        .id = experiment
      ),
      seed = old_seed$gambles
    ),
    gambles_plot = target(
      plot_gambles(gambles, file_name = .id_chr),
      transform = map(
        gambles,
        .id = experiment
      )
    ),
    experiment_resources = target(
      here("inst", "experiment_resources"),
      format = "file"
    ),
    experiment = target({
      get_experiment(gambles)
      file_out(!!here("inst", "jspsych", directory, "experiment"))
    },
    transform = map(
      gambles,
      get_experiment = !!values$get_experiment,
      directory = !!values$experiment,
      .names = values$experiment
    )),
    dir_materials = target({
      get_screenshots(gambles)
      here("inst", "materials", experiment)
    },
    transform = map(
      gambles,
      get_screenshots = !!values$get_screenshots,
      experiment = !!values$experiment,
      .id = experiment
    ),
    format = "file"
    ),
    materials = target({
      render(knitr_in(!!here(
        "doc",
        str_c("aggregation_materials_", experiment),
        str_c("aggregation_materials_", experiment, ".Rmd")
      )))
      file_out(!!here(
        "doc",
        str_c("aggregation_materials_", experiment),
        str_c("aggregation_materials_", experiment, ".pdf")
      ))
    },
    transform = map(experiment = !!values$experiment)
    ),
    data_mock = target(
      get_data_mock(experiment, 1),
      transform = map(experiment = !!values$experiment)
    ),
    data_directory_local = target(
      here("inst", "jspsych", experiment, "data"),
      format = "file",
      transform = map(experiment = !!values$experiment)
    ),
    data_raw_local = target(
      import_data_local(data_directory_local),
      transform = map(data_directory_local,
                      .id = experiment)
    ),
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
    memo_materials_experiment2 = target(
      command = {
        render(knitr_in(!!here(
          "doc",
          "aggregation_materials_experiment2",
          "aggregation_materials_experiment2.Rmd"
        )))
        file_out(!!here(
          "doc",
          "aggregation_materials_experiment2",
          "aggregation_materials_experiment2.pdf"
        ))
      }
    ),
    memo_summary_experiment2 = target(
      command = {
        render(knitr_in(!!here(
          "doc",
          "aggregation_summary_experiment2",
          "aggregation_summary_experiment2.Rmd"
        )))
        file_out(!!here(
          "doc",
          "aggregation_summary_experiment2",
          "aggregation_summary_experiment2.pdf"
        ))
      }
    )
  )
