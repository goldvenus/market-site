import React, {Component} from "react";
import { connect } from 'react-redux';
import Talk from "talkjs";
import {getUserByID} from "../../core/actions/user.action";
import CustomLoaderLogo from "../../components/common/CustomLoaderLogo";

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
    this.chatContainerRef = React.createRef();
  }
  
  componentDidMount() {
    this.setupTalkJs();
  }
  
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.setupTalkJs();
    }
  }
  
  setupTalkJs = async () => {
    this.me = await getUserByID({reqId: localStorage.userId, other: true});
    await Talk.ready;
  
    // create me
    let me = new Talk.User({
      id: this.me.userid,
      name: this.me.given_name,
      email: this.me.email,
      role: "buyer",
      photoUrl: this.me.picture,
      welcomeMessage: "Hello.",
    });
    let other = null;
  
    // create session
    let session = new Talk.Session({
      appId: "tlG1vlva",
      me: me,
      signature: this.me.signature
    });
  
    let conversation = null;
  
    if (this.props.match.params && this.props.match.params.id1) {
      // creating conversation, peer to peer
      let otherId = this.props.match.params.id1;
      this.other = await getUserByID({reqId: otherId, other: true});
    
      // create other
      other = new Talk.User({
        id: this.other.userid,
        name: this.other.given_name,
        email: this.other.email,
        role: "seller",
        photoUrl: this.other.picture,
        welcomeMessage: `Hello, ${this.me.given_name}.`,
      });
  
      let id1 = this.me.userid;
      let id2 = this.other.userid;
      let conversationId = id1 > id2 ? id1 + '-' + id2 : id2 + '-' + id1;
      console.log(conversationId);
      conversation = session.getOrCreateConversation(conversationId);
      // conversation = session.getOrCreateConversation(Talk.oneOnOneId(me, other));
    } else {
      // just create
      conversation = session.getOrCreateConversation('conv-12355');
    }
  
    // set conversation
    conversation.setAttributes({
      subject: "Test a chat",
      photoUrl: "https://demo.talkjs.com/img/12.jpg"
    });
  
    // set participants
    conversation.setParticipant(me, {access: 'ReadWrite', notify: true});
    if (other !== null) {
      conversation.setParticipant(other, {access: 'ReadWrite', notify: true});
    }
  
    // create chatbox
    let inbox = {};
    if (other) {
      inbox = session.createInbox({selected: conversation.id});
    } else {
      inbox = session.createInbox(conversation);
    }
  
    inbox.mount(this.chatContainerRef.current);
    session.setDesktopNotificationEnabled(true);
    this.setState({isLoading: false});
  };
  
  componentWillUnmount() {
    // this.chatbox.destroy();
  }
  
  render() {
    return (
      <div>
        {this.state.isLoading && <CustomLoaderLogo/>}
        <div className="cm-chat-container" ref={this.chatContainerRef}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.user.user
});

export default connect(mapStateToProps, null)(Messages);