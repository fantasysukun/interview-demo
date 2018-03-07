function getProfile() {
  FB.api('/me?fields=name,email,birthday', function(response) {
    if (response && !response.error) {
      //console.log(response);
      buildProfile(response);
    } else {
      console.log(response.error);
    }
  });
}

function buildProfile(user) {
  let profile = `
    <h3>${user.name}</h3>
    <ul class="list-group">
      <li class="list-group-item">User ID: ${user.id}</li>
      <li class="list-group-item">Email: ${user.email}</li>
      <li class="list-group-item">Birthday: ${user.birday}</li>
    </ul>
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
        }
      }
  );
}

function buildFeed(feed) {
  let output = '<h3>Latest Posts</h3>';
  for (let i in feed.data) {
    if (feed.data[i].message) {
      output += `
        <div class="well">
          ${feed.data[i].message} 
          <span>${feed.data[i].created_time}</span>
          <span>${feed.data[i].id}</span>
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
      }
    }
  );
}

async function buildPageFeed(page_access_token, feed) {
  let output = '<h3>Latest Posts</h3>';
  for (let i in feed.data) {
    if (feed.data[i].message) {
      console.log(feed.data[i].id);
      var result = await getPost_Impressions(page_access_token, feed.data[i].id);
      output += `
        <div class="well">
          <span>${feed.data[i].message}<span>
          <span>${feed.data[i].created_time}</span>
          <span>${feed.data[i].id}</span>
          <span> value: ${result}</span>
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
        //console.log(feed.data[i].id);
        if (response && !response.error) {
          // console.log('got value');
          // console.log(response);
          resolve(response.data[0].values[0].value);
        } else {
          console.log(response.error);
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
        console.log('got Promotable_Posts');
      } else {
        console.log(response.error);
      }
    }
  );
}