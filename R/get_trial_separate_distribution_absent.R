##' @title Get separate trials for long projects
##'
##' @param projects_long
##' @param similarity_condition
##' @param project_variation
##'
##' @return
##' @author Shir Dekel
##' @export
get_trial_separate_distribution_absent <- function(projects_long,
                                                   similarity_condition,
                                                   project_variation) {

  trial_separate_distribution_absent <-
    c(
      projects_long,
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

  return(trial_separate_distribution_absent)

}
