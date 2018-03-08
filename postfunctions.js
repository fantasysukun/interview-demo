function submitFrom_data(ID) {
  var newPost = document.getElementById("fb-post").value;
  var minutes = document.getElementById("fb-minutes").value;
  //console.log(minutes);
  if (newPost != '') {
    if (minutes != '') {
      if (minutes >= 10 && minutes <= 259000) { //check minutes is valid and within range
        createPromotable_Posts(ID, newPost, minutes);
      } else {
        window.alert("input time is invalid");
      }
    } else {
      post(newPost);
    }
  } else {
    window.alert("400 That's an error");
  }
}

function post(newPost) {
  FB.api(
      "/me/feed",
      "POST",
      {
          "message": newPost
      },
      function (response) {
        if (response && !response.error) {
          /* handle the result */
          document.getElementById('fb-feed').innerHTML = response.id;
          window.alert("posted");
        } else {
          console.log(response.error);
          window.alert("400 That's an error");
        }
      }
  );
}

async function createPromotable_Posts(ID, newPost, time) {
  var page_access_token = await getAccessToken(ID); 
  FB.api(
    "/me/feed",
    "POST",
    { 
      access_token : page_access_token,
      message : newPost,
      scheduled_publish_time : (Math.floor(await convertToUnixTime(time))), //convert minutes To Unix Time 
      published : false,

    }, 
    function (response) {
      if (response && !response.error) {
        /* handle the result */
        window.alert("posted");
      } else {
        console.log(response.error);
        window.alert("400 That's an error");
      }
    }
  );
}

function convertToUnixTime(time) { //input is xx mins
  return new Date().getTime() / 1000 + (time * 60);
}