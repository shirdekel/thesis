##' @title Get responses

##' @param directory
##'
##' @return
##' @author Shir Dekel
##' @export
get_responses <- function(directory) {

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
    responses = col_character(),
    question_order = col_character()
  )

  directory %>%
    file.path(list.files(directory) %>%
                .[list.files(directory) %>%
                    length()]) %>%
    read_csv(col_names = TRUE, col_types = col_types)

}
