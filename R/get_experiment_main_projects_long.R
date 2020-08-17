##' @title Get main experiment trials

##' @param projects_long
##'
##' @return
##' @author Shir Dekel
##' @export
get_experiment_main_projects_long <- function(projects_long) {

  instructions <-
    get_instructions()

  trial_naive <-
    get_trial_awareness("You will now see the projects.",
                        "naive")

  preamble_distribution_absent <-
    p("Indicate below whether you would invest in the following:") %>%
    as.character()

  form_options <-
    c("Yes", "No")

  questions_joint <-
    projects_long %>%
    pmap(
      ~ list(.x, .y) %>%
        pmap(~
        get_questions_joint(.x,
                            form_options,
                            .y)
        )
    )

  similarity_condition <-
    projects_long$description %>%
    names() %>%
    str_match(".*_(.*)") %>%
    .[, 2]

  project_variation <-
    1:length(projects_long$description$similarity_low) %>%
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
          function(questions, project_variation) get_trial_joint(preamble_distribution_absent,
                                                                 questions,
                            "absent") %>%
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
                 preamble_distribution_absent,
                 description,
                 form_options,
                 input,
                 "absent"
               ) %>%
               build_timeline() %>%
               display_if(fn_data_condition(similarity == !!similarity_condition)) %>%
               build_timeline() %>%
               display_if(fn_data_condition(project_variation == !!project_variation))
        )
    )

  experiment_main_projects_long <-
    list(
      instructions,
      trial_naive
    ) %>%
    append(
      list(
        trial_joint_distribution_absent$similarity_low,
        trial_joint_distribution_absent$similarity_high,
        trial_separate_distribution_absent$similarity_low,
        trial_separate_distribution_absent$similarity_high
      ) %>%
        flatten()
    ) %>%
    build_timeline() %>%
    flatten()

      return(experiment_main_projects_long)

}
