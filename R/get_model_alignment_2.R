##' @title Get alignment 2 model

##' @return
##' @author Shir Dekel
##' @export
get_model_alignment_2 <- function() {
  loadd(data_clean_alignment_2)
model_alignment_2 <-
    data_clean_alignment_2 %>%
    filter(reliability_amount != "noNPV") %>%
    nest_by(id, allocation, alignment, reliability_amount, npv_amount) %>%
    mixed(
      allocation ~ alignment * reliability_amount * npv_amount +
        (1 | id),
      data = .
    ) %>%
    .[["full_model"]] %>%
    tidy()
 return(model_alignment_2)
}
