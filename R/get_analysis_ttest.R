##' @title Get proportion data t-test
##' @param data
##' @return
##' @author Shir Dekel
##' @export
get_analysis_ttest <- function(data) {

  data_proportion <- c("absent", "separate") %>%
    map(~ data %>%
          nest_by(subject, presentation, distribution, proportion) %>%
          unite("condition", presentation, distribution) %>%
          mutate(across(condition, ~ .x %>%
                          as.factor() %>%
                          fct_relevel("separate_present"))) %>%
          filter(condition %>%
                   str_detect(.x))) %>%
    set_names("presentation", "distribution")

  t <- data_proportion %>%
    map(~ .x %>%
          t.test(proportion ~ condition, ., var.equal = TRUE) %>%
          .[["statistic"]])

  n <- data_proportion %>%
    map(~ .x %>%
          count(condition) %>%
          pull(n))

  analysis_ttest <- t %>%
    map2(n, ~ d.ind.t.t(.x, .y[1], .y[2]) %>%
           .[c("estimate", "statistic")] %>%
           str_c(collapse = ", "))

  return(analysis_ttest)

}
