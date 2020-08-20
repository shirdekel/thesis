##' @title Get long project input with similarity conditions

##' @param gambles
##'
##' @param project_long_detail_components
##' @param project_long_components
##' @param label_similarity
##'
##' @return
##' @author Shir Dekel
##' @export
get_project_input_long_similarity <- function(gambles,
                                              project_long_detail_components,
                                              project_long_components,
                                              label_similarity) {


  project_long_detail_components_input <-
    list(
     get_project_long_detail_components_input(project_long_detail_components) %>%
        transpose(),
     get_project_long_detail_components_input(project_long_detail_components)
    ) %>%
    set_names(label_similarity)

  project_input_long_similarity_low <-
    map(
      project_long_detail_components_input$similarity_low,
      ~ get_project_input_long(
        project_long_components$similarity_low$type,
        .x,
        gambles
      ) %>%
        set_names(names(project_long_detail_components))
    ) %>%
    set_names(str_c("variation", 1:10))

  project_input_long_similarity_high <-
    project_long_components$similarity_high %>%
    map2(
      project_long_detail_components_input$similarity_high,
      ~ get_project_input_long(
        .x$type,
        .y,
        gambles
      ) %>%
        set_names(str_c("variation", 1:10))
    ) %>%
    set_names(names(project_long_detail_components))

  project_input_long_similarity <-
    list(
      project_input_long_similarity_low,
      project_input_long_similarity_high
    ) %>%
    set_names(label_similarity)

  return(project_input_long_similarity)

}
