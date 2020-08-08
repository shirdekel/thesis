##' @title Get proportion data t-test
##' @param data
##' @return
##' @author Shir Dekel
##' @export
get_analysis_proportion <- function(data) {

  data_proportion <- c("absent_naive", "separate.*naive", "separate_absent") %>%
    map(~ data %>%
          nest_by(subject, presentation, distribution, awareness, proportion) %>%
          unite("condition", presentation, distribution, awareness) %>%
          mutate(across(condition, ~ .x %>%
                          as.factor() %>%
                          fct_relevel("separate_present_naive"))) %>%
          filter(condition %>%
                   str_detect(.x))) %>%
    set_names("presentation", "distribution", "awareness")

  t <- data_proportion %>%
    map(~ .x %>%
          t.test(proportion ~ condition, ., var.equal = TRUE) %>%
          .[["statistic"]])

  n <- data_proportion %>%
    map(~ .x %>%
          count(condition) %>%
          pull(n))

  analysis_proportion <- t %>%
    map2(n, ~ d.ind.t.t(.x, .y[1], .y[2]) %>%
           .[c("estimate", "statistic")] %>%
           str_c(collapse = ", "))

  return(analysis_proportion)

}
