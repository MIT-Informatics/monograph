# setup python environment to use isbntools library
#
# see: https://pypi.org/project/isbntools/ 

library(tidyverse)
library(reticulate)

isbn_tools_init <- function() {
  conda_create("isbntools-env")
  conda_install(packages="r-reticulate")
  conda_install(packages="isbntools", pip=TRUE)
}

load_isbntools <-function() {
  use_condaenv("isbntools-env")
  ret_fun <-import("isbnlib")
  return(ret_fun)
}

isbntools <- local ({
  isbntools_ <- load_isbntools()
  xfun <- function (meth,x,...) {
  return( 
    sapply(x, isbntools_[as.character(meth)], ...,
           simplify=TRUE, USE.NAMES=FALSE )
    )
  }
})
