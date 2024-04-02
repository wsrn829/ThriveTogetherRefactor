

import React from 'react';
import InboxForm from './InboxForm';
import InboxCards from './InboxCards';
import InboxMessage from './InboxMessage';
import { connect } from 'react-redux';

function InboxPage(props) {
  const { recipient } = props;
  let content;

  const reloadPage = () => {
    window.location.reload();
  };

  if (recipient.recipient === "") {
    content = (
      <div className="initial-container">
        <div className="inbox-cards">
          <button className="btn btn-sm btn-primary" onClick={reloadPage}>New Message</button>
          <InboxCards />
        </div>
        <div className="inbox-message">
          <InboxMessage />
        </div>
       </div>
    );
  } else {
    content = (
        <div className="loaded-container">
          <div className="inbox-cards">
            <button className="btn btn-sm btn-primary" onClick={reloadPage}>New Message</button>
            <InboxCards />
          </div>
          <div className="inbox-form">
            <InboxForm />
          </div>
        </div>
    );
  }

  return (
    <div className="inbox-page">
      {/* <button className="btn btn-lg btn-primary" onClick={reloadPage}>New Message</button> */}
      {content}
    </div>
  );
}

const mapStateToProps = (state) => ({
  recipient: state.recipient,
});

export default connect(mapStateToProps)(InboxPage);
