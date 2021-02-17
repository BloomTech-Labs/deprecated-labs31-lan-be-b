exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('users').del()
      .then(function () {
        // Inserts seed entries
        return knex('users').insert([
          {id: 1, email: 'email@email.com', display_name:'Admin', profile_picture: 'picture', track: 'web', likes:'', onboarded: '', created_at, updated_at},
          {id: 2, email: 'email@email.com', display_name:'Mod', profile_picture: 'picture', track: 'web', likes:'', onboarded: '', created_at, updated_at},
          {id: 3, email: 'email@email.com', display_name:'User', profile_picture: 'picture', track: 'web', likes:'', onboarded: '', created_at, updated_at}
        ]);
      });
  };