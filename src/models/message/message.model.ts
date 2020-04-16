export default interface SnackbarMessage {
    type: "success" | "info" | "warning" | "error" | undefined;
    text: string;
  }
  