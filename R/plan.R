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
    gamble_plot = plot_gamble(gambles),
    project_name = c(
      "Refinera",
      "Microxy",
      "Vital Records",
      "Logivia",
      "Savoro",
      "Grown Media",
      "Biotechly",
      "FreightCog",
      "Evogenic",
      "Erectic"
    ),
    project_type = c(
      "oil well",
      "microchip",
      "record deal",
      "shipping logistics",
      "restaurant chain",
      "national newspaper",
      "pharmaceutical",
      "railway",
      "GMO",
      "high-rise construction"
    ),
    project_description = get_project_description(gambles,
                                                  outcome_dif,
                                                  project_name,
                                                  project_type),
    project_type_nospace = str_replace_all(project_type, " ", "-"),
    form_options = c("Yes", "No"),
    page1 = get_page1(project_description, form_options),
    experiment = build_experiment(
      timeline = build_timeline(page1),
      resources = build_resources(here("images")),
      path = here("inst", "jspsych"),
      on_finish = save_locally()
    ),
    # project_input = str_c(project_type_nospace,
    #   outcome_positive,
    #   outcome_dif,
    #   prob_positive,
    #   sep = "_"
    # )

  )
