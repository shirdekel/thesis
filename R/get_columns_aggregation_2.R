##' @title Get condition allocation columns

##' @return
##' @author Shir Dekel
##' @export
get_columns_aggregation_2 <- function() {
  columns_aggregation_2 <-
    insert_property(
      subject = insert_javascript("jsPsych.randomization.randomID(15)") %>%
        list(),
      experiment = "aggregation_exp2",
      sample = "prolific",
      awareness = insert_javascript("awareness_condition") %>%
        list(),
      presentation = insert_javascript("presentation_condition") %>%
        list(),
      distribution = insert_javascript("distribution_condition") %>%
        list()
    ) %>%
    transpose()

  return(columns_aggregation_2)
}
