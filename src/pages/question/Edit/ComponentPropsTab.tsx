import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { getComponentPropsByType } from '../../../components/question/QuestionConfig';

const Unselected: FC = () => {
  return <div style={{ textAlign: 'center' }}>未选中组件</div>;
};

const ComponentPropsTab: FC = () => {
  const componentsState = useSelector(
    (state: RootState) => state.componentsState
  );
  const { selectedId, components } = componentsState;
  const selectedComponent = components.find(c => c.componentId === selectedId);
  if (selectedComponent == null) {
    return <Unselected />;
  }
  const ComponentProps = getComponentPropsByType(selectedComponent?.type);

  return (
    <div>
      选中的组件{JSON.stringify(selectedComponent)}
      <ComponentProps props={selectedComponent.props} />
    </div>
  );
};

export default ComponentPropsTab;
