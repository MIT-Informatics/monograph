getBookMeta<-function(ids=NULL,idtype=c("ISBN13"), service=c("openLibrary"),apikeys=NULL) {
  if (!isTRUE(validateSyntax(ids,service))) {
    warning("Invalid id syntax")
    return(NULL)
  }
  
  # TODO: retrieving and merging across multiple services
  
}

getItems<-function(ids,service) {
  # extend to multiple services
  if (service != "openLibrary") {
    warning("service not supported")
    return(NULL)
  }
  
}

validateSyntax<-function(ids,idtype) {
  #TODO: STUB
  return(TRUE)
}