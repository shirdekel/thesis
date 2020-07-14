##' @title Get data

##' @param directory
##'
##' @return
##' @author Shir Dekel
##' @export
get_data <- function(directory) {

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
    condition_distribution = col_character(),
    condition_awareness = col_character(),
    condition_presentation = col_character(),
    stimulus = col_character(),
    button_pressed = col_double(),
    responses = col_character(),
    question_order = col_character()
  )

  data_raw <- directory %>%
    file.path(list.files(directory)) %>%
    map_dfr(~ .x %>%
          read_csv(col_types = col_types))

  data_joint <- data_raw %>%
    filter(condition_presentation)

  return(responses)

}
