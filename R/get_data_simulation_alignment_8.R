##' @title Data simulation for alignment 8
##' @param data_clean

##' @return
##' @author Shir Dekel
##' @export
get_data_simulation_alignment_8 <- function(data_clean) {
  data_simulation_alignment <-
    data_clean %>%
    nest_by(
      id,
      reliability_amount,
      npv_amount,
      allocation,
      ranking,
      alignment,
      reliability_type
    ) %>%
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
  return(data_simulation_alignment)
}
