$(document).ready(function () {
  $(document).ajaxStart(function () {
    $("#loader").show();
  });

  $(document).ajaxComplete(function () {
    $("#loader").hide();
  });

  $("button").click(function () {

    $.getJSON("http://jsonplaceholder.typicode.com/users", function (result) {
      $.each(result, function (i, user) {

        let tr = ` <tr>

<td><a data-id=${user.id}  href='#.'>${user.name}</a></td>
<td> ${user.username}</td>
<td> ${user.email}</td>  

<td> ${user.address.street + " " + " " + user.address.suite + " " + user.address.city + " " + user.address.zipcode}</td>
<td><a data-lat=${user.address.geo.lat} data-lng=${user.address.geo.lng}  class='map' href="#View Map">  View Map </a>  </td>


</tr>`;




        $("table tbody").append(tr);



      });
    });
  });
  $(document).on('click', '.map', function initMap() {
    $('#MapModal').modal('show');
    let lat = $(this).data('lat');
    let lng = $(this).data('lng');
    let map;
    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: lat, lng: lng },
      zoom: 8,
    });


  });
  $(document).on('click', 'a', function () {
    let id = $(this).data('id');
    console.log(id);
    $('#myModal').modal('show');
    $.getJSON("http://jsonplaceholder.typicode.com/posts", function (result) {
      $(".modal-body").empty();
      $.each(result, function (a, post) {

        console.log(post.userId);
        if (post.userId == id) {
          let p = `<div>  <h2>${post.title} </h2> <p> ${post.body}    </p> </div>`;

          $(".modal-body").append(p);


        }

      });
    });
  });

});