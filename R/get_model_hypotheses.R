##' @title Hypotheses data model
##' @param data_simulation_hypotheses
##' @return
##' @author Shir Dekel
##' @export
get_model_hypotheses <- function(data_simulation_hypotheses) {
  data_simulation_hypotheses %>%
    mixed(
        allocation ~ alignment * reliability_amount * npv_amount * reliability_type +
            (1 | id),
      data = .,
      method = "S"
    ) %>%
        .[["full_model"]] %>%
        tidy()
}
