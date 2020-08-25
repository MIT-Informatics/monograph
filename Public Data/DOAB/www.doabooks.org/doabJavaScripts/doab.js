// JavaScript Document

$(document).ready(function() {

  $("tr").hover(function() {
     //var thisProductId = "deleteRecord" + $(this).attr('id');
     //$("#" + thisProductId).css({display:'block'});
     $(this).addClass("highLight");
  }, function() {
     $(this).removeClass("highLight");
     //var thisProductId = "deleteRecord" + $(this).attr('id');
     //$("#" + thisProductId).css({display:'none'});
  });

  
  $.datepicker.setDefaults($.datepicker.regional['en-GB']);

  $('.date').datepicker({
        changeMonth: true,
	changeYear: true,
        showWeek: false,
        showOn: "both",
        buttonImage: "/doabImages/calendar.gif",
        buttonImageOnly: true,
	firstDay: 1,
        dateFormat: 'yy-mm-dd'
  });
  
  $('div.shortHelp').append('<img src="/doabImages/tootipbottom.gif" class="tipbottom">');
  
});


function openWdw2(theURL,theWidth,theHeight,theTop,theLeft,multi,theTitle) 
{
    if (multi == false) { 
        var theWindows = $.window.getAll();
	jQuery.each(theWindows, function(i,val) {	
            if (val != undefined) {
                if (val.getTitle() == theTitle) {
                    val.close(); 
                }	
            }
	})
    }
    $.window({
        title: theTitle,
        width: theWidth,
        height: theHeight,
        checkBoundary: true,
        bookmarkable: false,
        maxWidth: -1,
        maxHeight: -1,
        showModal: true,
        url: theURL
    });
}

$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (this.value) {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } 
            else {
                o[this.name] = this.value || '';
            }
        }
    });
    return o;
};

// expect a hidden field called jsonField to carry the serialized form 
$(function() {
    $('form').submit(function() {
       $('#jsonField').val(JSON.stringify($('form').serializeObject()));
        return true;
    });
});

function getInfo (link,output)
{
   $.ajax({
        url: link,
        success: function(response) {
          // $('#'+output).html(response);
          document.getElementById(output).value=response;
        }
   });
}

function updateFieldAndId (link, fieldName, idName)
{
    $.ajax({
         url: link,
         dataType: "json",
         success: function( data ) {
             $.map( data, function( item ) {
               document.getElementById(fieldName).value=item[fieldName];
               document.getElementById(idName).value=item[idName];
             });
         }
    });
}
function buildSelect(link, selectId, optionName, optionValue)
{
    $.getJSON(link,{ajax:'true'},function(data) {
        var options = '';
        for (var i = 0; i < data.length; i++) {
             var id  = eval ("data[i]." + optionName);
             var val = eval ("data[i]." + optionValue);
             options += '<option value="' + id + '"' ;
             if (data[i].selected == 1) {
                options += 'selected="selected"';
             } 
          options += '>' + val + '</option>';
        }
        $("#"+selectId).html(options);
    });
}

function uploadProgress() {
	$.ajax({
		url: '/doab?func=uploadStatus',
		cache: false, 
                success: function(response) {
                     $('#progressBar').html(response);
                }
	});
	setTimeout(uploadProgress, 1000);
}


function lookUpSimple(theId,nameField,theUrl) { 
    $('#' + theId).autocomplete({
          delay:0,
          autoFocus: true,
          source: function( request, response ) {
              $.ajax({
                  url: theUrl,
                  dataType: "json",
                  data: {
                      query: request.term
                  },
                  success: function( data ) {
                      response( $.map( data, function( item ) {
                          return {
                              label: item[nameField],
                          }
                      }
                      ));	
                  }
              });
	   },
           minLength: 1
    }); 
};


function lookUpValues(nameField,idField,theURL,initValue) {              
    $('input[name="' + nameField +'"]' ).autocomplete({
        delay:0,
        autoFocus: true,
        source: function( request, response ) {
            $.ajax({
                url: theURL,
                dataType: "json",
                data: {
                   query: request.term
                },
                success: function( data ) {
                    response( $.map( data, function( item ) {
                        return {
                            label: item[nameField],
                            value: item[nameField],
                            id: item[idField]
                        }
                    }
                    ));	
                }
            });
	},
        minLength: 1,
        select: function( event, ui ) {
            $('input[name="' + idField +'"]' ).val(ui.item.id);
        },
        change: function(event, ui) {  
            if ( !ui.item ) {
                $('input[name="' + idField +'"]' ).val("");
                $('input[name="' + nameField +'"]' ).val(initValue);
                      
            }
        }
    }); 
};


var timeout    = 500;
var closetimer = 0;
var ddmenuitem = 0;

function jsddm_open()
{  
   jsddm_canceltimer();
   jsddm_close();
   ddmenuitem = $(this).find('ul').css('visibility', 'visible');
}

function jsddm_close()
{  
  if(ddmenuitem) ddmenuitem.css('visibility', 'hidden');
}

function jsddm_timer()
{  
  closetimer = window.setTimeout(jsddm_close, timeout);
}

function jsddm_canceltimer()
{  
   if(closetimer)
   {  
      window.clearTimeout(closetimer);
      closetimer = null;
   }
}

$(document).ready(function()
{  $('.jsddm > li').bind('mouseover', jsddm_open)
   $('.jsddm > li').bind('mouseout',  jsddm_timer)});

document.onclick = jsddm_close;
	
function addBlock (block,counterName,where) 
{
    var counter = document.getElementById(counterName).value;
    counter++;
    document.getElementById(counterName).value = counter;
    var replacePattern = new RegExp("_" + counterName + "_", "g");
    var content = document.getElementById(block).innerHTML;
    content =  content.replace(replacePattern,counter);
    document.getElementById(where).innerHTML += content;
}
function removeBlock (id, parentId)
{
   var block = document.getElementById(id);
   var parentBlock = document.getElementById(parentId);
   parentBlock.removeChild(block);

}

////////////////// legacy js ////////
var myWdw = null;
var windowArray=new Array()
function OpenWdw(newURL,Width,Height,Left,winName) {
            
  var WinOption = "toolbar=0,location=0,directories=0,menubar=0,status=1,alwaysRaised=1,scrollbars=1,resizable=yes,copyhistory=0,left="+Left+','+"screenX="+Left+','+"top=0,screenY=0,width="+Width+','+'height='+Height;
   myWdw = window.open(newURL , winName, WinOption );
  myWdw.focus();
}



var xmlHttp;

function createXmlHttp()
{
    try {
        // Firefox, Opera 8.0+, Safari
        xmlHttp=new XMLHttpRequest();
    }
    catch (e) {
        // Internet Explorer
        try {
            xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (e) {
            try {
                xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch (e) {
                alert("Your browser does not support AJAX!");
                return false;
            }
        }
    }
}    

function getInfoOld(url,id,event) {
    createXmlHttp();
    var ie = document.all?true:false;
    var x; 
    var y;
    if (ie) {
        x= event.clientX + document.body.scrollLeft
        y = event.clientY + document.body.scrollTop
    } 
    else {
         x = event.pageX
         y = event.pageY
    }
    if (x < 0) {
        x = 0;
    }
    if (y < 0) {
        y = 0;
    }
    var div = document.getElementById(id);
    div.style.position ='absolute';
    div.style.zIndex = 1005;
    div.style.backgroundColor='#ddd';
    div.style.border = 1 + 'px solid black';
    div.style.left = x+20+'px';
    div.style.top = y+10+'px';
    xmlHttp.onreadystatechange=function () {
                                  stateChanged (id);
                                          }
    xmlHttp.open("GET",url,true);
    xmlHttp.send(null); 
}

function stateChanged(id)
{
    if (xmlHttp.readyState==4) {
        document.getElementById(id).innerHTML=xmlHttp.responseText;
        document.getElementById(id).style.display='block';
    }
}

function hideDiv(id) {
   var div = div = document.getElementById(id);
   div.style.display = 'none';
}



function percentage(value1,f2,field) {
    var a = value1*document.getElementById(f2).value;
    var b = a/100;
    b = Math.round(b*100)/100;
    document.getElementById(field).value=b;
}

function whatPercentage(f,value2,field) {
    var a = Math.round(document.getElementById(f).value/value2*100)/100;
    var b = a*100;
    document.getElementById(field).value=b;
}

function exchangeResult(f,f2,field) {
    var from = document.getElementById(f).value;
    var rate = document.getElementById(f2).value;
    if (from > 0 && rate >0) {
        var a = Math.round(from*rate*100)/100;
        document.getElementById(field).value=a;
    }
    else {
        alert ("Fill in the necessary values needed for calculations. Values should be valid numbers.");
    }
}

function calculateRate(f,t,field) {
    var from = document.getElementById(f).value;
    var to   = document.getElementById(t).value;
    if (from > 0 && to > 0) {
       var a = Math.round(to/from*100)/100;
       document.getElementById(field).value = a;
    }
    else {
        alert ("Fill in the necessary values needed for calculations. Values should be valid numbers.");
    }
}

function clearField (formObj,field)
{
    var field = eval ("document." + formObj + "." + field);
    field.value='';
}

function commaToDot (thisField) {
    thisField.value = thisField.value.replace(/\,/g,".");   
}

function loadAlert (message) 
{
    alert(message)
}

function checkForm (formObj)
{
   for (var i = 0; i < mandatory.length; i++) {
      var tocheck =  eval("formObj." + mandatory[i]);
      if (tocheck.value=="")
      {
          alert("Missing mandatory fields");
          return false; 
      }
  }
  for (var i = 0; i < radios.length; i++) {
     var el = eval("formObj." + radios[i]);
    // alert(el[0].checked + "---" + el[1].checked);
      if ((el[0].checked==false) &&
          (el[1].checked==false)) {
          alert("Missing mandatory fields");
          return false;
      }
  }
  return true;
}

function closeChildren() 
{
    for (var i=0; i < windowArray.length; i++){
       windowArray[i].close();
    }
}

function closeChild() {
    if (myWdw != null) {
        if (myWdw.closed) {
            return false;
        }
        else {
            myWdw.close();
        }
    }
    else{
        return false;
    }
}

function selectAll(formObj, isInverse, which)
{
   var INC=new RegExp("^" + which + "_.+$");
   for (var i=0;i < formObj.length;i++)
   {
       fldObj = formObj.elements[i];
       if (fldObj.type == 'checkbox')
       {
         if(fldObj.name.match(INC)) {
           if(isInverse) {
               fldObj.checked = false;
           }
           else {
              fldObj.checked = true;
           }
         }
       }
   }
}

function refreshParent(dontclose) 
{
    //self.opener.location=self.opener.location;
    parent.location=parent.location;

    if (!dontclose) {
      setTimeout("self.close()", 500);
    }
}
// expect a parent-form called reLoad: we could pass the name in stead
function reLoadParent ()
{
    self.opener.document.reLoad.submit();
    setTimeout("self.close()", 500);
}

function closeDelay()
{
  setTimeout("self.close", 500);
}

function updateParent(parentFormName) 
{
   var objForm = self.opener.document.forms[parentFormName];
   for (var i = 0; i < fieldsToUpdate.length; i++) {
      var Field = eval ("objForm." + fieldsToUpdate[i]);
      Field.value=fieldsToUpdateValues[i];
   }
   setTimeout("self.close()", 500);
}

function clearFields ()
{
    var formObj = arguments[0];
    for (var i = 1; i <= arguments.length - 1 ; i++) {
        var field = eval ("document." + formObj + "." + arguments[i]);
        field.value = "";
    }
}

function confirmSubmit()
{
    var agree=confirm("Are you sure you wish to continue?");
    if (agree)
        return true ;
    else
        return false ;
}

function clearDateField (thisField)
{
    var defaultValue = '0000-00-00';
    if (thisField.value == defaultValue) {
        thisField.value = "";
    }
}

function clearPublisher()
{
    document.reLoad.pName.value='';
    document.reLoad.pId.value='';
    document.reLoad.submit();
}

function updateFields()
{
   self.document.reLoad.submit();
}

function showHide(theItem,hiddenImage,visibleImage,imageId,hideText,visibleText,textId)
{
    if ((document.getElementById(theItem).style.display == 'none') ||
        (document.getElementById(theItem).style.display == '')) {
        document.getElementById(theItem).style.display = 'block';
        if (imageId) {
             document.getElementById(imageId).src=visibleImage;
        }
        if (textId) {
             document.getElementById(textId).innerHTML=hideText;
        }
    }
    else {
        document.getElementById(theItem).style.display = 'none';
        if (imageId) {
            document.getElementById(imageId).src=hiddenImage;
        }
        if (textId) {
             document.getElementById(textId).innerHTML=visibleText;
        }
    }
}

function showD(theItem)
{
       document.getElementById(theItem).style.display = 'block'; 
}
function hide(theItem)
{
        document.getElementById(theItem).style.display = 'none'; 
}

function setVisibility(obj)
{
    obj = document.getElementById(obj);
    obj.style.visibility = (obj.style.visibility == 'visible') ? 'hidden' : 'visible';
}

$(function() {
   $('.pInfoLinks a').click(function() {
      var myparent = $(this).parent().parent().parent().attr('id');
         // alert(myparent);
          var resourcetoshow = $(this).attr('title');
        //  alert(resourcetoshow);

      if ($(this).hasClass('pInfoLinksSelected') == false) {
          $('#' + myparent + ' .pInfoLinks a').removeClass('pInfoLinksSelected');
          $(this).addClass('pInfoLinksSelected');
          $('#' + myparent + ' .linkContent div').hide();
          $('#' + myparent + ' #' + resourcetoshow ).show();

      } else {
          $('#' + myparent + ' .pInfoLinks a').removeClass('pInfoLinksSelected');
         $('#' + myparent + ' .linkContent div').hide();
      }
   })
})

$(function() {
   $('.recordLinks a').click(function() {                                        
//special sauce for row specific click!
      var myparent = $(this).parent().parent().parent().parent().attr('id');
        // alert(myparent);
          var resourcetoshow = $(this).attr('title');
        //  alert(resourcetoshow);

      if ($(this).hasClass('recordLinksSelected') == false) {
          $('#' + myparent + ' .recordLinks a').removeClass('recordLinksSelected');
          $(this).addClass('recordLinksSelected');
                  $('#' + myparent + ' .linkContent div').hide();
                  $('#' + myparent + ' #' + resourcetoshow ).show();
            // in case of any content div 
                  $('#' + myparent + ' #' + resourcetoshow + ' div' ).show();

      } else {
          $('#' + myparent + ' .recordLinks a').removeClass('recordLinksSelected');
                  $('#' + myparent + ' .linkContent div').hide();
      }



   })

  $('.recordLinks a.checkAvailable').click(function(e) {
   e.preventDefault();

  // alert($(this).hasClass('recordLinksSelected'))


   if ($(this).hasClass('recordLinksSelected') == true) {
      var myparent = $(this).parent().parent().parent().parent().attr('id');
          var resourcetoshow = $(this).attr('title');
          var theurl = $(this).attr('href');
                $('#' + myparent + ' #' + resourcetoshow ).load(theurl, function() {
                // alert("loaded");
                $(this).show();
                });
   }


   });



    $('.recordLinks a.showAll').click(function(e) {
        e.preventDefault();
    if ($(this).hasClass('recordLinksSelected') == true) {
      var myparent = $(this).parent().parent().parent().parent().attr('id');
          var resourcetoshow = $(this).attr('title');
          var theurl = $(this).attr('href');
                $('#' + myparent + ' #' + resourcetoshow ).load(theurl, function() {
                // alert("loaded");
            var othercontent = '';
                        $('#' + myparent + ' #data .linkContent').children().each(function(){

                        if ($(this).hasClass('dyn') == false) {
                        othercontent += $(this).html();
                        //alert($(this).attr('id'));
                        }

                        });


                $(this).append(othercontent);


                //alert(othercontent);          

                });
   }


   });
});

