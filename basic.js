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

function setElements(isLoggedIn) {
  if (isLoggedIn) {
    document.getElementById('fb-btn').style.display = 'none';
    document.getElementById('heading').style.display = 'none';
    document.getElementById('logout').style.display = 'block';
    document.getElementById('profile').style.display = 'block';
    document.getElementById('feed').style.display = 'block';
  } else {
    document.getElementById('fb-btn').style.display = 'block';
    document.getElementById('heading').style.display = 'block';
    document.getElementById('logout').style.display = 'none';
    document.getElementById('profile').style.display = 'none';
    document.getElementById('feed').style.display = 'none';
  }
}

function logout() {
  FB.logout(function(response) {
    setElements(false);
  });
}