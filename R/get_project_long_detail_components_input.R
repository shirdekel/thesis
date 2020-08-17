##' @title Get input-friendly components
##' @param project_long_detail_components
##' @return
##' @author Shir Dekel
##' @export
get_project_long_detail_components_input <- function(project_long_detail_components) {

  project_long_detail_components_input <-
    project_long_detail_components %>%
    map_if(is.list,
           ~ .x %>%
             transpose() %>%
             map_chr(~ .x %>%
                       str_c(collapse = "-"))) %>%
    map(~ .x %>%
          str_replace_all(" ", "-") %>%
          str_remove_all(","))

  return(project_long_detail_components_input)

}
