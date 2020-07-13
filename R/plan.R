the_plan <-
  drake_plan(
    instructions = trial_instructions(
      pages = c(
        "Welcome! Use the arrow buttons to browse these instructions",
        "Imagine that you are an executive in a large company composed of many individual businesses. You will see various projects from these businesses and have to decide whether you would like to invest in them. Imagine that making good investment decisions will result in you receiving a generous bonus and a potential promotion, and that doing poorly will result in you receiving a large pay cut and a potential demotion. We want to know what choices you would actually make in these scenarios.",
        "You will respond by clicking a button",
        "Press the 'Next' button to begin!"
      ),
      show_clickable_nav = TRUE
    ),
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
    project_input = get_project_input(project_type,
                                      gambles,
                                      outcome_dif),
    form_options = c("Yes", "No"),
    preamble_distribution_absent = p("Decide whether you would like to invest in the following:") %>%
      as.character(),
    preamble_distribution_present = get_preamble_distribution_present(preamble_distribution_absent),
    questions_joint = get_questions_joint(project_description, form_options, project_input),
    trial_joint_distribution_present = get_trial_joint(preamble_distribution_present,
                                                       questions_joint),
    trial_joint_distribution_absent = get_trial_joint(preamble_distribution_absent,
                                                      questions_joint),
    timeline_joint_distribution_present = get_timeline_conditional(trial_joint_distribution_present, "present", "joint"),
    timeline_joint_distribution_absent = get_timeline_conditional(trial_joint_distribution_absent, "absent", "joint"),
    trial_separate_distribution_present = get_trial_separate(preamble_distribution_present, project_description, form_options, project_input),
    trial_separate_distribution_absent = get_trial_separate(preamble_distribution_absent, project_description, form_options, project_input),
    timeline_separate_distribution_present = get_timeline_conditional(trial_separate_distribution_present, "present", "separate"),
    timeline_separate_distribution_absent = get_timeline_conditional(trial_separate_distribution_absent, "absent", "separate"),
    trial_aware = get_trial_awareness("You will now see the 10 projects."),
    trial_naive = get_trial_awareness("You will now see the projects."),
    timeline_aware = build_timeline(trial_aware) %>%
      display_if(fn_data_condition(condition_awareness == "aware")) %>%
      build_timeline() %>%
      display_if(fn_data_condition(condition_presentation == "separate")),
    timeline_naive_joint = build_timeline(trial_naive) %>%
      display_if(fn_data_condition(condition_awareness == "aware")) %>%
      build_timeline() %>%
      display_if(fn_data_condition(condition_presentation == "joint")),
    timeline_naive = build_timeline(trial_naive) %>%
      display_if(fn_data_condition(condition_awareness == "naive")),
    experiment = get_experiment(instructions,
                                timeline_aware,
                                timeline_naive,
                                timeline_naive_joint,
                                timeline_joint_distribution_present,
                                timeline_joint_distribution_absent,
                                timeline_separate_distribution_present,
                                timeline_separate_distribution_absent),
    responses = get_responses(here("inst", "jspsych", "data"))

  )
