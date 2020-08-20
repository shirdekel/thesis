##' @title Get joint trials for long projects
##'
##' @param projects_long
##' @param similarity_condition
##' @param project_variation
##'
##' @return
##' @author Shir Dekel
##' @export
get_trial_joint_distribution_absent <- function(projects_long,
                                                similarity_condition,
                                                project_variation) {

  questions_joint <-
    projects_long %>%
    pmap(
      function(description_similarity, input_similarity)
        list(description_similarity, input_similarity) %>%
        pmap(
          function(description_variation, input_variation)
            get_questions_joint(
              project_description = description_variation,
              project_input = input_variation
            )
        )
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
          function(questions, project_variation_value)
            get_trial_joint(
              questions_joint = questions,
              distribution = "absent"
            ) %>%
            build_timeline() %>%
            display_if(fn_data_condition(similarity == !!similarity_condition_value)) %>%
            build_timeline() %>%
            display_if(fn_data_condition(project_variation == !!project_variation_value))
        )
    )

  return(trial_joint_distribution_absent)

}
