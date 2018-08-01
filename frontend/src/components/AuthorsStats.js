import React, { Component } from "react";
import styled from "styled-components";

import { getColorByIntent } from "../helpers";
import { COLS } from "../colors";

import User from "./User";

const All = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  max-width: 1200px;
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
  font-weight: 400;
  font-size: 24px;
  margin: 0 0 20px;
  font-family: "Lobster", cursive;
`;

const AuthorDetails = styled.div`
  text-align: center;
  margin: 20px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: ${COLS["dark"]};
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

const Stats = styled.div`
  max-width: 120px;
`;

const Value = styled.div`
  font-size: 40px;
  font-weight: 700;
`;
const Label = styled.div`
  font-size: 18px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

function roundToTwoDecimals(num) {
  return Math.round(num * 100) / 100;
}

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
      authors.reduce((initial, a) => {
        initial[a] = {};

        return initial;
      }, {})
    );

    const messagesPerAuthor = this.props.messages.reduce(
      (all, m) => {
        all[m.name] += 1;

        return all;
      },
      authors.reduce((initial, a) => {
        initial[a] = 0;
        return initial;
      }, {})
    );

    console.log(messagesPerAuthor);

    const wordCountAndLengthTotalPerAuthor = this.props.messages.reduce(
      (all, m) => {
        const wordCount = m.text.split(" ").length;
        all[m.name].wordCount += wordCount;
        all[m.name].avgWordLength +=
          m.text
            .split(" ")
            .map(w => w.length)
            .reduce((sum, x) => sum + x, 0) / wordCount;

        return all;
      },
      authors.reduce((initial, a) => {
        initial[a] = { wordCount: 0, avgWordLength: 0 };

        return initial;
      }, {})
    );

    console.log(wordCountAndLengthTotalPerAuthor);

    const statsPerAuthor = authors.reduce(
      (all, a) => {
        all[a].avgWordCount = wordCountAndLengthTotalPerAuthor[a].wordCount / messagesPerAuthor[a];
        all[a].avgWordLength =
          wordCountAndLengthTotalPerAuthor[a].avgWordLength / messagesPerAuthor[a];
        all[a].messagesPerAuthor = messagesPerAuthor[a];

        return all;
      },
      authors.reduce((initial, a) => {
        initial[a] = {};

        return initial;
      }, {})
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
          <Author key={author} isLeft={i === 0}>
            <AuthorDetails>
              <User />
              <AuthorName>{author}</AuthorName>
              <Stats>
                <Value>{statsPerAuthor[author].messagesPerAuthor}</Value>
                <Label>Messages</Label>
              </Stats>
              <Stats>
                <Value>{roundToTwoDecimals(statsPerAuthor[author].avgWordCount)}</Value>
                <Label>Words per message</Label>
              </Stats>
              <Stats>
                <Value>{roundToTwoDecimals(statsPerAuthor[author].avgWordLength)}</Value>
                <Label>Word length</Label>
              </Stats>
            </AuthorDetails>
            <Intents>
              {intentCountsPerAuthorWithFraction[author].map(intent => (
                <Intent key={intent[0]}>
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
