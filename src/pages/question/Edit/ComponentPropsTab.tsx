import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { getComponentPropsByType } from '../../../components/question/QuestionConfig';
import { ComponentProps } from '../../../model';
import { updateComponent } from '../../../store/components';

const Unselected: FC = () => {
  return <div style={{ textAlign: 'center' }}>未选中组件</div>;
};

const ComponentPropsTab: FC = () => {
  const componentsState = useSelector(
    (state: RootState) => state.componentsState
  );
  const dispatch = useDispatch();
  const { selectedId, components } = componentsState;
  const selectedComponent = components.find(
    c => c.userQuestionComponentId === selectedId
  );

  if (selectedComponent == null) {
    return <Unselected />;
  }

  const { userQuestionComponentId, type, props } = selectedComponent;

  // 属性props同步到redux
  function updateComponentsState(newProps: ComponentProps) {
    dispatch(updateComponent({ userQuestionComponentId, newProps }));
    // console.log('newProps', newProps);
  }

  const ComponentProps = getComponentPropsByType(type);
  return (
    <div>
      <ComponentProps
        {...props}
        onChange={updateComponentsState}
        disabled={selectedComponent.locked}
      />
    </div>
  );
};

export default ComponentPropsTab;
