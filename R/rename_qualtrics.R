##' @title Rename qualtrics data

##' @param data
##'
##' @return
##' @author Shir Dekel
##' @export
rename_qualtrics <- function(data) {

  data_renamed <-
    data %>%
    rename(reliability_amount = .data$errorAllocation,
           alignment = .data$alignAllocation,
           prolific = "Q81",
           sex = "Q79",
           age = "Q75",
           language = "Q85",
           language_other = "Q85_10_TEXT",
           country = "Q82",
           school = "Q77"
    ) %>%
    mutate(across(c(reliability_amount, alignment),
                  ~ .x %>%
                    recode(!!!c("errorAllocation" = "reliability_amount",
                                "alignAllocation" = "alignment"))))

  return(data_renamed)

}
