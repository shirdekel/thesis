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
    experiment_resources = target(
      here("inst", "experiment_resources"),
      format = "file"
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
    experiment_components = target(
      get_experiment_components(gambles),
      transform = map(
        gambles,
        .id = c(thesis_project, experiment_number)
      ),
      seed = old_seed$experiment4
    ),
    experiment = target({
      get_experiment(
        gambles,
        experiment_directory,
        thesis_project,
        experiment_number,
        experiment_resources,
        experiment_components
      )
      # get_data_mock(experiment, 20)
      file.path(experiment_directory, "experiment")
    },
    transform = map(
      gambles,
      experiment_components,
      .id = c(thesis_project, experiment_number)
    ),
    target = "file"
    ),
    testing_directory = target(
      get_testing_directory(thesis_project, experiment_number),
      transform = map(
        experiment_number,
        .id = c(thesis_project, experiment_number)
      ),
      target = "file"
    ),
    testing_components = target(
      get_experiment_components(gambles, randomize_order = FALSE),
      transform = map(
        gambles,
        .id = c(thesis_project, experiment_number)
      ),
      seed = old_seed$experiment4
    ),
    testing = target({
      get_experiment(
        gambles,
        path = testing_directory,
        thesis_project,
        experiment_number,
        experiment_resources,
        testing_components,
        ethics = FALSE,
        zip = FALSE,
        on_finish = save_locally()
      )
      file.path(testing_directory, "experiment")
    },
    transform = map(
      gambles,
      testing_directory,
      testing_components,
      .id = c(thesis_project, experiment_number)
    ),
    target = "file"
    ),
    materials = target({
      get_screenshots(testing, screenshot_components)
      materials_directory
    },
    transform = map(
      testing,
      .id = c(thesis_project, experiment_number)
    ),
    format = "file"
    ),
    materials_memo = target({
      render(knitr_in(!!memo_path[[1]][[1]]))
      file_out(!!memo_path[[1]][[2]])
    },
    transform = map(
      .data = !!parameters,
      .id = c(thesis_project, experiment_number)
    )
    ),
    data_raw = target({
      import_data(file_in(!!data_directory))
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
      render(knitr_in(!!memo_path[[2]][[1]]))
      file_out(!!memo_path[[2]][[2]])
    },
    transform = map(
      .data = !!parameters,
      .id = c(thesis_project, experiment_number)
    )
    )
  )

