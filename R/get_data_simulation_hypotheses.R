##' Also used to get regression estimate pattern for four-way interaction
##'
##' @title Get simulated data for hypotheses presentation

##' @return
##' @author Shir Dekel
##' @export
##' @param df
get_data_simulation_hypotheses <- function(df) {
  data_simulation_hypotheses <-
    df %>%
    ungroup() %>%
    group_by(id, reliability_amount, reliability_type, alignment) %>%
    mutate(
      allocation = case_when(
        alignment == "high" &
          reliability_type == "explicit" &
          reliability_amount == "high" ~ npv_amount %>%
          rand_vect_correlated(
            target_correlation = 1,
            N = 5,
            M = 100,
            sd = 10
          ),
        alignment == "high" &
          reliability_type == "explicit" &
          reliability_amount == "low" ~ npv_amount %>%
          rand_vect_correlated(
            target_correlation = -1,
            N = 5,
            M = 100,
            sd = 10
          ),
        alignment == "low" &
          reliability_type == "explicit" ~ npv_amount %>%
          rand_vect_correlated(
            target_correlation = 1,
            N = 5,
            M = 100,
            sd = 10
          ),
        reliability_type == "implicit" ~ npv_amount %>%
          rand_vect_correlated(
            target_correlation = 0,
            N = 5,
            M = 100,
            sd = 10
          )
      )
    ) %>%
    ungroup()
  return(data_simulation_hypotheses)
}
