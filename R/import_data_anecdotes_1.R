##' @title Import anecdotes 1
##'
##' Data was collected through both Pavlovia and the psych server

##' @return
##' @author Shir Dekel
##' @export
##' @param data_directory
import_data_anecdotes_1 <- function(data_directory) {
  data_server <-
    here("inst", "extdata", "psychsydexp") %>%
    import_data_server() %>%
    filter(!is.na(anecdote_condition)) %>%
    mutate(
      across(dateCreated, ~ .x %>%
                            dmy_hms(tz = "Australia/Sydney"))
    )

  data_local_dates <-
    data_directory %>%
    list.files() %>%
    str_match("(.*?)_(.*).csv") %>%
    .[, 2:3] %>%
    as_tibble(.name_repair = "minimal") %>%
    set_names("subject", "dateCreated") %>%
    mutate(across(dateCreated, as_datetime))

  data_local <-
    data_directory %>%
    import_data_local() %>%
    mutate(
      across(
        c(button_pressed, rt),
        as.character
      )
    ) %>%
    nest_by(subject) %>%
    ungroup() %>%
    full_join(data_local_dates, by = "subject") %>%
    unnest(data)

  data_server %>%
    bind_rows(data_local)
}
