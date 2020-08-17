##' @title Get main experiment trials

##' @param projects_short
##'
##' @return
##' @author Shir Dekel
##' @export
get_experiment_main_projects_short <- function(projects_short) {

  instructions <- get_instructions()

  trial_aware <- get_trial_awareness("You will now see the 10 projects.",
                                     "aware")
  trial_naive <- get_trial_awareness("You will now see the projects.",
                                     "naive")

  preamble_distribution_absent <- p("Indicate below whether you would invest in the following:") %>%
    as.character()
  preamble_distribution_present <- get_preamble_distribution_present(preamble_distribution_absent)

  form_options <- c("Yes", "No")

  questions_joint <- get_questions_joint(projects_short$description,
                                         form_options,
                                         projects_short$input)
  trial_joint_distribution_present <- get_trial_joint(preamble_distribution_present,
                                                      questions_joint,
                                                      "present")
  trial_joint_distribution_absent <- get_trial_joint(preamble_distribution_absent,
                                                     questions_joint,
                                                     "absent")

  trial_separate_distribution_present <- get_trial_separate(preamble_distribution_present,
                                                            projects_short$description,
                                                            form_options,
                                                            projects_short$input,
                                                            "present")
  trial_separate_distribution_absent <- get_trial_separate(preamble_distribution_absent,
                                                           projects_short$description,
                                                           form_options,
                                                           projects_short$input,
                                                           "absent")

  experiment_main_projects_short <- build_timeline(instructions,
                 trial_aware,
                 # trial_naive,
                 # trial_joint_distribution_present,
                 # trial_joint_distribution_absent,
                 # trial_separate_distribution_present,
                 trial_separate_distribution_absent)

  return(experiment_main_projects_short)

}
