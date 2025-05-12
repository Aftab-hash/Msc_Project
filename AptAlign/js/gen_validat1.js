function showLoading() {
    document.getElementById('loadingmsg').style.display = 'block';
    document.getElementById('loadingover').style.display = 'block';
}

function echeck(str) {

		var at="@"
		var dot="."
		var lat=str.indexOf(at)
		var lstr=str.length
		var ldot=str.indexOf(dot)
		if (str.indexOf(at)==-1){
		   
		   return false
		}

		if (str.indexOf(at)==-1 || str.indexOf(at)==0 || str.indexOf(at)==lstr){
		   
		   return false
		}

		if (str.indexOf(dot)==-1 || str.indexOf(dot)==0 || str.indexOf(dot)==lstr){
		    
		    return false
		}

		 if (str.indexOf(at,(lat+1))!=-1){
		    
		    return false
		 }

		 if (str.substring(lat-1,lat)==dot || str.substring(lat+1,lat+2)==dot){
		    
		    return false
		 }

		 if (str.indexOf(dot,(lat+2))==-1){
		    
		    return false
		 }
		
		 if (str.indexOf(" ")!=-1){
		    
		    return false
		 }

 		 return true					
	}

function validateEmail(email)
{
    var splitted = email.match("^(.+)@(.+)$");
    if (splitted == null) return false;
    if (splitted[1] != null)
    {
        var regexp_user = /^\"?[\w-_\.]*\"?$/;
        if (splitted[1].match(regexp_user) == null) return false;
    }
    if (splitted[2] != null)
    {
        var regexp_domain = /^[\w-\.]*\.[A-Za-z]{2,4}$/;
        if (splitted[2].match(regexp_domain) == null)
        {
            var regexp_ip = /^\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\]$/;
            if (splitted[2].match(regexp_ip) == null) return false;
        } // if
        return true;
    }
    return false;
}
function validateForm() {
  var x = document.forms["myForm"]["sec"].value;
  if (x == "") {
    alert("Please add Value/s for analysis");
    return false;
  }
  else
	  {
		showLoading();
	  }
}

function validate(form) {

var e = form.elements, m = '';

var alphaExp = /^[0-9a-zA-Z\s]+$/;
var sps = /^[\s]+$/;

  if(!e['sec'].value) {m += '- Please add Disease/s.\n';}
  if(m) {
    alert('The following error(s) occurred:\n\n' + m);
    return false;
  }
  else
	  {
		showLoading();
	  }
  
}


/**
 * DHTML email validation script. Courtesy of SmartWebby.com (http://www.smartwebby.com/dhtml/)
 */



