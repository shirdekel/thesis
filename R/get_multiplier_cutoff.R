##' @title Get multipliers for anecdotes 2
##'
##' @return
##' @author Shir Dekel
##' @export
get_multiplier_cutoff <- function() {
  normal_value <-
    c(
      ## negative_high
      1.2,
      ## positive_high
      0.8,
      ## negative_low
      0.8,
      ## positive_low
      1.2,
      ## statistics only
      1
    )

  probability <-
    c(
      ## negative_high
      1.05,
      ## positive_high
      0.95,
      ## negative_low
      0.95,
      ## positive_low
      1.05,
      ## statistics only
      1
    )


  list(
    normal_value,
    probability
  ) %>%
    pmap(
      ~ list(
        list(
          ## national newspaper
          c(
            .x,
            .x,
            .x
          ),
          ## pharmaceutical
          c(
            .x,
            .x,
            .y
          )
        ),
        list(
          ## railway
          c(
            .x,
            .x,
            .x
          ),
          ## high-rise construction
          c(
            .x,
            .y,
            .x
          )
        ),
        list(
          ## software
          c(
            .x,
            .x,
            .x
          ),
          ## oil well
          c(
            .x,
            .x,
            .y
          )
        ),
        list(
          ## microchip
          c(
            .x,
            .y,
            .y
          ),
          ## shipping logistics
          c(
            .x,
            .x,
            .y
          )
        ),
        list(
          ## restaurant chain
          c(
            .x,
            .x,
            .x
          ),
          ## record label
          c(
            .x,
            .x,
            .x
          )
        )
      ) %>%
        map_depth(
          3,
          ~ .x %>%
            list(., 1)
        ) %>%
        map_depth(
          2,
          ~ .x %>%
            transpose() %>%
            simplify_all()
        )
    )
}
