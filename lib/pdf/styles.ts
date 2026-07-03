import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    backgroundColor: "#F8F6F2",
    paddingTop: 45,
    paddingBottom: 45,
    paddingHorizontal: 45,
    fontSize: 11,
    color: "#1F2937",
    fontFamily: "Helvetica",
    position: "relative",
  },

  watermark: {
    position: "absolute",
    top: 270,
    left: 90,
    opacity: 0.06,
    fontSize: 70,
    color: "#844204",
    transform: "rotate(-35deg)",
  },

  header: {
    alignItems: "center",
    borderBottom: "2 solid #844204",
    paddingBottom: 22,
    marginBottom: 28,
  },

  logo: {
    width: 72,
    height: 72,
    marginBottom: 14,
  },

  foundation: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#844204",
    letterSpacing: 0.8,
  },

  tagline: {
    marginTop: 4,
    fontSize: 10,
    color: "#6B7280",
  },

  receiptTitle: {
    marginTop: 18,
    fontSize: 22,
    fontWeight: "bold",
    color: "#111827",
    textAlign: "center",
    letterSpacing: 1,
  },

  receiptSubtitle: {
    marginTop: 4,
    fontSize: 10,
    color: "#6B7280",
    textAlign: "center",
  },

  card: {
    backgroundColor: "#FFFFFF",
    border: "1 solid #E5E7EB",
    borderRadius: 10,
    padding: 22,
    marginBottom: 22,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#844204",
    marginBottom: 16,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottom: "1 solid #F1F5F9",
  },

  label: {
    fontSize: 10,
    color: "#6B7280",
  },

  value: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#111827",
  },

  amountCard: {
    backgroundColor: "#FFF8ED",
    border: "1 solid #FCD9A4",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    marginBottom: 24,
  },

  amountLabel: {
    fontSize: 11,
    color: "#6B7280",
    marginBottom: 6,
  },

  amount: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#844204",
  },

  successBadge: {
    backgroundColor: "#DCFCE7",
    border: "1 solid #86EFAC",
    color: "#166534",
    fontSize: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginBottom: 18,
  },

  acknowledgement: {
    marginTop: 8,
    backgroundColor: "#FFFBEB",
    border: "1 solid #FDE68A",
    borderRadius: 8,
    padding: 16,
    lineHeight: 1.7,
  },

  acknowledgementTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#844204",
    marginBottom: 8,
  },

  acknowledgementText: {
    fontSize: 10,
    color: "#374151",
    lineHeight: 1.7,
  },

  signatureSection: {
    marginTop: 42,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },

  signatureBox: {
    width: 180,
  },

  signatureLine: {
    borderTop: "1 solid #374151",
    marginBottom: 6,
  },

  signatureTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#374151",
  },

  signatureSubtitle: {
    fontSize: 9,
    color: "#6B7280",
    marginTop: 2,
  },

  footer: {
    marginTop: 40,
    borderTop: "1 solid #E5E7EB",
    paddingTop: 18,
    alignItems: "center",
  },

  footerPrimary: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 4,
  },

  footerSecondary: {
    fontSize: 9,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 1.5,
  },

  receiptNumber: {
    fontSize: 10,
    color: "#844204",
    fontWeight: "bold",
  },

  divider: {
    borderBottom: "1 solid #E5E7EB",
    marginVertical: 18,
  },
});
