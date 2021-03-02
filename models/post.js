const database = require('../database/dbConfig');

// Create post
const create = post => {
    return database('posts').insert(post);
};

// Add entry for post like
const addPostLike = (userID, postID) => {
    return database('liked_posts').insert({ user_id: userID, post_id: postID });
};

const postAlreadyLiked = (userID, postID) => {
	return database("liked_posts").where({user_id: userID, post_id: postID}).first();
}

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

const fetchSearch = (search, orderBy, page=1, postsPerPage=10, room_id=null) => {
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
	if(room_id){
		query.where({room_id});
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
			query.orderBy([{column: "posts.likes", order: "desc"}, {column: "posts.created_at", order: "asc"}]);
			break;
	}
	query.limit(postsPerPage)
		.offset(postsPerPage * Math.abs(page - 1))

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
	postAlreadyLiked,
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