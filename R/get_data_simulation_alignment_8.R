##' @title Data simulation for alignment 8
##' @param data_clean

##' @return
##' @author Shir Dekel
##' @export
get_data_simulation_alignment_8 <- function() {

  npv_amount <-
    get_npv()

  data_simulation_raw <-
    get_model_alignment_8(8, npv_amount) %>%
    model.frame() %>%
    as_tibble()

  return(data_simulation_raw)
}
