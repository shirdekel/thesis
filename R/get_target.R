##' @title Get target projects
##' @param data
##' @return
##' @author Shir Dekel
##' @export
get_target <- function(data) {
  project_details <-
      data %>%
      as.list() %>%
      unname() %>%
      transpose()

  row_names <-
      data %>%
      names()

  header_row <-
      c(
          "Relevant information",
          str_c("Project", seq_len(2), sep = " ")
      )

  table_generation <-
      list(
          project_details,
          row_names,
          header_row
      ) %>%
      map(toJSON) %>%
      str_c(collapse = ", ") %>%
      str_c(
          "get_shuffled_table(",
          .,
          ")"
      ) %>%
      insert_javascript()

    ## tags$fieldset(tags$legend("Target projects"))
}
