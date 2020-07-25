the_plan <-
  drake_plan(
    outcome_dif = 240,
    restricted_values = get_restricted_values(outcome_dif),
    gambles = get_gambles(restricted_values, outcome_dif),
    gambles_plot = plot_gambles(gambles),
    projects = get_projects(gambles, outcome_dif),
    experiment_pre = get_experiment_pre(),
    experiment_main = get_experiment_main(projects),
    experiment_post = get_experiment_post(),
    experiment = target({
      get_experiment(experiment_pre,
                     experiment_main,
                     experiment_post)
      file_out(!!here("inst", "jspsych","experiment","experiment.js"))
      }),
    data_directory = target(
      here("inst", "jspsych", "data"),
      format = "file"
    ),
    data_raw = import_data(data_directory),
    # data = clean_data(data_raw),
    memo_materials = target(
      command = {
        render(knitr_in("doc/aggregation_exp2_materials.Rmd"))
        file_out("doc/aggregation_exp2_materials.pdf")
      }
    )


  )
