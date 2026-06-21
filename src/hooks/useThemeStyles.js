import { makeStyles } from '@material-ui/core/styles';

export const useThemeStyles = (stylesFn) => {
  const useStyles = makeStyles(stylesFn);
  return useStyles();
};
