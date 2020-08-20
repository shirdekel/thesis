##' @title Get separate trials for long projects
##'
##' @param projects_long
##' @param similarity_condition
##' @param project_variation
##' @param latin_section
##'
##' @return
##' @author Shir Dekel
##' @export
get_trial_separate_distribution_absent <- function(projects_long,
                                                   similarity_condition,
                                                   project_variation,
                                                   latin_section) {

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
            list(
              description_variation,
              latin_section
            ) %>%
            pmap(
              function(description_latin_section, latin_section_value)
                get_trial_separate(
                  project_description = description_latin_section %>%
                    unname(), # Important because otherwise it doesn't show through jspsych
                  project_input = input_variation,
                  distribution = "absent"
                ) %>%
                build_timeline() %>%
                display_if(fn_data_condition(similarity == !!similarity_condition_value)) %>%
                build_timeline() %>%
                display_if(fn_data_condition(project_variation == !!project_variation_value)) %>%
                build_timeline() %>%
                display_if(fn_data_condition(latin_section == !!latin_section_value))
            ) %>%
            unname()
        ) %>%
        unname()
    )

  return(trial_separate_distribution_absent)

}
