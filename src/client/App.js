import React, { Component } from "react";
import "../../assets/css/style.css";

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

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: posts, postContent: "" };
  }

  handleSubmit = event => {
    event.preventDefault();
    const newPost = {
      id: posts.length + 1,
      text: this.state.postContent,
      user: {
        avatar: "/uploads/avatar2.png",
        username: "fake user"
      }
    };
    this.setState(previousState => ({
      posts: [newPost, ...previousState.posts],
      postContent: ""
    }));
  };

  handlePostContentChange = event => {
    this.setState({ postContent: event.target.value });
  };

  render() {
    const { posts, postContent } = this.state;
    return (
      <div className="container">
        <div className="postForm">
          <form onSubmit={this.handleSubmit}>
            <textarea
              value={postContent}
              onChange={this.handlePostContentChange}
              placeholder="Please enter some content"
            />
            <input type="submit" value="Submit" />
          </form>
        </div>
        <div className="feed">
          {posts.map((item, i) => (
            <div className="post" key={item.id}>
              <div className="header">
                <img src={item.user.avatar} />
                <h2>{item.user.username}</h2>
              </div>
              <p className="content">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
