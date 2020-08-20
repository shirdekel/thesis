##' @title Shuffle long project sections in JS

##' @param project_long_section
##'
##' @return
##' @author Shir Dekel
##' @export
shuffle_project_long_section <- function(project_long_section) {

  project_long_section_shuffled <-
    project_long_section %>%
    toJSON() %>%
      str_c("jsPsych.randomization.repeat(", ., ", 1).join('. ') + '.'") %>%
    insert_javascript()

  return(project_long_section_shuffled)

}
