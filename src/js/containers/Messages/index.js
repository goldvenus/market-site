import React, {Component} from "react";
import { connect } from 'react-redux';
import Talk from "talkjs";
import {post} from "../../core/api";
import {getUserByID} from "../../core/actions/user.action";


class Messages extends Component {
  constructor(props) {
    super(props);
    
    this.chatContainerRef = React.createRef();
  }
  
  handleCreateUser = async () => {
    let user = {
      id: localStorage.userId,
      name: "tom carrier",
      photoUrl: "https://s3.amazonaws.com/creative-marketing-user/f64db2cb-97b0-43b3-bc14-137b75f6ed59/UserDP/20190409103943.jpeg",
      welcomeMessage: "Hi! Let's chat now!"
    };
    
    // axios.defaults.headers.common.authorization = `Bearer ${result.data.token}`;
    let res = await post('createTalkJsUser', user);
    console.log(res);
  };
  
  handleSendMessage = async () => {
    let msg = [{
      text: 'hi, jostar!',
      sender: 'f64db2cb-97b0-43b3-bc14-137b75f6ed59',
      type: "UserMessage"
    }];
    let conversationId = "19960117";
    console.log({conversationId, msg});
    let res = await post('createTalkJsUser',{conversationId, msg});
    console.log(res);
  };
  
  handleCreateConversation = async () => {
    let data = {
      "participants": [localStorage.userId, this.props.match.params.id1],
      "subject": "hello",
      "welcomeMessages": ["Welcome to me", "Nice to talk to you"],
      // "custom": "",
      // "photoUrl": ""
    };
    let conversationId = '19960117';
    
    let res = await post('createTalkJsUser',{data, conversationId});
    console.log(res);
  };
  
  
  isOnline = async () => {
    let userId = "f64db2cb-97b0-43b3-bc14-137b75f6ed59";
    let res = await post('createTalkJsUser',{userId});
    console.log(res);
  };
  
  async componentDidMount() {
    let otherId = this.props.match.params.id1;
    // let conversationId = this.props.match.params.id2;
    let conversationId = 123;
    if (otherId && conversationId) {
      // load conversation
    } else {
      // all users list
    }
    
    console.log("================");
    this.me = await getUserByID({reqId: localStorage.userId, other: true});
    this.other = await getUserByID({reqId: otherId, other: true});
    console.log(this.me, this.other);
    
    await Talk.ready;

    // create user - me and other
    let me = new Talk.User({
      id: this.me.userid,
      name: this.me.given_name,
      email: this.me.email,
      role: "buyer",
      photoUrl: this.me.picture,
      welcomeMessage: "Hi! Let's chat now!"
    });
    let other = new Talk.User({
      id: this.other.userid,
      name: this.other.given_name,
      email: this.other.email,
      role: "seller",
      custom: { "birthday": "1487842094224" },
      photoUrl: this.other.picture,
      welcomeMessage: "Hi! Let's chat now!"
    });
    
    // create session
    let session = new Talk.Session({
      appId: "tlG1vlva",
      me: me,
      signature: this.me.signature
    });
    
    // create conversation
    let conversation = session.getOrCreateConversation("conv-111");
    // let conversation = session.getOrCreateConversation(Talk.oneOnOneId(me, other));
    conversation.setAttributes({
      subject: "Test a chat",
      photoUrl: "https://demo.talkjs.com/img/12.jpg"
    });
    
    // set participants
    conversation.setParticipant(me);
    conversation.setParticipant(other);
  
    // create chatbox
    let chatbox = session.createInbox(conversation);
    chatbox.mount(this.chatContainerRef.current);
    session.setDesktopNotificationEnabled(true);
  }
  
  // function() buttonClicked(conversationId) {
  //   var conversation = window.talkSession.getOrCreateConversation(conversationId);
  //   someChatbox.select(conversation);
  // }
  
  componentWillUnmount() {
    // this.chatbox.destroy();
  }
  
  render() {
    return (
      <div>
        <div>Welcome to TalkJS on Next.js!</div>
        <div className="chat-container" ref={this.chatContainerRef}>loading chat...</div>
        <button className='theme-btn theme-btn-primary' onClick={this.handleCreateUser}>Add User</button>
        <button className='theme-btn theme-btn-primary' onClick={this.handleSendMessage}>Send MSG</button>
        <button className='theme-btn theme-btn-primary' onClick={this.isOnline}>Check Online</button>
        <button className='theme-btn theme-btn-primary' onClick={this.handleCreateConversation}>CreateConversation</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.user.user
});

export default connect(mapStateToProps, null)(Messages);