##' @title Get anecdote analysis
##' @param anecdote_info

##' @return
##' @author Shir Dekel
##' @export
##' @param anecdote_presence 
##' @param business_name 
##' @param location 
##' @param structure 
##' @param reason 
get_analysis <- function(anecdote_presence, business_name, location, structure,
                         reason, integration, cutoff, val_trans, type) {
  if (anecdote_presence) {
  analysis <-
    str_c(
      business_name,
      " struggled to establish itself in the regional market because of what scientists now know is a hydrocarbon shortage in the ",
      location %>%
        str_replace(", (.*)", ""),
      " area. A ",
      structure,
      " organisational structure meant that ",
      reason$structure,
      " delayed with what needed to be a timely process. Being ",
      integration,
      "ly integrated meant that these delays caused losses at the ",
      reason$integration,
      ". To make up for this, a post hoc analysis concluded that oil was needed to be extracted at a rate of ",
      cutoff$rate,
      "L an hour and sites have at least a ",
      cutoff$prob,
      "% probability of finding oil before management approved the project. Further, machinery needed to have thought to last at least ",
      cutoff$maintenance,
      " years before requiring maintenance, because maintenance costs further offset the initial investment after the ",
      val_trans$maintenance,
      " years of development. Further, the well was quite ",
      reason$type,
      " due to it being an ",
      type,
      " well, and so added additional financial setbacks over the course of the project."
    )
  } else {
    analysis <- ""
  }

  return(analysis)
}
