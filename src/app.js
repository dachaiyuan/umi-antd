import 'ant-design-pro/dist/ant-design-pro.css';
export const dva = {
  config: {
    onError(err) {
      err.preventDefault();
      console.error(err.message);
    },
  },
};

