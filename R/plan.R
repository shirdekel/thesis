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
      path <- here("inst", "jspsych", str_c("experiment", experiment))
      get_experiment(gambles, path, thesis_project, experiment)
      # get_data_mock(experiment, 20)
      file.path(path, "experiment")
    },
    transform = map(
      gambles,
      .data = !!values$parameters
      # .names = values$experiment
    ),
    target = "file"
    ),
    dir_testing = target(
      get_dir_testing(experiment),
      transform = map(
        experiment = !!values$experiment
      ),
      target = "file"
    ),
    testing = target({
      get_experiment(
        gambles,
        thesis_project,
        experiment,
        randomize_order = FALSE,
        path = dir_testing,
        ethics = FALSE,
        zip = FALSE,
        on_finish = save_locally()
      )
      here("inst", "jspsych", "testing", str_c("experiment", experiment), "experiment")
    },
    transform = map(
      gambles,
      dir_testing,
      .data = !!values$parameters
      # experiment = !!values$experiment,
      # .id = experiment
    ),
    target = "file"
    ),
    dir_materials = target({
      get_screenshots(testing)
      here("inst", "materials", experiment)
    },
    transform = map(
      testing,
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
    data_raw = target({
      import_data(file_in(data_directory))
    },
    transform = map(
      data_directory = !!values$data_directory,
      import_data = !!values$import_data,
      .names = str_c("data_raw", values$experiment, sep = "_")
    )
    ),
    data_clean = target(
      clean_data(data_raw, experiment, data_clean_test, prolific_filter, prolific_filter_label),
      transform = map(
        data_raw,
        experiment = !!values$experiment,
        data_clean_test = !!values$data_clean_test,
        prolific_filter = !!values$prolific_filter,
        prolific_filter_label = !!values$prolific_filter_label,
        .id = experiment
      )
    ),
    descriptives = target(
      get_descriptives(data_clean),
      transform = map(
        data_clean,
        .id = experiment
      )
    ),
    plot = target(
      get_plot(data_clean),
      transform = map(
        data_clean,
        get_plot = !!values$get_plot,
        .id = experiment
      )
    ),
    results = target(
      get_results(data_clean),
      transform = map(
        data_clean,
        get_results = !!values$get_results,
        .id = experiment
      )
    ),
    summary = target({
      render(knitr_in(!!here(
        "doc",
        str_c("aggregation_summary_", experiment),
        str_c("aggregation_summary_", experiment, ".Rmd")
      )))
      file_out(!!here(
        "doc",
        str_c("aggregation_summary_", experiment),
        str_c("aggregation_summary_", experiment, ".pdf")
      ))
    },
    transform = map(experiment = !!values$experiment)
    )
  )
