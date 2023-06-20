import { Col, Row, Statistic } from 'antd';
import React from 'react';
import CountUp from 'react-countup';

const formatter = (value: number) => <CountUp end={value} separator="," />;

export const Home = () => {
  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Statistic title="Active Users" value={600600} formatter={formatter} />
        </Col>
        <Col span={12}>
          <Statistic title="Account Balance (CNY)" value={112893} precision={2} formatter={formatter} />
        </Col>
      </Row>
    </>
  );
};
