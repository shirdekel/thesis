##' @title Get separate trials for long projects
##'
##' @param similarity_condition
##' @param project_variation
##' @param projects_experiment3
##'
##' @return
##' @author Shir Dekel
##' @export
get_trials_separate_experiment3 <- function(projects_experiment3,
                                            similarity_condition,
                                            project_variation) {

  trials_separate_experiment3 <-
    c(
      projects_experiment3,
      list(similarity_condition)
    ) %>%
    pmap(
      function(description_similarity, input_similarity, similarity_condition_value)
        list(
          description_similarity,
          input_similarity,
          project_variation
        ) %>%
        pmap(
          function(description_variation, input_variation, project_variation_value)
            get_trial_separate(
              project_description = description_variation,
              project_input = input_variation,
              distribution = "absent"
            ) %>%
            build_timeline() %>%
            display_if(fn_data_condition(similarity == !!similarity_condition_value)) %>%
            build_timeline() %>%
            display_if(fn_data_condition(project_variation == !!project_variation_value))
        )
    )

  return(trials_separate_experiment3)

}
