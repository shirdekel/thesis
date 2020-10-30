##' @title Get alignment results
##'
##' Use the experiment parameters to filter and nest the data if required, and
##' then analyse.
##'
##' @param data_clean
##' @param experiment_param
##'
##' @return
##' @author Shir Dekel
##' @export
get_analysis <- function(data_clean=data_clean_alignment_8, iv) {




  experiment_param_unnest <-
    experiment_param %>%
    unnest(c(dv, dv.lab, npv_amount))

  lmer <-
    experiment_param_unnest %>%
    slide(
      ~ list(
        .x$filter[[1]],
        .x$npv_amount[[1]]
      ) %>% # I think we need the [[1]] because of {vctrs} (used
        # by {slider})
        pmap(
          function(filters, npv_amount_value) {
            data_clean %>%
              filter_by_string(filters) %>%
              nest_by_columns(
                # !! needed for `nest_by_columns()`
                !!.x$iv1,
                !!.x$iv2,
                !!.x$iv3,
                !!.x$dv,
                !!npv_amount_value
              ) %>%
              ifelse_analysis(
                .x$iv1,
                .x$iv2,
                .x$iv3,
                .x$dv,
                npv_amount_value
              ) %>%
              summary()
          }
        ) %>%
        set_names(.x$filter_label[[1]])
    ) %>%
    set_names(experiment_param_unnest$dv)

  return(lmer)
}
