import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ShareButtons } from "#/components/result/ShareButtons";

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

const mockClipboardWriteText = vi.fn().mockResolvedValue(undefined);
const mockWindowOpen = vi.fn();

beforeEach(() => {
	vi.useFakeTimers({ shouldAdvanceTime: true });

	// Mock navigator.clipboard using defineProperty (getter is read-only in jsdom)
	Object.defineProperty(navigator, "clipboard", {
		value: { writeText: mockClipboardWriteText },
		writable: true,
		configurable: true,
	});

	vi.stubGlobal("open", mockWindowOpen);

	// Provide a stable URL for all tests
	Object.defineProperty(window, "location", {
		value: { href: "https://example.com/?w=70&u=kg&s=male&a=moderate&c=hot" },
		writable: true,
		configurable: true,
	});
});

afterEach(() => {
	vi.useRealTimers();
	vi.restoreAllMocks();
	mockClipboardWriteText.mockClear();
	mockWindowOpen.mockClear();
});

// ---------------------------------------------------------------------------
// Rendering & accessibility
// ---------------------------------------------------------------------------

describe("ShareButtons", () => {
	it("renders all three share buttons", () => {
		render(<ShareButtons totalMl={2500} glasses={8} />);

		expect(
			screen.getByRole("button", { name: "Copy link to clipboard" }),
		).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: "Share on Twitter" }),
		).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: "Share on Facebook" }),
		).toBeInTheDocument();
	});

	it("wraps buttons in a group with an accessible label", () => {
		render(<ShareButtons totalMl={2500} glasses={8} />);

		const group = screen.getByRole("group", { name: "Share your results" });
		expect(group).toBeInTheDocument();
	});

	it("displays visible text labels for each button", () => {
		render(<ShareButtons totalMl={2500} glasses={8} />);

		expect(screen.getByText("Copy link")).toBeInTheDocument();
		expect(screen.getByText("Twitter")).toBeInTheDocument();
		expect(screen.getByText("Facebook")).toBeInTheDocument();
	});

	// -----------------------------------------------------------------------
	// Copy link
	// -----------------------------------------------------------------------

	it("triggers clipboard copy and shows success feedback on click", async () => {
		const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
		render(<ShareButtons totalMl={2500} glasses={8} />);

		// Verify initial state
		expect(screen.getByText("Copy link")).toBeInTheDocument();
		expect(screen.queryByText("Copied!")).not.toBeInTheDocument();

		await user.click(
			screen.getByRole("button", { name: "Copy link to clipboard" }),
		);

		await act(async () => {
			await vi.advanceTimersByTimeAsync(10);
		});

		// Confirm the copy handler ran successfully and updated the UI
		expect(screen.getByText("Copied!")).toBeInTheDocument();
		expect(screen.queryByText("Copy link")).not.toBeInTheDocument();
	});

	it('shows "Copied!" feedback after clicking copy', async () => {
		const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
		render(<ShareButtons totalMl={2500} glasses={8} />);

		await user.click(
			screen.getByRole("button", { name: "Copy link to clipboard" }),
		);

		await vi.advanceTimersByTimeAsync(0);

		expect(screen.getByText("Copied!")).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: "Link copied to clipboard" }),
		).toBeInTheDocument();
	});

	it('reverts "Copied!" back to "Copy link" after 2 seconds', async () => {
		const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
		render(<ShareButtons totalMl={2500} glasses={8} />);

		await user.click(
			screen.getByRole("button", { name: "Copy link to clipboard" }),
		);

		await vi.advanceTimersByTimeAsync(0);
		expect(screen.getByText("Copied!")).toBeInTheDocument();

		await act(async () => {
			vi.advanceTimersByTime(2000);
		});

		expect(screen.getByText("Copy link")).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: "Copy link to clipboard" }),
		).toBeInTheDocument();
	});

	// -----------------------------------------------------------------------
	// Twitter share
	// -----------------------------------------------------------------------

	it("opens a Twitter intent URL with the correct text and url", async () => {
		const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
		render(<ShareButtons totalMl={2500} glasses={8.2} />);

		await user.click(
			screen.getByRole("button", { name: "Share on Twitter" }),
		);

		expect(mockWindowOpen).toHaveBeenCalledTimes(1);
		const [url, target, features] = mockWindowOpen.mock.calls[0];

		expect(url).toContain("https://twitter.com/intent/tweet?");
		expect(url).toContain(
			encodeURIComponent("I need 8 glasses of water daily! Calculate yours:"),
		);
		expect(url).toContain(
			encodeURIComponent(
				"https://example.com/?w=70&u=kg&s=male&a=moderate&c=hot",
			),
		);
		expect(target).toBe("_blank");
		expect(features).toBe("noopener,noreferrer");
	});

	it("rounds glasses to the nearest integer in the Twitter share text", async () => {
		const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
		render(<ShareButtons totalMl={3000} glasses={9.6} />);

		await user.click(
			screen.getByRole("button", { name: "Share on Twitter" }),
		);

		const [url] = mockWindowOpen.mock.calls[0];
		expect(url).toContain(
			encodeURIComponent("I need 10 glasses of water daily! Calculate yours:"),
		);
	});

	// -----------------------------------------------------------------------
	// Facebook share
	// -----------------------------------------------------------------------

	it("opens a Facebook sharer URL with the current page URL", async () => {
		const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
		render(<ShareButtons totalMl={2500} glasses={8} />);

		await user.click(
			screen.getByRole("button", { name: "Share on Facebook" }),
		);

		expect(mockWindowOpen).toHaveBeenCalledTimes(1);
		const [url, target, features] = mockWindowOpen.mock.calls[0];

		expect(url).toBe(
			`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://example.com/?w=70&u=kg&s=male&a=moderate&c=hot")}`,
		);
		expect(target).toBe("_blank");
		expect(features).toBe("noopener,noreferrer");
	});

	// -----------------------------------------------------------------------
	// Prop changes
	// -----------------------------------------------------------------------

	it("updates the Twitter share text when glasses prop changes", async () => {
		const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
		const { rerender } = render(
			<ShareButtons totalMl={2500} glasses={8} />,
		);

		rerender(<ShareButtons totalMl={3500} glasses={12.4} />);

		await user.click(
			screen.getByRole("button", { name: "Share on Twitter" }),
		);

		const [url] = mockWindowOpen.mock.calls[0];
		expect(url).toContain(
			encodeURIComponent("I need 12 glasses of water daily! Calculate yours:"),
		);
	});
});
