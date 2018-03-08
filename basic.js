window.fbAsyncInit = function() {
  FB.init({
    appId      : '1283446768423129',
    cookie     : true,
    xfbml      : true,
    version    : 'v2.12'
  });
    
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
};

(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

function setElements(isLoggedIn) {
  if (isLoggedIn) {
    document.getElementById('fb-btn').style.display = 'none';
    document.getElementById('fb-heading').style.display = 'none';
    document.getElementById('fb-logout').style.display = 'block';
    document.getElementById('fb-profile').style.display = 'block';
    document.getElementById('fb-feed').style.display = 'block';
    document.getElementById('fb-getPromotable-Posts').style.display = 'block';
    document.getElementById('fb-getFeed').style.display = 'block';
    document.getElementById('fb-getPageFeed').style.display = 'block';
    document.getElementById('fb-newPost-box').style.display = 'block';
  } else {
    document.getElementById('fb-btn').style.display = 'block';
    document.getElementById('fb-heading').style.display = 'block';
    document.getElementById('fb-logout').style.display = 'none';
    document.getElementById('fb-profile').style.display = 'none';
    document.getElementById('fb-feed').style.display = 'none';
    document.getElementById('fb-getPromotable-Posts').style.display = 'none';
    document.getElementById('fb-getFeed').style.display = 'none';
    document.getElementById('fb-getPageFeed').style.display = 'none';
    document.getElementById('fb-newPost-box').style.display = 'none';
  }
}

function statusChangeCallback(response) {
  if (response.status === 'connected') {
    console.log('Logged in and authenticated');
    setElements(true);
    getProfile();
  } else {
    console.log('Not authenticated');
    setElements(false);
  }
}

function logout() {
  FB.logout(function(response) {
    setElements(false);
  });
}