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
attention_check <- function(data) {
    data %>%
    rowwise() %>%
    mutate(
      across(project_test, str_to_lower),
      project_test_fail = case_when(
        project_test == "b" ~ FALSE,
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
      reject = check_fail_count > 1,
    )

}
