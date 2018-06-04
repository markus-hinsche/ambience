import React, { Component } from "react";
import styled from "styled-components";

const All = styled.div`
  background-color: #fefefe;
  padding: 20px;
  margin: 0;
  text-align: center;
  max-width: 650px;
`;

const Large = styled.p`
  font-size: 24px;
`;
const Small = styled.p`
  font-size: 14px;
  line-height: 1.7;
  color: #888;
`;

class Disclaimer extends Component {
  render() {
    return (
      <All>
        <Large>Drop 💧 a chat file 💬, or click anywhere in this box.</Large>
        <Small>
          When you drop or select a file, we will process it in the backend to deliver the best
          possible chat analysis. We will not store or log any of the contents anywhere. If you drop
          a file, you'll agree and trust us on that.
        </Small>
      </All>
    );
  }
}

export default Disclaimer;
