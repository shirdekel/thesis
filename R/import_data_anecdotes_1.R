##' @title Import anecdotes 1

##' @return
##' @author Shir Dekel
##' @export
##' @param data_directory
import_data_anecdotes_1 <- function(data_directory) {
  data_server <-
    here("inst", "extdata", "psychsydexp") %>%
    import_data_server() %>%
    filter(!is.na(anecdote_condition))

  data_local <-
    data_directory %>%
    import_data_local() %>%
    mutate(
      across(
        c("button_pressed", "rt"),
        as.character
      )
    )

  data_server %>%
    bind_rows(data_local)
}
