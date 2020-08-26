require(readr)

doabFetch<-function(refresh=FALSE) {
  if (refresh) {
    doabsource <- "http://www.doabooks.org/doab?func=csv"
  } else {
    doabsource <- file("Public Data/DOAB/www.doabooks.org/doab@func=csv")
  }
  doab.df<-read.csv(doabsource)
  return(doab.df)
}

