import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Home from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await waitFor(() => screen.findByText("Message envoyé !"), { timeout: 6500 });
    });
  });

});


/////////////
jest.mock("../../contexts/DataContext/index", () => ({
  useData: () => ({
    last: {
      cover: "/images/headway-F2KRf_QfCqw-unsplash.png",
      title: "Conférence #productCON",
      date: new Date("2022-08-29T20:28:45.744Z"),
    },
    data: null,
    error: null,
  }),
}));

describe("When a page is created", () => {
  it("a list of events is displayed", async () => {
    render(<Home />);
    const eventListElement = screen.getByTestId("card-testid");
    expect(eventListElement).toBeInTheDocument();
  });

  it("a list a people is displayed", () => {
    render(<Home />);

    const peopleCards = screen.getAllByTestId("Peoplecard-testid");
    expect(peopleCards.length).toBeGreaterThan(1);
  });
  it("a footer is displayed", () => {
    render(<Home />);

    const footerDisplay = screen.getByText("Contactez-nous");
    expect(footerDisplay).toBeInTheDocument();
  });

  it("an event card, with the last event, is displayed", () => {
    render(<Home />);

    const eventCards = screen.getAllByTestId("card-testid");
    const smallEventCard = eventCards.filter((card) =>
      card.classList.contains("EventCard--small")
    );
    expect(smallEventCard.length).toBe(1);
  });
});
