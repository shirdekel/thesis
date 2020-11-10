##' @title Get alignment 7 model for simulation

##' @return
##' @author Shir Dekel
##' @export
get_model_alignment_7 <- function() {
  loadd(data_clean_alignment_7)
  model_alignment_7 <-
    data_clean_alignment_7 %>%
    filter(alignment == "low") %>%
    nest_by(id, allocation, reliability_amount, reliability_type, npv_amount) %>%
    mixed(
      allocation ~ reliability_amount * reliability_type * npv_amount +
        (1 | id),
      data = .
    ) %>%
    .[["full_model"]] %>%
    tidy()
  return(model_alignment_7)
}
