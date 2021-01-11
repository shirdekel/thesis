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
        ~ data_check %>%
          get_prolific_id_reject(.x, .y)
      )

    # Get IDs of participants approved or awaiting review for subsequent
    # filtering. This helps account for participants that may have finished the
    # experiment, but subsequently returned their submission (or somehow
    # timed-out).
    participants_eligible <-
      file.path("inst", "extdata", "export") %>%
      list.files(full.names = TRUE) %>%
      map_dfr(
        ~ .x %>%
          read_csv(col_types = cols())
      ) %>%
      filter(status == "APPROVED" | status == "AWAITING REVIEW") %>%
      pull(participant_id)

    data_approve <-
      data_check %>%
      filter(
        # Keep participants that have not been rejected
        !reject,
        # Filter out ineligible Prolific IDs
        prolific %in% participants_eligible
      )

    list(prolific_filter, prolific_filter_label) %>%
      pmap(
        ~ data_approve %>%
          get_prolific_id(.x, .y)
      )

    data <-
      data_approve %>%
      filter(
        # Keep participants that passed project test
        !project_test_fail,
        # Remove participants from first batch with faulty input IDs
        datetime > "2020-12-14"
      )
  }

  data %>%
    remove_duplicates() %>%
    add_id_column(subject)
}
