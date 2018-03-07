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
          document.getElementById('feed').innerHTML = response.id;
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
      access_token : rpage_access_token,
      message : newPost,
      scheduled_publish_time : (Math.floor( new Date().getTime() / 1000 + 3000 + (3600 * 8))), //convertToUnixTime(time),
      published : false,

    }, 
    function (response) {
      console.log(Math.floor( new Date().getTime() / 1000 + 3000 + (3600 * 8)));
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
  return new Date().getTime() / 1000 + 3000 + (3600 * 8);
}