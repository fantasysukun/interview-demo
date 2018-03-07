function getProfile() {
  FB.api('/me?fields=name,email,birthday', function(response) {
    if (response && !response.error) {
      //console.log(response);
      buildProfile(response);
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
  document.getElementById('profile').innerHTML = profile;
}