import { ProgressCircular } from "ui-neumorphism";

const Loading = (props) => {
  const { customStyles } = props;

  return (
    <div className={customStyles !== undefined ? 'loading-override' : 'loading'}>
      <ProgressCircular style={customStyles ?? { position: 'absolute', top: '45%' }} indeterminate color='var(--info)' />
    </div>
  )
};

export default Loading;