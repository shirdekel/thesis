##' @title Get check messages
##' @param data_check
##' @return
##' @author Shir Dekel
##' @export
get_check_messages <- function(data_check) {
  data_check %>%
    nest_by(prolific, subject) %>%
    mutate(
      message_project_test = case_when(
        all(data$project_test_fail) ~ "project_test"
      ),
      message_interstitial_1 = case_when(
        all(data$interstitial_1_fail) ~ "interstitial_1"
      ),
      message_interstitial_2 = case_when(
        all(data$interstitial_2_fail) ~ "interstitial_2"
      )
    ) %>%
    filter(
      !(
        is.na(message_project_test) &
          is.na(message_interstitial_1) &
          is.na(message_interstitial_2)
      )
    ) %>%
    mutate(
      across(
        starts_with("message"),
        ~ .x %>%
          replace_na(list(character(0)))
      ),
      message_combined =
        c_across(starts_with("message")) %>%
          str_c(collapse = "\n"),
      message_text = str_c(
        str_c(
          "Participant",
          prolific,
          "failed the following check(s):",
          sep = " "
        ),
        message_combined,
        sep = "\n"
      )
    ) %>%
    pull(message_text) %>%
    map(message)
}
