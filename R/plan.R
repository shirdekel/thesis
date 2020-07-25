the_plan <-
  drake_plan(
    prob_positive_seq = get_prob_positive_seq(),
    outcome_positive_seq = get_outcome_positive_seq(),
    size = 10000,
    prob_positive_sample = prob_positive_seq %>%
      sample(size = size, replace = TRUE),
    outcome_positive_sample = outcome_positive_seq %>%
      sample(size = size, replace = TRUE),
    outcome_dif = 240,
    restriction_values = get_restriction_values(prob_positive_sample, outcome_positive_sample, outcome_dif),
    gain_loss_ratio_restriction = 2.25,
    restriction = get_restriction(restriction_values, gain_loss_ratio_restriction),
    outcome_positive_restricted = outcome_positive_sample[restriction],
    prob_positive_restricted = prob_positive_sample[restriction],
    loss_prob_restriction = 0.1,
    gambles = get_gambles(outcome_positive_restricted, prob_positive_restricted, loss_prob_restriction, outcome_dif),
    gambles_plot = plot_gambles(gambles),
    project_name = c(
      "Refinera"
    ),
    project_type = c(
      "oil well"
    ),
    project_description = get_project_description(gambles,
                                                  outcome_dif,
                                                  project_name,
                                                  project_type),
    project_input = get_project_input(project_type,
                                      gambles,
                                      outcome_dif),
    experiment_pre = get_experiment_pre(),
    experiment_main = get_experiment_main(project_description, project_input),
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
