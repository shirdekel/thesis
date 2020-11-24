##' @title Get anecdotes 2 parameters

##' @return
##' @author Shir Dekel
##' @export
get_parameters_anecdotes_2 <- function() {
  parameters_anecdotes_2 <-
    tibble(
      info = list(
        c(
          "Oil extracted",
          "Time the machinery lasts before requiring maintenance",
          "Probability of finding oil",
          "Type of well"
        )
      ) %>%
        rep(2) %>%
        c("", .),
      info_target = list(
        c(
          "Microchips produced",
          "Usable semiconductor yield after testing",
          "Compatible PCs in the market",
          "Type of integrated circuit"
        ),
        c(
          "Oil extracted",
          "Time the machinery lasts before requiring maintenance",
          "Probability of finding oil",
          "Type of well"
        )
      ) %>%
        list(),
      val = c(
        2000,
        7,
        80
      ) %>%
        get_val(0.7) %>% c("", .),
      reason = get_reason() %>% c("", .),
      type = c("", "offshore", "onshore"),
      type_target = c("digital", "onshore") %>%
        list(),
      multipliers = c("", list(c(1.5 %>% rep(2), 1.2)) %>%
        rep(2)),
      project_type = c(
        "no_anecdote",
        "anecdote_lowA",
        "anecdote_highA"
      ),
      val_target = c(
        4000,
        60,
        75
      ) %>%
        get_val(1.1) %>% list(),
      unit = c(
        "L an hour",
        " years",
        "%",
        ""
      ) %>%
        list() %>%
        rep(2) %>%
        c("", .),
      unit_target = list(
        c(
          " an hour",
          "%" %>%
            rep(2),
          ""
        ),
        c(
          "L an hour",
          " years",
          "%",
          ""
        )
      ) %>%
        list(),
      business_name_target = c(
        "Microxy",
        "Enfuel"
      ) %>%
        list(),
      business_name = c(
        "",
        "Refinera" %>%
          rep(2)
      ),
      investment_target = c(
        "microchip", "oil well"
      ) %>%
        list(),
      investment = c(
        "",
        "oil well" %>%
          rep(2)
      ),
      location_target = c(
        "Manchester, UK", "Texas, USA"
      ) %>%
        list(),
      location = c(
        "",
        "Zhuhai, China", "New Mexico, USA"
      ),
      integration_target = c("horizontal", "vertical") %>% list(),
      structure_target = c("decentralised", "centralised") %>% list(),
      integration = c("", "horizontal", "vertical"),
      structure = c("", "decentralised", "centralised"),
      anecdote_presence = c(FALSE, TRUE, TRUE),
      reliability = c(87, 95) %>%
        as.character() %>%
        list(NA, NA),
      npv = c(100, 900) %>%
        as.character() %>%
        list(NA, NA)
    )
  parameters_anecdotes_2
}
