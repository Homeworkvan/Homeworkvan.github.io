jQuery(document).ready(function (e) {
	jQuery('#loading').hide();
jQuery("#updateprofileform").on('submit',(function(e) {

e.preventDefault();
jQuery("#message").empty();
jQuery('#loadingdiv').show();
jQuery.ajax({
url: "includes/ajax_image_upload.php", // Url to which the request is send
type: "POST",             // Type of request to be send, called as method
data: new FormData(this), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
contentType: false,       // The content type used when sending data to the server.
cache: false,             // To unable request pages to be cached
processData:false,        // To send DOMDocument or non processed data file it is set to false
success: function(data)   // A function to be called if request succeeds
{
	alert(data);
	jQuery('#loadingdiv').hide();
	if(data.indexOf('success')!=-1)
{
	//alert(1);
	jQuery("#myModalLabel").html("Profile Update");
	jQuery(".modal-body").html("Your profile has been updated");
	jQuery("#myModal").modal('show');
}

jQuery("#message").html(data.substring(0,data.length-7));

}
});
}));

// Function to preview image after validation
jQuery(function() {
jQuery("#photo").change(function() {
jQuery("#message").empty(); // To remove the previous error message
var file = this.files[0];
var imagefile = file.type;
var match= ["image/jpeg","image/png","image/jpg"];
if(!((imagefile==match[0]) || (imagefile==match[1]) || (imagefile==match[2])))
{
jQuery('#previewing').attr('src','noimage.png');
jQuery("#message").html("<p id='error'>Please Select A valid Image File</p>"+"<h4>Note</h4>"+"<span id='error_message'>Only jpeg, jpg and png Images type allowed</span>");
return false;
}
else
{
var reader = new FileReader();
reader.onload = imageIsLoaded;
reader.readAsDataURL(this.files[0]);
}
});
});
function imageIsLoaded(e) {
jQuery("#photo").css("color","green");
jQuery('#image_preview').css("display", "block");
jQuery('#previewing').attr('src', e.target.result);
jQuery('#previewing').attr('width', '250px');
jQuery('#previewing').attr('height', '230px');
};
});