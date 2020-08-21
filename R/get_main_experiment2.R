##' @title Get main experiment trials

##' @param projects_experiment2
##'
##' @return
##' @author Shir Dekel
##' @export
get_main_experiment2 <- function(projects_experiment2) {

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
      distribution = "present"
    )

  trial_joint_distribution_absent <-
    get_trial_joint(
      questions_joint = questions_joint,
      distribution = "absent"
    )

  trial_separate_distribution_present <-
    get_trial_separate(
      preamble = preamble_distribution,
      project_description = projects_experiment2$description,
      project_input = projects_experiment2$input,
      distribution = "present"
    )

  trial_separate_distribution_absent <-
    get_trial_separate(
      project_description = projects_experiment2$description,
      project_input = projects_experiment2$input,
      distribution = "absent"
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
