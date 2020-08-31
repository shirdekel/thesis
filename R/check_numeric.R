##' @title Check if character vector is a number
##'
##'

##' @return
##' @author Shir Dekel
##' @export
check_numeric <- function(x) {

  x %>%
    str_detect("^-?\\d+\\.?\\d*$") %>% # "Looks for decimal numbers, with optional HYPHEN MINUS and optional FULL STOP plus zero or more decimal numbers following." from https://stackoverflow.com/a/4247184/13945974
    all(na.rm = TRUE)

}
