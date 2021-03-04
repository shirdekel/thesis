##' @title Test for attention check
##'
##' If more than one fail, remove data, and reject submission.
##'
##' According to Prolific
##' "If a participant fails more than one fair attention check, they can justifiably be rejected."
##' https://researcher-help.prolific.co/hc/en-gb/articles/360009223553-
##'
##' Output submissions for rejection.
##'
##' Warn if any fail.
##'
##' If project test fails, remove submission even if it is the only one, but do not reject.

##' @return
##' @author Shir Dekel
##' @export
##' @param data
##' @param test_name
##' @param test_answer
attention_check <- function(data, test_name, test_answer) {
  data %>%
    rowwise() %>%
    mutate(
      across({{ test_name }}, str_to_lower),
      project_test_fail = case_when(
        {{ test_name }} == test_answer ~ FALSE,
        TRUE ~ TRUE,
      ),
      interstitial_1_fail = case_when(
        interstitial_1 == "on" ~ FALSE,
        TRUE ~ TRUE,
      ),
      interstitial_2_fail = case_when(
        interstitial_2 == "on" ~ FALSE,
        TRUE ~ TRUE,
      ),
      check_fail_count = sum(
        project_test_fail,
        interstitial_1_fail,
        interstitial_2_fail
      ),
      reject = check_fail_count > 1
    )
}
