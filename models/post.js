const database = require('../database/dbConfig');

// Create post
const create = post => {
    return database('posts').insert(post);
};

// Add entry for post like
const addPostLike = (userID, postID) => {
    return database('liked_posts').insert({ user_id: userID, post_id: postID });
};

// Fetch individual post
const fetch = postID => {
    return database('posts')
		.join('users', 'posts.user_id', 'users.id')
		.where('posts.id', postID)
		.select([
			'posts.id',
			'users.id as user_id',
			'users.profile_picture',
			'users.display_name',
			'posts.track',
			'posts.question',
			'posts.answer',
			'posts.likes',
			'posts.comments',
			'posts.created_at',
			'posts.updated_at'
		])
		.first();
};

const fetchByRoom = (room_id) => {
	return database('posts')
		.join('users', 'posts.user_id', 'users.id')
		.orderBy('posts.created_at', 'desc')
		.select([
			'posts.id',
			'users.id as user_id',
			'users.profile_picture',
			'users.display_name',
			'posts.track',
			'posts.question',
			'posts.answer',
			'posts.likes',
			'posts.comments',
			'posts.created_at',
			'posts.updated_at'
		]).where({
			room_id
		});
}

// Fetch all posts
// This is where search and sorting will occur
const fetchRecent = () => {
	return database('posts')
		.join('users', 'posts.user_id', 'users.id')
		.orderBy('posts.created_at', 'desc')
		.select([
			'posts.id',
			'users.id as user_id',
			'users.profile_picture',
			'users.display_name',
			'posts.track',
			'posts.question',
			'posts.answer',
			'posts.likes',
			'posts.comments',
			'posts.created_at',
			'posts.updated_at'
		]);
};

// Fetch all posts based on popularity
const fetchPopular = () => {
	return database('posts')
		.join('users', 'posts.user_id', 'users.id')
		.orderBy('posts.likes', 'desc')
		.select([
			'posts.id',
			'users.id as user_id',
			'users.profile_picture',
			'users.display_name',
			'posts.track',
			'posts.question',
			'posts.answer',
			'posts.likes',
			'posts.comments',
			'posts.created_at',
			'posts.updated_at'
		]);
};

const fetchSearch = (search, orderBy) => {
	const query = database('posts')
		.join('users', 'posts.user_id', 'users.id')
		.select([
			'posts.id',
			'users.id as user_id',
			'users.profile_picture',
			'users.display_name',
			'posts.track',
			'posts.question',
			'posts.answer',
			'posts.likes',
			'posts.comments',
			'posts.created_at',
			'posts.updated_at'
		]);
	if(search){
		query.whereRaw(`LOWER(posts.question) LIKE ?`, [`%${search.toLowerCase()}%`])
			.orWhereRaw(`LOWER(posts.answer) LIKE ?`, [`%${search.toLowerCase()}%`])
	}
	switch (orderBy){
		case "recent":
		case null:
		case undefined:
			query.orderBy("created_at", "desc");
			break;
		case "oldest":
			query.orderBy("created_at", "asc");
			break;
		case "popular":
			query.orderBy("posts.likes", "desc");
	}

	return query;
};

const incrementPostLikes = postID => {
	return database('posts').where('id', postID).increment('likes', 1);
};

const decrementPostLikes = postID => {
	return database('posts').where('id', postID).decrement('likes', 1);
};

const incrementCommentCount = postID => {
    return database('posts').where('id', postID).increment('comments', 1);
};

const decrementCommentCount = postID => {
    return database('posts').where('id', postID).decrement('comments', 1);
};

// Remove entry for post like
const removePostLike = (userID, postID) => {
    return database('liked_posts').where({ user_id: userID, post_id: postID }).del();
};

module.exports = {
    create,
	addPostLike,
	fetch,
	fetchByRoom,
	fetchRecent,
	fetchPopular,
	fetchSearch,
	incrementPostLikes,
	decrementPostLikes,
	incrementCommentCount,
	decrementCommentCount,
	removePostLike,
};