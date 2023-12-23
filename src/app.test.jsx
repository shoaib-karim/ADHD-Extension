import { render, screen, waitFor } from "@testing-library/react";

import App from "./app";

test("renders in the document", async () => {
  render(<App />);

  const app = await screen.findByTestId("app");
  await waitFor(() => expect(app).toBeInTheDocument());
});
