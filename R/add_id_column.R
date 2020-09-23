##' @title Add id column

##' @param data
##'
##' @param sample
##'
##' @return
##' @author Shir Dekel
##' @export
add_id_column <- function(data, sample) {

  data %>%
    nest_by({{sample}}) %>%
    rowid_to_column("id") %>%
    mutate(across(id, as.factor)) %>%
    unnest(data) %>%
    ungroup()

}
