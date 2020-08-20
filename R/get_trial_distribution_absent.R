##' @title Get long projects distribution absent trial
##'
##' @param projects_long
##' @param preamble_distribution_absent
##'
##' @return
##' @author Shir Dekel
##' @export
get_trial_distribution_absent <- function(projects_long,
                                          preamble_distribution_absent) {

  similarity_condition <-
    projects_long$description %>%
    names() %>%
    str_match(".*_(.*)") %>%
    .[, 2]

  project_variation <-
    1:length(projects_long$description$similarity_low) %>%
    as.numeric()

  questions_joint <-
    projects_long %>%
    pmap(
      ~ list(.x, .y) %>%
        pmap(~
               get_questions_joint(project_description = .x,
                                   project_input = .y)
        )
    )
  latin_section <-
    1:length(projects_long$description$similarity_low$variation1) %>%
    as.numeric()

  trial_joint_distribution_absent <-
    list(
      questions_joint,
      similarity_condition
    ) %>%
    pmap(
      function(questions_variations, similarity_condition)
        list(questions_variations,
             project_variation) %>%
        pmap(
          function(questions, project_variation) get_trial_joint(
            preamble_distribution_absent,
            questions,
            "absent"
          ) %>%
            build_timeline() %>%
            display_if(fn_data_condition(similarity == !!similarity_condition)) %>%
            build_timeline() %>%
            display_if(fn_data_condition(project_variation == !!project_variation))
        )
    )

  trial_separate_distribution_absent <-
    projects_long %>%
    append(
      list(similarity_condition)
    ) %>%
    pmap(
      function(description_variations, input_variations, similarity_condition)
        list(description_variations,
             input_variations,
             project_variation) %>%
        pmap(
          function(description,
                   input,
                   project_variation)
            get_trial_separate(
              preamble = preamble_distribution_absent,
              project_description = description,
              project_input = input,
              distribution = "absent"
            ) %>%
            build_timeline() %>%
            display_if(fn_data_condition(similarity == !!similarity_condition)) %>%
            build_timeline() %>%
            display_if(fn_data_condition(project_variation == !!project_variation))
        )
    )

  trial_distribution_absent <-
    list(
      joint = trial_joint_distribution_absent,
      separate = trial_separate_distribution_absent
    )

  return(trial_distribution_absent)

}
