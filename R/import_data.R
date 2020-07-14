##' @title Import data
##' @param directory_data
##' @return
##' @author Shir Dekel
##' @export
import_data <- function(directory_data) {

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

  data_raw <- directory_data %>%
    file.path(list.files(directory_data)) %>%
    map_dfr(~ .x %>%
              read_csv(col_types = col_types))

  return(data_raw)

}
