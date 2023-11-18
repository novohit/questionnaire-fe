import React, { FC, useState } from 'react';
import styles from './List.module.scss';
import QuestionCard from '../components/QuestionCard';

const mockQuestionList = [
  {
    _id: 'q1',
    title: '问卷1',
    isPublished: false,
    isStar: true,
    answerCount: 23,
    createdAt: '2023-11-18 15:42:22',
  },
  {
    _id: 'q2',
    title: '问卷2',
    isPublished: true,
    isStar: false,
    answerCount: 3,
    createdAt: '2023-11-18 15:42:22',
  },
  {
    _id: 'q3',
    title: '问卷3',
    isPublished: false,
    isStar: true,
    answerCount: 3,
    createdAt: '2023-11-18 15:42:22',
  },
  {
    _id: 'q4',
    title: '问卷4',
    isPublished: true,
    isStar: false,
    answerCount: 13,
    createdAt: '2023-11-18 15:42:22',
  },
];

const List: FC = () => {
  const [questionList, setQuestionList] = useState(mockQuestionList);
  console.log(questionList, setQuestionList);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>我的问卷</div>
        <div className={styles.right}>(搜索)</div>
      </div>
      <div className={styles.content}>
        {questionList.map(q => {
          const { _id } = q;
          return <QuestionCard key={_id} {...q} />;
        })}
      </div>
      <div className={styles.footer}>分页</div>
    </>
  );
};

export default List;
