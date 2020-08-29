plot_function_values <-
  syms(c("plot_awareness_trials", "plot_project_number", "plot_gamble_values"))

gamble_n_values <-
  c(10 %>% rep(2), 20)

old_seed_restricted_values <-
  diagnose(restricted_values)$seed

old_seed_gambles <-
  diagnose(gambles)$seed

experiment_values <-
  str_c("experiment", 2:4)

get_experiment_values <-
  syms(str_c("get", experiment_values, sep = "_"))

get_screenshots_values <-
  syms(str_c("get_screenshots", experiment_values, sep = "_"))

the_plan <-
  drake_plan(
    restricted_values = target(
      get_restricted_values(experiment),
      transform = map(experiment = !!experiment_values),
      seed = old_seed_restricted_values
    ),
    gambles = target(
      get_gambles(restricted_values, gamble_n),
      transform = map(
        restricted_values,
        gamble_n = !!gamble_n_values,
        .id = experiment
      ),
      seed = old_seed_gambles
    ),
    gambles_plot = target(
      plot_gambles(gambles, file_name = .id_chr),
      transform = map(gambles,
                      .id = experiment)
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
      get_experiment = !!get_experiment_values,
      directory = !!experiment_values,
      .names = experiment_values
    )),
    dir_materials = target({
      get_screenshots(gambles)
      here("inst", "materials", experiment)
    },
    transform = map(
      gambles,
      get_screenshots = !!get_screenshots_values,
      experiment = !!experiment_values,
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
    transform = map(experiment = !!experiment_values)
    ),
    data_mock = target(
      get_data_mock(experiment, 1),
      transform = map(experiment = !!experiment_values)
    ),
    data_directory_local = target(
      here("inst", "jspsych", experiment, "data"),
      format = "file",
      transform = map(experiment = !!experiment_values)
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
