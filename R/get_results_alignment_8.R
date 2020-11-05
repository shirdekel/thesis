##' @title Get alignment results
##'
##' @param data_clean
##' @param iv
##' @param dv
##' @return
##' @author Shir Dekel
##' @export
get_results_alignment_8 <- function(data_clean, iv, dv) {
  diffused_iv <-
      diffuse_non_na(iv)

  results_alignment <-
      diffuse_non_na(dv) %>%
    map(
      ~ data_clean %>%
        nest_by(id, !!!diffused_iv, !!.x) %>%
        mixed(
          reformulate(
            termlabels = iv %>%
              str_c(collapse = " * ") %>%
              c("(1 | id)"),
            response = .x
          ),
          data = .
        ) %>%
        apa_print()
    )

  return(results_alignment)
}
