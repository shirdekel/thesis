##' @title Get PIS

##' @param sample
##'
##' @return
##' @author Shir Dekel
##' @export
get_pis <- function(sample) {

  img_html <-
    str_c("pis", 1:3, "_", sample, ".png") %>%
    map_chr(
      ~ img(src = insert_resource(.x),
            width = "750") %>%
        as.character()
    )

  pis <-
    trial_instructions(
      pages = c(
        img_html
      ),
      show_clickable_nav = TRUE,
      data = insert_property(stage = "pis")
    )

  return(pis)

}
