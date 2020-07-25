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
    trial_project_number = get_trial_project_number(),
    preamble_portfolio_distribution_absent = "",
    preamble_portfolio_distribution_present = get_preamble_distribution_present(preamble_portfolio_distribution_absent),
    trial_portfolio_binary_distribution_present = get_trial_portfolio_binary(preamble_portfolio_distribution_present, "present"),
    trial_portfolio_binary_distribution_absent = get_trial_portfolio_binary(preamble_portfolio_distribution_absent, "absent"),
    trial_portfolio_number_distribution_present = get_trial_portfolio_number(preamble_portfolio_distribution_present, "present"),
    trial_portfolio_number_distribution_absent = get_trial_portfolio_number(preamble_portfolio_distribution_absent, "absent"),
    debrief = get_debrief(),
    trial_end = get_trial_end(),
    experiment_pre = get_experiment_pre(),
    experiment_main = get_experiment_main(project_description, project_input),
    experiment_post = build_timeline(trial_project_number,
                                     trial_portfolio_binary_distribution_present,
                                     trial_portfolio_binary_distribution_absent,
                                     trial_portfolio_number_distribution_present,
                                     trial_portfolio_number_distribution_absent,
                                     debrief,
                                     trial_end),
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
