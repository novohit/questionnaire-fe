import React, { FC } from 'react';
import styles from '../Edit/EditCanvas.module.scss';
import classNames from 'classnames';
import { getComponentByType } from '../../../components/questionnaire/config';
import { ComponentPropsType } from '../../../components/questionnaire/type';
import { QuestionnaireComponent } from '../../../model/questionnaire';

function genComponent(type: string, props: ComponentPropsType) {
  const Component = getComponentByType(type);
  if (Component == null) {
    return <></>;
  }
  return <Component {...props} />;
}

type Props = {
  components: QuestionnaireComponent[];
  selectedId: string;
  setSelectedId: (id: string) => void;
  setSelectedType: (type: string) => void;
};

const LeftPanel: FC<Props> = (props: Props) => {
  const { components, selectedId, setSelectedId, setSelectedType } = props;

  function select(
    event: React.MouseEvent<HTMLDivElement>,
    userQuestionComponentId: string,
    type: string
  ) {
    // 阻止事件冒泡到上层的styles.main
    event.stopPropagation();
    setSelectedId(userQuestionComponentId);
    setSelectedType(type);
  }

  return (
    <div className={styles.canvas}>
      {components
        .filter(c => !c.hidden) // 过滤隐藏的组件
        .map(c => {
          const { userQuestionComponentId, type, props } = c;

          // 拼接 css classname
          const defaultClassName = styles['component-wrapper'];
          const selectedClassName = styles.selected;
          const divClassName = classNames({
            [defaultClassName]: true,
            [selectedClassName]: userQuestionComponentId === selectedId,
          });

          return (
            <div
              key={userQuestionComponentId}
              className={divClassName}
              onClick={e => select(e, userQuestionComponentId, type)}
            >
              <div className={styles.component}>
                {genComponent(type, props)}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default LeftPanel;
