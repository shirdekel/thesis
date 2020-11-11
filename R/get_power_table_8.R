##' @title Get power table

##' @return
##' @author Shir Dekel
##' @export
get_power_table_8 <- function() {

  power_table <-
      seq(from = 50, by = 1, length.out = 20) %>%
      map_df(
          ~ get_power_alignment_8(8 * .x) %>%
              mutate(
                  n = as.factor(.x * 2)
              )
      )

}
