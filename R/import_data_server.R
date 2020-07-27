##' @title Import data from psych server

##' @param new_data
##'
##' @return
##' @author Shir Dekel
##' @export
import_data_server <- function(new_data) {

  data_server <- here("inst", "extdata", "psychsydexp") %>%
    data_import(new_data = new_data) %>%
    select(sectionName, sectionValue, trial_type, trial_index, time_elapsed, internal_node_id, rt, dateCreated) %>%
    pivot_wider(names_from = "sectionName",
                values_from = "sectionValue")

  return(data_server)

}
