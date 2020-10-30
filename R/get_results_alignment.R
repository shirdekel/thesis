##' @title Get alignment results
##'
##' @param data_clean
##' @param iv
##' @param dv
##' @return
##' @author Shir Dekel
##' @export
get_results_alignment <- function(data_clean = data_clean_alignment_8, iv = iv[[4]], dv = dv[[4]]) {
  diffused_iv <-
      diffuse_non_na(iv)

  results_alignment <-
      diffuse_non_na(dv) %>%
    map(
      ~ data_clean %>%
        nest_by(id, !!!diffused_iv, !!.x) %>%
        lmer(
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
