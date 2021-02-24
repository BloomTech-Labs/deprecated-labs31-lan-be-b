exports.seed = function(knex) {
    // Deletes ALL existing entries
    const image = 'https://media3.giphy.com/media/JtBZm3Getg3dqxK0zP/giphy-downsized-large.gif'
    return knex('users').del()

      .then(function () {
        // Inserts seed entries
        return knex('users').insert([
          {email: 'email1@email.com', display_name:'admin', profile_picture: image, track:'web', likes: 0, onboarded:false},
          {email: 'email2@email.com', display_name:'mod', profile_picture: image, track:'web', likes:0, onboarded:false},
          {email: 'email3@email.com', display_name:'user', profile_picture: image, track:'web', likes:0, onboarded:false}
        ]);
      });
  };