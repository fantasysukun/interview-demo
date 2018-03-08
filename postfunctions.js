function submitFrom_data(ID) {
  var newPost = document.getElementById("fb-post").value;
  var minutes = document.getElementById("fb-minutes").value;
  if (newPost != undefined) {
    if (minutes != undefined && minutes >= 10 && minutes <= 259000) { //check minutes is valid and within range
      createPromotable_Posts(ID, newPost, minutes);
    } else {
      post(newPost);
    }
  } else {
    console.log("input is invalid");
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
          console.log('posted');
        } else {
          console.log(response.error);
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
        console.log('created');
      } else {
        console.log(response.error);
      }
    }
  );
}

function convertToUnixTime(time) { //input is xx mins
  return new Date().getTime() / 1000 + (time * 60);
}