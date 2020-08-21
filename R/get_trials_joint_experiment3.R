##' @title Get joint trials for long projects
##'
##' @param projects_experiment3
##' @param similarity_condition
##' @param project_variation
##'
##' @return
##' @author Shir Dekel
##' @export
get_trials_joint_experiment3 <- function(projects_experiment3,
                                         similarity_condition,
                                         project_variation) {

  questions_joint <-
    projects_experiment3 %>%
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

  trials_joint_experiment3 <-
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

  return(trials_joint_experiment3)

}
