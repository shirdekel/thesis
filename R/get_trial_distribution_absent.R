##' @title Get long projects distribution absent trial
##'
##' @param projects_long
##' @param preamble_distribution_absent
##'
##' @return
##' @author Shir Dekel
##' @export
get_trial_distribution_absent <- function(projects_long) {

  similarity_condition <-
    projects_long$description %>%
    names() %>%
    str_match(".*_(.*)") %>%
    .[, 2]

  # For both within- and between-industry variation
  project_variation <-
    1:length(projects_long$description$similarity_low) %>%
    as.numeric()

  trial_joint_distribution_absent <-
    get_trial_joint_distribution_absent(
      projects_long,
      similarity_condition,
      project_variation
    )

  trial_separate_distribution_absent <-
    get_trial_separate_distribution_absent(
      projects_long,
      similarity_condition,
      project_variation
    )

  trial_distribution_absent <-
    list(
      joint = trial_joint_distribution_absent,
      separate = trial_separate_distribution_absent
    )

  return(trial_distribution_absent)

}
