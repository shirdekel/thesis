##' Filter out relevant prolific participants, remove duplicates, and add column
##' ID
##'
##' Only remove duplicates now because sometimes the past study filtering is not
##' set right in Prolific and you still need to credit the duplicates
##'
##' Assign IDs only after all filtering
##'
##' Filter out testing data and data generated through Prolific preview (through
##' personal PID)
##'
##'
##' @title Finalise data cleaning
##' @param data
##' @param test
##' @param prolific_filter
##' @param prolific_filter_label
##' @return
##' @author Shir Dekel
##' @export
clean_data_finalise_alignment_8 <- function(data, test, prolific_filter,
                                prolific_filter_label) {
  if ("prolific" %in% colnames(data) & !test) {
    data_check <-
      data %>%
      filter(
        !str_detect(prolific, "test1234"),
        prolific != "5b878067600e3a000194db61"
      ) %>%
      attention_check()

    list(prolific_filter, prolific_filter_label) %>%
      pmap(
        ~ data %>%
          get_prolific_id(.x, .y)
      )

    list(prolific_filter, prolific_filter_label) %>%
        pmap(
            ~ data_check %>%
                get_prolific_id_reject(.x, .y)
        )
    get_check_messages(data_check)

    data <-
      data_check %>%
      filter(
        # keep participants that have not been rejected, or those that passed
        # project test but failed one other test (meaning that no failed project
        # test participants are kept in the data, even if they only failed just that
        # check)
        !reject | (!project_test_fail & check_fail_count == 1)
      )
  }

  data %>%
    remove_duplicates() %>%
    add_id_column(subject)
}
