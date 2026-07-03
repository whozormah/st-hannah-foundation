export const colors = {
  primary: "#844204",
  primaryDark: "#6D3503",
  secondary: "#D9A441",

  background: "#F6F3EE",
  white: "#FFFFFF",
  card: "#FAF7F2",

  black: "#1B1815",
  text: "#555555",
  muted: "#888888",

  border: "#E8E2D8",

  success: "#15803D",
  warning: "#B45309",
  danger: "#B91C1C",
};

export const styles = {
  body: {
    backgroundColor: colors.background,
    margin: "0",
    padding: "40px 20px",
    fontFamily: "Arial, Helvetica, sans-serif",
  },

  container: {
    backgroundColor: colors.white,
    width: "700px",
    maxWidth: "700px",
    margin: "0 auto",
    borderRadius: "24px",
    overflow: "hidden",
  },

  section: {
    padding: "50px",
  },

  heading: {
    color: colors.black,
    fontSize: "42px",
    fontWeight: "700",
    lineHeight: "52px",
    margin: 0,
  },

  subHeading: {
    color: colors.black,
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "30px",
  },

  paragraph: {
    color: colors.text,
    fontSize: "17px",
    lineHeight: "32px",
  },

  card: {
    backgroundColor: colors.card,
    border: `1px solid ${colors.border}`,
    borderRadius: "18px",
    padding: "35px",
  },

  footer: {
    backgroundColor: "#F8F6F2",
    padding: "45px",
    textAlign: "center" as const,
  },

  button: {
    backgroundColor: colors.primary,
    color: "#FFFFFF",
    padding: "18px 36px",
    borderRadius: "12px",
    textDecoration: "none",
    fontWeight: "700",
    display: "inline-block",
  },
};
