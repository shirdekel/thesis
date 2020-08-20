##' @title Get long project descriptions for similarity conditions

##' @param gambles
##'
##' @param project_long_detail
##' @param project_long_components
##' @param label_similarity
##'
##' @return
##' @author Shir Dekel
##' @export
get_project_description_long_similarity <- function(gambles,
                                                    project_long_detail,
                                                    project_long_components,
                                                    label_similarity) {

  project_description_long_similarity_high <-
    list(
      project_long_components$similarity_high,
      project_long_detail
    ) %>%
    pmap(
      ~ gambles %>%
        get_project_description_long(
          .x,
          .y
        )
    )

  project_description_long_similarity_low <-
    project_long_detail %>%
    transpose() %>%
    map(
      ~ gambles %>%
        get_project_description_long(
          project_long_components$similarity_low,
          .x
        )
    )

  project_description_long_similarity <-
    list(
      project_description_long_similarity_low,
      project_description_long_similarity_high
    ) %>%
    set_names(label_similarity)

  return(project_description_long_similarity)

}
