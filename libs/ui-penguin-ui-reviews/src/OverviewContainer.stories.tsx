import React from 'react';
import { boolean, number } from "@storybook/addon-knobs";
import { TabContainer } from '@mp-workspace/ui-penguin-ui-material-ui-extension';
import OverviewContainer from './OverviewContainer';
import ReviewLinearProgress from './ReviewLinearProgress';

export default {
  component: OverviewContainer,
  title: 'OverviewContainer',
};

export const Basic = () => {
  /* eslint-disable-next-line */
  // const props: any = {};

  const [tab, setTab] = React.useState(-1);
  const onChange = (event: React.MouseEvent, value: number) => {
    setTab(value);
  };

  return <div>
    <OverviewContainer id="sh-rol__overview-container" onChange={onChange}>
      <ReviewLinearProgress label="5 star" value={5}></ReviewLinearProgress>
      <ReviewLinearProgress label="4 star" value={4}></ReviewLinearProgress>
      <ReviewLinearProgress label="3 star" value={1}></ReviewLinearProgress>
      <ReviewLinearProgress label="2 star" value={0}></ReviewLinearProgress>
      <ReviewLinearProgress label="1 star" value={1}></ReviewLinearProgress>
    </OverviewContainer>

    <TabContainer selected={tab === -1}>All reviews</TabContainer>
    <TabContainer selected={tab === 5}>All 5 star reviews</TabContainer>
    <TabContainer selected={tab === 4}>All 4 star reviews</TabContainer>
    <TabContainer selected={tab === 3}>All 3 star reviews</TabContainer>
    <TabContainer selected={tab === 2}>All 2 star reviews</TabContainer>
    <TabContainer selected={tab === 1}>All 1 star reviews</TabContainer>
  </div>;
};


export const LinearProgress = () => {
  /* eslint-disable-next-line */
  // const props: any = {};

  return <ReviewLinearProgress
    label="5 sao"
    disabled={boolean('disabled', false)}
    // handleFocus={handleFocus}
    // handleClear={handleClear}
    reviews={number('reviews', 5)}
    total={number('total', 11)}

    itemValue={0}
    value={5}
    selected={boolean('selected', true)}
    // hover={hover}
  />;
};
