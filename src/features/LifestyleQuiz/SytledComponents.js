import styled from 'styled-components';

const LifestyleHeading = styled.div`
  color: var(--Black, #1f1f1f);
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 28px;
  font-style: normal;
  font-weight: 600;
  line-height: 42px; /* 150% */
`;
const BookCallHeading = styled.div`
  color: var(--Black, #1f1f1f);
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 31.5px; /* 131.25% */
`;
const BookCallInnerText = styled.div`
  color: var(--White, #fff);
  font-family: Anton;
  font-size: 47.95px;
  font-style: normal;
  font-weight: 400;
  line-height: 51.098px; /* 106.566% */
  text-transform: uppercase;
`;
const FeatureHeading = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 31.5px; /* 131.25% */
  background: var(
    --Gradient-purple,
    linear-gradient(95deg, #d6b6f0 2.94%, #848ce9 74.36%)
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
const Name = styled.div`
  color: var(--Black, #1f1f1f);
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 36.75px;
  font-style: normal;
  font-weight: 600;
  line-height: 48.234px; /* 131.25% */
`;
const PlanText = styled.div`
  color: var(--Grey, #6d6c6c);
  leading-trim: both;
  text-edge: cap;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 16.744px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 143.337% */
  letter-spacing: 0.335px;
`;
const BookCallContainer = styled.div`
  background: var(--Purple, #7e87ef);
  box-shadow:
    0px 31px 9px 0px rgba(0, 0, 0, 0),
    0px 20px 8px 0px rgba(0, 0, 0, 0.01),
    0px 11px 7px 0px rgba(0, 0, 0, 0.05),
    0px 5px 5px 0px rgba(0, 0, 0, 0.09),
    0px 1px 3px 0px rgba(0, 0, 0, 0.1);
`;
const PlanFeatureText = styled.div`
  color: var(--Black, #1f1f1f);
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  padding-inline: 10px;
  line-height: 14px; /* 116.667% */
  letter-spacing: 0.24px;
`;
const ActionText = styled.div`
  color: var(--Black, #1f1f1f);
  leading-trim: both;
  text-edge: cap;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px; /* 128.571% */
  letter-spacing: 0.28px;
`;

export {
  ActionText,
  BookCallContainer,
  BookCallHeading,
  BookCallInnerText,
  FeatureHeading,
  LifestyleHeading,
  Name,
  PlanFeatureText,
  PlanText,
};
