# setup python environmenty to use isbntools library
#
# see: https://pypi.org/project/isbntools/ 

library(reticulate)

isbn_tools_init <- function() {
  conda_create("isbntools-env")
  conda_install(packages="r-reticulate")
  conda_install(packages="isbntools", pip=TRUE)
}

load_isbntools <-function() {
  use_condaenv("isbntools-env")
  ret_fun <-import("isbntools")
  return(ret_fun)
}

isbntools<-load_isbntools()