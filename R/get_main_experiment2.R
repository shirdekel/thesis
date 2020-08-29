##' @title Get main experiment trials

##' @param projects_experiment2
##'
##' @param randomize_order
##'
##' @return
##' @author Shir Dekel
##' @export
get_main_experiment2 <- function(projects_experiment2, randomize_order) {

  instructions <-
    get_instructions()

  trial_aware <-
    get_trial_awareness("You will now see the 10 projects.",
                        "aware")
  trial_naive <-
    get_trial_awareness("You will now see the projects.",
                        "naive")

  preamble_distribution <-
    get_preamble_distribution()

  questions_joint <-
    get_questions_joint(
      project_description = projects_experiment2$description,
      project_input = projects_experiment2$input
    )

  trial_joint_distribution_present <-
    get_trial_joint(
      preamble = preamble_distribution,
      questions_joint = questions_joint,
      distribution = "present",
      randomize_order = randomize_order
    )

  trial_joint_distribution_absent <-
    get_trial_joint(
      questions_joint = questions_joint,
      distribution = "absent",
      randomize_order = randomize_order
    )

  trial_separate_distribution_present <-
    get_trial_separate(
      preamble = preamble_distribution,
      project_description = projects_experiment2$description,
      project_input = projects_experiment2$input,
      distribution = "present",
      randomize_order = randomize_order
    )

  trial_separate_distribution_absent <-
    get_trial_separate(
      project_description = projects_experiment2$description,
      project_input = projects_experiment2$input,
      distribution = "absent",
      randomize_order = randomize_order
    )

  main_experiment2 <-
    build_timeline(
      instructions,
      trial_aware,
      trial_naive,
      trial_joint_distribution_present,
      trial_joint_distribution_absent,
      trial_separate_distribution_present,
      trial_separate_distribution_absent
    )

  return(main_experiment2)

}
