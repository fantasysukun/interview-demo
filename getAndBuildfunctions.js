function getProfile() {
  FB.api('/me?fields=name,email,birthday', function(response) {
    if (response && !response.error) {
      buildProfile(response);
    } else {
      console.log(response.error);
      window.alert("400 That's an error");
    }
  });
}

function buildProfile(user) {
  let profile = `
    <hr>
    <div class="row">
      <div id="fb-profiles">
        <div class="col-md-12"><h2>profiles</h2></div>
        <div class="col-sm-6 col-md-4">
          <div class="panel panel-default">
            <div class="panel-body">
              <div class="well well-sm">
                <div class="media">
                  <a class="thumbnail pull-left" href="#">
                      <img class="media-object" src="assets/img/a13ac7aed64918b6354f48da59490e3a.jpg">
                  </a>
                  <div class="media-body">
                      <h4 class="media-heading">${user.name}</h4>
                  <p><span class="label label-info">10 photos</span> <span class="label label-primary">89 followers</span></p>
                      <p>
                          <a href="#" class="btn btn-xs btn-default"><span class="glyphicon glyphicon-comment"></span> Message</a>
                          <a href="#" class="btn btn-xs btn-default"><span class="glyphicon glyphicon-heart"></span> Favorite</a>
                      </p>
                  </div>
                </div>
              </div>
            </div>
          </div> 
        </div>
      </div>
    </div>
  `;
  document.getElementById('fb-profile').innerHTML = profile;
}

function getFeed() {
  FB.api(
      "/me/feed",
      function (response) {
        if (response && !response.error) {
          /* handle the result */
          buildFeed(response);
        } else {
          console.log(response.error);
          window.alert("400 That's an error");
        }
      }
  );
}

async function buildFeed(feed) {
  let output = '<div class="col-md-12"><h2>Posts</h2></div>';
  for (let i in feed.data) {
    if (feed.data[i].message) {
      console.log(feed.data[i].created_time);
      var localTime = await getLocalTime(feed.data[i].created_time);
      output += `
        <div class="col-sm-6 col-md-4">
          <div class="panel panel-default">
            <div class="panel-body">
              <img src="assets/img/photo.png" class="img-circle"> 
              <div class="nameBox"><a href="#">Kun Su</a><h5>${localTime}</h5></div>
              <div class="clearfix"></div>
              <p>${feed.data[i].message}</p>
            </div>
          </div> 
        </div> 
      `;
    }
  } 
  document.getElementById('fb-feed').innerHTML = output;
};

function getAccessToken(ID) {
  return new Promise(resolve => {
    FB.api(
      `/${ID}?fields=access_token`,
      "GET",
      function (response) {
        if (response && !response.error) {
          /* handle the result */
          console.log('got AccessToken');
          resolve(response.access_token);
        } else {
          console.log(response.error);
          window.alert("400 That's an error");
          resolve();
        }
      }
    );
  });
}

async function getPageFeed(ID) {
  var page_access_token = await getAccessToken(ID);
  FB.api(
    `/${ID}/feed`, 
    {
      access_token : page_access_token
    },
    function (response) {
      if (response && !response.error) {
        /* handle the result */
        buildPageFeed(page_access_token, response);
      } else {
        console.log(response.error);
        window.alert("400 That's an error");
      }
    }
  );
}

async function buildPageFeed(page_access_token, feed) {
  let output = '<h3>Latest Pages Posts</h3>';
  for (let i in feed.data) {
    if (feed.data[i].message) {
      console.log(feed.data[i].created_time);
      var result = await getPost_Impressions(page_access_token, feed.data[i].id);
      var localTime = await getLocalTime(feed.data[i].created_time);
      output += `
        <div class="col-sm-6 col-md-4">
          <div class="panel panel-default">
            <div class="panel-body">
              <img src="assets/img/photo.png" class="img-circle"> 
              <div class="nameBox"><a href="#">Kun Su</a><h5>${localTime}</h5></div>
              <div class="clearfix"></div>
              <p>${feed.data[i].message}</p>
              <br>
              <div class="clearfix"></div>
              <h5>People who viewed this post: ${result}</h5>
            </div>
          </div> 
        </div> 
      `;
    }
  }
  document.getElementById('fb-feed').innerHTML = output;
}

function getPost_Impressions(page_access_token, page_id) {
  return new Promise(resolve => {
    FB.api(
      `/${page_id}/insights/post_impressions`,
      "GET", 
      {
        access_token : page_access_token
      },
      function (response) {
        if (response && !response.error) {
          resolve(response.data[0].values[0].value);
        } else {
          console.log(response.error);
          window.alert("400 That's an error");
          resolve();
        }
      }
    );
  }); 
}

async function getPromotable_Posts(ID) {
  var page_access_token = await getAccessToken(ID); 
  console.log(page_access_token);
  FB.api(
    "/me/promotable_posts",
    "GET",
    { 
        access_token : page_access_token,
    }, 
    function (response) {
      if (response && !response.error) {
        /* handle the result */
        buildFeed(response);
        //console.log('got Promotable_Posts');
      } else {
        console.log(response.error);
        window.alert("400 That's an error");
      }
    }
  );
}

function getLocalTime(time) {
  return new Promise(resolve => {
    if (time != undefined) {
      var localTime = new Date(time);
      resolve(localTime.toLocaleString());
    } else {
      console.log('input time is invalid');
      window.alert("400 That's an error");
      resolve();
    }
  }); 
}