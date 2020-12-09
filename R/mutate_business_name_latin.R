##' @title Mutate business name latin shuffle

##' @return
##' @author Shir Dekel
##' @export
mutate_business_name_latin <- function(project_detail_alignment_8) {
  projects_business_name_latin <-
    project_detail_alignment_8 %>%
    nest_by(
      alignment,
      reliability_amount,
      reliability_type,
      project_variation,
      display_variation
    ) %>%
    mutate(
      business_name_latin = data$business_name %>%
        latin_list() %>%
        list(),
      npv_latin = data$npv %>%
        latin_list() %>%
        list(),
      npv_raw_latin = data$npv_raw %>%
        latin_list() %>%
        list(),
      npv_raw_rep = data$npv_raw %>%
        list() %>%
        rep(5) %>%
        list(),
      business_name_latin_table = case_when(
        # Shuffle business names for high alignment because npv needs to stay
        # connected to intrinsic features
        alignment == "high" ~ get_table_latin(
          data,
          business_name_latin,
          business_name,
          npv_raw_rep
        ) %>%
          list(),
        # Shuffle npv for low alignment because business names need to stay
        # connected to intrinsic features
        alignment == "low" ~ get_table_latin(
          data,
          npv_latin,
          npv,
          npv_raw_latin
        ) %>%
          list(),
      ),
      business_name_variation = seq_len(5) %>%
        as.numeric() %>%
        list()
    ) %>%
    unnest(c(business_name_latin_table, business_name_variation))
  return(projects_business_name_latin)
}
