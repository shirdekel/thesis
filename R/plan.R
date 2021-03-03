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
      get_gambles(thesis_project, experiment_number, restricted_values,
                  gamble_n),
      transform = map(
        restricted_values,
        .id = c(thesis_project, experiment_number)
      ),
      seed = old_seed$gambles
    ),
    experiment_resources = target(
      experiment_resources_directory,
      transform = map(
        .data = !!parameters,
        .id = c(thesis_project, experiment_number)
      ),
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
        experiment_resources,
        .id = c(thesis_project, experiment_number)
      )
    ),
    main = target(
      get_main(gambles),
      transform = map(
        gambles,
        .id = c(thesis_project, experiment_number)
      ),
      seed = old_seed$experiment4
    ),
    experiment = target(
      {
        get_experiment(
          gambles,
          experiment_directory,
          thesis_project,
          experiment_number,
          experiment_resources,
          main,
          post_experiment,
          columns,
          condition_allocation
        )
        file.path(experiment_directory, "experiment")
      },
      transform = map(
        gambles,
        main,
        experiment_resources,
        .id = c(thesis_project, experiment_number)
      ),
      target = "file"
    ),
    testing_directory = target(
      get_testing_directory(thesis_project, experiment_number),
      transform = map(
        .data = !!parameters,
        .id = c(thesis_project, experiment_number)
      ),
      target = "file"
    ),
    testing_main = target(
      get_main(gambles, randomize_order = FALSE),
      transform = map(
        gambles,
        .id = c(thesis_project, experiment_number)
      ),
      seed = old_seed$experiment4
    ),
    testing = target(
      {
        get_experiment(
          gambles,
          testing_directory,
          thesis_project,
          experiment_number,
          experiment_resources,
          testing_main,
          post_experiment,
          columns,
          condition_allocation,
          ethics = FALSE,
          zip = FALSE,
          on_finish = save_locally()
        )
        file.path(testing_directory, "experiment")
      },
      transform = map(
        gambles,
        testing_main,
        testing_directory,
        experiment_resources,
        .id = c(thesis_project, experiment_number)
      ),
      target = "file"
    ),
    materials = target(
      {
        get_screenshots(testing, screenshot_components)
        materials_directory
      },
      transform = map(
        testing,
        .id = c(thesis_project, experiment_number)
      ),
      format = "file"
    ),
    plan_memo = target(
      {
        render(knitr_in(!!memo_path$plan$Rmd))
        file_out(!!memo_path$plan$pdf)
      },
      transform = map(
        .data = !!parameters,
        .id = c(thesis_project, experiment_number)
      )
    ),
    data_raw_directory = target(
      {
        get_data_mock(testing, data_directory_server, 20, data_clean_test)
      },
      transform = map(
        testing,
        .id = c(thesis_project, experiment_number)
      ),
      format = "file"
    ),
    data_raw = target(
      {
        import_data(data_raw_directory)
      },
      transform = map(
        data_raw_directory,
        .id = c(thesis_project, experiment_number)
      )
    ),
    data_raw_filtered = target(
      filter_data_raw(data_raw, thesis_project, experiment_number),
      transform = map(
        data_raw,
        .id = c(thesis_project, experiment_number)
      )
    ),
    data_clean = target(
      clean_data(
        data_raw_filtered,
        experiment_number,
        data_clean_test,
        prolific_filter,
        prolific_filter_label
      ),
      transform = map(
        data_raw_filtered,
        .id = c(thesis_project, experiment_number)
      )
    ),
    descriptives = target(
      get_descriptives(data_clean, iv),
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
    data_simulation = target(
      get_data_simulation(),
      transform = map(
        .data = !!parameters,
        .id = c(thesis_project, experiment_number)
      )
    ),
    plot_simulation = target(
      get_plot_simulation(data_simulation),
      transform = map(
        data_simulation,
        .id = c(thesis_project, experiment_number)
      )
    ),
    power_table = target(
      get_power_table(),
      transform = map(
        .data = !!parameters,
        .id = c(thesis_project, experiment_number)
      ),
      # So that the same npv_amount is generated
      seed = old_seed$experiment4
    ),
    power = target(
      get_power(power_table),
      transform = map(
        power_table,
        .id = c(thesis_project, experiment_number)
      )
    ),
    results = target(
      get_results(data_clean, iv, dv),
      transform = map(
        data_clean,
        .id = c(thesis_project, experiment_number)
      )
    ),
    summary_memo = target(
      {
        render(knitr_in(!!memo_path$summary$Rmd))
        file_out(!!memo_path$summary$pdf)
      },
      transform = map(
        .data = !!parameters,
        .id = c(thesis_project, experiment_number)
      )
    ),
    thesis_summary = target(
      render(knitr_in(!!file.path(
        "doc",
        "thesis_summary",
        "thesis_summary.Rmd"
      )))
    ),
    ampc_abstract = target(
      render(knitr_in(!!file.path(
        "doc",
        "ampc_abstract",
        "ampc_abstract.Rmd"
      )))
    ),
    ampc_2021 = target(
      render(knitr_in(!!file.path(
        "doc",
        "ampc_2021",
        "ampc_2021.Rmd"
      )))
    ),
    ampc_blitz = export_ampc_blitz(plot_alignment_8)

  )

