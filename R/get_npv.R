get_npv <- function() {
  npv <-
    seq(from = 400, to = 800, length.out = 5) %>%
    map(~ seq(from = .x, length.out = 51)) %>%
    map(~ sample(., size = 2, replace = T)) %>%
    transpose() %>%
    map(unlist)

  return(npv)
}
