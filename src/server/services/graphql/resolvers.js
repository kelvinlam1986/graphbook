const posts = [
  {
    id: 2,
    text: "Minh rat la dep trai",
    user: {
      avatar: "/uploads/avatar1.png",
      username: "minhlam"
    }
  },
  {
    id: 1,
    text: "Minh that su rat la dep trai",
    user: {
      avatar: "/uploads/avatar2.png",
      username: "kelvinlam"
    }
  }
];

const resolvers = {
  RootQuery: {
    posts(root, args, context) {
      return posts;
    }
  },
  RootMutation: {
    addPost(root, { post, user }, context) {
      const postObject = {
        ...post,
        user,
        id: post.length + 1
      };
      posts.push(postObject);
      return postObject;
    }
  }
};

export default resolvers;
