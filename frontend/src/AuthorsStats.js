import React, { Component } from "react";
import Dropzone from "react-dropzone";
import styled from "styled-components";
import { getColorByIntent } from "./helpers";

const All = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 0 50px;
`;

const Author = styled.div`
  flex: 1;
  padding: 10px 0;
  display: flex;
  flex-direction: ${props => (props.isLeft ? "row-reverse" : "row")};
  align-items: center;
  &:first-child {
    text-align: right;
  }
`;

const AuthorName = styled.p`
  width: 120px;
  height: 120px;
  text-align: center;
  margin: 30px;
  padding: 10px;
  background-color: #ebebeb;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 1px 1px 10px 0 rgba(50, 50, 50, 0.2);
  color: #0d3b66;
  font-weight: 700;
  border: 1px solid #0d3b66;
`;

const Intents = styled.div`
  flex: 1;
`;

const Intent = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 15px;
`;

const IntentDetails = styled.div`
  display: flex;
  flex-direction: ${props => (props.isLeft ? "row-reverse" : "row")};
  align-items: center;
`;

const IntentValue = styled.div`
  font-size: 30px;
  padding: 0 10px;
`;

const IntentBar = styled.div`
  width: ${props => Math.floor(props.fraction * 100).toString() + "%"};
  background-color: ${props => getColorByIntent(props.intent)};
  height: 40px;
  border-radius: 3px;
  min-width: 3px;
`;

const IntentName = styled.p`
  margin: 0;
  font-size: 16px;
  text-transform: uppercase;
  font-weight: 300;
`;

class AuthorsStats extends Component {
  render() {
    const authors = [...new Set(this.props.messages.map(m => m.name))];
    const intentCountsPerAuthor = this.props.messages.reduce(
      (all, m) => {
        const intent = m.intent || "other";

        if (typeof all[m.name][intent] === "undefined")
          all[m.name][intent] = { val: 0, fraction: 0 };

        all[m.name][intent].val += 1;

        return all;
      },
      { [authors[0]]: {}, [authors[1]]: {} }
    );

    // Will look like:
    // {
    //   markus: [["affirm", {val: 5, fraction: 10}], ["greet", { val: 10, fraction: 0.5}]]
    // }
    const intentCountsPerAuthorWithFraction = Object.keys(intentCountsPerAuthor).reduce(
      (authors, name) => {
        const maxCount = Object.keys(intentCountsPerAuthor[name])
          .map(intent => intentCountsPerAuthor[name][intent])
          .reduce((max, i) => Math.max(max, i.val), 0);

        authors[name] = Object.keys(intentCountsPerAuthor[name])
          .map(intentName => [
            intentName,
            {
              val: intentCountsPerAuthor[name][intentName].val,
              fraction: intentCountsPerAuthor[name][intentName].val / maxCount,
            },
          ])
          .sort((a, b) => {
            return b[1].val - a[1].val;
          });

        return authors;
      },
      {}
    );

    return (
      <All>
        {authors.slice(0, 2).map((author, i) => (
          <Author isLeft={i === 0}>
            <AuthorName>{author}</AuthorName>
            <Intents>
              {intentCountsPerAuthorWithFraction[author].map(intent => (
                <Intent>
                  <IntentName>{intent[0]}</IntentName>
                  <IntentDetails isLeft={i === 0}>
                    <IntentBar intent={intent[0]} fraction={intent[1].fraction} />
                    <IntentValue>{intent[1].val}</IntentValue>
                  </IntentDetails>
                </Intent>
              ))}
            </Intents>
          </Author>
        ))}
      </All>
    );
  }
}

export default AuthorsStats;