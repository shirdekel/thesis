the_plan <-
  drake_plan(
    restricted_values = get_restricted_values(),
    gambles = get_gambles(restricted_values),
    gambles_plot = plot_gambles(gambles),
    projects = get_projects(gambles),
    experiment_pre = get_experiment_pre(),
    experiment_main = get_experiment_main(projects),
    experiment_post = get_experiment_post(),
    experiment = target({
      get_experiment(experiment_pre,
                     experiment_main,
                     experiment_post)
      file_out(!!here("inst", "jspsych", "experiment", "experiment.js"))
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
    descriptives = get_descriptives(data),
    proportion_plot = plot_proportion(data),
    choice_plot = plot_choice(data),
    portfolio_binary_plot = plot_portfolio_binary(data),
    portfolio_number_plot = plot_portfolio_number(data),
    analysis_ttest = get_analysis_ttest(data),
    analysis_glmer = get_analysis_glmer(data),
    memo_materials = target(
      command = {
        render(knitr_in(!!here("doc",
                               "aggregation_exp2_materials",
                               "aggregation_exp2_materials.Rmd")))
        file_out(!!here("doc",
                        "aggregation_exp2_materials",
                        "aggregation_exp2_materials.pdf"))
      }
    ),
    memo_summary = target(
      command = {
        render(knitr_in(!!here("doc",
                               "aggregation_exp2_summary",
                               "aggregation_exp2_summary.Rmd")))
        file_out(!!here("doc",
                        "aggregation_exp2_summary",
                        "aggregation_exp2_summary.pdf"))
      }
    )

  )
