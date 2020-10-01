get_npv <- function() {
    npv <-
        seq(from = 400, to = 800, length.out = 5) %>%
        map(~ seq(from = .x, length.out = 51)) %>%
        map_dbl(~ sample(., size = 1, replace = T))

    return(npv)
}