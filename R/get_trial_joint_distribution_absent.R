##' @title Get joint trials for long projects
##'
##' @param projects_long
##' @param similarity_condition
##' @param project_variation
##' @param latin_section
##'
##' @return
##' @author Shir Dekel
##' @export
get_trial_joint_distribution_absent <- function(projects_long,
                                                similarity_condition,
                                                project_variation,
                                                latin_section) {

  questions_joint <-
    projects_long %>%
    pmap(
      function(description_similarity, input_similarity)
        list(description_similarity, input_similarity) %>%
        pmap(
          function(description_variation, input_variation)
            description_variation %>%
            map(
              function(description_latin_section)
                get_questions_joint(
                  project_description = description_latin_section %>%
                    unname(),
                  project_input = input_variation
                )
            ) %>%
            unname()
        ) %>%
        unname()
    )

  trial_joint_distribution_absent <-
    list(
      questions_joint,
      similarity_condition
    ) %>%
    pmap(
      function(questions_variations, similarity_condition_value)
        list(
          questions_variations,
          project_variation
        ) %>%
        pmap(
          function(questions_latin, project_variation_value)
            list(
              questions_latin,
              latin_section
            ) %>%
            pmap(
              function(questions, latin_section_value)
                get_trial_joint(
                  questions_joint = questions,
                  distribution = "absent"
                ) %>%
                build_timeline() %>%
                display_if(fn_data_condition(similarity == !!similarity_condition_value)) %>%
                build_timeline() %>%
                display_if(fn_data_condition(project_variation == !!project_variation_value)) %>%
                build_timeline() %>%
                display_if(fn_data_condition(latin_section == !!latin_section_value))
            )
        )
    )

  return(trial_joint_distribution_absent)

}
