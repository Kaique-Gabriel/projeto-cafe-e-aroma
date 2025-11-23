import colors from './colors';
import shadows from './shadows';

export default {
  colors,
  shadows,

  spacing: {
    xs: 6,
    sm: 10,
    md: 16,
    lg: 22,
    xl: 30,
  },

  radius: {
    sm: 8,
    md: 14,
    lg: 20,
    xl: 28,
  },

  text: {
    title: {
      fontSize: 22,
      fontWeight: '700',
      color: colors.textPrimary,
    },
    subtitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.textSecondary,
    },
    body: {
      fontSize: 15,
      color: colors.textPrimary,
    },
    small: {
      fontSize: 13,
      color: colors.textSecondary,
    },
  },

  button: {
    primary: {
      backgroundColor: colors.primary,
      paddingVertical: 14,
      borderRadius: 14,
      alignItems: 'center',
    },
    primaryText: {
      color: '#FFF',
      fontSize: 16,
      fontWeight: '700',
    },
  },
};
