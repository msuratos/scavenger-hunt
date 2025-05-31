import { Loader } from "@mantine/core";

const Loading = (props) => {
  const { customStyles } = props;

  return (
    <div className={customStyles !== undefined ? 'loading-override' : 'loading'}>
      <Loader style={customStyles ?? { position: 'absolute', top: '45%' }} />
    </div>
  )
};

export default Loading;