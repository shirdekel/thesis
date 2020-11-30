##' @title Get structure

##' @return
##' @author Shir Dekel
##' @export
get_structure <- function() {
  c("centralised", "decentralised") %>%
    latin_list()
}
