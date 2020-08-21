##' @title Get long projects distribution absent trial
##' @param projects_experiment3
##'
##'
##' @return
##' @author Shir Dekel
##' @export
get_trials_experiment3 <- function(projects_experiment3) {

  similarity_condition <-
    projects_experiment3$description %>%
    names() %>%
    str_match(".*_(.*)") %>%
    .[, 2]

  # For both within- and between-industry variation
  project_variation <-
    1:length(projects_experiment3$description$similarity_low) %>%
    as.numeric()

  trials_joint_experiment3 <-
    get_trials_joint_experiment3(
      projects_experiment3,
      similarity_condition,
      project_variation
    )

  trials_separate_experiment3 <-
    get_trials_separate_experiment3(
      projects_experiment3,
      similarity_condition,
      project_variation
    )

  trials_experiment3 <-
    list(
      joint = trials_joint_experiment3,
      separate = trials_separate_experiment3
    )

  return(trials_experiment3)

}
