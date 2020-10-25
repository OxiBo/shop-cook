import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const CountContainer = styled.span`
  padding: 3rem;
  margin: 3rem;
  font-size: 3rem;
  /* color: red; */
`;

const SpanStyled = styled.span`
  padding: 3rem;
  font-weight: 800;
  color: red;
`;
const TestCount = () => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(count1 * 100);
  const [count3, setCount3] = useState(count2 / 1000);
  useEffect(() => {
    console.log("UseEffect runs");
    setCount2(count1 * 100);
  }, [count1]);

    useEffect(() => {
      console.log("UseEffect runs")
    setCount3(count2 / 1000);
  }, [count2]);
  return (
    <div>
      <CountContainer>
        <p>
          Count1 <SpanStyled> {count1}</SpanStyled>
        </p>
        <button type="button" onClick={(e) => setCount1(count1 + 1)}>
          Increment +1
        </button>
      </CountContainer>
      <CountContainer>
        <p>
          Count2 <SpanStyled> {count2}</SpanStyled>
        </p>
        <button
          type="button"
          onClick={(e) => {
            setCount1(count1 + 1);
            setCount3(count1 / 1000);
          }}
        >
          Increment *100
        </button>
      </CountContainer>
      <CountContainer>
        <p>
          Count3 <SpanStyled> {count3}</SpanStyled>
        </p>
        <button
          type="button"
          onClick={(e) => {
            setCount1(count1 + 1);
            setCount3(count2 / 1000);
          }}
        >
          Divide /1000
        </button>
      </CountContainer>
      <button
        type="button"
        onClick={() => {
          setCount1(0);
          setCount2(0);
          setCount3(0);
        }}
      >
        RESET
      </button>
    </div>
  );
};

export default TestCount;
