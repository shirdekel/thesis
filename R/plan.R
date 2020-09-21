parameters <-
  get_parameters()

old_seed <-
  get_old_seed()

the_plan <-
  drake_plan(
    restricted_values = target(
      get_restricted_values(thesis_project, experiment_number),
      transform = map(
        .data = !!parameters,
        .id = c(thesis_project, experiment_number)
      ),
      seed = old_seed$restricted_values
    ),
    gambles = target(
      get_gambles(thesis_project, restricted_values, gamble_n),
      transform = map(
        restricted_values,
        .id = c(thesis_project, experiment_number)
      ),
      seed = old_seed$gambles
    ),
    gambles_plot = target(
      plot_gambles(
        thesis_project,
        gambles,
        experiment_number,
        experiment_resources
      ),
      transform = map(
        gambles,
        .id = c(thesis_project, experiment_number)
      )
    ),
    experiment_resources = target(
      here("inst", "experiment_resources"),
      format = "file"
    ),
    experiment = target({
      path <- here("inst", "jspsych", str_c("experiment", experiment_number))
      get_experiment(gambles, path, thesis_project, experiment_number, experiment_resources)
      # get_data_mock(experiment, 20)
      file.path(path, "experiment")
    },
    transform = map(
      gambles,
      .id = c(thesis_project, experiment_number)
    ),
    target = "file",
    seed = old_seed$experiment4
    ),
    dir_testing = target(
      get_dir_testing(experiment_number),
      transform = map(
        experiment_number,
        .id = c(thesis_project, experiment_number)
      ),
      target = "file"
    ),
    testing = target({
      get_experiment(
        gambles,
        path = dir_testing,
        thesis_project,
        experiment_number,
        experiment_resources,
        randomize_order = FALSE,
        ethics = FALSE,
        zip = FALSE,
        on_finish = save_locally()
      )
      here("inst", "jspsych", "testing", str_c("experiment", experiment_number), "experiment")
    },
    transform = map(
      gambles,
      dir_testing,
      .id = c(thesis_project, experiment_number)
    ),
    target = "file",
    seed = old_seed$experiment4
    ),
    dir_materials = target({
      get_screenshots(testing)
      here("inst", "materials", str_c("experiment", experiment_number))
    },
    transform = map(
      testing,
      .id = c(thesis_project, experiment_number)
    ),
    format = "file"
    ),
    materials = target({
      render(knitr_in(!!here(
        "doc",
        str_c("aggregation_materials_experiment", experiment_number),
        str_c("aggregation_materials_experiment", experiment_number, ".Rmd")
      )))
      file_out(!!here(
        "doc",
        str_c("aggregation_materials_experiment", experiment_number),
        str_c("aggregation_materials_experiment", experiment_number, ".pdf")
      ))
    },
    transform = map(
      .data = !!parameters,
      .id = c(thesis_project, experiment_number)
    )
    ),
    data_raw = target({
      import_data(file_in(data_directory))
    },
    transform = map(
      .data = !!parameters,
      .id = c(thesis_project, experiment_number)
    )
    ),
    data_clean = target(
      clean_data(data_raw, experiment_number, data_clean_test, prolific_filter, prolific_filter_label),
      transform = map(
        data_raw,
        .id = c(thesis_project, experiment_number)
      )
    ),
    descriptives = target(
      get_descriptives(data_clean),
      transform = map(
        data_clean,
        .id = c(thesis_project, experiment_number)
      )
    ),
    plot = target(
      get_plot(data_clean),
      transform = map(
        data_clean,
        .id = c(thesis_project, experiment_number)
      )
    ),
    results = target(
      get_results(data_clean),
      transform = map(
        data_clean,
        .id = c(thesis_project, experiment_number)
      )
    ),
    summary = target({
      render(knitr_in(!!here(
        "doc",
        str_c("aggregation_summary_experiment", experiment_number),
        str_c("aggregation_summary_experiment", experiment_number, ".Rmd")
      )))
      file_out(!!here(
        "doc",
        str_c("aggregation_summary_experiment", experiment_number),
        str_c("aggregation_summary_experiment", experiment_number, ".pdf")
      ))
    },
    transform = map(
      .data = !!parameters,
      .id = c(thesis_project, experiment_number)
    )
    )
  )
