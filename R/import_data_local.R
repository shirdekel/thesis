##' @title Import data
##' @param data_directory
##'
##' @return
##' @author Shir Dekel
##' @export
import_data_local <- function(data_directory) {

  col_types <- cols(
    file_id = col_character(),
    view_history = col_character(),
    rt = col_double(),
    trial_type = col_character(),
    trial_index = col_double(),
    time_elapsed = col_double(),
    internal_node_id = col_character(),
    experiment = col_character(),
    sample = col_character(),
    distribution = col_character(),
    awareness = col_character(),
    presentation = col_character(),
    stimulus = col_character(),
    button_pressed = col_double(),
    responses = col_character(),
    question_order = col_character()
  )

  data_raw_local <- data_directory %>%
    list.files(full.names = TRUE) %>%
    map_dfr(~ .x %>%
              read_csv(col_types = col_types))

  return(data_raw_local)

}
