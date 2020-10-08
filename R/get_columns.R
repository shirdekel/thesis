##' @title Get condition allocation columns

##' @param thesis_project
##'
##' @param experiment_number
##'
##' @return
##' @author Shir Dekel
##' @export
get_columns <- function(thesis_project, experiment_number) {
  subject <-
    "jsPsych.randomization.randomID(15)" %>%
    rep(4) %>%
    map(insert_javascript)

  sample_label <-
    c(
      "prolific" %>%
        rep(4)
    )

  experiment_label <-
    c(
      "aggregation_exp2",
      str_c(
        "experiment",
        experiment_number[-1]
      )
    )

  thesis_project_label <-
    c(
      list(character(0)),
      thesis_project[-1]
    )

  similarity <-
    list(
      character(0),
      insert_javascript("similarity_condition"),
      "low",
      character(0)
    )

  distribution <-
    list(insert_javascript("distribution_condition")) %>%
    append(
      list("absent") %>%
        rep(2)
    ) %>%
    append(list(character(0)))

  awareness <-
    list(
      insert_javascript("awareness_condition"),
      "naive",
      insert_javascript("awareness_condition"),
      character(0)
    )

  presentation <-
    list(insert_javascript("presentation_condition")) %>%
    append(
      list("separate") %>%
        rep(2)
    ) %>%
    append(
      list(character(0))
    )

  project_variation <-
    c(
      list(character(0)),
      "project_variation_condition" %>%
        rep(3) %>%
        map(insert_javascript)
    )

  current_project_choice_order <-
    list(character(0)) %>%
    rep(2) %>%
    append(
      list(
        insert_javascript("1"),
        character(0)
      )
    )

  alignment <-
    list(character(0)) %>%
    rep(3) %>%
    append(
      list(
        insert_javascript("alignment_condition")
      )
    )

  reliability_type <-
    list(character(0)) %>%
    rep(3) %>%
    append(
      list(
        insert_javascript("reliability_type_condition")
      )
    )

  business_name_variation <-
    list(character(0)) %>%
    rep(3) %>%
    append(
      list(
        insert_javascript("business_name_variation_condition")
      )
    )

  column_order_variation <-
    list(character(0)) %>%
    rep(3) %>%
    append(
      list(
        insert_javascript("column_order_variation_condition")
      )
    )

  PROLIFIC_PID <-
    c(
      list(character(0)),
      "urlvar.PROLIFIC_PID" %>%
        rep(3) %>%
        map(insert_javascript)
    )

  STUDY_ID <-
    c(
      list(character(0)),
      "urlvar.STUDY_ID" %>%
        rep(3) %>%
        map(insert_javascript)
    )

  SESSION_ID <-
    c(
      list(character(0)),
      "urlvar.SESSION_ID" %>%
        rep(3) %>%
        map(insert_javascript)
    )

  columns <-
    insert_property(
      subject = subject,
      thesis_project = thesis_project_label,
      experiment = experiment_label,
      sample = sample_label,
      similarity = similarity,
      awareness = awareness,
      presentation = presentation,
      distribution = distribution,
      project_variation = project_variation,
      current_project_choice_order = current_project_choice_order,
      alignment = alignment,
      reliability_type = reliability_type,
      business_name_variation = business_name_variation,
      column_order_variation = column_order_variation,
      PROLIFIC_PID = PROLIFIC_PID,
      STUDY_ID = STUDY_ID,
      SESSION_ID = SESSION_ID
    ) %>%
    transpose() %>%
    map(compact)

  return(columns)
}
