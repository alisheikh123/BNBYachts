$(document).ready(function () {
    $("#eyeToggle").on('click', function () {
        var $pwd = document.querySelector(".pwd");
        const type = $pwd.getAttribute('type') === 'password' ? 'text' : 'password';
        $pwd.setAttribute('type', type);
        this.classList.toggle('fa-eye-slash');
    });

  
$('.select').jselect_search({
    searchable :false,
    on_top_edge : function(){
      if( parseInt( $('#state').attr('data-pagination') ) > 1 ){
        $('#state').attr('data-pagination',parseInt( $('#state').attr('data-pagination') )-1);
      }
    },
    on_bottom_edge : function(){
      if( parseInt( $('#state').attr('data-pagination') ) >= 1 ){
        $('#state').attr('data-pagination',parseInt( $('#state').attr('data-pagination') )+1);
      }
    }
  });
$(".custom-select").click(function(){
    $(this).addClass("active");
  });
  $(".btn-mobile").click(function(){
    $(this).toggleClass("active");
    $('.center-content').toggleClass("active-mobile");
    
  });
  $("#save-bt").click(function(){
    $("#v-pills-home-tab span").addClass("active");
    
  });
  
  $('.minus').click(function () {
    var $input = $(this).parent().find('input');
    var count = parseInt($input.val()) - 1;
    count = count < 1 ? 1 : count;
    $input.val(count);
    $input.change();
    return false;
  });
  $('.plus').click(function () {
    var $input = $(this).parent().find('input');
    $input.val(parseInt($input.val()) + 1);
    $input.change();
    return false;
  });
  $(function () {
    $("#datepicker").datepicker({ 
          autoclose: true, 
          todayHighlight: true
    }).datepicker('update', new Date());
  });
  // slick crousel
$('.self-boat-slider').slick({
  slidesToShow: 4,
  slidesToScroll: 1,
  dots: false,
  arrows: false,
  PrevArrow:"",
  NextArrow:"",
  asNavFor: '.slider-nav',
  responsive: [
    {
        breakpoint: 1024,
        settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
        }
    },
    {
        breakpoint: 600,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 1
        }
    },
    {
        breakpoint: 480,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1
        }
    }

]
});
$('.slider-nav').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  asNavFor: '.self-boat-slider',
  dots: false,
  arrows: true,
  PrevArrow:"",
  NextArrow:"",
  focusOnSelect: true
});

  $(window).scroll(function() {    
    var scroll = $(window).scrollTop();

     //>=, not <=
    if (scroll >= 100) {
        //clearHeader, not clearheader - caps H
        $("body").addClass("scroll");
    }
    else{
      $("body").removeClass("scroll");
    }
}); //missing );

$(".toggle-password").click(function() {

  $(this).toggleClass("fa-eye fa-eye-slash");
  var input = $($(this).attr("toggle"));
  if (input.attr("type") == "password") {
    input.attr("type", "text");
  } else {
    input.attr("type", "password");
  }
  
});
$(".toggle-cnfrm-pswd").click(function() {

  $(this).toggleClass("fa-eye fa-eye-slash");
  var input = $($(this).attr("toggle"));
  if (input.attr("type") == "password") {
    input.attr("type", "text");
  } else {
    input.attr("type", "password");
  }
  
});


  $('[data-toggle="tooltip"]').tooltip();
  $(".fav-btn ").click(function(){
    $(".fav-btn i").addClass("fa-heart");
    $(".fav-btn i").removeClass("fa-heart-o");

  });
});


function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
      $('#imagePreview').hide();
      $('#imagePreview').fadeIn(650);
    }
    reader.readAsDataURL(input.files[0]);
  }
}
$("#imageUpload").change(function () {
  readURL(this);
});


// counter
let minusBtn = document.getElementById("minus-btn");
let count = document.getElementById("count");
let plusBtn = document.getElementById("plus-btn");

let countNum = 0;
count.innerHTML = countNum;

minusBtn.addEventListener("click", () => {
	countNum -= 1;
	count.innerHTML = countNum;
});

plusBtn.addEventListener("click", () => {
	countNum += 1;
	count.innerHTML = countNum;
});


function showMe() {
  var elem = document.getElementById("add-card-details-div");
  var foo = window.getComputedStyle(elem, null);
  var rename = document.getElementById('add-card-btn').innerHTML="Card Details";
  if (foo.getPropertyValue("display") == 'none') {
    elem.style.display = 'block';
    document.getElementById('add-card-btn').style.display = 'none';
  } else {
    elem.style.display = 'none';
     let rename = document.getElementById('add-card-btn').innerHTML="+ Add New Card";
  }
}

