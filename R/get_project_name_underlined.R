get_project_name_underlined <- function(project_name) {
    project_name_underlined <-
        project_name %>%
        map(
            ~ .x %>%
                map_chr(
                    ~ .x %>%
                        tags$u() %>%
                        as.character()
                )
        )

    return(project_name_underlined)
}